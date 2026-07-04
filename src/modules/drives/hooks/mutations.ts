import type { DriveFormData } from '@/modules/drives/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { onMutationError } from '@/core/lib/mutation-toast';
import {
  createDrive,
  deleteDrive,
  updateDrive,
} from '@/modules/drives/api/query-fns';

export function useCreateDriveMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createDrive'],
    mutationFn: createDrive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drives'] });
      toast.success(t('messages.wasCreated'));
      onSuccess();
    },
    onError: onMutationError(t),
  });
}

export function useUpdateDriveMutation({
  driveId,
  onSuccess,
}: {
  driveId: number;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateDrive'],
    mutationFn: (data: DriveFormData) => updateDrive(driveId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drives'] });
      toast.success(t('messages.wasUpdated'));
      onSuccess();
    },
    onError: onMutationError(t),
  });
}

export function useDeleteDriveMutation({ driveId }: { driveId: number }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteDrive'],
    mutationFn: () => deleteDrive(driveId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drives'] });
      toast.success(t('messages.wasDeleted'));
    },
    onError: onMutationError(t),
  });
}
