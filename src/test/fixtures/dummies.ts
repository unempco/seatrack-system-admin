import type { Dummy, DummyFormData } from '@/modules/dummies/types';

import { ItemStatus } from '@/core/constants/misc';

export const dummyFixture: Dummy = {
  id: 1,
  key: 'test-key',
  name: 'Test Dummy',
  count: 10,
  description: 'A test dummy',
  created_at: '2024-01-01T00:00:00.000Z',
  status: ItemStatus.PENDING,
  email: 'test@example.com',
  website: 'https://example.com',
  image: 'https://example.com/image.png',
  special: false,
  price: 99.99,
};

export const dummyFormFixture: DummyFormData = {
  key: 'new-key',
  name: 'New Dummy',
  count: 5,
  description: 'New description',
  status: ItemStatus.PENDING,
  email: 'new@example.com',
  website: 'https://new.example.com',
  image: 'https://new.example.com/image.png',
  special: true,
  price: 49.99,
};

export const dummyListFixture: Dummy[] = [
  dummyFixture,
  {
    ...dummyFixture,
    id: 2,
    key: 'other-key',
    name: 'Other Dummy',
    email: 'other@example.com',
    status: ItemStatus.RUNNING,
  },
  {
    ...dummyFixture,
    id: 3,
    key: 'third-key',
    name: 'Third Dummy',
    email: 'third@example.com',
    status: ItemStatus.WAITING,
  },
];
