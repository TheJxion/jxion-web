/**
 * JxionHero Component
 *
 * Hero section with GSAP ScrollTrigger pinning and fade-out animation.
 * Showcases Jxion architecture with NOIR brand styling.
 *
 * Features:
 * - ScrollTrigger pin animation
 * - Content fades out and scales down on scroll
 * - Transitions to content below
 * - NOIR brand styling
 *
 * Architecture: React component used in SvelteKit via LocalReactWrapper
 */

import React, { useRef, useEffect } from 'react';

export const JxionHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tl: any = null;
    let isMounted = true;

    const initGSAP = async () => {
      try {
        if (!heroRef.current || !contentRef.current) return;

        // Import GSAP core first
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default || gsapModule.gsap || gsapModule;

        // Make GSAP available globally for plugin registration
        if (typeof window !== 'undefined') {
          (window as any).gsap = gsap;
        }

        // Import ScrollTrigger - it will auto-register with global GSAP
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        const ScrollTrigger =
          (scrollTriggerModule as any).ScrollTrigger ||
          scrollTriggerModule.default;

        // Explicitly register the plugin
        if (ScrollTrigger && gsap.registerPlugin) {
          gsap.registerPlugin(ScrollTrigger);
        }

        // Wait a tick to ensure plugin is registered
        await new Promise((resolve) => setTimeout(resolve, 0));

        if (!isMounted || !heroRef.current || !contentRef.current) return;

        // Now use GSAP with ScrollTrigger
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
        });

        // Animate the inner content (fade out, scale down, move up)
        tl.to(
          contentRef.current,
          {
            opacity: 0,
            scale: 0.9,
            y: -50,
            duration: 1,
            ease: 'power1.inOut',
          },
          0,
        );
      } catch (error) {
        console.error('Error loading GSAP ScrollTrigger:', error);
      }
    };

    initGSAP();

    // Cleanup function
    return () => {
      isMounted = false;
      if (tl) {
        tl.kill();
      }
    };
  }, []);

  // Jxion-Design: Noir Theme & Typography
  return (
    <div
      ref={heroRef}
      className="h-screen w-full bg-black text-white relative flex items-center justify-center overflow-hidden"
    >
      <div ref={contentRef} className="text-center p-8 z-10">
        <h1 className="text-6xl md:text-9xl font-serif text-yellow-500/90 tracking-tighter uppercase mb-4">
          THE NOIR COLLECTION
        </h1>
        <p className="text-xl md:text-3xl font-sans text-neutral-300 mb-8">
          Crafted in Shadow, Worn in Light.
        </p>
        <button
          className="px-8 py-3 text-lg font-sans font-semibold uppercase tracking-wider
                     border border-yellow-700 text-yellow-500 rounded-full
                     transition-all duration-300 hover:bg-yellow-700 hover:text-black hover:shadow-[0_0_20px_rgba(255,215,0,0.5)]"
        >
          Explore the Grid
        </button>
      </div>
      {/* Subtle background element (Jxion-Design: Mesh Gradient/Shimmer Effect Placeholder) */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-color-black)_5%,_var(--tw-color-yellow-900)_150%)]"></div>
      </div>
    </div>
  );
};

export default JxionHero;
