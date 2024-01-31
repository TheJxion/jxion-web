import React from "react";
import styles from "@jxion/design/src/components/UstadNextSteps.module.scss";

interface NextStepsProps {
  title?: string;
  subtitle?: string;
  variant?: "featured" | "compact";
  layout?: "grid" | "list";
  columns?: number;
  animation?: "stagger" | "fade";
  delay?: number;
  showIcons?: boolean;
  showDescriptions?: boolean;
  showCategories?: boolean;
  showDifficulty?: boolean;
  showTime?: boolean;
  showTags?: boolean;
  lang?: string;
}

export const NextSteps: React.FC<NextStepsProps> = ({
  title = "Get Started",
  subtitle = "Ready to build amazing applications?",
  variant = "featured",
  layout = "grid",
  columns = 3,
  animation = "stagger",
  delay = 0,
  showIcons = true,
  showDescriptions = true,
  showCategories = false,
  showDifficulty = false,
  showTime = false,
  showTags = false,
  lang = "en-US",
}) => {
  const steps = [
    {
      title: "Install Jxion",
      description: "Get started with our CLI or install packages directly",
      icon: "📦",
      category: "Setup",
      difficulty: "Easy",
      time: "5 min",
      tags: ["CLI", "npm"],
    },
    {
      title: "Choose Framework",
      description: "Select Vue, React, Svelte, or SolidJS for your project",
      icon: "🎯",
      category: "Framework",
      difficulty: "Easy",
      time: "2 min",
      tags: ["Vue", "React", "Svelte", "SolidJS"],
    },
    {
      title: "Start Building",
      description: "Use our components to build your application",
      icon: "🚀",
      category: "Development",
      difficulty: "Medium",
      time: "30 min",
      tags: ["Components", "Styling"],
    },
  ];

  return (
    <section className={`${styles.nextSteps} ${styles[\`nextSteps--\${variant}\`]}`}>
      <div className={styles.nextSteps__container}>
        <div className={styles.nextSteps__header}>
          <h2 className={styles.nextSteps__title}>{title}</h2>
          <p className={styles.nextSteps__subtitle}>{subtitle}</p>
        </div>
        
        <div className={`${styles.nextSteps__content} ${styles[\`nextSteps__content--\${layout}\`]} ${styles[\`nextSteps__content--\${columns}\`]}`}>
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={styles.nextSteps__item}
              style={{ animationDelay: \`\${delay + index * 0.1}s\` }}
            >
              {showIcons && (
                <div className={styles.nextSteps__icon}>
                  {step.icon}
                </div>
              )}
              <h3 className={styles.nextSteps__itemTitle}>
                {step.title}
              </h3>
              {showDescriptions && (
                <p className={styles.nextSteps__itemDescription}>
                  {step.description}
                </p>
              )}
              <div className={styles.nextSteps__meta}>
                {showCategories && (
                  <span className={styles.nextSteps__category}>
                    {step.category}
                  </span>
                )}
                {showDifficulty && (
                  <span className={styles.nextSteps__difficulty}>
                    {step.difficulty}
                  </span>
                )}
                {showTime && (
                  <span className={styles.nextSteps__time}>
                    {step.time}
                  </span>
                )}
              </div>
              {showTags && (
                <div className={styles.nextSteps__tags}>
                  {step.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.nextSteps__tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NextSteps;
