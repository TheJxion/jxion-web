import React from "react";
import {
  Layout,
  MakeUp,
  KeyFeatures,
  WhatsOurImpact,
  IntegrationSolutions,
  FeaturesCarousel,
  WhyYesildefter,
  NextSteps,
  FAQ,
} from "@jxion/design";
import trTranslations from "../../../libs/jxion-i18n/src/dictionary/tr-TR.json";
import { useAIContentFetcher } from "./hooks/useAIContentFetcher";
import "./App.css";

type HeroStat = { value: string; label: string };

type HeroBlock = {
  title: string;
  subtitle?: string;
  description?: string;
  tagline?: string;
  primaryCta?: string;
  secondaryCta?: string;
  stats?: HeroStat[];
};

const LANG = "tr-TR";
const THEME = "dark";
const CONTENT_PATH = "noir-crafted/content.json";

const dictionary = trTranslations as Record<string, any>;

const fallbackStats: HeroStat[] =
  dictionary.home?.whatsourimpact?.stats?.map((stat: any) => ({
    value: stat.value ?? "—",
    label: stat.label ?? "",
  })) ?? [
    { value: "24K+", label: "Atölye ziyaretçisi" },
    { value: "38", label: "Koleksiyon" },
    { value: "4.9/5", label: "Müşteri memnuniyeti" },
  ];

const fallbackHero: HeroBlock = {
  title: dictionary.home?.hero?.title ?? "NOIR",
  subtitle: dictionary.home?.hero?.subtitle,
  description: dictionary.home?.hero?.description,
  tagline: dictionary.home?.hero?.tagline ?? "Timeless Jewellery",
  primaryCta: dictionary.home?.hero?.primaryCta ?? "Koleksiyonu Keşfet",
  secondaryCta: dictionary.home?.hero?.secondaryCta ?? "Hikayemizi Oku",
  stats: fallbackStats,
};

const mapHeroFromContent = (
  content?: Record<string, any> | null
): HeroBlock => {
  if (!content) return fallbackHero;
  const hero = content.home?.hero ?? {};
  const stats =
    content.home?.whatsourimpact?.stats ??
    content.home?.impactStats ??
    fallbackHero.stats;

  return {
    title: hero.title ?? fallbackHero.title,
    subtitle: hero.subtitle ?? hero.title ?? fallbackHero.subtitle,
    description: hero.description ?? fallbackHero.description,
    tagline: hero.tagline ?? fallbackHero.tagline,
    primaryCta: hero.primaryCta ?? fallbackHero.primaryCta,
    secondaryCta: hero.secondaryCta ?? fallbackHero.secondaryCta,
    stats,
  };
};

const StatusBadge = ({
  tone,
  children,
  pulse,
}: {
  tone: "success" | "info" | "danger" | "warning";
  children: React.ReactNode;
  pulse?: boolean;
}) => (
  <span
    className={[
      "status-badge",
      `status-badge--${tone}`,
      pulse ? "status-badge--pulse" : "",
    ].join(" ")}
  >
    {children}
  </span>
);

const HeroSkeleton = () => (
  <div className="hero-skeleton">
    <div className="shimmer shimmer--tagline" />
    <div className="shimmer shimmer--title" />
    <div className="shimmer shimmer--title short" />
    <div className="shimmer shimmer--paragraph" />
    <div className="shimmer shimmer--paragraph short" />
    <div className="hero-skeleton__actions">
      <div className="shimmer shimmer--button" />
      <div className="shimmer shimmer--ghost" />
    </div>
  </div>
);

