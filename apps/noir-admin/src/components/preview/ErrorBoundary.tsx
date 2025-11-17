/**
 * Phase 5 — Component Live Preview
 * Jxion Stack — Error Boundary for Component Preview
 * Date: 2025-11-14
 * Author: Cursor Agent
 *
 * Error boundary to safely catch rendering errors in component previews
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
  componentId: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class PreviewErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `[Jxion-Admin] Error rendering component ${this.props.componentId}:`,
      error,
      errorInfo
    );
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error state when component changes
    if (prevProps.componentId !== this.props.componentId) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error}>
          <p className={styles.errorText}>
            Error rendering component &quot;{this.props.componentId}&quot;
          </p>
          <p className={styles.errorMessage}>
            {this.state.error?.message || 'Unknown error'}
          </p>
          <p className={styles.errorNote}>
            Some components may require additional context (e.g., i18n
            dictionary, theme provider). Check console for details.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
