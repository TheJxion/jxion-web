/**
 * Jxion Stack — NextSteps Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: NextSteps component (matching ustad UstadNextSteps pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/Section/UstadNextSteps/index.tsx
 *
 * NOTE: Simplified version without GSAP animations for initial migration
 */

"use client";
/** Core Imports */
import { ReactNode, useRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBook,
  faCode,
  faRocket,
  faLightbulb,
  faShieldAlt,
  faUsers,
  faCloud,
  faChartLine,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
/** Style Imports */
import styles from "../../styles/modules/NextSteps.module.scss";
/** Type Imports */
import type { Locale } from "@jxion/i18n";
import { useDictionary, getCorrectFromDictionary } from "@jxion/i18n";
/** Props Interface */
export interface NextStepItem {
  id: string;
  title: string;
  description: string;
  link: string;
  external?: boolean;
  color?: "green" | "red" | "blue" | "purple" | "orange" | "yellow";
  icon?: ReactNode;
  category?: "guide" | "component" | "tutorial" | "reference" | "example";
  difficulty?: "beginner" | "intermediate" | "advanced";
  estimatedTime?: string;
  tags?: string[];
  featured?: boolean;
  ctaText?: string;
}

export interface NextStepsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  steps?: NextStepItem[];
  variant?: "default" | "featured" | "minimal" | "interactive";
  layout?: "grid" | "list" | "carousel";
  columns?: 2 | 3 | 4 | 6;
  animation?: "fadeIn" | "slideUp" | "stagger" | "none";
  delay?: number;
  showIcons?: boolean;
  showDescriptions?: boolean;
  showCategories?: boolean;
  showDifficulty?: boolean;
  showTime?: boolean;
  showTags?: boolean;
  children?: ReactNode;
  lang?: Locale;
}

/** Test IDs */
export const NEXT_STEPS_TEST = {
  CONTAINER: "next-steps",
  TITLE: "next-steps-title",
  SUBTITLE: "next-steps-subtitle",
  GRID: "next-steps-grid",
  STEP: "next-steps-step",
  STEP_TITLE: "next-steps-step-title",
  STEP_DESCRIPTION: "next-steps-step-description",
  STEP_ICON: "next-steps-step-icon",
  STEP_CATEGORY: "next-steps-step-category",
  STEP_DIFFICULTY: "next-steps-step-difficulty",
  STEP_TIME: "next-steps-step-time",
  STEP_TAGS: "next-steps-step-tags",
  STEP_ACTION: "next-steps-step-action",
  STEP_ACTION_ICON: "next-steps-step-action-icon",
  STEP_ACTION_TEXT: "next-steps-step-action-text",
} as const;

const defaultSteps: NextStepItem[] = [];

