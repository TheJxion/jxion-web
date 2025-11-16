/**
 * Jxion Stack — IntegrationSolutions Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: IntegrationSolutions component (matching ustad UstadIntegrationSolutions pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/Section/UstadIntegrationSolutions/index.tsx
 */

"use client";
/** Core Imports */
import { useMemo } from "react";
import { getLink } from "@jxion/core/adapters";
/** Language Imports */
import type { Locale } from "@jxion/i18n";
import { useDictionary, getCorrectFromDictionary } from "@jxion/i18n";
/** Style Imports */
import styles from "../../styles/modules/IntegrationSolutions.module.scss";
/** Component Imports */
import Card from "../Card/Card";
import Button from "../Button/Button";
/** Props Interface */
export interface IntegrationSolutionsProps {
  solutions?: IntegrationSolution[];
  layout?: "grid" | "alternating";
  className?: string;
  params: {
    lang: Locale;
    theme: string;
  };
}
/** Integration Solution Interface */
interface IntegrationSolution {
  title: string;
  image: string;
  description: string;
  features?: string[];
  cta?: string;
  ctaLink?: string;
  comingSoon?: boolean;
}
/** Test IDs */
export const INTEGRATION_SOLUTIONS_TEST = {
  SECTION: "integration-solutions",
  TITLE: "integration-solutions-title",
  SUBTITLE: "integration-solutions-subtitle",
  GRID: "integration-solutions-grid",
  SOLUTION: "integration-solutions-solution",
  SOLUTION_IMAGE: "integration-solutions-solution-image",
  SOLUTION_TITLE: "integration-solutions-solution-title",
  SOLUTION_DESCRIPTION: "integration-solutions-solution-description",
  SOLUTION_CTA: "integration-solutions-solution-cta",
  SOLUTION_BUTTON: "integration-solutions-solution-button",
  SOLUTION_PANEL: "integration-solutions-solution-panel",
  SOLUTION_PANEL_CONTENT: "integration-solutions-solution-panel-content",
  SOLUTION_PANEL_IMAGE: "integration-solutions-solution-panel-image",
  SOLUTION_PANEL_TITLE: "integration-solutions-solution-panel-title",
  SOLUTION_PANEL_DESCRIPTION:
    "integration-solutions-solution-panel-description",
  SOLUTION_PANEL_FEATURES: "integration-solutions-solution-panel-features",
  SOLUTION_PANEL_CTA: "integration-solutions-solution-panel-cta",
  SOLUTION_PANEL_BUTTON: "integration-solutions-solution-panel-button",
  SOLUTION_PANEL_FEATURE: "integration-solutions-solution-panel-feature",
} as const;

