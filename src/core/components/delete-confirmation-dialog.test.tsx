import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DeleteConfirmationDialog } from '@/core/components/delete-confirmation-dialog';
import { renderWithProviders } from '@/test/utils';

describe('DeleteConfirmationDialog', () => {
  it('renders confirmation copy and the entity name', () => {
    renderWithProviders(
      <DeleteConfirmationDialog
        open
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        name="Test Entity"
      />,
    );

    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    expect(screen.getByText(': Test Entity')).toBeInTheDocument();
  });

  it('calls onConfirm when delete is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    renderWithProviders(
      <DeleteConfirmationDialog
        open
        onOpenChange={vi.fn()}
        onConfirm={onConfirm}
        name="Test Entity"
      />,
    );

    await user.click(screen.getByRole('button', { name: /delete/i }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('disables actions while deletion is pending', () => {
    renderWithProviders(
      <DeleteConfirmationDialog
        open
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        isPending
        name="Test Entity"
      />,
    );

    expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /delete/i })).toBeDisabled();
  });
});
