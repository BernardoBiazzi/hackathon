import '@ifood/pomodoro-fonts';

import '../locales';

import { ErrorBoundary } from 'components/error-boundary';
import { UnexpectedError } from 'components/unexpected-error';
import { initializeAboyeur } from 'config/aboyeur';
import type { AppProps } from 'next/app';
import { Component } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import { GlobalStyles } from '../styles/globals';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

class App extends Component<AppProps> {
  componentDidMount() {
    initializeAboyeur();
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <>
        <GlobalStyles />
        <ErrorBoundary fallback={<UnexpectedError />}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