const IntegrationSolutions = ({
  solutions,
  layout = "alternating",
  className,
  params,
}: IntegrationSolutionsProps) => {
  // Initialize framework adapter
  const Link = getLink();

  const { lang } = params;
  const { dictionary, isLoading, isError } = useDictionary(lang ?? "en-US");
  const homeDictionary = useMemo(() => {
    if (!dictionary) return undefined;
    const home = (dictionary as Record<string, unknown> | undefined)?.["home"];
    if (!home || typeof home !== "object" || Array.isArray(home)) {
      return undefined;
    }
    return home as Record<string, unknown>;
  }, [dictionary]);
  const integrationDictionary = useMemo(() => {
    if (!homeDictionary) return undefined;
    const integrationSolutions = homeDictionary["integrationSolutions"];
    if (
      !integrationSolutions ||
      typeof integrationSolutions !== "object" ||
      Array.isArray(integrationSolutions)
    ) {
      return undefined;
    }
    return integrationSolutions as Record<string, unknown>;
  }, [homeDictionary]);
  const translatedTitle = useMemo(() => {
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "integrationSolutions", "title"],
      ""
    );
  }, [dictionary]);
  const translatedSubtitle = useMemo(() => {
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "integrationSolutions", "subtitle"],
      ""
    );
  }, [dictionary]);
  const localizedSolutions = useMemo(() => {
    if (!integrationDictionary) return [];
    const entries = Array.isArray(integrationDictionary["items"])
      ? (integrationDictionary["items"] as Array<Record<string, unknown>>)
      : [];
    if (!entries || entries.length === 0) {
      return [];
    }
    const buildFeatures = (raw: unknown): string[] => {
      if (!Array.isArray(raw)) return [];
      const valid = raw.filter(
        (item): item is string => typeof item === "string"
      );
      return valid;
    };
    const safeFallback: IntegrationSolution = {
      title: "",
      image: "",
      description: "",
      features: [],
      cta: "",
      ctaLink: "/documentation",
      comingSoon: false,
    };
    return entries.map((entry) => {
      const rawRecord = entry as Record<string, unknown>;
      return {
        title:
          typeof rawRecord["title"] === "string"
            ? (rawRecord["title"] as string)
            : safeFallback.title,
        image:
          typeof rawRecord["image"] === "string"
            ? (rawRecord["image"] as string)
            : safeFallback.image,
        description:
          typeof rawRecord["description"] === "string"
            ? (rawRecord["description"] as string)
            : safeFallback.description,
        features: buildFeatures(rawRecord["features"]),
        cta: getCorrectFromDictionary(
          dictionary ?? undefined,
          ["home", "integrationSolutions", "common_cta"],
          ""
        ),
        ctaLink: getCorrectFromDictionary(
          dictionary ?? undefined,
          ["home", "integrationSolutions", "common_cta_link"],
          "/documentation"
        ),
        comingSoon:
          typeof rawRecord["comingSoon"] === "boolean"
            ? (rawRecord["comingSoon"] as boolean)
            : safeFallback.comingSoon,
      } as IntegrationSolution;
    });
  }, [integrationDictionary, dictionary]);
  const finalSolutions = solutions || localizedSolutions;
  if (isLoading || isError || !dictionary || !homeDictionary) {
    return <div>Loading...</div>;
  }
  return (
    <section
      className={`${styles["solutions"]} ${className || ""}`}
      data-testid={INTEGRATION_SOLUTIONS_TEST.SECTION}
    >
      <div className={styles["solutions__container"]}>
        <div className={styles["solutions__header"]}>
          <h2
            className={styles["solutions__title"]}
            data-testid={INTEGRATION_SOLUTIONS_TEST.TITLE}
          >
            {translatedTitle}
          </h2>
          <p
            className={styles["solutions__subtitle"]}
            data-testid={INTEGRATION_SOLUTIONS_TEST.SUBTITLE}
          >
            {translatedSubtitle}
          </p>
        </div>
        {layout === "grid" ? (
          <div
            className={styles["solutions__grid"]}
            data-testid={INTEGRATION_SOLUTIONS_TEST.GRID}
          >
            {finalSolutions.map((solution, index) => (
              <Card
                key={index}
                className={styles["solution"]}
                data-testid={INTEGRATION_SOLUTIONS_TEST.SOLUTION}
              >
                <div className={styles["solution__content"]}>
                  <div
                    className={styles["solution__image"]}
                    data-testid={INTEGRATION_SOLUTIONS_TEST.SOLUTION_IMAGE}
                  >
                    <img src={solution.image} alt={solution.title} />
                  </div>
                  <div className={styles["solution__info"]}>
                    <h3
                      className={styles["solution__title"]}
                      data-testid={INTEGRATION_SOLUTIONS_TEST.SOLUTION_TITLE}
                    >
                      {solution.title}
                    </h3>
                    <p
                      className={styles["solution__description"]}
                      data-testid={
                        INTEGRATION_SOLUTIONS_TEST.SOLUTION_DESCRIPTION
                      }
                    >
                      {solution.description}
                    </p>
                    <Link
                      href={solution.ctaLink ?? "/documentation"}
                      data-testid={INTEGRATION_SOLUTIONS_TEST.SOLUTION_CTA}
                      role="button"
                      tabIndex={0}
                    >
                      <Button
                        variant="cta"
                        className={styles["solution__button"]}
                        data-testid={INTEGRATION_SOLUTIONS_TEST.SOLUTION_BUTTON}
                      >
                        {solution.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className={styles["solutions__alternating"]}>
            {finalSolutions.map((solution, index) => (
              <div
                key={index}
                data-testid={INTEGRATION_SOLUTIONS_TEST.SOLUTION_PANEL}
                className={`${styles["solution__panel"]} ${
                  index % 2 === 0
                    ? styles["solution__panel--left"]
                    : styles["solution__panel--right"]
                }`}
              >
                <div
                  className={styles["solution__panel-content"]}
                  data-testid={
                    INTEGRATION_SOLUTIONS_TEST.SOLUTION_PANEL_CONTENT
                  }
                >
                  <div
                    className={styles["solution__panel-image"]}
                    data-testid={
                      INTEGRATION_SOLUTIONS_TEST.SOLUTION_PANEL_IMAGE
                    }
                  >
                    <img src={solution.image} alt={solution.title} />
                  </div>
                  <div className={styles["solution__panel-info"]}>
                    <h3
                      className={styles["solution__panel-title"]}
                      data-testid={
                        INTEGRATION_SOLUTIONS_TEST.SOLUTION_PANEL_TITLE
                      }
                    >
                      {solution.title}
                    </h3>
                    <p
                      className={styles["solution__panel-description"]}
                      data-testid={
                        INTEGRATION_SOLUTIONS_TEST.SOLUTION_PANEL_DESCRIPTION
                      }
                    >
                      {solution.description}
                    </p>
                    {solution.features && (
                      <ul
                        className={styles["solution__panel-features"]}
                        data-testid={
                          INTEGRATION_SOLUTIONS_TEST.SOLUTION_PANEL_FEATURES
                        }
                      >
                        {solution.features.map((feature, idx) => (
                          <li
                            key={idx}
                            data-testid={
                              INTEGRATION_SOLUTIONS_TEST.SOLUTION_PANEL_FEATURE
                            }
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={solution.ctaLink ?? "/documentation"}
                      data-testid={
                        INTEGRATION_SOLUTIONS_TEST.SOLUTION_PANEL_CTA
                      }
                      role="button"
                      tabIndex={0}
                    >
                      <Button
                        variant="cta"
                        className={styles["solution__panel-button"]}
                        data-testid={
                          INTEGRATION_SOLUTIONS_TEST.SOLUTION_PANEL_BUTTON
                        }
                      >
                        {solution.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default IntegrationSolutions;
