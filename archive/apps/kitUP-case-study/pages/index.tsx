import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import {
  createGSAPContext,
  staggerGrid,
  fadeIn,
} from '../lib/utils/gsap-animations';

interface Product {
  id: string;
  name: string;
  description: string;
  siteUrl: string;
  adminUrl: string;
  color: string;
}

const products: Product[] = [
  {
    id: 'primary',
    name: 'Primary Product',
    description:
      'Driving school management system with MTSK integration and digital transformation tools',
    siteUrl: '/primary-site', // Template-driven site
    adminUrl: '/case-study', // Case study as admin demo
    color: '#16a34a', // Green (matching primary product brand)
  },
  {
    id: 'noir',
    name: 'Noir',
    description: 'Luxury jewelry e-commerce platform with AI-powered design',
    siteUrl: '/noir-site', // Template-driven site
    adminUrl: '/case-study', // Case study as admin demo
    color: '#4C1C3D', // Mürdüm purple
  },
  {
    id: 'lumen',
    name: 'Lumen',
    description: 'Modern lighting solutions and smart home integration',
    siteUrl: '/case-study', // Use case study as demo (external URL not available)
    adminUrl: '/case-study', // Use case study as admin demo
    color: '#FF6B35', // Orange
  },
  {
    id: 'helix',
    name: 'Helix',
    description: 'Healthcare analytics and patient management system',
    siteUrl: '/case-study', // Use case study as demo (external URL not available)
    adminUrl: '/case-study', // Use case study as admin demo
    color: '#00A8CC', // Blue
  },
];

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'site' | 'admin'>('site');
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const ctx = createGSAPContext(containerRef.current);

    // Wait for DOM to be ready
    setTimeout(() => {
      // Animate product cards
      const cards = containerRef.current?.querySelectorAll(
        `[class*="${styles.productCard}"]`
      );
      if (cards && cards.length > 0) {
        staggerGrid(cards, {
          trigger: containerRef.current?.querySelector(
            `[class*="${styles.productGrid}"]`
          ),
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        });
      }

      // Animate info section
      const infoSection = containerRef.current?.querySelector(
        `[class*="${styles.infoSection}"]`
      );
      if (infoSection) {
        fadeIn({
          element: infoSection,
          to: { delay: 0.3 },
        });
      }
    }, 100);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Head>
        <title>kitUP - Multi-Product Shell Architecture</title>
        <meta
          name="description"
          content="React Developer Case Study - Multi-Product Shell Architecture"
        />
      </Head>
      <div ref={containerRef} className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>kitUP Framework</h1>
          <p className={styles.subtitle}>Multi-Product Shell Architecture</p>
        </header>

        {/* Product Selection */}
        <section className={styles.productGrid}>
          {products.map((product) => (
            <div
              key={product.id}
              className={`${styles.productCard} ${
                selectedProduct?.id === product.id ? styles.active : ''
              }`}
              onClick={() => setSelectedProduct(product)}
              style={{
                borderColor:
                  selectedProduct?.id === product.id
                    ? product.color
                    : 'transparent',
              }}
            >
              <div
                className={styles.productIcon}
                style={{ backgroundColor: product.color }}
              >
                {product.id === 'primary' ? 'P' : product.name[0]}
              </div>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
            </div>
          ))}
        </section>

        {/* View Mode Toggle */}
        {selectedProduct && (
          <section className={styles.viewToggle}>
            <button
              className={`${styles.toggleButton} ${
                viewMode === 'site' ? styles.active : ''
              }`}
              onClick={() => setViewMode('site')}
              style={{
                backgroundColor:
                  viewMode === 'site' ? selectedProduct.color : 'transparent',
              }}
            >
              Site
            </button>
            <button
              className={`${styles.toggleButton} ${
                viewMode === 'admin' ? styles.active : ''
              }`}
              onClick={() => setViewMode('admin')}
              style={{
                backgroundColor:
                  viewMode === 'admin' ? selectedProduct.color : 'transparent',
              }}
            >
              Admin
            </button>
          </section>
        )}

        {/* Iframe Container */}
        {selectedProduct && (
          <section className={styles.iframeContainer}>
            <div className={styles.iframeHeader}>
              <h2 className={styles.iframeTitle}>
                {selectedProduct.name} -{' '}
                {viewMode === 'site' ? 'Site' : 'Admin Panel'}
              </h2>
              <a
                href={
                  viewMode === 'site'
                    ? selectedProduct.siteUrl
                    : selectedProduct.adminUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalLink}
              >
                Open in New Tab →
              </a>
            </div>
            <iframe
              src={
                viewMode === 'site'
                  ? selectedProduct.siteUrl
                  : selectedProduct.adminUrl
              }
              className={styles.iframe}
              title={`${selectedProduct.name} ${viewMode}`}
              allow="fullscreen"
            />
          </section>
        )}

        {/* Architecture Info */}
        {!selectedProduct && (
          <section className={styles.infoSection}>
            <h2 className={styles.infoTitle}>
              Multi-Product Shell Architecture
            </h2>
            <p className={styles.infoText}>
              This shell demonstrates how a single host application can manage
              multiple independent products, each with their own site and admin
              panel. All products share the same component library and design
              system, ensuring consistency while maintaining independence.
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <h3>Modular Architecture</h3>
                <p>Each product is independently deployable and maintainable</p>
              </div>
              <div className={styles.feature}>
                <h3>Shared Components</h3>
                <p>All products consume the same @jxion/ui component library</p>
              </div>
              <div className={styles.feature}>
                <h3>Unified Design System</h3>
                <p>Consistent branding via centralized CSS variables</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
