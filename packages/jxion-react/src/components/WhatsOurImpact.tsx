import React from "react";
import styles from "@jxion/design/src/components/UstadWhatsOurImpact.module.scss";

interface WhatsOurImpactProps {
  params: {
    lang: string;
    theme: string;
  };
  stats?: Array<{
    value: string;
    label: string;
    color: string;
  }>;
}

export const WhatsOurImpact: React.FC<WhatsOurImpactProps> = ({ 
  params, 
  stats = [
    { value: "100%", label: "Type Safe", color: "green" },
    { value: "4", label: "Frameworks", color: "blue" },
    { value: "50+", label: "Components", color: "orange" },
    { value: "24/7", label: "Support", color: "red" },
  ]
}) => {
  return (
    <section className={styles.whatsOurImpact}>
      <div className={styles.whatsOurImpact__container}>
        <div className={styles.whatsOurImpact__header}>
          <h2 className={styles.whatsOurImpact__title}>Our Impact</h2>
          <p className={styles.whatsOurImpact__subtitle}>
            Empowering developers worldwide
          </p>
        </div>
        
        <div className={styles.whatsOurImpact__stats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.whatsOurImpact__stat}>
              <div className={`${styles.whatsOurImpact__statValue} ${styles[\`whatsOurImpact__statValue--\${stat.color}\`]}`}>
                {stat.value}
              </div>
              <div className={styles.whatsOurImpact__statLabel}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsOurImpact;
