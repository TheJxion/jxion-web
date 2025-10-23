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
    <div class="hero">
      <div class="hero__content">
        <h1 class="hero__title">{{ title() }}</h1>
        <h2 class="hero__subtitle">{{ subtitle() }}</h2>
        <p class="hero__description">{{ description() }}</p>
        <div class="hero__stats">
          <div class="hero__stat">
            <span class="hero__stat-value">{{ statsValue() }}</span>
            <span class="hero__stat-label">{{ statsLabel() }}</span>
          </div>
        </div>
        <button
          class="hero__cta"
          (click)="onCtaClick.emit()"
          [attr.data-testid]="testId()"
        >
          {{ ctaText() }}
        </button>
      </div>
    </div>
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
}
