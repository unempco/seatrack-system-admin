import { createFileRoute } from '@tanstack/react-router';

import { UnderConstruction } from '@/layout/components/under-construction';
import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/employees/')({
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'employees:name',
  }),
  component: UnderConstruction,
});
