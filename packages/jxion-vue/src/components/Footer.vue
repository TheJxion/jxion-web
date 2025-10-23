<template>
  <div v-html="renderedTemplate"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import styles from "@jxion/design/src/components/footer.module.scss";
import { footerTemplate, TemplateRenderer } from "@jxion/core";

interface SocialLink {
  href: string;
  icon: string;
}

interface FooterLink {
  text: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface LegalLink {
  text: string;
  href: string;
}

interface FooterProps {
  logoText: string;
  logoHref: string;
  description: string;
  socialLinks: SocialLink[];
  sections: FooterSection[];
  copyright: string;
  copyrightYear?: string;
  legalLinks: LegalLink[];
  testId?: string;
}

const props = withDefaults(defineProps<FooterProps>(), {
  copyrightYear: "2025",
  testId: "footer",
});

// Process socialLinks for template
const socialLinksHtml = computed(() =>
  props.socialLinks
    .map(
      (link, index) =>
        `<a href="${link.href}" class="footer__social__link" data-testid="social-${index}" target="_blank" rel="noopener noreferrer">${link.icon}</a>`
    )
    .join("")
);

// Process sections for template
const sectionsHtml = computed(() =>
  props.sections
    .map(
      (section, sectionIndex) =>
        `<div class="footer__section">
        <h4 class="footer__title">${section.title}</h4>
        <ul class="footer__links">
          ${section.links
            .map(
              (link, linkIndex) =>
                `<li><a href="${link.href}" class="footer__link" data-testid="footer-link-${sectionIndex}-${linkIndex}">${link.text}</a></li>`
            )
            .join("")}
        </ul>
      </div>`
    )
    .join("")
);

// Process legalLinks for template
const legalLinksHtml = computed(() =>
  props.legalLinks
    .map(
      (link, index) =>
        `<a href="${link.href}" class="footer__legal__link" data-testid="legal-${index}">${link.text}</a>`
    )
    .join("")
);

// Prepare variables for template rendering
const variables = computed(() => ({
  logoHref: props.logoHref,
  logoText: props.logoText,
  description: props.description,
  socialLinks: socialLinksHtml.value,
  sections: sectionsHtml.value,
  copyright: props.copyright,
  legalLinks: legalLinksHtml.value,
  testId: props.testId,
}));

// Render template with variables
const renderedTemplate = computed(() => {
  let rendered = TemplateRenderer.render({
    template: footerTemplate.html,
    variables: variables.value,
  });

  // Map CSS module classes
  Object.keys(styles).forEach((className) => {
    const regex = new RegExp(`class="([^"]*\\b${className}\\b[^"]*)"`, "g");
    rendered = rendered.replace(regex, (match, classList) => {
      const mappedClasses = classList
        .split(" ")
        .map((cls: string) => styles[cls] || cls)
        .join(" ");
      return `class="${mappedClasses}"`;
    });
  });

  return rendered;
});
</script>

<style scoped>
@import "@jxion/design/src/components/footer.module.scss";
</style>
