import React from 'react';

type ErrorProps = {
  children: React.ReactNode;
};
class ErrorBoundary extends React.Component<ErrorProps> {
  state = { hasError: false, errorReason: '' };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Object, errorInfo: Object) {
    this.setState(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
