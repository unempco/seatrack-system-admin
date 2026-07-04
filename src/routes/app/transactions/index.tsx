import { createFileRoute } from '@tanstack/react-router';

import { UnderConstruction } from '@/layout/components/under-construction';
import { createRouteHead } from '@/layout/lib/create-route-head';

export const Route = createFileRoute('/app/transactions/')({
  head: createRouteHead({
    type: 'index',
    titleI18nKey: 'transactions:name',
  }),
  component: UnderConstruction,
});
