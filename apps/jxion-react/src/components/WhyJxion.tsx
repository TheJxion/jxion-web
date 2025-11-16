import React from "react";
import styles from "@jxion/design/components/UstadWhyYesildefter.module.scss";

interface WhyJxionProps {
  params: {
    lang: string;
    theme: string;
  };
}

export const WhyJxion: React.FC<WhyJxionProps> = ({ params }) => {
  const reasons = [
    {
      title: "Multi-Framework Support",
      description: "Build applications with Vue, React, Svelte, or SolidJS using the same components",
      icon: "🌐",
    },
    {
      title: "Type Safety",
      description: "Full TypeScript support ensures type safety across your entire application",
      icon: "🔒",
    },
    {
      title: "Design System",
      description: "Consistent design tokens and styling system for professional applications",
      icon: "🎨",
    },
    {
      title: "Developer Experience",
      description: "Excellent tooling, documentation, and developer-friendly APIs",
      icon: "🛠️",
    },
  ];

  return (
    <section className={styles.whyJxion}>
      <div className={styles.whyJxion__container}>
        <div className={styles.whyJxion__header}>
          <h2 className={styles.whyJxion__title}>Why Choose Jxion?</h2>
          <p className={styles.whyJxion__subtitle}>
            The modern framework for building scalable web applications
          </p>
        </div>
        
        <div className={styles.whyJxion__content}>
          {reasons.map((reason, index) => (
            <div key={index} className={styles.whyJxion__item}>
              <div className={styles.whyJxion__icon}>
                {reason.icon}
              </div>
              <h3 className={styles.whyJxion__itemTitle}>
                {reason.title}
              </h3>
              <p className={styles.whyJxion__itemDescription}>
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJxion;
