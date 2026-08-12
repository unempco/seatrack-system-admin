import { describe, expect, it } from 'vitest';

import { ItemStatus } from '@/core/constants/misc';
import {
  dummiesSearchSchema,
  dummyFormSchema,
} from '@/modules/dummies/schemas';
import { dummyFormFixture } from '@/test/fixtures/dummies';

describe('dummyFormSchema', () => {
  it('accepts valid form data', () => {
    expect(dummyFormSchema.safeParse(dummyFormFixture).success).toBe(true);
  });

  it('rejects invalid email and url fields', () => {
    const result = dummyFormSchema.safeParse({
      ...dummyFormFixture,
      email: 'not-an-email',
      website: 'not-a-url',
      image: 'also-not-a-url',
    });

    expect(result.success).toBe(false);
  });

  it('requires non-empty key and name', () => {
    const result = dummyFormSchema.safeParse({
      ...dummyFormFixture,
      key: '',
      name: '',
    });

    expect(result.success).toBe(false);
  });
});

describe('dummiesSearchSchema', () => {
  it('accepts pagination and filter params together', () => {
    expect(
      dummiesSearchSchema.parse({
        page: 2,
        pageSize: 25,
        search: 'test',
        status: ItemStatus.PENDING,
      }),
    ).toEqual({
      page: 2,
      pageSize: 25,
      search: 'test',
      status: ItemStatus.PENDING,
    });
  });

  it('coerces invalid filter values to safe defaults', () => {
    expect(
      dummiesSearchSchema.parse({
        search: undefined,
        status: 'invalid-status',
        pageSize: 99,
      }),
    ).toEqual({
      search: undefined,
      status: undefined,
      pageSize: undefined,
    });
  });
});
