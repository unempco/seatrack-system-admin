import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DummyForm } from '@/modules/dummies/components/forms/dummy-form';
import { dummyFormFixture } from '@/test/fixtures/dummies';
import { renderWithProviders } from '@/test/utils';

describe('DummyForm', () => {
  it('shows validation errors when required fields are empty', async () => {
    const user = userEvent.setup();

    renderWithProviders(<DummyForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
    });
  });

  it('submits valid data to onSubmit', async () => {
    const onSubmit = vi.fn();

    renderWithProviders(
      <DummyForm defaultValues={dummyFormFixture} onSubmit={onSubmit} />,
    );

    const form = document.getElementById('dummy-form');
    expect(form).toBeTruthy();
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: dummyFormFixture.name,
          email: dummyFormFixture.email,
          key: dummyFormFixture.key,
        }),
        expect.anything(),
      );
    });
  });

  it('disables inputs and shows loading state while submitting', () => {
    renderWithProviders(
      <DummyForm
        defaultValues={dummyFormFixture}
        onSubmit={vi.fn()}
        isLoading
      />,
    );

    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
    expect(screen.getByDisplayValue('New Dummy')).toBeDisabled();
  });

  it('calls onCancel when cancel is clicked', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    renderWithProviders(
      <DummyForm
        defaultValues={dummyFormFixture}
        onSubmit={vi.fn()}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
