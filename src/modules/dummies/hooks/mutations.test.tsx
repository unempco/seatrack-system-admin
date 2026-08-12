import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import i18n from '@/i18n';
import {
  useCreateDummyMutation,
  useDeleteDummyMutation,
} from '@/modules/dummies/hooks/mutations';
import { dummyFormFixture, dummyListFixture } from '@/test/fixtures/dummies';
import { createTestQueryClient } from '@/test/utils';

vi.mock('@/core/lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/core/lib/utils')>();
  return {
    ...actual,
    sleep: () => Promise.resolve(),
  };
});

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

function createMutationWrapper(queryClient = createTestQueryClient()) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </QueryClientProvider>
    );
  };
}

describe('dummy mutations', () => {
  beforeEach(() => {
    localStorage.setItem('dummies', JSON.stringify(dummyListFixture));
  });

  it('invalidates the dummies list after a successful create', async () => {
    const queryClient = createTestQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const onSuccess = vi.fn();

    const { result } = renderHook(() => useCreateDummyMutation({ onSuccess }), {
      wrapper: createMutationWrapper(queryClient),
    });

    result.current.mutate({
      ...dummyFormFixture,
      email: 'created@example.com',
      key: 'created-key',
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['dummies'] });
    expect(toast.success).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalled();
  });

  it('invalidates the dummies list after a successful delete', async () => {
    const queryClient = createTestQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(
      () => useDeleteDummyMutation({ dummyId: 1 }),
      { wrapper: createMutationWrapper(queryClient) },
    );

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['dummies'] });
    expect(toast.success).toHaveBeenCalled();
  });
});
