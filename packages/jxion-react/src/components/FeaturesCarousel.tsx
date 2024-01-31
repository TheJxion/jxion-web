import React from "react";
import styles from "@jxion/design/src/components/UstadFeaturesCarousel.module.scss";

interface FeaturesCarouselProps {
  variant?: "featured" | "compact";
  layout?: "carousel" | "grid";
  animation?: "stagger" | "fade";
  delay?: number;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  showControls?: boolean;
  responsive?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export const FeaturesCarousel: React.FC<FeaturesCarouselProps> = ({
  variant = "featured",
  layout = "carousel",
  animation = "stagger",
  delay = 0,
  autoPlay = true,
  autoPlaySpeed = 5000,
  showNavigation = true,
  showPagination = true,
  showControls = true,
  responsive = { mobile: 1, tablet: 2, desktop: 3 },
}) => {
  const features = [
    {
      title: "Component Library",
      description: "Comprehensive set of reusable components",
      icon: "🧩",
    },
    {
      title: "Design System",
      description: "Consistent design tokens and styling",
      icon: "🎨",
    },
    {
      title: "Type Safety",
      description: "Full TypeScript support across all frameworks",
      icon: "🔒",
    },
    {
      title: "Performance",
      description: "Optimized for speed and efficiency",
      icon: "⚡",
    },
    {
      title: "Developer Experience",
      description: "Excellent tooling and documentation",
      icon: "🛠️",
    },
    {
      title: "Multi-Framework",
      description: "Support for Vue, React, Svelte, and SolidJS",
      icon: "🌐",
    },
  ];

  return (
    <section className={`${styles.featuresCarousel} ${styles[\`featuresCarousel--\${variant}\`]}`}>
      <div className={styles.featuresCarousel__container}>
        <div className={styles.featuresCarousel__header}>
          <h2 className={styles.featuresCarousel__title}>Framework Features</h2>
          <p className={styles.featuresCarousel__subtitle}>
            Everything you need for modern web development
          </p>
        </div>
        
        <div className={`${styles.featuresCarousel__content} ${styles[\`featuresCarousel__content--\${layout}\`]}`}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={styles.featuresCarousel__item}
              style={{ animationDelay: \`\${delay + index * 0.1}s\` }}
            >
              <div className={styles.featuresCarousel__icon}>
                {feature.icon}
              </div>
              <h3 className={styles.featuresCarousel__itemTitle}>
                {feature.title}
              </h3>
              <p className={styles.featuresCarousel__itemDescription}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {showControls && (
          <div className={styles.featuresCarousel__controls}>
            {showNavigation && (
              <div className={styles.featuresCarousel__navigation}>
                <button className={styles.featuresCarousel__navButton}>←</button>
                <button className={styles.featuresCarousel__navButton}>→</button>
              </div>
            )}
            {showPagination && (
              <div className={styles.featuresCarousel__pagination}>
                {features.map((_, index) => (
                  <button key={index} className={styles.featuresCarousel__paginationDot} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesCarousel;
