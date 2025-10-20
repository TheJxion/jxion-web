import React from "react";
import styles from "@jxion/design/src/components/UstadIntegrationSolutions.module.scss";

interface IntegrationSolutionsProps {
  params: {
    lang: string;
    theme: string;
  };
  layout?: "alternating" | "grid" | "list";
}

export const IntegrationSolutions: React.FC<IntegrationSolutionsProps> = ({
  params,
  layout = "alternating",
}) => {
  const solutions = [
    {
      title: "Vue 3 Integration",
      description: "Seamless Vue 3 support with Composition API",
      icon: "🟢",
      features: ["Composition API", "TypeScript", "Vite"],
    },
    {
      title: "React Integration", 
      description: "Full React support with hooks and modern patterns",
      icon: "⚛️",
      features: ["React Hooks", "TypeScript", "Next.js"],
    },
    {
      title: "Svelte Integration",
      description: "Lightweight Svelte components with SvelteKit",
      icon: "🧡",
      features: ["SvelteKit", "TypeScript", "Vite"],
    },
    {
      title: "SolidJS Integration",
      description: "Reactive SolidJS components with fine-grained reactivity",
      icon: "🔷",
      features: ["SolidJS", "TypeScript", "Vite"],
    },
  ];

  return (
    <section className={`${styles.integrationSolutions} ${styles[\`integrationSolutions--\${layout}\`]}`}>
      <div className={styles.integrationSolutions__container}>
        <div className={styles.integrationSolutions__header}>
          <h2 className={styles.integrationSolutions__title}>
            Multi-Framework Integration
          </h2>
          <p className={styles.integrationSolutions__subtitle}>
            One component library, multiple frameworks
          </p>
        </div>
        
        <div className={styles.integrationSolutions__content}>
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className={`${styles.integrationSolutions__item} ${index % 2 === 0 ? styles.integrationSolutions__item--left : styles.integrationSolutions__item--right}`}
            >
              <div className={styles.integrationSolutions__itemContent}>
                <div className={styles.integrationSolutions__icon}>
                  {solution.icon}
                </div>
                <h3 className={styles.integrationSolutions__itemTitle}>
                  {solution.title}
                </h3>
                <p className={styles.integrationSolutions__itemDescription}>
                  {solution.description}
                </p>
                <ul className={styles.integrationSolutions__features}>
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={styles.integrationSolutions__feature}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationSolutions;
