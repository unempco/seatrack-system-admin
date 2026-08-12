import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NotOkResponseError } from '@/core/errors';
import {
  createDummy,
  deleteDummy,
  getDummiesList,
  getDummyById,
  updateDummy,
} from '@/modules/dummies/api/query-fns';
import {
  dummyFixture,
  dummyFormFixture,
  dummyListFixture,
} from '@/test/fixtures/dummies';

vi.mock('@/core/lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/core/lib/utils')>();
  return {
    ...actual,
    sleep: () => Promise.resolve(),
  };
});

describe('dummies query-fns', () => {
  beforeEach(() => {
    localStorage.setItem('dummies', JSON.stringify(dummyListFixture));
  });

  describe('getDummiesList', () => {
    it('returns paginated items with metadata', async () => {
      const result = await getDummiesList({ page: 1, pageSize: 10 });

      expect(result.items).toHaveLength(3);
      expect(result.meta).toEqual({
        currentPage: 1,
        pageSize: 10,
        totalItems: 3,
      });
    });

    it('filters by search term across name and email', async () => {
      const result = await getDummiesList({ search: 'other' });

      expect(result.items).toHaveLength(1);
      expect(result.items[0]?.name).toBe('Other Dummy');
    });

    it('filters by status', async () => {
      const result = await getDummiesList({ status: 'running' });

      expect(result.items).toHaveLength(1);
      expect(result.items[0]?.status).toBe('running');
    });

    it('returns an empty page when no items match', async () => {
      const result = await getDummiesList({ search: 'nonexistent-term' });

      expect(result.items).toEqual([]);
      expect(result.meta.totalItems).toBe(0);
    });
  });

  describe('getDummyById', () => {
    it('returns a dummy by id', async () => {
      const result = await getDummyById(1);
      expect(result).toEqual(dummyFixture);
    });

    it('throws NotOkResponseError when the dummy is missing', async () => {
      await expect(getDummyById(999)).rejects.toBeInstanceOf(
        NotOkResponseError,
      );
    });
  });

  describe('createDummy', () => {
    it('creates a dummy and persists it to storage', async () => {
      const created = await createDummy(dummyFormFixture);

      expect(created.id).toBeGreaterThan(3);
      expect(created.email).toBe(dummyFormFixture.email);

      const stored = JSON.parse(localStorage.getItem('dummies') ?? '[]');
      expect(
        stored.some((d: { email: string }) => d.email === created.email),
      ).toBe(true);
    });

    it('rejects duplicate emails with a conflict error', async () => {
      await expect(
        createDummy({ ...dummyFormFixture, email: dummyFixture.email }),
      ).rejects.toMatchObject({ status: 409 });
    });

    it('rejects duplicate keys with a conflict error', async () => {
      await expect(
        createDummy({ ...dummyFormFixture, key: dummyFixture.key }),
      ).rejects.toMatchObject({ status: 409 });
    });
  });

  describe('updateDummy', () => {
    it('updates an existing dummy', async () => {
      const updated = await updateDummy(1, {
        ...dummyFormFixture,
        name: 'Updated Name',
      });

      expect(updated.name).toBe('Updated Name');
      expect(updated.id).toBe(1);
    });

    it('throws when updating a missing dummy', async () => {
      await expect(updateDummy(999, dummyFormFixture)).rejects.toMatchObject({
        status: 404,
      });
    });

    it('rejects email conflicts with other records', async () => {
      await expect(
        updateDummy(1, { ...dummyFormFixture, email: 'other@example.com' }),
      ).rejects.toMatchObject({ status: 409 });
    });
  });

  describe('deleteDummy', () => {
    it('removes a dummy from storage', async () => {
      await deleteDummy(1);

      const stored = JSON.parse(localStorage.getItem('dummies') ?? '[]');
      expect(stored.find((d: { id: number }) => d.id === 1)).toBeUndefined();
    });

    it('throws when deleting a missing dummy', async () => {
      await expect(deleteDummy(999)).rejects.toMatchObject({ status: 404 });
    });
  });
});
