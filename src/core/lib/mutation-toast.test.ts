import { toast } from 'sonner';
import { describe, expect, it, vi } from 'vitest';

import { NotOkResponseError } from '@/core/errors';
import { onMutationError } from '@/core/lib/mutation-toast';

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('onMutationError', () => {
  const t = ((key: string) => key) as Parameters<typeof onMutationError>[0];

  it('shows structured API errors from NotOkResponseError', () => {
    const handler = onMutationError(t);
    const error = new NotOkResponseError({
      title: 'Conflict',
      detail: 'Email already exists',
      status: 409,
    });

    handler(error);

    expect(toast.error).toHaveBeenCalledWith('statusCodes:409.short', {
      description: 'Email already exists',
    });
  });

  it('shows a fallback message for unexpected errors', () => {
    const handler = onMutationError(t);

    handler(new Error('Network failure'));

    expect(toast.error).toHaveBeenCalledWith(
      'core:messages.unableToHandleAction',
    );
  });
});
