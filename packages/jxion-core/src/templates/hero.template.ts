/**
 * Hero Component Templates
 * Professional HTML templates for all frameworks
 * Located in @jxion/core - templates only, no styles
 */

export const heroTemplate = {
  html: `
    <section class="hero" data-testid="hero">
      <div class="hero__container">
        <div class="hero__content">
          <div class="hero__text">
            <h1 class="hero__title" data-testid="hero-title">
              {{title}}
              <br />
              <span class="hero__title--highlight">
                {{subtitle}}
              </span>
            </h1>
            <p class="hero__description" data-testid="hero-description">
              {{description}}
            </p>
            <div class="hero__cta-group">
              <button 
                class="hero__cta" 
                data-testid="hero-cta"
                onclick="{{onCtaClick}}"
              >
                {{ctaText}}
              </button>
            </div>
          </div>
          <div class="hero__visual">
            <div class="hero__card" data-testid="hero-card">
              <div class="hero__card__header">
                <div class="hero__card__stats">
                  <span class="hero__card__stats__value">
                    {{statsValue}}
                  </span>
                  <span class="hero__card__stats__label">
                    {{statsLabel}}
                  </span>
                </div>
              </div>
              <div class="hero__card__subtitle">
                {{cardSubtitle}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  react: `
    import React from 'react';
    import styles from '@jxion/design/src/components/hero.module.scss';
    import type { HeroProps } from '@jxion/shared';

    export const Hero: React.FC<HeroProps> = ({
      title,
      subtitle = "",
      description = "",
      ctaText = "Get Started",
      statsValue = "7",
      statsLabel = "Years Experience",
      cardSubtitle = "",
      testId = "hero",
      onCtaClick,
    }) => {
      return (
        <section className={styles.hero} data-testid={testId}>
          <div className={styles.hero__container}>
            <div className={styles.hero__content}>
              <div className={styles.hero__text}>
                <h1 className={styles.hero__title} data-testid={\`\${testId}-title\`}>
                  {title}
                  <br />
                  <span className={styles["hero__title--highlight"]}>
                    {subtitle}
                  </span>
                </h1>
                <p
                  className={styles.hero__description}
                  data-testid={\`\${testId}-description\`}
                >
                  {description}
                </p>
                <div className={styles["hero__cta-group"]}>
                  <button
                    className={styles.hero__cta}
                    data-testid={\`\${testId}-cta\`}
                    onClick={onCtaClick}
                  >
                    {ctaText}
                  </button>
                </div>
              </div>
              <div className={styles.hero__visual}>
                <div className={styles.hero__card} data-testid={\`\${testId}-card\`}>
                  <div className={styles["hero__card__header"]}>
                    <div className={styles["hero__card__stats"]}>
                      <span className={styles["hero__card__stats__value"]}>
                        {statsValue}
                      </span>
                      <span className={styles["hero__card__stats__label"]}>
                        {statsLabel}
                      </span>
                    </div>
                  </div>
                  <div className={styles["hero__card__subtitle"]}>
                    {cardSubtitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    };

    export default Hero;
  `,

  vue: `
    <template>
      <section :class="styles.hero" :data-testid="testId">
        <div :class="styles.hero__container">
          <div :class="styles.hero__content">
            <div :class="styles.hero__text">
              <h1 :class="styles.hero__title" :data-testid="testId + '-title'">
                {{ title }}
                <br />
                <span :class="styles['hero__title--highlight']">
                  {{ subtitle }}
                </span>
              </h1>
              <p
                :class="styles.hero__description"
                :data-testid="testId + '-description'"
              >
                {{ description }}
              </p>
              <div :class="styles['hero__cta-group']">
                <button
                  :class="styles.hero__cta"
                  :data-testid="testId + '-cta'"
                  @click="onCtaClick"
                >
                  {{ ctaText }}
                </button>
              </div>
            </div>
            <div :class="styles.hero__visual">
              <div :class="styles.hero__card" :data-testid="testId + '-card'">
                <div :class="styles['hero__card__header']">
                  <div :class="styles['hero__card__stats']">
                    <span :class="styles['hero__card__stats__value']">
                      {{ statsValue }}
                    </span>
                    <span :class="styles['hero__card__stats__label']">
                      {{ statsLabel }}
                    </span>
                  </div>
                </div>
                <div :class="styles['hero__card__subtitle']">
                  {{ cardSubtitle }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <script setup lang="ts">
    import { withDefaults, defineProps, defineEmits } from 'vue';
    import styles from '@jxion/design/src/components/hero.module.scss';
    import type { HeroProps } from '@jxion/shared';

    const props = withDefaults(
      defineProps<HeroProps & { onCtaClick?: () => void }>(),
      {
        subtitle: "",
        description: "",
        ctaText: "Get Started",
        statsValue: "7",
        statsLabel: "Years Experience",
        cardSubtitle: "",
        testId: "hero",
      }
    );

    const emit = defineEmits<{
      onCtaClick: [];
    }>();

    const onCtaClick = () => {
      emit('onCtaClick');
    };
    </script>
  `,

  svelte: `
    <script lang="ts">
      import styles from '@jxion/design/src/components/hero.module.scss';
      import type { HeroProps } from '@jxion/shared';

      export let title: string;
      export let subtitle: string = "";
      export let description: string = "";
      export let ctaText: string = "Get Started";
      export let statsValue: string = "7";
      export let statsLabel: string = "Years Experience";
      export let cardSubtitle: string = "";
      export let testId: string = "hero";
      export let onCtaClick: (() => void) | undefined = undefined;
    </script>

    <section class={styles.hero} data-testid={testId}>
      <div class={styles.hero__container}>
        <div class={styles.hero__content}>
          <div class={styles.hero__text}>
            <h1 class={styles.hero__title} data-testid="{testId}-title">
              {title}
              <br />
              <span class={styles['hero__title--highlight']}>
                {subtitle}
              </span>
            </h1>
            <p
              class={styles.hero__description}
              data-testid="{testId}-description"
            >
              {description}
            </p>
            <div class={styles['hero__cta-group']}>
              <button
                class={styles.hero__cta}
                data-testid="{testId}-cta"
                on:click={onCtaClick}
              >
                {ctaText}
              </button>
            </div>
          </div>
          <div class={styles.hero__visual}>
            <div class={styles.hero__card} data-testid="{testId}-card">
              <div class={styles['hero__card__header']}>
                <div class={styles['hero__card__stats']}>
                  <span class={styles['hero__card__stats__value']}>
                    {statsValue}
                  </span>
                  <span class={styles['hero__card__stats__label']}>
                    {statsLabel}
                  </span>
                </div>
              </div>
              <div class={styles['hero__card__subtitle']}>
                {cardSubtitle}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  solidjs: `
    import { Component } from 'solid-js';
    import styles from '@jxion/design/src/components/hero.module.scss';
    import type { HeroProps } from '@jxion/shared';

    interface HeroComponentProps extends HeroProps {
      onCtaClick?: () => void;
    }

    export const Hero: Component<HeroComponentProps> = (props) => {
      const {
        title,
        subtitle = "",
        description = "",
        ctaText = "Get Started",
        statsValue = "7",
        statsLabel = "Years Experience",
        cardSubtitle = "",
        testId = "hero",
        onCtaClick,
      } = props;

      return (
        <section class={styles.hero} data-testid={testId}>
          <div class={styles.hero__container}>
            <div class={styles.hero__content}>
              <div class={styles.hero__text}>
                <h1 class={styles.hero__title} data-testid={\`\${testId}-title\`}>
                  {title}
                  <br />
                  <span class={styles["hero__title--highlight"]}>
                    {subtitle}
                  </span>
                </h1>
                <p
                  class={styles.hero__description}
                  data-testid={\`\${testId}-description\`}
                >
                  {description}
                </p>
                <div class={styles["hero__cta-group"]}>
                  <button
                    class={styles.hero__cta}
                    data-testid={\`\${testId}-cta\`}
                    onClick={onCtaClick}
                  >
                    {ctaText}
                  </button>
                </div>
              </div>
              <div class={styles.hero__visual}>
                <div class={styles.hero__card} data-testid={\`\${testId}-card\`}>
                  <div class={styles["hero__card__header"]}>
                    <div class={styles["hero__card__stats"]}>
                      <span class={styles["hero__card__stats__value"]}>
                        {statsValue}
                      </span>
                      <span class={styles["hero__card__stats__label"]}>
                        {statsLabel}
                      </span>
                    </div>
                  </div>
                  <div class={styles["hero__card__subtitle"]}>
                    {cardSubtitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    };

    export default Hero;
  `,

  angular: `
    import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import styles from '@jxion/design/src/components/hero.module.scss';
    import type { HeroProps } from '@jxion/shared';

    @Component({
      selector: 'jx-hero',
      standalone: true,
      imports: [CommonModule],
      template: \`
        <section [class]="styles.hero" [attr.data-testid]="testId()">
          <div [class]="styles.hero__container">
            <div [class]="styles.hero__content">
              <div [class]="styles.hero__text">
                <h1 [class]="styles.hero__title" [attr.data-testid]="testId() + '-title'">
                  {{ title() }}
                  <br />
                  <span [class]="styles['hero__title--highlight']">
                    {{ subtitle() }}
                  </span>
                </h1>
                <p
                  [class]="styles.hero__description"
                  [attr.data-testid]="testId() + '-description'"
                >
                  {{ description() }}
                </p>
                <div [class]="styles['hero__cta-group']">
                  <button
                    [class]="styles.hero__cta"
                    [attr.data-testid]="testId() + '-cta'"
                    (click)="onCtaClick.emit()"
                  >
                    {{ ctaText() }}
                  </button>
                </div>
              </div>
              <div [class]="styles.hero__visual">
                <div [class]="styles.hero__card" [attr.data-testid]="testId() + '-card'">
                  <div [class]="styles['hero__card__header']">
                    <div [class]="styles['hero__card__stats']">
                      <span [class]="styles['hero__card__stats__value']">
                        {{ statsValue() }}
                      </span>
                      <span [class]="styles['hero__card__stats__label']">
                        {{ statsLabel() }}
                      </span>
                    </div>
                  </div>
                  <div [class]="styles['hero__card__subtitle']">
                    {{ cardSubtitle() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      \`,
      styleUrls: ['@jxion/design/src/components/hero.module.scss']
    })
    export class HeroComponent implements HeroProps {
      @Input() title = signal('');
      @Input() subtitle = signal('');
      @Input() description = signal('');
      @Input() ctaText = signal('Get Started');
      @Input() statsValue = signal('7');
      @Input() statsLabel = signal('Years Experience');
      @Input() cardSubtitle = signal('');
      @Input() testId = signal('hero');

      @Output() onCtaClick = new EventEmitter<void>();

      styles = {
        hero: 'hero',
        hero__container: 'hero__container',
        hero__content: 'hero__content',
        hero__text: 'hero__text',
        hero__title: 'hero__title',
        'hero__title--highlight': 'hero__title--highlight',
        hero__description: 'hero__description',
        'hero__cta-group': 'hero__cta-group',
        hero__cta: 'hero__cta',
        hero__visual: 'hero__visual',
        hero__card: 'hero__card',
        hero__card__header: 'hero__card__header',
        hero__card__stats: 'hero__card__stats',
        hero__card__stats__value: 'hero__card__stats__value',
        hero__card__stats__label: 'hero__card__stats__label',
        hero__card__subtitle: 'hero__card__subtitle'
      };
    }
  `,
};
