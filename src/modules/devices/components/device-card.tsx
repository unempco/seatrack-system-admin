import type { Device } from '../types';

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

import { DeviceActions } from './device-actions';

export function DeviceCard({ device, className }: DeviceCardProps) {
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
              {device.name}
            </Typography>
            <Typography
              as="span"
              variant="h4"
              className="ml-1 text-muted-foreground"
            >
              #{device.id}
            </Typography>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 pb-4">
        <DetailFieldItem
          icon={ParallelogramIcon}
          label={t('devices:fields.brand')}
          value={device.brand}
        />
        <DetailFieldItem
          icon={CpuIcon}
          label={t('devices:fields.chip')}
          value={device.chip}
        />
        <DetailFieldItem
          icon={DiscIcon}
          label={t('devices:fields.os')}
          value={device.os}
        />
        <DetailFieldItem
          icon={UsbIcon}
          label={t('devices:fields.ports')}
          value={device.ports}
        />
        <DetailFieldItem
          icon={CalendarIcon}
          label={t('devices:fields.createdAt')}
          value={formatDate(device.createdAt)}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2 border-t pt-2">
        <DeviceActions device={device} variant="outline" />
      </CardFooter>
    </Card>
  );
}

export type DeviceCardProps = {
  device: Device;
  onEdit?: (device: Device) => void;
  onDelete?: (device: Device) => void;
  className?: string;
};
