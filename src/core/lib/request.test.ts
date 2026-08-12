import { describe, expect, it } from 'vitest';

import { MissingIdError } from '@/core/errors';
import { assertValidId, buildUrl, isLoginPath } from '@/core/lib/request';

describe('buildUrl', () => {
  it('builds a URL from base, api path, and resource path', () => {
    expect(buildUrl('/items')).toBe('http://localhost:3000/api/items');
  });

  it('normalizes paths without a leading slash', () => {
    expect(buildUrl('items')).toBe('http://localhost:3000/api/items');
  });

  it('appends query parameters and skips nullish values', () => {
    expect(buildUrl('/items', { page: 1, search: 'test' })).toBe(
      'http://localhost:3000/api/items?page=1&search=test',
    );
  });

  it('returns the URL without a query string when query is empty', () => {
    expect(buildUrl('/items', {})).toBe('http://localhost:3000/api/items');
  });
});

describe('assertValidId', () => {
  it('does not throw for valid ids', () => {
    expect(() => assertValidId(1, '/items')).not.toThrow();
    expect(() => assertValidId('abc', '/items')).not.toThrow();
  });

  it('throws MissingIdError for missing ids', () => {
    expect(() => assertValidId(undefined, '/items')).toThrow(MissingIdError);
    expect(() => assertValidId('', '/items')).toThrow(MissingIdError);
  });
});

describe('isLoginPath', () => {
  it('identifies login paths that should skip auth headers', () => {
    expect(isLoginPath('/auth/login')).toBe(true);
    expect(isLoginPath('auth/login')).toBe(true);
  });

  it('returns false for non-login paths', () => {
    expect(isLoginPath('/auth/refresh')).toBe(false);
    expect(isLoginPath('/items')).toBe(false);
  });
});
