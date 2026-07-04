import type { Drive } from '@/modules/drives/types';

import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { DriveForm } from '@/modules/drives/components/forms/drive-form';
import { useUpdateDriveMutation } from '@/modules/drives/hooks/mutations';

export function UpdateDriveDialog({
  drive,
  open,
  onOpenChange,
}: UpdateDriveDialogProps) {
  const { t } = useTranslation();

  const mutation = useUpdateDriveMutation({
    driveId: drive.id,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('drives:dialogs.update.title')}</DialogTitle>
        </DialogHeader>
        <DriveForm
          defaultValues={drive}
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
          submitLabel={t('actions.update')}
        />
      </DialogContent>
    </Dialog>
  );
}

export type UpdateDriveDialogProps = {
  drive: Drive;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};
