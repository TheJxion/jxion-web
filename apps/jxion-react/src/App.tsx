/**
 * Jxion Stack — React Demo App
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Example page matching ustad-web-yesildefter page.tsx pattern EXACTLY
 *
 * This demonstrates the production-like page composition:
 * - All components from @jxion/design
 * - Exact component order and props matching production
 * - Dictionary-based translations via @jxion/i18n
 * - SCSS modules imported directly in components
 */

import React from "react";
import {
  Hero,
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

function App() {
  const lang = "tr-TR";
  const ustadTopBarHeight = "calc(144px + 36px)";

  return (
    <Layout params={{ lang, theme: "light" }}>
      <MakeUp params={{ lang, theme: "light" }} />
      <main
        className="main-content"
        style={{ paddingTop: ustadTopBarHeight, margin: "0 auto" }}
      >
        <Hero params={{ lang, theme: "light" }} />
        <KeyFeatures
          variant="featured"
          animation="stagger"
          delay={1}
          columns={3}
          showIcons={true}
          showDescriptions={true}
          showCTAs={true}
          showFootnotes={false}
          lang={lang}
        />
        <WhatsOurImpact params={{ lang, theme: "light" }} />
        <IntegrationSolutions
          params={{ lang, theme: "light" }}
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
          lang={lang}
        />
        <KeyFeatures
          variant="mobile"
          mobileImage="/images/placeholder.svg"
          mobileImageAlt="YesilDefter Mobile App Screenshot"
          mobileImagePosition="right"
          delay={2}
          showCTAs={true}
          showFootnotes={true}
          lang={lang}
        />
        <WhyYesildefter params={{ lang, theme: "light" }} />
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
          lang={lang}
        />
        <FAQ params={{ lang, theme: "light" }} />
      </main>
    </Layout>
  );
}

export default App;
