import type { DrivesSearchParams } from '@/modules/drives/types';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { DataSearch } from '@/core/components/data/data-search';
import { DataView } from '@/core/components/data/data-view';
import { createRouteHead } from '@/layout/lib/create-route-head';
import { drivesIndexQueryOptions } from '@/modules/drives/api/query-options';
import { DriveCard } from '@/modules/drives/components/drive-card';
import { DrivesHeader } from '@/modules/drives/components/drives-header';
import { drivesTableColumns } from '@/modules/drives/data/data-table-settings';
import { drivesSearchSchema } from '@/modules/drives/schemas';

export const Route = createFileRoute('/app/drives/')({
  validateSearch: drivesSearchSchema,
  loaderDeps: ({ search }): DrivesSearchParams => search,
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(drivesIndexQueryOptions(deps)),
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'drives:name',
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(drivesIndexQueryOptions(search));

  return (
    <div className="min-h-full flex flex-col gap-4">
      <DrivesHeader />
      <DataView
        preferencesNamespace="drives"
        items={data.items}
        pagination={data.meta}
        dataTableColumnsSettings={drivesTableColumns}
        className="grow"
        dataGridCardSlot={(drive) => <DriveCard drive={drive} key={drive.id} />}
        dataFiltersSlot={<DataSearch className="w-0 grow" />}
      />
    </div>
  );
}
