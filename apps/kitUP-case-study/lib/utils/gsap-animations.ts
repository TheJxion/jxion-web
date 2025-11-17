/**
 * GSAP Animation Utilities
 * Reusable animation functions for consistent animations across the app
 * Based on gsap_cocktails example quality
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface AnimationConfig {
  element: Element | Element[] | null;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  scrollTrigger?: ScrollTrigger.Vars;
  stagger?: number;
}

/**
 * Fade in animation with optional scroll trigger
 */
export const fadeIn = (config: AnimationConfig) => {
  if (!config.element) return null;

  return gsap.fromTo(
    config.element,
    { opacity: 0, y: 30, ...config.from },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: config.stagger || 0,
      scrollTrigger: config.scrollTrigger,
      ...config.to,
    }
  );
};

/**
 * Scale in animation (for buttons, cards)
 */
export const scaleIn = (config: AnimationConfig) => {
  if (!config.element) return null;

  return gsap.fromTo(
    config.element,
    { opacity: 0, scale: 0.9, ...config.from },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger: config.stagger || 0,
      scrollTrigger: config.scrollTrigger,
      ...config.to,
    }
  );
};

/**
 * Stagger animation for grid items
 */
export const staggerGrid = (
  elements: Element[] | NodeListOf<Element>,
  scrollTrigger?: ScrollTrigger.Vars
) => {
  if (!elements || elements.length === 0) return null;

  return gsap.fromTo(
    elements,
    { opacity: 0, y: 50, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger:
        scrollTrigger ||
        ({
          trigger: elements[0]?.parentElement,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        } as ScrollTrigger.Vars),
    }
  );
};

/**
 * Hero pin and shrink animation
 */
export const heroPinShrink = (
  heroElement: Element,
  contentElement: Element
) => {
  return ScrollTrigger.create({
    trigger: heroElement,
    start: 'top top',
    end: '+=100vh',
    pin: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.to(contentElement, {
        scale: 1 - progress * 0.3,
        opacity: 1 - progress * 0.5,
        duration: 0.1,
      });
    },
  });
};

/**
 * Initialize GSAP context for proper cleanup
 */
export const createGSAPContext = (scope?: Element | string) => {
  return gsap.context(() => {}, scope);
};

/**
 * Animate hero elements with stagger
 */
export const animateHero = (
  container: Element,
  config?: {
    delay?: number;
    duration?: number;
  }
) => {
  const title = container.querySelector('.noir-hero__title, .hero__title');
  const subtitle = container.querySelector(
    '.noir-hero__subtitle, .hero__subtitle'
  );
  const description = container.querySelector(
    '.noir-hero__description, .hero__description'
  );
  const cta = container.querySelector('.noir-hero__cta, .hero__cta');

  const delay = config?.delay || 0;
  const duration = config?.duration || 1;

  if (title) {
    gsap.fromTo(
      title,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration, ease: 'power3.out', delay }
    );
  }

  if (subtitle) {
    gsap.fromTo(
      subtitle,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: duration * 0.8,
        ease: 'power2.out',
        delay: delay + 0.2,
      }
    );
  }

  if (description) {
    gsap.fromTo(
      description,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: duration * 0.8,
        ease: 'power2.out',
        delay: delay + 0.4,
      }
    );
  }

  if (cta) {
    gsap.fromTo(
      cta,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: duration * 0.6,
        ease: 'back.out(1.7)',
        delay: delay + 0.6,
      }
    );
  }
};

/**
 * Animate product cards on scroll
 */
export const animateProductCards = (container: Element) => {
  const cards = container.querySelectorAll(
    '.noir-collection__product-card, .product-card, [class*="product-card"]'
  );

  if (cards && cards.length > 0) {
    staggerGrid(cards, {
      trigger: container.querySelector('.noir-collection, .collection'),
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    } as ScrollTrigger.Vars);
  }
};

/**
 * Animate sections on scroll
 */
export const animateSections = (container: Element) => {
  const sections = container.querySelectorAll(
    '.noir-why, .noir-motifs, .noir-newsletter, .section'
  );

  sections.forEach((section) => {
    fadeIn({
      element: section,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      } as ScrollTrigger.Vars,
    });
  });
};

export { gsap, ScrollTrigger };

