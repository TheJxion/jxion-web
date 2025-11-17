'use client';

import { useEffect, useRef } from 'react';

let gsap: any = null;
let ScrollTrigger: any = null;

// Dynamically import GSAP
if (typeof window !== 'undefined') {
  import('gsap')
    .then((gsapModule) => {
      gsap = gsapModule.default || gsapModule.gsap || gsapModule;
      if (typeof window !== 'undefined') {
        (window as any).gsap = gsap;
      }
      return import('gsap/ScrollTrigger');
    })
    .then((scrollTriggerModule) => {
      ScrollTrigger =
        (scrollTriggerModule as any).ScrollTrigger ||
        scrollTriggerModule.default;
      if (ScrollTrigger && gsap && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
      }
    });
}

interface SmoothHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  className?: string;
}

export const SmoothHero: React.FC<SmoothHeroProps> = ({
  title,
  subtitle = '',
  description = '',
  ctaText = 'Explore Collection',
  className = '',
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!heroRef.current) return;

    const initGSAP = async () => {
      try {
        // Ensure GSAP is loaded
        if (!gsap) {
          const gsapModule = await import('gsap');
          gsap = gsapModule.default || gsapModule.gsap || gsapModule;
          if (typeof window !== 'undefined') {
            (window as any).gsap = gsap;
          }
        }

        // Ensure ScrollTrigger is loaded and registered
        if (!ScrollTrigger) {
          const scrollTriggerModule = await import('gsap/ScrollTrigger');
          ScrollTrigger =
            (scrollTriggerModule as any).ScrollTrigger ||
            scrollTriggerModule.default;
          if (ScrollTrigger && gsap && gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
          }
        }

        if (!gsap || !ScrollTrigger || !heroRef.current) return;

        const ctx = gsap.context(() => {
          // Animate title on mount
          if (titleRef.current) {
            gsap.fromTo(
              titleRef.current,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
            );
          }

          // Animate subtitle
          if (subtitleRef.current) {
            gsap.fromTo(
              subtitleRef.current,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.2,
              },
            );
          }

          // Animate description
          if (descriptionRef.current) {
            gsap.fromTo(
              descriptionRef.current,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.4,
              },
            );
          }

          // Animate CTA button
          if (ctaRef.current) {
            gsap.fromTo(
              ctaRef.current,
              { opacity: 0, scale: 0.9 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.7)',
                delay: 0.6,
              },
            );
          }

          // Scroll-triggered hero shrink/pin animation
          ScrollTrigger.create({
            trigger: heroRef.current,
            start: 'top top',
            end: '+=100vh',
            pin: true,
            scrub: 1,
            onUpdate: (self: any) => {
              const progress = self.progress;
              if (titleRef.current) {
                gsap.to(titleRef.current, {
                  scale: 1 - progress * 0.3,
                  opacity: 1 - progress * 0.5,
                  duration: 0.1,
                });
              }
            },
          });
        }, heroRef);

        return () => ctx.revert();
      } catch (error) {
        console.error('Error initializing GSAP in SmoothHero:', error);
      }
    };

    const cleanup = initGSAP();
    return () => {
      if (cleanup && typeof cleanup.then === 'function') {
        cleanup.then((fn) => fn && fn());
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={`smooth-hero ${className}`}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-noir-background-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient blobs (simplified, smooth version) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 30% 50%, var(--color-noir-murdum) 0%, transparent 50%), radial-gradient(circle at 70% 50%, var(--color-noir-murdum-soft) 0%, transparent 50%)',
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '2rem',
          maxWidth: '1200px',
        }}
      >
        <h1
          ref={titleRef}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: 800,
            color: 'var(--color-noir-secondary)',
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            ref={subtitleRef}
            style={{
              fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
              color: 'var(--color-noir-text-muted)',
              marginBottom: '1.5rem',
            }}
          >
            {subtitle}
          </p>
        )}
        {description && (
          <p
            ref={descriptionRef}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--color-noir-text-muted)',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem',
            }}
          >
            {description}
          </p>
        )}
        <button
          ref={ctaRef}
          onClick={() => {
            // Scroll to collection or navigate
            const collectionEl = document.getElementById('collection');
            if (collectionEl) {
              collectionEl.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          style={{
            padding: '1rem 2.5rem',
            fontSize: '1.125rem',
            fontWeight: 600,
            backgroundColor: 'var(--color-noir-primary)',
            color: 'var(--color-noir-text)',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => {
            if (gsap) {
              gsap.to(e.currentTarget, { opacity: 0.9, duration: 0.2 });
            }
          }}
          onMouseLeave={(e) => {
            if (gsap) {
              gsap.to(e.currentTarget, { opacity: 1, duration: 0.2 });
            }
          }}
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
};

export default SmoothHero;
