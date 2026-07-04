import type { Drive } from '@/modules/drives/types';
import type { CellContext } from '@tanstack/react-table';

import { DriveActions } from '@/modules/drives/components/drive-actions';

export function DataTableDriveActionsCell({ row }: DataTableDriveActionsProps) {
  return <DriveActions drive={row.original} />;
}

export type DataTableDriveActionsProps = CellContext<Drive, unknown>;
