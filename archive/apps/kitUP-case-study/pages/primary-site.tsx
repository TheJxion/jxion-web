import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { TemplateRenderer } from '@jxion/core';
import { getDictionary } from '@jxion/i18n';
import { primaryTemplates } from '../lib/templates/primary-templates';
import { primaryContent } from '../lib/data/primary-content';
import {
  createGSAPContext,
  animateHero,
  staggerGrid,
  fadeIn,
} from '../lib/utils/gsap-animations';

// Optional: Use i18n for content (fallback to primaryContent if not available)
export async function getServerSideProps() {
  let i18nContent = null;
  try {
    const dictionary = await getDictionary('tr-TR');
    // Check if primary content exists in dictionary (may not exist yet)
    i18nContent = (dictionary as any)?.primary || null;
  } catch (error) {
    console.warn('i18n not available, using content data file');
  }

  return {
    props: {
      i18nContent,
    },
  };
}

interface PrimarySitePageProps {
  i18nContent?: any;
}

export default function PrimarySitePage({
  i18nContent,
}: PrimarySitePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use i18n content if available, otherwise fallback to primaryContent
  const heroData = i18nContent?.hero || primaryContent.hero;
  const modulesData = i18nContent?.modules || primaryContent.modules;
  const featuresData = i18nContent?.features || primaryContent.features;

  // Render hero section using template
  const heroHTML = TemplateRenderer.render({
    template: primaryTemplates.hero,
    variables: heroData,
  });

  // Render modules section using template
  const modulesHTML = TemplateRenderer.render({
    template: primaryTemplates.modules,
    variables: modulesData,
  });

  // Render features section using template
  const featuresHTML = TemplateRenderer.render({
    template: primaryTemplates.features,
    variables: featuresData,
  });

  // GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const ctx = createGSAPContext(containerRef.current);

    // Wait for DOM to be ready
    setTimeout(() => {
      // Animate hero elements
      animateHero(containerRef.current!);

      // Animate module cards
      const moduleCards = containerRef.current?.querySelectorAll(
        '.module-card, [class*="module-card"]'
      );
      if (moduleCards && moduleCards.length > 0) {
        staggerGrid(moduleCards, {
          trigger: containerRef.current?.querySelector('.modules'),
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        });
      }

      // Animate feature cards
      const featureCards = containerRef.current?.querySelectorAll(
        '.feature-card, [class*="feature-card"]'
      );
      if (featureCards && featureCards.length > 0) {
        staggerGrid(featureCards, {
          trigger: containerRef.current?.querySelector('.features'),
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        });
      }
    }, 100);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Head>
        <title>Primary Product - Management System</title>
        <meta
          name="description"
          content="Digital transformation for organizations"
        />
      </Head>
      <div
        ref={containerRef}
        style={{ minHeight: '100vh', backgroundColor: '#000000' }}
      >
        {/* Hero Section - Template-Driven */}
        <div dangerouslySetInnerHTML={{ __html: heroHTML }} />

        {/* Modules Section - Template-Driven */}
        <div dangerouslySetInnerHTML={{ __html: modulesHTML }} />

        {/* Features Section - Template-Driven */}
        <div dangerouslySetInnerHTML={{ __html: featuresHTML }} />
      </div>
    </>
  );
}
