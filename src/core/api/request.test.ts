import { describe, expect, it, vi } from 'vitest';

import api from '@/core/api/index';
import { request } from '@/core/api/request';
import { MissingIdError, NotOkResponseError } from '@/core/errors';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/modules/auth/lib/token';

vi.mock('@/modules/auth/lib/token', () => ({
  getAccessToken: vi.fn(),
  getRefreshToken: vi.fn(),
  setAccessToken: vi.fn(),
  setRefreshToken: vi.fn(),
}));

describe('request', () => {
  beforeEach(() => {
    vi.mocked(getAccessToken).mockReturnValue(undefined);
    vi.mocked(getRefreshToken).mockReturnValue('refresh-token');
  });

  it('returns parsed JSON for successful responses', async () => {
    const data = await request<{ id: number }>('GET', '/items/1');
    expect(data).toEqual({ id: 1, name: 'Item 1' });
  });

  it('throws NotOkResponseError for error responses', async () => {
    await expect(request('GET', '/items/404')).rejects.toBeInstanceOf(
      NotOkResponseError,
    );
  });

  it('attaches authorization headers for protected routes', async () => {
    vi.mocked(getAccessToken).mockReturnValue('valid-token');

    const data = await request<{ ok: boolean }>('GET', '/protected');
    expect(data).toEqual({ ok: true });
  });

  it('refreshes tokens and retries once after a 401 response', async () => {
    vi.mocked(getAccessToken)
      .mockReturnValueOnce('expired-token')
      .mockReturnValue('new-access-token');

    const data = await request<{ ok: boolean }>('GET', '/protected');

    expect(data).toEqual({ ok: true });
    expect(setAccessToken).toHaveBeenCalledWith('new-access-token');
    expect(setRefreshToken).toHaveBeenCalledWith('new-refresh-token');
  });

  it('does not attach auth headers to login paths', async () => {
    const data = await request('POST', '/auth/login', {
      body: { email: 'test@example.com', password: 'secret' },
    });

    expect(data).toBeDefined();
    expect(getAccessToken).not.toHaveBeenCalled();
  });
});

describe('api.getList', () => {
  it('transforms paginated API responses into PaginatedResponse shape', async () => {
    const result = await api.getList<{ id: number; name: string }>('/items');

    expect(result.items).toEqual([{ id: 1, name: 'Item 1' }]);
    expect(result.meta.totalItems).toBe(1);
  });
});

describe('api.getById', () => {
  it('throws when id is missing', () => {
    expect(() => api.getById('/items', undefined)).toThrow(MissingIdError);
  });
});
