import type { DrivesSearchParams } from '@/modules/drives/types';

import { queryOptions } from '@tanstack/react-query';

import { getDriveById, getDrivesList } from '@/modules/drives/api/query-fns';

export const drivesIndexQueryOptions = (params: DrivesSearchParams) =>
  queryOptions({
    queryKey: ['drives', params],
    queryFn: () => getDrivesList(params),
  });

export const driveQueryOptions = (itemId: number) =>
  queryOptions({
    queryKey: ['driveById', itemId],
    queryFn: () => getDriveById(itemId),
  });
