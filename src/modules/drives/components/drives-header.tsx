import { PlusIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { CreateDriveDialogTrigger } from '@/modules/drives/components/dialogs/create-drive-dialog-trigger';
import { PageHeader } from '@/modules/shared/components/page-header';

export function DrivesHeader({}: DrivesHeaderProps) {
  const { t } = useTranslation();

  // TODO: Implement permission check for creating drives
  const canCreate = true;

  return (
    <PageHeader title={t('drives:name')}>
      {canCreate && (
        <CreateDriveDialogTrigger>
          <Button>
            <PlusIcon />
            {t('actions.addNew')}
          </Button>
        </CreateDriveDialogTrigger>
      )}
    </PageHeader>
  );
}

export type DrivesHeaderProps = {};
