import { z } from 'zod';

import {
  driveFormSchema,
  driveSchema,
  drivesSearchSchema,
} from '@/modules/drives/schemas';

export type Drive = z.infer<typeof driveSchema>;
export type DriveFormData = z.infer<typeof driveFormSchema>;

export type DrivesSearchParams = z.infer<typeof drivesSearchSchema>;
