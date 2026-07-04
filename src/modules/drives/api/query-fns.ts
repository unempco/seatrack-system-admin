import type { PaginatedResponse } from '@/core/types/response';
import type {
  Drive,
  DriveFormData,
  DrivesSearchParams,
} from '@/modules/drives/types';

import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import { supabaseErrorThrower } from '@/modules/shared/lib/utils';
import { supabase } from '@/supabase';

export async function getAllDrives(): Promise<Drive[]> {
  const { data, error } = await supabase
    .from('drives')
    .select('*')
    .order('name', { ascending: true });

  supabaseErrorThrower(error);

  return camelcaseKeys(data ?? []) as Drive[];
}

export async function getDrivesList(
  params: DrivesSearchParams,
): Promise<PaginatedResponse<Drive>> {
  const { page = 1, pageSize = 10, search = '' } = params;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('drives')
    .select('*', { count: 'exact' })
    .range(from, to)
    .order('name', { ascending: true });

  if (search !== '') {
    query = query.ilike('name', `%${search.trim()}%`);
  }

  const { data, error, count } = await query;

  supabaseErrorThrower(error);

  return {
    meta: {
      currentPage: page,
      pageSize,
      totalItems: count ?? 0,
    },
    items: camelcaseKeys(data ?? []) as Drive[],
  };
}

export async function getDriveById(id: number): Promise<Drive> {
  const { data, error } = await supabase
    .from('drives')
    .select('*')
    .eq('id', id)
    .single();

  supabaseErrorThrower(error);

  return camelcaseKeys(data) as Drive;
}

export async function createDrive(drive: DriveFormData): Promise<Drive> {
  const { data, error } = await supabase
    .from('drives')
    .insert(snakecaseKeys(drive))
    .select('*')
    .single();

  supabaseErrorThrower(error);

  return camelcaseKeys(data) as Drive;
}

export async function updateDrive(
  id: number,
  drive: DriveFormData,
): Promise<Drive> {
  const { data, error } = await supabase
    .from('drives')
    .update(snakecaseKeys(drive))
    .eq('id', id)
    .select('*')
    .single();

  supabaseErrorThrower(error);

  return camelcaseKeys(data) as Drive;
}

export async function deleteDrive(id: number): Promise<void> {
  const { error } = await supabase.from('drives').delete().eq('id', id);

  supabaseErrorThrower(error);
}
