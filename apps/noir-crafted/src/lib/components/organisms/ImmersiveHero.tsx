/**
 * Immersive Hero Component - Scroll-Triggered Narrative
 *
 * A high-performance hero component with:
 * 1. Canvas-based reactive gradient background (color-shifting, fluid)
 * 2. GSAP ScrollTrigger for scroll-driven animations
 * 3. SVG foreground animation (hand, ring, sparkle) that responds to scroll
 *
 * Inspired by: GSAP Cocktails Demo, Codrops 3D Carousel
 * Phase: Phase 4 - Scroll-Triggered Narrative
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImmersiveHeroProps {
  className?: string;
}

// Color Palettes for gradient blobs to shift between
const PALETTES = [
  // Deep Black & Gold Glow (Primary - Noir Crafted)
  { r1: 24, g1: 24, b1: 24, r2: 230, g2: 184, b2: 0 },
  // Cool Gray & Subtle Pink (Modern Elegance)
  { r1: 50, g1: 50, b1: 60, r2: 150, g2: 100, b2: 120 },
  // Dark Indigo & Silver (Depth)
  { r1: 15, g1: 15, b1: 30, r2: 180, g2: 180, b2: 200 },
];

export const ImmersiveHero: React.FC<ImmersiveHeroProps> = ({
  className = '',
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  // Background state for GSAP tweening
  const bg = useRef<{
    color: {
      r1: number;
      g1: number;
      b1: number;
      r2: number;
      g2: number;
      b2: number;
    };
    pos: { x1: number; y1: number; x2: number; y2: number };
    size: { r1: number; r2: number };
  }>({
    color: PALETTES[0],
    pos: { x1: 0, y1: 0, x2: 0, y2: 0 },
    size: { r1: 0, r2: 0 },
  });

  const handRef = useRef<SVGGElement>(null);
  const ringRef = useRef<SVGGElement>(null);
  const sparkleRef = useRef<SVGGElement>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });

  // 1. Setup Canvas and Resize Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      // Update canvas dimensions for drawing fidelity
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Update React state for use in the draw loop
      setSize({ width: newWidth, height: newHeight });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // 2. Background (Canvas) Logic and GSAP Color Tweening
  useEffect(() => {
    if (typeof window === 'undefined' || !gsap || size.width === 0) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    // Set initial colors and sizes for the GSAP target object
    bg.current.color = PALETTES[0];
    bg.current.pos = {
      x1: size.width * 0.2,
      y1: size.height * 0.3,
      x2: size.width * 0.8,
      y2: size.height * 0.7,
    };
    bg.current.size = {
      r1: size.width * 0.7,
      r2: size.height * 0.5,
    };

    // GSAP Timeline for Color shifts
    const colorTween = gsap.to(bg.current.color, {
      ...PALETTES[1], // Tween to second palette
      duration: 8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // GSAP Positional Tween (Drifting)
    const posTween = gsap.to(bg.current.pos, {
      x1: size.width * 0.7,
      y1: size.height * 0.8,
      x2: size.width * 0.3,
      y2: size.height * 0.2,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });

    // --- The Main Canvas Draw Loop ---
    const draw = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, size.width, size.height);

      const c = bg.current.color;
      const p = bg.current.pos;
      const s = bg.current.size;

      // 1. Draw Blob 1 (The main glow)
      const g1 = ctx.createRadialGradient(p.x1, p.y1, 0, p.x1, p.y1, s.r1);
      g1.addColorStop(
        0,
        `rgba(${Math.round(c.r1)}, ${Math.round(c.g1)}, ${Math.round(c.b1)}, 0.6)`,
      );
      g1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, size.width, size.height);

      // 2. Draw Blob 2 (The accent gold/light)
      const g2 = ctx.createRadialGradient(p.x2, p.y2, 0, p.x2, p.y2, s.r2);
      g2.addColorStop(
        0,
        `rgba(${Math.round(c.r2)}, ${Math.round(c.g2)}, ${Math.round(c.b2)}, 0.4)`,
      );
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, size.width, size.height);

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    colorTween.play();
    posTween.play();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      colorTween.kill();
      posTween.kill();
    };
  }, [size]); // Re-run effect when size changes

  // 3. Foreground (SVG Hand/Ring) ScrollTrigger Animation Logic
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !gsap ||
      !ScrollTrigger ||
      size.width === 0
    )
      return;

    const hand = handRef.current;
    const ring = ringRef.current;
    const sparkle = sparkleRef.current;
    const hero = heroRef.current;
    const scene = hero?.querySelector('.scene');

    if (!hand || !ring || !sparkle || !hero || !scene) return;

    // --- 1. INITIAL ANIMATION (Instant In) ---
    // Create the initial presentation timeline that happens immediately
    gsap.set([hand, ring, sparkle], { opacity: 0, y: -100 });
    gsap.set(hero, { opacity: 1 }); // Ensure hero is visible

    const entryTimeline = gsap.timeline();
    entryTimeline
      .to(hand, { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' })
      .to(
        ring,
        { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.5',
      )
      .to(
        sparkle,
        { opacity: 1, scale: 1, duration: 0.7, ease: 'sine.inOut' },
        '-=0.3',
      );

    // --- 2. SCROLL-DRIVEN TRANSITION ---
    // This timeline runs as the user scrolls
    const scrollTimeline = gsap.timeline({ paused: true });

    // 2.1. Scale down the entire SVG scene and translate it up/aside
    scrollTimeline.to(
      scene,
      {
        scale: 0.25,
        y: -window.innerHeight * 0.4, // Move up towards the menu
        x: window.innerWidth * 0.35, // Move right to an accent position
        duration: 1,
        ease: 'power2.inOut',
      },
      0,
    );

    // 2.2. Fade out the sparkle effect
    scrollTimeline.to(
      sparkle,
      { opacity: 0, scale: 0, duration: 0.3, ease: 'power2.in' },
      0,
    );

    // 2.3. Slightly fade the hand and ring
    scrollTimeline.to(
      [hand, ring],
      { opacity: 0.6, duration: 0.5, ease: 'power2.in' },
      0.2,
    );

    // --- 3. ATTACH SCROLLTRIGGER ---
    const scrollTrigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: '+=800', // The transition lasts 800px of scroll
      scrub: 1, // Smoothly link scroll position to timeline progress
      pin: true, // Pin the hero section while the animation plays
      animation: scrollTimeline,
      anticipatePin: 1, // Improve performance
    });

    return () => {
      // Clean up ScrollTrigger instances on unmount
      scrollTrigger.kill();
      entryTimeline.kill();
    };
  }, [size]); // Rerun if size changes to update pinning/coords

  // --- Render ---
  return (
    <div ref={heroRef} className={`hero-container ${className}`}>
      {/* Layer 1: The Canvas Background */}
      <canvas ref={canvasRef} className="canvas-background"></canvas>

      {/* Layer 2: The SVG Scene */}
      <div className="scene">
        <svg
          viewBox="0 0 400 400"
          className="svg-canvas"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Hand - Circular paw-like structure that fits into the ring */}
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
            {/* Outer ring band */}
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

export default ImmersiveHero;
