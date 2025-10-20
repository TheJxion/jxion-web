import React from "react";
import styles from "@jxion/design/src/components/UstadKeyFeatures.module.scss";

interface KeyFeaturesProps {
  variant?: "featured" | "mobile";
  animation?: "stagger" | "fade" | "slide";
  delay?: number;
  columns?: number;
  showIcons?: boolean;
  showDescriptions?: boolean;
  showCTAs?: boolean;
  showFootnotes?: boolean;
  mobileImage?: string;
  mobileImageAlt?: string;
  mobileImagePosition?: "left" | "right";
  lang?: string;
}

export const KeyFeatures: React.FC<KeyFeaturesProps> = ({
  variant = "featured",
  animation = "stagger",
  delay = 0,
  columns = 3,
  showIcons = true,
  showDescriptions = true,
  showCTAs = false,
  showFootnotes = false,
  mobileImage,
  mobileImageAlt,
  mobileImagePosition = "right",
  lang = "en-US",
}) => {
  const features = [
    {
      icon: "🚀",
      title: "Modern Development",
      description: "Build with the latest technologies and best practices",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized for performance and speed",
    },
    {
      icon: "🔒",
      title: "Type Safe",
      description: "Full TypeScript support across all frameworks",
    },
  ];

  return (
    <section className={`${styles.keyFeatures} ${styles[\`keyFeatures--\${variant}\`]}`}>
      <div className={styles.keyFeatures__container}>
        <div className={styles.keyFeatures__header}>
          <h2 className={styles.keyFeatures__title}>Key Features</h2>
          <p className={styles.keyFeatures__subtitle}>
            Everything you need to build modern applications
          </p>
        </div>
        
        <div className={`${styles.keyFeatures__grid} ${styles[\`keyFeatures__grid--\${columns}\`]}`}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={styles.keyFeatures__item}
              style={{ animationDelay: \`\${delay + index * 0.1}s\` }}
            >
              {showIcons && (
                <div className={styles.keyFeatures__icon}>
                  {feature.icon}
                </div>
              )}
              <h3 className={styles.keyFeatures__itemTitle}>{feature.title}</h3>
              {showDescriptions && (
                <p className={styles.keyFeatures__itemDescription}>
                  {feature.description}
                </p>
              )}
              {showCTAs && (
                <button className={styles.keyFeatures__cta}>
                  Learn More
                </button>
              )}
            </div>
          ))}
        </div>
        
        {showFootnotes && (
          <div className={styles.keyFeatures__footnotes}>
            <p>Built with ❤️ by the Jxion team</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default KeyFeatures;
