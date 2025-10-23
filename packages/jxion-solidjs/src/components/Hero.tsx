import { Component, createEffect, createSignal } from "solid-js";
import styles from "@jxion/design/src/components/hero.module.scss";
import { heroTemplate, SolidJSRenderer } from "@jxion/core";
import type { HeroProps } from "@jxion/shared";

/**
 * Hero Component - SolidJS Implementation
 *
 * Uses:
 * - HTML template from @jxion-core (heroTemplate.html)
 * - SCSS styles from @jxion-design
 * - Types from @jxion/shared
 *
 * This component renders the actual HTML template from @jxion-core
 * converted to SolidJS JSX syntax.
 */
export const Hero: Component<HeroProps> = (props) => {
  const {
    title,
    subtitle = "",
    description = "",
    ctaText = "Get Started",
    statsValue = "7",
    statsLabel = "Years Experience",
    cardSubtitle = "",
    testId = "hero",
    onCtaClick,
  } = props;

  // Render the HTML template from @jxion-core
  const [renderedTemplate, setRenderedTemplate] = createSignal("");

  createEffect(() => {
    // Set global event handler
    if (typeof window !== "undefined" && onCtaClick) {
      (window as any).onCtaClick = onCtaClick;
    }

    const template = SolidJSRenderer.render({
      template: heroTemplate.html,
      variables: {
        title,
        subtitle,
        description,
        ctaText,
        statsValue,
        statsLabel,
        cardSubtitle,
        testId,
        onCtaClick: onCtaClick ? "onCtaClick" : "",
      },
      styles,
    });
    setRenderedTemplate(template);
  });

  return <div class="hero-template" innerHTML={renderedTemplate()} />;
};

export default Hero;
