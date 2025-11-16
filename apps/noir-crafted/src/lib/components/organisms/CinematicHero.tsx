/**
 * Cinematic Hero Component - Portfolio Grade
 *
 * A high-fidelity hero component for Noir Crafted that combines:
 * 1. Reactive mesh gradient background (mouse-following)
 * 2. High-quality SVG animation of hand and ring
 *
 * Inspired by: tools.ui-layouts.com, mubuajans.com, gsap_cocktails
 * Phase: Phase 2 - Cinematic Refinement
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface CinematicHeroProps {
  className?: string;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  className = '',
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<SVGGElement>(null);
  const ringRef = useRef<SVGGElement>(null);
  const sparkleRef = useRef<SVGGElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  // 1. Reactive Mesh Gradient Logic
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const blob1 = blob1Ref.current;
    const blob2 = blob2Ref.current;
    const blob3 = blob3Ref.current;

    if (!blob1 || !blob2 || !blob3) return;

    // Use GSAP quickTo for smooth, performant animations
    const blob1ToX = gsap.quickTo(blob1, 'x', {
      duration: 1.5,
      ease: 'power3',
    });
    const blob1ToY = gsap.quickTo(blob1, 'y', {
      duration: 1.5,
      ease: 'power3',
    });

    const blob2ToX = gsap.quickTo(blob2, 'x', {
      duration: 1.2,
      ease: 'power3',
    });
    const blob2ToY = gsap.quickTo(blob2, 'y', {
      duration: 1.2,
      ease: 'power3',
    });

    const blob3ToX = gsap.quickTo(blob3, 'x', {
      duration: 1.0,
      ease: 'power3',
    });
    const blob3ToY = gsap.quickTo(blob3, 'y', {
      duration: 1.0,
      ease: 'power3',
    });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize mouse position to -1 to 1 range
      const xPercent = (clientX / innerWidth) * 2 - 1;
      const yPercent = (clientY / innerHeight) * 2 - 1;

      // Move blobs based on mouse position (different ranges for depth)
      blob1ToX(xPercent * 400);
      blob1ToY(yPercent * 300);

      blob2ToX(xPercent * -300);
      blob2ToY(yPercent * 400);

      blob3ToX(xPercent * 200);
      blob3ToY(yPercent * -250);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // 2. SVG Hand/Ring Animation Logic
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hand = handRef.current;
    const ring = ringRef.current;
    const sparkle = sparkleRef.current;

    if (!hand || !ring || !sparkle) return;

    // Create cinematic timeline with smooth easing
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });

    tl.fromTo(
      hand,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' },
    )
      .fromTo(
        ring,
        { scale: 0.8, opacity: 0, rotate: -15 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.5',
      )
      .fromTo(
        sparkle,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'sine.inOut' },
      )
      .to(sparkle, { opacity: 0, scale: 0, duration: 0.7, ease: 'sine.inOut' })
      .to(
        hand,
        { opacity: 0, y: 50, duration: 1.0, ease: 'power2.in' },
        '+=0.5',
      )
      .to(ring, { opacity: 0, y: 50, duration: 1.0, ease: 'power2.in' }, '<');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={heroRef} className={`hero-container ${className}`}>
      {/* 1. Reactive Gradient Blobs */}
      <div className="gradient-backdrop">
        <div ref={blob1Ref} className="blob blob1"></div>
        <div ref={blob2Ref} className="blob blob2"></div>
        <div ref={blob3Ref} className="blob blob3"></div>
      </div>

      {/* 2. SVG Animation Scene */}
      <div className="scene">
        <svg
          viewBox="0 0 400 400"
          className="svg-canvas"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* The Hand - Circular paw-like structure that fits into the ring */}
          <g ref={handRef} opacity="0" transform="translate(200, 200)">
            {/* Main circular palm */}
            <circle
              cx="0"
              cy="0"
              r="50"
              fill="rgba(255, 255, 255, 0.08)"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="2"
            />
            {/* Top pad (fits into ring) */}
            <circle
              cx="0"
              cy="-30"
              r="20"
              fill="rgba(255, 255, 255, 0.1)"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.5"
            />
            {/* Left pad */}
            <circle
              cx="-25"
              cy="10"
              r="18"
              fill="rgba(255, 255, 255, 0.08)"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
            />
            {/* Right pad */}
            <circle
              cx="25"
              cy="10"
              r="18"
              fill="rgba(255, 255, 255, 0.08)"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
            />
            {/* Bottom pad */}
            <circle
              cx="0"
              cy="35"
              r="16"
              fill="rgba(255, 255, 255, 0.08)"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
            />
            {/* Subtle inner glow */}
            <circle
              cx="0"
              cy="0"
              r="45"
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1"
            />
          </g>

          {/* The Ring - Elegant gold ring with detailed gem */}
          <g ref={ringRef} opacity="0" transform="translate(200, 150)">
            {/* Outer ring band - elegant curve */}
            <ellipse
              cx="0"
              cy="0"
              rx="22"
              ry="18"
              fill="none"
              stroke="var(--color-gold-accent)"
              strokeWidth="2.5"
              className="ring-band"
            />
            {/* Inner ring band detail */}
            <ellipse
              cx="0"
              cy="0"
              rx="18"
              ry="14"
              fill="none"
              stroke="rgba(255, 215, 0, 0.5)"
              strokeWidth="1"
            />
            {/* Ring depth/shadow */}
            <ellipse
              cx="0"
              cy="2"
              rx="22"
              ry="18"
              fill="none"
              stroke="rgba(0, 0, 0, 0.3)"
              strokeWidth="1"
              opacity="0.5"
            />
            {/* The Gem - elegant diamond shape */}
            <g className="gem-group">
              {/* Main gem body */}
              <path
                d="M 0 -8 L 6 0 L 0 8 L -6 0 Z"
                fill="var(--color-gold-accent)"
                className="gem"
              />
              {/* Gem facets for depth */}
              <path
                d="M 0 -6 L 4 0 L 0 6 L -4 0 Z"
                fill="rgba(255, 255, 255, 0.3)"
              />
              {/* Gem highlight - top facet */}
              <path
                d="M 0 -8 L 3 -4 L 0 -6 L -3 -4 Z"
                fill="rgba(255, 255, 255, 0.6)"
              />
              {/* Gem shine */}
              <circle cx="2" cy="-4" r="1.5" fill="rgba(255, 255, 255, 0.8)" />
            </g>
            {/* Ring shine effect - top highlight */}
            <path
              d="M -18 -8 Q -10 -12, 0 -10 Q 10 -12, 18 -8"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* The Sparkle - Elegant multi-point sparkle */}
          <g ref={sparkleRef} opacity="0" transform="translate(200, 150)">
            {/* Main sparkle - 8-pointed star */}
            <g className="sparkle-main">
              <path
                d="M 0 -12 L 3 -3 L 12 0 L 3 3 L 0 12 L -3 3 L -12 0 L -3 -3 Z"
                fill="var(--color-gold-accent)"
              />
              {/* Inner sparkle */}
              <path
                d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z"
                fill="rgba(255, 255, 255, 0.8)"
              />
            </g>
            {/* Secondary sparkles - smaller stars */}
            <g className="sparkle-secondary" transform="translate(-25, -15)">
              <path
                d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z"
                fill="rgba(255, 215, 0, 0.7)"
              />
            </g>
            <g className="sparkle-secondary" transform="translate(25, -15)">
              <path
                d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z"
                fill="rgba(255, 215, 0, 0.7)"
              />
            </g>
            <g className="sparkle-tertiary" transform="translate(0, -25)">
              <path
                d="M 0 -4 L 1 -1 L 4 0 L 1 1 L 0 4 L -1 1 L -4 0 L -1 -1 Z"
                fill="rgba(255, 215, 0, 0.5)"
              />
            </g>
            {/* Glow effect - radial gradient simulation */}
            <circle
              cx="0"
              cy="0"
              r="15"
              fill="rgba(255, 215, 0, 0.15)"
              className="sparkle-glow"
            />
            <circle
              cx="0"
              cy="0"
              r="10"
              fill="rgba(255, 215, 0, 0.25)"
              className="sparkle-glow"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default CinematicHero;
