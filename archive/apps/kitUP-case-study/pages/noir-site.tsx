/**
 * Noir Site Page
 * Displays the deployed noir-crafted SvelteKit application in an iframe
 * Similar to how ustad-web-yesildefter works with shared components
 */

import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/NoirSite.module.scss';

// Deployed noir-crafted URL (update with actual deployment URL)
// For development, try localhost first, then fallback to Vercel
const getNoirCraftedUrl = () => {
  if (process.env.NEXT_PUBLIC_NOIR_CRAFTED_URL) {
    return process.env.NEXT_PUBLIC_NOIR_CRAFTED_URL;
  }
  // In development, try localhost (if noir-crafted is running locally)
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5173'; // SvelteKit default dev port
  }
  // Production fallback
  return 'https://noir-crafted.vercel.app';
};

export default function NoirSitePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle iframe loading
    const iframe = iframeRef.current;
    if (!iframe) return;

    let timeoutId: NodeJS.Timeout;
    let isMounted = true;

    const handleLoad = () => {
      if (!isMounted) return;

      // Check if iframe actually loaded (cross-origin check)
      try {
        // Try to access iframe content (will fail for cross-origin, but that's OK)
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          // Same-origin: check if document is ready
          if (iframeDoc.readyState === 'complete') {
            console.log('Noir site loaded successfully');
            setIsLoading(false);
            setHasError(false);
            return;
          }
        }

        // Cross-origin or still loading: assume success after load event
        console.log('Noir site iframe loaded (cross-origin)');
        setIsLoading(false);
        setHasError(false);
      } catch (e) {
        // Cross-origin: can't access, but load event fired, so assume success
        console.log('Noir site iframe loaded (cross-origin, access blocked)');
        setIsLoading(false);
        setHasError(false);
      }
    };

    // Timeout fallback (if iframe doesn't load within 8 seconds)
    timeoutId = setTimeout(() => {
      if (isMounted && isLoading) {
        console.warn('Noir site loading timeout - showing error');
        setHasError(true);
        setIsLoading(false);
      }
    }, 8000);

    iframe.onload = handleLoad;

    // Note: iframe.onerror doesn't work for cross-origin iframes
    // We rely on timeout and load event

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      iframe.onload = null;
    };
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>NOIR - Zamanın Ötesinde Takı Deneyimi</title>
        <meta
          name="description"
          content="Luxury jewelry with AI-powered design and Turkish heritage"
        />
      </Head>
      <div className={styles.iframeContainer}>
        {hasError ? (
          <div className={styles.errorFallback}>
            <h2 className={styles.errorTitle}>Noir Site Unavailable</h2>
            <p className={styles.errorMessage}>
              The Noir site is not currently available. This may be because:
            </p>
            <ul className={styles.errorList}>
              <li>The deployment URL is not configured</li>
              <li>The noir-crafted app is not running locally</li>
              <li>The external deployment is not accessible</li>
            </ul>
            <p className={styles.errorNote}>
              To view the Noir site, ensure the noir-crafted SvelteKit app is
              running locally on port 5173, or set the{' '}
              <code>NEXT_PUBLIC_NOIR_CRAFTED_URL</code> environment variable.
            </p>
            <a href="/case-study" className={styles.errorLink}>
              View Case Study Instead →
            </a>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <p>Loading Noir site...</p>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={getNoirCraftedUrl()}
              className={styles.iframe}
              title="NOIR - Luxury Jewelry E-commerce"
              allow="fullscreen"
              loading="lazy"
            />
          </>
        )}
      </div>
    </>
  );
}
