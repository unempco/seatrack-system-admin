import type { QueryClientConfig } from '@tanstack/react-query';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import i18n from '@/i18n';

export function createTestQueryClient(config?: QueryClientConfig) {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
    ...config,
  });
}

type ProviderOptions = {
  queryClient?: QueryClient;
};

function createWrapper({ queryClient }: ProviderOptions = {}) {
  const client = queryClient ?? createTestQueryClient();

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </QueryClientProvider>
    );
  };
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & ProviderOptions,
) {
  const { queryClient, ...renderOptions } = options ?? {};

  return {
    queryClient: queryClient ?? createTestQueryClient(),
    ...render(ui, {
      wrapper: createWrapper({ queryClient }),
      ...renderOptions,
    }),
  };
}
