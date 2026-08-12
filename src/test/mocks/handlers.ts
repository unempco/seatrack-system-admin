import { http, HttpResponse } from 'msw';

const API_BASE = 'http://localhost:3000/api';

export const handlers = [
  http.get(`${API_BASE}/items`, () => {
    return HttpResponse.json({
      data: [{ id: 1, name: 'Item 1' }],
      meta: { currentPage: 1, pageSize: 10, totalItems: 1 },
    });
  }),

  http.get(`${API_BASE}/items/:id`, ({ params }) => {
    if (params.id === '404') {
      return HttpResponse.json(
        {
          title: 'Not Found',
          detail: 'Item not found',
          status: 404,
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({ id: Number(params.id), name: 'Item 1' });
  }),

  http.post(`${API_BASE}/items`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: 2, ...(body as object) }, { status: 201 });
  }),

  http.post(`${API_BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string };
    return HttpResponse.json({ accessToken: 'token', user: { email: body.email } });
  }),

  http.post(`${API_BASE}/auth/refresh`, () => {
    return HttpResponse.json({
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
    });
  }),

  http.get(`${API_BASE}/protected`, ({ request }) => {
    const auth = request.headers.get('Authorization');

    if (
      auth === 'Bearer valid-token' ||
      auth === 'Bearer new-access-token'
    ) {
      return HttpResponse.json({ ok: true });
    }

    if (auth === 'Bearer expired-token') {
      return HttpResponse.json(
        { title: 'Unauthorized', detail: 'Token expired', status: 401 },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      { title: 'Unauthorized', detail: 'Missing token', status: 401 },
      { status: 401 },
    );
  }),
];
