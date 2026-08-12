import { describe, expect, it } from 'vitest';

import { paginationSearchSchema } from '@/core/types/search-params';

describe('paginationSearchSchema', () => {
  it('accepts valid pagination params', () => {
    expect(paginationSearchSchema.parse({ page: 2, pageSize: 25 })).toEqual({
      page: 2,
      pageSize: 25,
    });
  });

  it('allows omitted params', () => {
    expect(paginationSearchSchema.parse({})).toEqual({});
  });

  it('coerces invalid values to safe defaults', () => {
    expect(paginationSearchSchema.parse({ page: 0, pageSize: 99 })).toEqual({
      page: undefined,
      pageSize: undefined,
    });
  });

  it('rejects negative page numbers via catch', () => {
    expect(paginationSearchSchema.parse({ page: -1 })).toEqual({
      page: undefined,
    });
  });
});