const AIHeroPanel: React.FC = () => {
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
    hasData,
    endpoint,
  } = useAIContentFetcher<HeroBlock>(CONTENT_PATH, {
    select: (payload) => mapHeroFromContent(payload.content),
  });

  const hero = data ?? fallbackHero;
  const stats = hero.stats ?? fallbackHero.stats;
  const showSkeleton = !hasData && isLoading;
  const showFallback = Boolean(error) && !hasData;

  return (
    <section className="ai-panel">
      <div className="ai-panel__header">
        <div>
          <p className="eyebrow">AI Content Stream</p>
          <h2>Immersive Hero Renderer</h2>
        </div>
        <div className="ai-panel__header-actions">
          {showFallback ? (
            <StatusBadge tone="danger">Critical fallback</StatusBadge>
          ) : isFetching ? (
            <StatusBadge tone="info" pulse>
              Updating…
            </StatusBadge>
          ) : (
            <StatusBadge tone="success">Live</StatusBadge>
          )}
          <button
            className="ghost-button"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Yenileniyor..." : "Yenile"}
          </button>
        </div>
      </div>

      {showSkeleton ? (
        <HeroSkeleton />
      ) : (
        <article className="hero-card">
          <div className="hero-card__copy">
            {hero.tagline && (
              <span className="hero-card__tagline">{hero.tagline}</span>
            )}
            <h1
              className="hero-card__title"
              dangerouslySetInnerHTML={{
                __html: hero.subtitle ?? hero.title,
              }}
            />
            {hero.description && (
              <p className="hero-card__description">{hero.description}</p>
            )}
            <div className="hero-card__actions">
              <button className="cta">
                {hero.primaryCta ?? "Koleksiyonu Keşfet"}
              </button>
              {hero.secondaryCta && (
                <button className="cta cta--ghost">{hero.secondaryCta}</button>
              )}
            </div>
          </div>
          <div className="hero-card__meta">
            <div className="hero-card__glow" />
            <div className="hero-card__stats">
              {(stats ?? []).slice(0, 3).map((stat, index) => (
                <div className="hero-card__stat" key={`${stat.label}-${index}`}>
                  <span className="hero-card__stat-value">
                    {stat.value ?? "—"}
                  </span>
                  <span className="hero-card__stat-label">
                    {stat.label ?? ""}
                  </span>
                </div>
              ))}
            </div>
            <p className="hero-card__note">
              {isFetching
                ? "İçerik yeniden doğrulanıyor…"
                : "İçerik AI + CMS üzerinden senkron."}
            </p>
          </div>
        </article>
      )}

      <div className="ai-panel__footer">
        <div>
          <p className="ai-panel__endpoint-label">Endpoint</p>
          <p className="ai-panel__endpoint">{endpoint}</p>
        </div>
        {error && (
          <div
            className={`ai-alert ${
              hasData ? "ai-alert--muted" : "ai-alert--danger"
            }`}
          >
            {hasData
              ? `Güncelleme başarısız oldu, en son geçerli sürüm gösteriliyor (${error.message}).`
              : error.message}
          </div>
        )}
      </div>
    </section>
  );
};

function App() {
  return (
    <Layout params={{ lang: LANG, theme: THEME }}>
      <MakeUp params={{ lang: LANG, theme: THEME }} />
      <main className="noir-shell">
        <AIHeroPanel />

        <div className="legacy-stack">
          <KeyFeatures
            variant="featured"
            animation="stagger"
            delay={1}
            columns={3}
            showIcons={true}
            showDescriptions={true}
            showCTAs={true}
            showFootnotes={false}
            lang={LANG}
          />
          <WhatsOurImpact params={{ lang: LANG, theme: THEME }} />
          <IntegrationSolutions
            params={{ lang: LANG, theme: THEME }}
            layout="alternating"
          />
          <FeaturesCarousel
            variant="featured"
            layout="carousel"
            animation="stagger"
            delay={2}
            autoPlay={true}
            autoPlaySpeed={5000}
            showNavigation={true}
            showPagination={true}
            showControls={true}
            responsive={{ mobile: 1, tablet: 2, desktop: 3 }}
            lang={LANG}
          />
          <KeyFeatures
            variant="mobile"
            mobileImage="/images/placeholder.svg"
            mobileImageAlt="YesilDefter Mobile App Screenshot"
            mobileImagePosition="right"
            delay={2}
            showCTAs={true}
            showFootnotes={true}
            lang={LANG}
          />
          <WhyYesildefter params={{ lang: LANG, theme: THEME }} />
          <NextSteps
            variant="featured"
            layout="grid"
            columns={3}
            animation="stagger"
            delay={5}
            showIcons={true}
            showDescriptions={true}
            showCategories={false}
            showDifficulty={false}
            showTime={false}
            showTags={false}
            lang={LANG}
          />
          <FAQ params={{ lang: LANG, theme: THEME }} />
        </div>
      </main>
    </Layout>
  );
}

export default App;
