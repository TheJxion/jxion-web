import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
} from "@angular/core";
import { CommonModule } from "@angular/common";
// Angular doesn't support CSS modules import like React/Vue
// We'll use the styles directly in the component
import { heroTemplate, TemplateRenderer } from "@jxion/core";
import type { HeroProps } from "@jxion/shared";

/**
 * Hero Component - Angular Implementation
 *
 * Uses:
 * - HTML template from @jxion-core (heroTemplate.html)
 * - SCSS styles from @jxion-design
 * - Types from @jxion/shared
 *
 * This component renders the actual HTML template from @jxion-core
 * with proper CSS module class mapping.
 */
@Component({
  selector: "jx-hero",
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Template rendered from @jxion-core -->
    <div [innerHTML]="renderedTemplate()"></div>
  `,
  styleUrls: [],
})
export class HeroComponent {
  // Input signals with default values
  @Input() title = signal("");
  @Input() subtitle = signal("");
  @Input() description = signal("");
  @Input() ctaText = signal("Get Started");
  @Input() statsValue = signal("7");
  @Input() statsLabel = signal("Years Experience");
  @Input() cardSubtitle = signal("");
  @Input() testId = signal("hero");

  // Output event emitter
  @Output() onCtaClick = new EventEmitter<void>();

  // Render the HTML template from @jxion-core
  renderedTemplate = computed(() => {
    const variables = {
      title: this.title(),
      subtitle: this.subtitle(),
      description: this.description(),
      ctaText: this.ctaText(),
      statsValue: this.statsValue(),
      statsLabel: this.statsLabel(),
      cardSubtitle: this.cardSubtitle(),
      testId: this.testId(),
      onCtaClick: this.onCtaClick ? "onCtaClick" : "",
    };

    // Get the base HTML template from @jxion-core
    const baseTemplate = heroTemplate.html;

    // Render template with variables
    let rendered = TemplateRenderer.render({
      template: baseTemplate,
      variables,
    });

    // For Angular, we'll use the original class names since CSS modules aren't supported
    // The styles will be applied globally through the design system

    // Set up click handler for template
    if (this.onCtaClick) {
      (window as any).heroCtaClick = () => this.onCtaClick.emit();
      rendered = rendered.replace(
        /onclick="onCtaClick"/g,
        'onclick="window.heroCtaClick"'
      );
    }

    return rendered;
  });
}
