import { createMemo } from "solid-js";
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

export const Footer = (props: FooterProps) => {
  const socialLinksHtml = createMemo(() =>
    props.socialLinks
      .map(
        (link, index) =>
          `<a href="${link.href}" class="footer__social__link" data-testid="social-${index}" target="_blank" rel="noopener noreferrer">${link.icon}</a>`
      )
      .join("")
  );

  const sectionsHtml = createMemo(() =>
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

  const legalLinksHtml = createMemo(() =>
    props.legalLinks
      .map(
        (link, index) =>
          `<a href="${link.href}" class="footer__legal__link" data-testid="legal-${index}">${link.text}</a>`
      )
      .join("")
  );

  const variables = createMemo(() => ({
    logoHref: props.logoHref,
    logoText: props.logoText,
    description: props.description,
    socialLinks: socialLinksHtml(),
    sections: sectionsHtml(),
    copyright: props.copyright,
    legalLinks: legalLinksHtml(),
    testId: props.testId || "footer",
  }));

  const renderedTemplate = createMemo(() => {
    let rendered = TemplateRenderer.render({
      template: footerTemplate.html,
      variables: variables(),
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
  });

  return <div innerHTML={renderedTemplate()} />;
};
