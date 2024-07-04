import { Component, ReactNode } from 'react';

export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
  onError?: (error: Error) => void;
};

export type ErrorBoundaryState = {
  error?: Error;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: undefined,
  };

  componentDidCatch(error: Error) {
    this.setState({ error });

    this.props?.onError?.(error);
  }

  render(): JSX.Element {
    const { children, fallback } = this.props;
    const hasError = Boolean(this.state.error);

    return <>{hasError ? fallback : children}</>;
  }
}
