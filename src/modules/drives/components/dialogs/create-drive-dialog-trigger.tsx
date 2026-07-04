import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { DriveForm } from '@/modules/drives/components/forms/drive-form';
import { useCreateDriveMutation } from '@/modules/drives/hooks/mutations';

export function CreateDriveDialogTrigger({ children }: CreateDriveDialogProps) {
  const { t } = useTranslation();
  const [open, onOpenChange] = useState(false);

  const mutation = useCreateDriveMutation({
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('drives:dialogs.create.title')}</DialogTitle>
        </DialogHeader>
        <DriveForm
          onSubmit={(data) => mutation.mutate(data)}
          onCancel={() => onOpenChange(false)}
          isLoading={mutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

export type CreateDriveDialogProps = {
  children: React.ReactNode;
};
