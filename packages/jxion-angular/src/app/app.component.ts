import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeroComponent } from "../components/hero.component";

@Component({
  selector: "jx-root",
  standalone: true,
  imports: [CommonModule, HeroComponent],
  template: `
    <div class="app">
      <jx-hero
        [title]="heroTitle"
        [subtitle]="heroSubtitle"
        [description]="heroDescription"
        [ctaText]="heroCtaText"
        [statsValue]="heroStatsValue"
        [statsLabel]="heroStatsLabel"
        [cardSubtitle]="heroCardSubtitle"
        [testId]="'hero'"
        (onCtaClick)="onHeroCtaClick()"
      />

      <div class="app__content">
        <h2>Welcome to Jxion Angular with Signals!</h2>
        <p>
          This is a demonstration of the Jxion Framework with Angular 18 and
          signals.
        </p>

        <div class="app__demo">
          <h3>Jxion Framework Demo</h3>
          <p>
            This Angular component uses the Hero component from &#64;jxion/core
            with styles from &#64;jxion/design
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .app {
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .app__content {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        color: white;
      }

      .app__content h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        text-align: center;
      }

      .app__content p {
        font-size: 1.2rem;
        text-align: center;
        margin-bottom: 2rem;
        opacity: 0.9;
      }

      .app__demo {
        background: rgba(255, 255, 255, 0.1);
        padding: 2rem;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .app__demo h3 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }

      .app__demo button {
        background: #4f46e5;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .app__demo button:hover:not(:disabled) {
        background: #4338ca;
      }

      .app__demo button:disabled {
        background: #6b7280;
        cursor: not-allowed;
      }

      .app__greeting {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        border-left: 4px solid #10b981;
      }
    `,
  ],
})
export class AppComponent {
  // Signals for reactive state
  heroTitle = signal("Build Amazing Apps");
  heroSubtitle = signal("with Jxion Framework");
  heroDescription = signal(
    "A modern, multi-framework component library with unified design system and type-safe backend integration."
  );
  heroCtaText = signal("Get Started");
  heroStatsValue = signal("5");
  heroStatsLabel = signal("Frameworks Supported");
  heroCardSubtitle = signal("React, Vue, Svelte, SolidJS, Angular");

  onHeroCtaClick() {
    console.log("Hero CTA clicked!");
    alert("Welcome to Jxion Framework with Angular!");
  }
}
