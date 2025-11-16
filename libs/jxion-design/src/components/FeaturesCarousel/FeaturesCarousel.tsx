/**
 * Jxion Stack — FeaturesCarousel Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: FeaturesCarousel component (matching ustad UstadFeaturesCarousel pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/Section/UstadFeaturesCarousel/index.tsx
 *
 * NOTE: Simplified version without GSAP animations for initial migration
 * Auto-play and basic carousel functionality included
 */

"use client";
/** Core Imports */
import {
  ReactNode,
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faRocket,
  faChartLine,
  faDatabase,
  faUsers,
  faCloud,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
/** Style Imports */
import styles from "../../styles/modules/FeaturesCarousel.module.scss";
/** Language Imports */
import type { Locale } from "@jxion/i18n";
import { useDictionary, getCorrectFromDictionary } from "@jxion/i18n";
/** Props Interface */
export interface CarouselFeature {
  icon?: ReactNode;
  title: string;
  description: string;
  ctaText?: string;
  footnote?: string;
  link?: string;
  external?: boolean;
  variant?: "default" | "highlighted" | "minimal";
}

/** Props Interface */
export interface FeaturesCarouselProps {
  className?: string;
  title?: string;
  subtitle?: string;
  features?: CarouselFeature[];
  variant?: "default" | "featured" | "minimal" | "interactive";
  layout?: "grid" | "carousel" | "list";
  animation?: "fadeIn" | "slideUp" | "stagger" | "none";
  delay?: number;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  showControls?: boolean;
  loop?: boolean;
  responsive?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  children?: ReactNode;
  lang?: Locale;
}

/** Test ID */
export const FEATURES_CAROUSEL_TEST = {
  CONTAINER: "features-carousel",
  HEADER: "features-carousel-header",
  TITLE: "features-carousel-title",
  SUBTITLE: "features-carousel-subtitle",
  CAROUSEL: "features-carousel-carousel",
  FEATURE: "features-carousel-feature",
  NAVIGATION: "features-carousel-navigation",
  PAGINATION: "features-carousel-pagination",
  CONTROLS: "features-carousel-controls",
} as const;

const FeaturesCarousel = ({
  className,
  title,
  subtitle,
  features,
  variant = "default",
  layout = "carousel",
  animation = "stagger",
  delay = 3,
  autoPlay = true,
  autoPlaySpeed = 3200,
  showPagination = true,
  loop = true,
  responsive = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  children,
  lang,
}: FeaturesCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const { dictionary, isLoading, isError } = useDictionary(lang ?? "en-US");
  const homeDictionary = useMemo(() => {
    if (!dictionary) return undefined;
    const home = (dictionary as Record<string, unknown> | undefined)?.["home"];
    if (!home || typeof home !== "object" || Array.isArray(home)) {
      return undefined;
    }
    return home as Record<string, unknown>;
  }, [dictionary]);
  const featuresCarouselDictionary = useMemo(() => {
    if (!homeDictionary) return undefined;
    const featuresCarousel = homeDictionary["featuresCarousel"];
    if (
      !featuresCarousel ||
      typeof featuresCarousel !== "object" ||
      Array.isArray(featuresCarousel)
    ) {
      return undefined;
    }
    return featuresCarousel as Record<string, unknown>;
  }, [homeDictionary]);

  const translatedTitle = useMemo(() => {
    if (title) return title;
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "featuresCarousel", "title"],
      ""
    );
  }, [title, dictionary]);
  const translatedSubtitle = useMemo(() => {
    if (subtitle) return subtitle;
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "featuresCarousel", "subtitle"],
      ""
    );
  }, [subtitle, dictionary]);
  const iconMap = useMemo<Record<string, ReactNode>>(
    () => ({
      faShieldAlt: <FontAwesomeIcon icon={faShieldAlt} />,
      faRocket: <FontAwesomeIcon icon={faRocket} />,
      faChartLine: <FontAwesomeIcon icon={faChartLine} />,
      faDatabase: <FontAwesomeIcon icon={faDatabase} />,
      faUsers: <FontAwesomeIcon icon={faUsers} />,
      faCloud: <FontAwesomeIcon icon={faCloud} />,
    }),
    []
  );
  const resolvedFeatures = useMemo<CarouselFeature[]>(() => {
    if (features && features.length > 0) {
      return features;
    }
    if (!featuresCarouselDictionary) return [];
    const dictFeatures = featuresCarouselDictionary["list"];
    if (!Array.isArray(dictFeatures) || dictFeatures.length === 0) {
      return [];
    }
    const safeFallback: CarouselFeature = {
      title: "",
      description: "",
      ctaText: "",
      footnote: "",
      link: "",
      external: false,
      variant: "default",
    };
    return dictFeatures.map((rawFeature) => {
      const rawFeatureRecord = rawFeature as Record<string, unknown>;
      const iconName = rawFeatureRecord["icon"];
      return {
        icon:
          typeof iconName === "string" && iconMap[iconName]
            ? iconMap[iconName]
            : undefined,
        title:
          typeof rawFeatureRecord["title"] === "string"
            ? (rawFeatureRecord["title"] as string)
            : safeFallback.title,
        description:
          typeof rawFeatureRecord["description"] === "string"
            ? (rawFeatureRecord["description"] as string)
            : safeFallback.description,
        ctaText:
          typeof rawFeatureRecord["ctaText"] === "string"
            ? (rawFeatureRecord["ctaText"] as string)
            : safeFallback.ctaText,
        footnote:
          typeof rawFeatureRecord["footnote"] === "string"
            ? (rawFeatureRecord["footnote"] as string)
            : safeFallback.footnote,
        link:
          typeof rawFeatureRecord["link"] === "string"
            ? (rawFeatureRecord["link"] as string)
            : safeFallback.link,
        external:
          typeof rawFeatureRecord["external"] === "boolean"
            ? (rawFeatureRecord["external"] as boolean)
            : safeFallback.external,
        variant:
          typeof rawFeatureRecord["variant"] === "string"
            ? (rawFeatureRecord[
                "variant"
              ] as string as CarouselFeature["variant"])
            : safeFallback.variant,
      };
    });
  }, [features, featuresCarouselDictionary, iconMap]);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev < resolvedFeatures.length - 1) {
        return prev + 1;
      } else if (loop) {
        return 0;
      }
      return prev;
    });
  }, [resolvedFeatures.length, loop]);
  const enhancedNextSlide = useCallback(() => {
    setTimeout(() => {
      nextSlide();
      setProgress(0);
    }, 150);
  }, [nextSlide]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (!autoPlay || isHovered) {
      return;
    }
    const interval = setInterval(() => {
      enhancedNextSlide();
    }, autoPlaySpeed);
    return () => {
      clearInterval(interval);
    };
  }, [autoPlay, isHovered, autoPlaySpeed, enhancedNextSlide]);
  useEffect(() => {
    if (!autoPlay || isHovered) {
      setProgress(0);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }
    const startTime = Date.now();
    const duration = autoPlaySpeed;
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      if (newProgress >= 100) {
        setProgress(0);
      }
    }, 50);
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [autoPlay, isHovered, autoPlaySpeed, currentSlide]);
  useEffect(() => {
    if (resolvedFeatures.length === 0) {
      setCurrentSlide(0);
      setProgress(0);
      return;
    }
    if (currentSlide >= resolvedFeatures.length) {
      setCurrentSlide(0);
    }
  }, [resolvedFeatures.length, currentSlide]);
  const getCarouselClasses = () => {
    const baseClasses = [
      styles["section"],
      styles[`section--${variant}`],
      styles[`section--layout-${layout}`],
    ];
    if (className) baseClasses.push(className);
    return baseClasses.filter(Boolean).join(" ");
  };
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };
  const handleFeatureClick = (feature: CarouselFeature) => {
    if (feature.link) {
      if (feature.external) {
        window.open(feature.link, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = feature.link;
      }
    }
  };
  const getVisibleFeatures = () => {
    if (layout === "grid") {
      return resolvedFeatures;
    }
    const visibleCount =
      windowWidth !== null && windowWidth < 768
        ? responsive.mobile || 1
        : windowWidth !== null && windowWidth < 1024
        ? responsive.tablet || 2
        : responsive.desktop || 3;
    const startIndex = currentSlide;
    const endIndex = Math.min(
      startIndex + visibleCount,
      resolvedFeatures.length
    );
    const visibleFeatures = resolvedFeatures.slice(startIndex, endIndex);
    return visibleFeatures;
  };
  const getCurrentSlideDisplay = () => {
    return currentSlide + 1;
  };
  const getTotalSlides = () => {
    return resolvedFeatures.length;
  };
  if (isLoading || isError || !dictionary || !homeDictionary) {
    return <div>Loading...</div>;
  }
  return (
    <section
      ref={carouselRef}
      className={getCarouselClasses()}
      data-testid={FEATURES_CAROUSEL_TEST.CONTAINER}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles["section__container"]}>
        <div
          className={styles["section__header"]}
          data-testid={FEATURES_CAROUSEL_TEST.HEADER}
        >
          {translatedTitle && (
            <h2
              className={styles["section__title"]}
              data-testid={FEATURES_CAROUSEL_TEST.TITLE}
            >
              {translatedTitle}
            </h2>
          )}

          {translatedSubtitle && (
            <p
              className={styles["section__subtitle"]}
              data-testid={FEATURES_CAROUSEL_TEST.SUBTITLE}
            >
              {translatedSubtitle}
            </p>
          )}
        </div>
        <div
          ref={carouselContainerRef}
          className={styles["section__carousel"]}
          data-testid={FEATURES_CAROUSEL_TEST.CAROUSEL}
        >
          <div className={styles["section__features"]}>
            {getVisibleFeatures().map((feature, index) => (
              <div
                key={`${currentSlide}-${index}`}
                ref={(el) => {
                  if (el) featuresRef.current[index] = el;
                }}
                className={`${styles["section__feature"]} ${
                  styles[`section__feature--${feature.variant || "default"}`]
                }`}
                data-testid={FEATURES_CAROUSEL_TEST.FEATURE}
                onClick={() => handleFeatureClick(feature)}
                role={feature.link ? "button" : undefined}
                tabIndex={feature.link ? 0 : undefined}
              >
                {feature.icon && (
                  <div className={styles["section__featureIcon"]}>
                    {feature.icon}
                  </div>
                )}

                <h3 className={styles["section__featureTitle"]}>
                  {feature.title}
                </h3>

                <p className={styles["section__featureDescription"]}>
                  {feature.description}
                </p>

                {feature.ctaText && (
                  <div className={styles["section__featureCta"]}>
                    <span className={styles["section__featureCtaText"]}>
                      {feature.ctaText}
                    </span>
                    {feature.external && (
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className={styles["section__featureCtaIcon"]}
                      />
                    )}
                  </div>
                )}

                {feature.footnote && (
                  <p className={styles["section__featureFootnote"]}>
                    {feature.footnote}
                  </p>
                )}
              </div>
            ))}
          </div>
          {autoPlay && (
            <div className={styles["section__progressBar"]}>
              <div
                className={styles["section__progressFill"]}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {showPagination && layout === "carousel" && (
            <div
              className={styles["section__pagination"]}
              data-testid={FEATURES_CAROUSEL_TEST.PAGINATION}
            >
              {resolvedFeatures.map((_, index) => (
                <button
                  key={index}
                  className={`${styles["section__paginationDot"]} ${
                    index === currentSlide
                      ? styles["section__paginationDot--active"]
                      : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          {layout === "carousel" && (
            <div className={styles["section__slideCounter"]}>
              <span className={styles["section__slideCounterText"]}>
                {getCurrentSlideDisplay()} / {getTotalSlides()}
              </span>
            </div>
          )}
        </div>
        {children && (
          <div className={styles["section__children"]}>{children}</div>
        )}
      </div>
    </section>
  );
};

export default FeaturesCarousel;
