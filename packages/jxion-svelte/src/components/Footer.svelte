<script lang="ts">
  import styles from "@jxion/design/src/components/footer.module.scss";
  import { footerTemplate, TemplateRenderer } from "@jxion/core";
  
  export let logoText: string;
  export let logoHref: string;
  export let description: string;
  export let socialLinks: Array<{ href: string; icon: string }>;
  export let sections: Array<{ title: string; links: Array<{ text: string; href: string }> }>;
  export let copyright: string;
  export let copyrightYear: string = "2025";
  export let legalLinks: Array<{ text: string; href: string }>;
  export let testId: string = "footer";

  $: socialLinksHtml = socialLinks
    .map(
      (link, index) =>
        `<a href="${link.href}" class="footer__social__link" data-testid="social-${index}" target="_blank" rel="noopener noreferrer">${link.icon}</a>`
    )
    .join("");

  $: sectionsHtml = sections
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
    .join("");

  $: legalLinksHtml = legalLinks
    .map(
      (link, index) =>
        `<a href="${link.href}" class="footer__legal__link" data-testid="legal-${index}">${link.text}</a>`
    )
    .join("");

  $: variables = {
    logoHref,
    logoText,
    description,
    socialLinks: socialLinksHtml,
    sections: sectionsHtml,
    copyright,
    legalLinks: legalLinksHtml,
    testId,
  };

  $: renderedTemplate = (() => {
    let rendered = TemplateRenderer.render({
      template: footerTemplate.html,
      variables,
    });

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
  })();
</script>

<div class="footer-wrapper">
  {@html renderedTemplate}
</div>

<style>
  @import "@jxion/design/src/components/footer.module.scss";
</style>
