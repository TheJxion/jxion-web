/**
 * GSAP Cinematic Header Animation Component
 *
 * This component implements the 'GSAP Header Animation – Technical Document' timeline logic
 * for the Noir Crafted luxury brand homepage.
 *
 * Features:
 * - Full-width, full-height viewport container
 * - Dark gradient background using CSS variables
 * - Hand, Ring, and Sparkle elements with GSAP animations
 * - Infinite loop animation with repeat delay
 * - Client-side only rendering (SSR safe)
 *
 * Mobile Fallback Behavior:
 * - On mobile devices, this component can be replaced with a static image
 * - The animation requires GSAP which may impact mobile performance
 * - Consider using a static hero image on mobile for better performance
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './HeaderAnimation.module.scss';

interface HeaderAnimationProps {
  className?: string;
}

export const HeaderAnimation: React.FC<HeaderAnimationProps> = ({
  className = '',
}) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Ensure GSAP is loaded
    if (!gsap) {
      console.warn('[HeaderAnimation] GSAP not loaded');
      return;
    }

    // Get refs
    const hand = handRef.current;
    const ring = ringRef.current;
    const sparkle = sparkleRef.current;

    if (!hand || !ring || !sparkle) {
      console.warn('[HeaderAnimation] Animation elements not found');
      return;
    }

    // Create GSAP timeline with infinite repeat
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

    // Animation sequence
    tl.fromTo(
      hand,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
    )
      .fromTo(
        ring,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4',
      )
      .fromTo(
        sparkle,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'sine.inOut' },
      )
      .to(sparkle, { opacity: 0, duration: 0.6, ease: 'sine.inOut' })
      .to(hand, { opacity: 0, duration: 0.8, ease: 'power2.in' });

    timelineRef.current = tl;

    // Cleanup on unmount
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className={`${styles.headerAnimation} ${className}`}
      style={{
        background: 'var(--gradient-canvas)',
      }}
    >
      <div ref={sceneRef} className={styles.scene}>
        {/* Hand Element - Dark gray circle/shape to signify a hand */}
        <div ref={handRef} className={styles.hand}>
          <div className={styles.handShape} />
        </div>

        {/* Ring Element - Small gold circle/shape */}
        <div ref={ringRef} className={styles.ring}>
          <div
            className={styles.ringShape}
            style={{
              borderColor: 'var(--color-gold-accent)',
            }}
          />
        </div>

        {/* Sparkle Element - Small gold-colored radial gradient blur */}
        <div
          ref={sparkleRef}
          className={styles.sparkle}
          style={{
            background: `radial-gradient(circle, var(--color-gold-accent) 0%, transparent 70%)`,
            filter: 'blur(8px)',
          }}
        />
      </div>
    </div>
  );
};

export default HeaderAnimation;
