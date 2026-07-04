import type { Drive } from '../types';

import {
  CalendarIcon,
  CpuIcon,
  DiscIcon,
  ParallelogramIcon,
  UsbIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/core/components/ui/card';
import { Typography } from '@/core/components/ui/typography';
import { formatDate } from '@/core/lib/dates';
import { cn } from '@/core/lib/utils';
import { DetailFieldItem } from '@/modules/shared/components/detail-field-item';

import { DriveActions } from './drive-actions';

export function DriveCard({ drive, className }: DriveCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      className={cn(
        'group relative flex flex-col gap-0 overflow-hidden border transition-shadow duration-200 hover:shadow-md',
        className,
      )}
    >
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex">
            <Typography
              variant="h4"
              className="truncate font-semibold leading-tight tracking-tight"
            >
              {drive.name}
            </Typography>
            <Typography
              as="span"
              variant="h4"
              className="ml-1 text-muted-foreground"
            >
              #{drive.id}
            </Typography>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 pb-4">
        <DetailFieldItem
          icon={ParallelogramIcon}
          label={t('drives:fields.model')}
          value={drive.model}
        />
        <DetailFieldItem
          icon={CpuIcon}
          label={t('drives:fields.serial')}
          value={drive.serial}
        />
        <DetailFieldItem
          icon={DiscIcon}
          label={t('drives:fields.product')}
          value={drive.product}
        />
        <DetailFieldItem
          icon={UsbIcon}
          label={t('drives:fields.storage')}
          value={drive.storage}
        />
        <DetailFieldItem
          icon={CalendarIcon}
          label={t('drives:fields.createdAt')}
          value={formatDate(drive.createdAt)}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2 border-t pt-2">
        <DriveActions drive={drive} variant="outline" />
      </CardFooter>
    </Card>
  );
}

export type DriveCardProps = {
  drive: Drive;
  onEdit?: (drive: Drive) => void;
  onDelete?: (drive: Drive) => void;
  className?: string;
};