const NextSteps = ({
  className,
  title,
  subtitle,
  steps,
  variant = "default",
  layout = "grid",
  columns = 2,
  animation = "stagger",
  delay = 0,
  showIcons = true,
  showDescriptions = true,
  showCategories = true,
  showDifficulty = true,
  showTime = true,
  showTags = true,
  children,
  lang,
}: NextStepsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { dictionary, isLoading, isError } = useDictionary(lang ?? "en-US");
  const homeDictionary = useMemo(() => {
    if (!dictionary) return undefined;
    const home = (dictionary as Record<string, unknown> | undefined)?.["home"];
    if (!home || typeof home !== "object" || Array.isArray(home)) {
      return undefined;
    }
    return home as Record<string, unknown>;
  }, [dictionary]);
  const nextStepsDictionary = useMemo(() => {
    if (!homeDictionary) return undefined;
    const nextSteps = homeDictionary["nextSteps"];
    if (
      !nextSteps ||
      typeof nextSteps !== "object" ||
      Array.isArray(nextSteps)
    ) {
      return undefined;
    }
    return nextSteps as Record<string, unknown>;
  }, [homeDictionary]);
  const iconMap = useMemo<Record<string, ReactNode>>(
    () => ({
      faRocket: <FontAwesomeIcon icon={faRocket} />,
      faCode: <FontAwesomeIcon icon={faCode} />,
      faBook: <FontAwesomeIcon icon={faBook} />,
      faLightbulb: <FontAwesomeIcon icon={faLightbulb} />,
      faShieldAlt: <FontAwesomeIcon icon={faShieldAlt} />,
      faUsers: <FontAwesomeIcon icon={faUsers} />,
      faCloud: <FontAwesomeIcon icon={faCloud} />,
      faChartLine: <FontAwesomeIcon icon={faChartLine} />,
      faDatabase: <FontAwesomeIcon icon={faDatabase} />,
    }),
    []
  );
  const getIconByName = (iconName: unknown): ReactNode | undefined => {
    if (typeof iconName !== "string") return undefined;
    return iconMap[iconName];
  };
  const translatedTitle = useMemo(() => {
    if (title) return title;
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "nextSteps", "title"],
      ""
    );
  }, [title, dictionary]);
  const translatedSubtitle = useMemo(() => {
    if (subtitle) return subtitle;
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "nextSteps", "subtitle"],
      ""
    );
  }, [subtitle, dictionary]);
  const dictionarySteps = useMemo(() => {
    if (!nextStepsDictionary) return undefined;
    const list = nextStepsDictionary["list"];
    if (Array.isArray(list) && list.length > 0) {
      return list as Array<Record<string, unknown>>;
    }
    return undefined;
  }, [nextStepsDictionary]);
  const baseSteps = steps ?? defaultSteps;
  const finalSteps = useMemo<NextStepItem[]>(() => {
    if (!dictionarySteps) {
      return baseSteps;
    }
    return dictionarySteps.map((item, index) => {
      const safeFallback: NextStepItem = {
        id: "",
        title: "",
        description: "",
        link: "",
        external: false,
        color: "green",
        category: "guide",
        difficulty: "beginner",
        estimatedTime: "",
        tags: [],
        featured: false,
        ctaText: "",
      };
      const fallback =
        baseSteps[index] ??
        defaultSteps[index % defaultSteps.length] ??
        safeFallback;
      const tags =
        Array.isArray(item["tags"]) && item["tags"]!.length > 0
          ? (item["tags"] as unknown[]).filter(
              (tag): tag is string => typeof tag === "string"
            )
          : fallback.tags ?? [];
      return {
        id:
          typeof item["id"] === "string"
            ? (item["id"] as string)
            : fallback.id ?? "",
        title:
          typeof item["title"] === "string"
            ? (item["title"] as string)
            : fallback.title ?? "",
        description:
          typeof item["description"] === "string"
            ? (item["description"] as string)
            : fallback.description ?? "",
        link:
          typeof item["link"] === "string"
            ? (item["link"] as string)
            : fallback.link ?? "",
        external:
          typeof item["external"] === "boolean"
            ? (item["external"] as boolean)
            : fallback.external ?? false,
        color:
          typeof item["color"] === "string"
            ? (item["color"] as string as NextStepItem["color"])
            : fallback.color ?? "green",
        icon: getIconByName(item["icon"]) ?? fallback.icon,
        category:
          typeof item["category"] === "string"
            ? (item["category"] as string as NextStepItem["category"])
            : fallback.category ?? "guide",
        difficulty:
          typeof item["difficulty"] === "string"
            ? (item["difficulty"] as string as NextStepItem["difficulty"])
            : fallback.difficulty ?? "beginner",
        estimatedTime:
          typeof item["estimatedTime"] === "string"
            ? (item["estimatedTime"] as string)
            : fallback.estimatedTime ?? "",
        tags,
        featured:
          typeof item["featured"] === "boolean"
            ? (item["featured"] as boolean)
            : fallback.featured ?? false,
        ctaText:
          typeof item["ctaText"] === "string"
            ? (item["ctaText"] as string)
            : fallback.ctaText ?? "",
      };
    });
  }, [dictionarySteps, baseSteps, iconMap]);
  if (isLoading || isError || !dictionary || !homeDictionary) {
    return <div>Loading...</div>;
  }
  const getSectionClasses = () => {
    const baseClasses = [
      styles["nextSteps"],
      styles[`nextSteps--${variant}`],
      styles[`nextSteps--layout-${layout}`],
      styles[`nextSteps--columns-${columns}`],
    ];
    if (className) baseClasses.push(className);
    return baseClasses.filter(Boolean).join(" ");
  };
  const getGridClasses = () => {
    const baseClasses = [
      styles["nextSteps__grid"],
      styles[`nextSteps__grid--${columns}-columns`],
    ];
    if (layout === "list") baseClasses.push(styles["nextSteps__grid--list"]);
    if (layout === "carousel")
      baseClasses.push(styles["nextSteps__grid--carousel"]);
    return baseClasses.filter(Boolean).join(" ");
  };
  const getStepClasses = (step: NextStepItem) => {
    const baseClasses = [
      styles["nextSteps__card"],
      styles[`nextSteps__card--${step.color || "green"}`],
    ];
    if (step.featured) baseClasses.push(styles["nextSteps__card--featured"]);
    if (step.category)
      baseClasses.push(styles[`nextSteps__card--${step.category}`]);
    return baseClasses.filter(Boolean).join(" ");
  };
  const getDifficultyColor = () => {
    return {
      beginner: "var(--color-success)",
      intermediate: "var(--color-warning)",
      advanced: "var(--color-error)",
    };
  };
  const handleStepClick = (step: NextStepItem) => {
    if (step.external) {
      window.open(step.link, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = step.link;
    }
  };
  return (
    <section
      ref={sectionRef}
      className={getSectionClasses()}
      data-testid={NEXT_STEPS_TEST.CONTAINER}
    >
      <div className={styles["nextSteps__header"]}>
        {translatedTitle && (
          <h2
            className={styles["nextSteps__title"]}
            data-testid={NEXT_STEPS_TEST.TITLE}
          >
            {translatedTitle}
          </h2>
        )}
        {translatedSubtitle && (
          <p
            className={styles["nextSteps__subtitle"]}
            data-testid={NEXT_STEPS_TEST.SUBTITLE}
          >
            {translatedSubtitle}
          </p>
        )}
      </div>
      <div className={getGridClasses()} data-testid={NEXT_STEPS_TEST.GRID}>
        {finalSteps.map((step, index) => (
          <div
            key={step.id || `step-${index}`}
            ref={(el) => {
              if (el) stepsRef.current[index] = el;
            }}
            className={getStepClasses(step)}
            data-testid={NEXT_STEPS_TEST.STEP}
            onClick={() => handleStepClick(step)}
            role="button"
            tabIndex={0}
          >
            <div className={styles["nextSteps__stepHeader"]}>
              {showIcons && step.icon && (
                <div
                  className={styles["nextSteps__stepIcon"]}
                  data-testid={NEXT_STEPS_TEST.STEP_ICON}
                >
                  <div className={styles["nextSteps__stepIconInner"]}>
                    {step.icon}
                  </div>
                </div>
              )}
              <div className={styles["nextSteps__stepInfo"]}>
                <h3
                  className={styles["nextSteps__cardTitle"]}
                  data-testid={NEXT_STEPS_TEST.STEP_TITLE}
                >
                  {step.title}
                </h3>
              </div>
            </div>
            <div className={styles["nextSteps__stepMetadata"]}>
              {showCategories && step.category && (
                <div
                  className={styles["nextSteps__stepCategory"]}
                  data-testid={NEXT_STEPS_TEST.STEP_CATEGORY}
                >
                  <span className={styles["nextSteps__stepCategoryLabel"]}>
                    {step.category.charAt(0).toUpperCase() +
                      step.category.slice(1)}
                  </span>
                </div>
              )}
              {showDifficulty && step.difficulty && (
                <div
                  className={styles["nextSteps__stepDifficulty"]}
                  data-testid={NEXT_STEPS_TEST.STEP_DIFFICULTY}
                >
                  <span
                    className={styles["nextSteps__stepDifficultyLabel"]}
                    style={
                      {
                        "--difficulty-color":
                          getDifficultyColor()[step.difficulty],
                      } as React.CSSProperties
                    }
                  >
                    {step.difficulty.charAt(0).toUpperCase() +
                      step.difficulty.slice(1)}
                  </span>
                </div>
              )}
              {showTime && step.estimatedTime && (
                <div
                  className={styles["nextSteps__stepTime"]}
                  data-testid={NEXT_STEPS_TEST.STEP_TIME}
                >
                  <span className={styles["nextSteps__stepTimeLabel"]}>
                    {step.estimatedTime}
                  </span>
                </div>
              )}
            </div>
            {showTags && step.tags && step.tags.length > 0 && (
              <div
                className={styles["nextSteps__stepTags"]}
                data-testid={NEXT_STEPS_TEST.STEP_TAGS}
              >
                {step.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className={styles["nextSteps__stepTag"]}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {showDescriptions && step.description && (
              <p
                className={styles["nextSteps__description"]}
                data-testid={NEXT_STEPS_TEST.STEP_DESCRIPTION}
              >
                {step.description}
              </p>
            )}
            <div
              className={styles["nextSteps__stepAction"]}
              data-testid={NEXT_STEPS_TEST.STEP_ACTION}
            >
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles["nextSteps__stepActionIcon"]}
                data-testid={NEXT_STEPS_TEST.STEP_ACTION_ICON}
              />
              <span
                className={styles["nextSteps__stepActionText"]}
                data-testid={NEXT_STEPS_TEST.STEP_ACTION_TEXT}
              >
                {step.ctaText}
              </span>
            </div>
          </div>
        ))}
      </div>
      {children && (
        <div className={styles["nextSteps__children"]}>{children}</div>
      )}
    </section>
  );
};

export default NextSteps;
