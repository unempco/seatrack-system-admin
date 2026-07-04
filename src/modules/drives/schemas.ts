import { z } from 'zod';

import { paginationSearchSchema } from '@/core/types/search-params';

export const driveSchema = z.object({
  // Server geenrated
  id: z.number(),
  createdAt: z.coerce.date(),
  // User provided
  name: z.string().min(1, 'Name is required'),
  model: z.string().nullable(),
  serial: z.string().nullable(),
  product: z.string().nullable(),
  storage: z.number().nullable(),
  available: z.boolean(),
});
export const driveFormSchema = driveSchema.omit({
  id: true,
  createdAt: true,
});

export const drivesFiltersSchema = z.object({
  search: z.string().optional().catch(''),
});
export const drivesSearchSchema = paginationSearchSchema.extend(
  drivesFiltersSchema.shape,
);
