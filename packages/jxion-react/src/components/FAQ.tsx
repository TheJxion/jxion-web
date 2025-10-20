import React from "react";
import styles from "@jxion/design/src/components/UstadFAQ.module.scss";

interface FAQProps {
  params: {
    lang: string;
    theme: string;
  };
}

export const FAQ: React.FC<FAQProps> = ({ params }) => {
  const faqs = [
    {
      question: "What frameworks does Jxion support?",
      answer: "Jxion supports Vue 3, React, Svelte, and SolidJS. You can use the same components across all these frameworks.",
    },
    {
      question: "Is Jxion TypeScript compatible?",
      answer: "Yes! Jxion is built with TypeScript and provides full type safety across all frameworks and components.",
    },
    {
      question: "How do I get started with Jxion?",
      answer: "Use our CLI tool to create a new project: \`jxion create my-app\` and choose your preferred framework.",
    },
    {
      question: "Can I customize the design system?",
      answer: "Absolutely! Jxion provides a comprehensive design token system that you can customize to match your brand.",
    },
    {
      question: "What backend options are available?",
      answer: "Jxion supports tRPC, Go, and Python Flask backends. Choose what works best for your project.",
    },
    {
      question: "Is Jxion free to use?",
      answer: "Yes, Jxion is open source and free to use in both personal and commercial projects.",
    },
  ];

  return (
    <section className={styles.faq}>
      <div className={styles.faq__container}>
        <div className={styles.faq__header}>
          <h2 className={styles.faq__title}>Frequently Asked Questions</h2>
          <p className={styles.faq__subtitle}>
            Everything you need to know about Jxion Framework
          </p>
        </div>
        
        <div className={styles.faq__content}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faq__item}>
              <h3 className={styles.faq__question}>
                {faq.question}
              </h3>
              <p className={styles.faq__answer}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
