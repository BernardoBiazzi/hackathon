import { PomodoroProvider } from '@ifood/pomodoro-components';
import { Queries, RenderOptions, RenderResult, render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
    },
  },
});

export function renderWithProviders<Q extends Queries>(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'> | RenderOptions<Q>
): RenderResult | RenderResult<Q> {
  const wrapUi = (wrappedUi: ReactElement): ReactElement => (
    <PomodoroProvider>
      <QueryClientProvider client={queryClient}>{wrappedUi}</QueryClientProvider>
    </PomodoroProvider>
  );

  const view = render(wrapUi(ui), options);

  return {
    ...view,
    rerender: (rerenderedUi): void => view.rerender(wrapUi(rerenderedUi)),
  };
}
