const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CZzzyCqn.js","assets/index-Cva6V9Nj.css"])))=>i.map(i=>d[i]);
import{r as g,d as m,c as A,g as x,_ as P,j as f}from"./index-CZzzyCqn.js";import{G as Wt,M as Kt,f as qt,o as Bt,e as Yt,p as Xt,n as Qt,k as Zt,h as es,i as ts,b as ss,a as as,l as os,m as ns,s as rs}from"./index-CZzzyCqn.js";const ge=()=>{const t=g.useRef(!1);t.current||(m.component("info","Initializing useMessages hook",{operation:"initialize",metadata:{hookName:"useMessages"}}),t.current=!0);const[e,s]=g.useState([]),[a,o]=g.useState(!1),[r,n]=g.useState(null),i=g.useMemo(()=>A(),[]),l=g.useCallback(async(u=10)=>{if(a){m.component("warn","fetchMessages called while already loading",{operation:"fetchMessages",metadata:{limit:u,isLoading:!0}});return}m.startTimer(`useMessages-fetchMessages-${u}`),m.component("info","Starting to fetch messages",{operation:"fetchMessages",metadata:{limit:u,currentMessageCount:e.length}}),o(!0),n(null);try{const p=await i.getMessages.query(u);s(p),m.component("info","Successfully fetched messages",{operation:"fetchMessages",metadata:{limit:u,resultCount:p.length,success:!0}})}catch(p){const d=p instanceof Error?p.message:"Unknown error";n(d),m.component("error","Failed to fetch messages",{operation:"fetchMessages",metadata:{limit:u,error:d,success:!1}})}finally{o(!1),m.endTimer(`useMessages-fetchMessages-${u}`,{operation:"fetchMessages",limit:u})}},[i]),c=g.useCallback(async(u,p)=>{o(!0),n(null);try{await i.addMessage.mutate({user:u,message:p}),await l()}catch(d){n(d instanceof Error?d.message:"Unknown error")}finally{o(!1)}},[i,l]);return{messages:e,isLoading:a,error:r,fetchMessages:l,addMessage:c}},fe=()=>{const[t,e]=g.useState(null),[s,a]=g.useState(!1),[o,r]=g.useState(null),n=g.useMemo(()=>A(),[]),i=g.useCallback(async()=>{if(!s){a(!0),r(null);try{const l=await n.greetings.query();e(l)}catch(l){r(l instanceof Error?l.message:"Unknown error")}finally{a(!1)}}},[n]);return{greeting:t,isLoading:s,error:o,fetchGreeting:i}},D={html:`
    <section id="hero" class="hero noisy" data-testid="hero">
      <h1 class="title">{{title}}</h1>
      
      <div class="body">
        <div class="content">
          <div class="space-y-5 hidden md:block">
            <p>{{tagline}}</p>
            <p class="subtitle">
              {{subtitle}}
            </p>
          </div>
          
          <div class="view-collection">
            <p class="subtitle">
              {{description}}
            </p>
            <a href="#collection">{{ctaText}}</a>
          </div>
        </div>
      </div>
    </section>
    
    <div class="video">
      <video
        id="hero-video"
        muted
        playsinline
        preload="auto"
        src="/videos/output.mp4"
      ></video>
    </div>
  `,react:`
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
  `,vue:`
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
    <\/script>
  `,svelte:`
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
    <\/script>

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
  `,solidjs:`
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
  `,angular:`
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
  `},be={html:`
    <div class="card" data-testid="card">
      <div class="card__header">
        <h3 class="card__title">{{title}}</h3>
        <p class="card__subtitle">{{subtitle}}</p>
      </div>
      <div class="card__content">
        <p class="card__description">{{description}}</p>
      </div>
      <div class="card__footer">
        <div class="card__stats">
          <span class="card__stats__value">{{statsValue}}</span>
          <span class="card__stats__label">{{statsLabel}}</span>
        </div>
      </div>
    </div>
  `,variables:["title","subtitle","description","statsValue","statsLabel"]},ye={html:`
    <div class="layout" data-lang="{{lang}}" data-theme="{{theme}}">
      <header class="layout__header">
        <div class="layout__container">
          <div class="layout__content">
            {{headerContent}}
          </div>
        </div>
      </header>
      <main class="layout__main">
        <div class="layout__container">
          <div class="layout__content">
            {{mainContent}}
          </div>
        </div>
      </main>
      <footer class="layout__footer">
        <div class="layout__container">
          <div class="layout__content">
            {{footerContent}}
          </div>
        </div>
      </footer>
    </div>
  `,variables:["lang","theme","headerContent","mainContent","footerContent"]},ke={html:`
    <div class="cta-group" data-testid="cta-group">
      <button 
        class="cta {{variant}}" 
        data-testid="cta-primary"
        onclick="{{onPrimaryClick}}"
      >
        {{primaryText}}
      </button>
      {{secondaryButton}}
    </div>
  `,variables:["variant","primaryText","secondaryButton","onPrimaryClick","onSecondaryClick"]},Ce={html:`
    <button 
      class="button {{variant}} {{size}}" 
      data-testid="button"
      onclick="{{onClick}}"
      {{#if disabled}}disabled{{/if}}
    >
      {{text}}
    </button>
  `,variables:["variant","size","text","onClick","disabled"]},xe={html:`
    <header class="header" data-testid="header">
      <div class="header__container">
        <a href="{{logoHref}}" class="header__logo" data-testid="header-logo">
          {{logoText}}
        </a>
        <nav class="header__nav" data-testid="header-nav">
          {{navItems}}
        </nav>
        <div class="header__actions" data-testid="header-actions">
          {{actionsContent}}
        </div>
        <button class="header__mobile-toggle" data-testid="mobile-toggle" onclick="{{onMobileToggle}}">
          ☰
        </button>
      </div>
      <div class="header__mobile-menu {{mobileMenuOpen}}" data-testid="mobile-menu">
        <nav class="header__mobile-nav">
          {{navItems}}
        </nav>
      </div>
    </header>
  `,variables:["logoHref","logoText","navItems","actionsContent","onMobileToggle","mobileMenuOpen"]},we={html:`
    <div class="input-wrapper" data-testid="input-wrapper">
      {{label}}
      <input 
        type="{{type}}"
        id="{{id}}"
        name="{{name}}"
        class="input {{variant}} {{size}} {{errorClass}} {{successClass}}"
        placeholder="{{placeholder}}"
        value="{{value}}"
        {{required}}
        {{disabled}}
        data-testid="input"
        onchange="{{onChange}}"
        oninput="{{onInput}}"
      />
      {{error}}
      {{helpText}}
    </div>
  `,variables:["label","id","type","name","variant","size","placeholder","value","required","disabled","error","errorClass","successClass","helpText","onChange","onInput"]},Se={html:`
    <div class="modal {{isOpen}} {{size}}" data-testid="modal" onclick="{{onBackdropClick}}">
      <div class="modal__backdrop"></div>
      <div class="modal__content" onclick="{{onContentClick}}">
        <div class="modal__header">
          <h2 class="modal__title" data-testid="modal-title">{{title}}</h2>
          <button class="modal__close" data-testid="modal-close" onclick="{{onClose}}">
            ✕
          </button>
        </div>
        <div class="modal__body" data-testid="modal-body">
          {{bodyContent}}
        </div>
        <div class="modal__footer" data-testid="modal-footer">
          {{footerContent}}
        </div>
      </div>
    </div>
  `,variables:["isOpen","size","title","bodyContent","footerContent","onBackdropClick","onContentClick","onClose"]},z={html:`
    <div class="makeup" data-testid="makeup">
      <div class="makeup__left-section">
        <div class="makeup__message" data-testid="makeup-message">
          {{message}}
        </div>
      </div>
      <div class="makeup__right-section">
        <div class="makeup__phone-group" data-testid="makeup-phone-group">
          <span class="makeup__phone-number" data-testid="makeup-phone-number">
            {{phoneNumber}}
          </span>
          <a href="#" class="makeup__contact-label" data-testid="makeup-contact-label">
            {{contactLabel}}
          </a>
        </div>
      </div>
    </div>
  `,variables:["message","phoneNumber","contactLabel"]},G={html:`
    <section class="section {{variant}} {{size}}" data-testid="section">
      <div class="section__container">
        <div class="section__header">
          <h2 class="section__title" data-testid="section-title">{{title}}</h2>
          <h3 class="section__subtitle" data-testid="section-subtitle">{{subtitle}}</h3>
        </div>
      </div>
    </section>
  `,variables:["variant","size","title","subtitle"]},je={html:`
    <footer class="footer" data-testid="footer">
      <div class="footer__container">
        <div class="footer__content">
          <div class="footer__brand">
            <a href="{{logoHref}}" class="footer__logo" data-testid="footer-logo">
              {{logoText}}
            </a>
            <p class="footer__description">{{description}}</p>
            <div class="footer__social">
              {{socialLinks}}
            </div>
          </div>
          {{sections}}
        </div>
        <div class="footer__bottom">
          <p class="footer__copyright">{{copyright}}</p>
          <div class="footer__legal">
            {{legalLinks}}
          </div>
        </div>
      </div>
    </footer>
  `,variables:["logoHref","logoText","description","socialLinks","sections","copyright","legalLinks"]},U={html:`
    <section class="why-noir" data-testid="why-noir">
      <div class="why-noir__container">
        <div class="why-noir__header">
          <h2 class="why-noir__title">{{title}}</h2>
        </div>
        <div class="why-noir__sections" data-testid="why-noir-sections">
          {{sections}}
        </div>
      </div>
    </section>
  `,variables:["title","sections"]},W={html:`
    <section class="motifs" data-testid="motifs">
      <div class="motifs__container">
        <div class="motifs__header">
          <h2 class="motifs__title">{{title}}</h2>
          <p class="motifs__subtitle">{{subtitle}}</p>
        </div>
        <div class="motifs__grid" data-testid="motifs-grid">
          {{items}}
        </div>
      </div>
    </section>
  `,variables:["title","subtitle","items"]},K={html:`
    <section class="newsletter" data-testid="newsletter">
      <div class="newsletter__container">
        <div class="newsletter__header">
          <h2 class="newsletter__title">{{title}}</h2>
          <p class="newsletter__description">{{description}}</p>
        </div>
        <form class="newsletter__form">
          <input 
            type="email" 
            class="newsletter__input" 
            placeholder="{{placeholder}}"
            required
          />
          <button type="submit" class="newsletter__button">
            {{button}}
          </button>
        </form>
      </div>
    </section>
  `,variables:["title","description","placeholder","button"]},Te={generateTemplate:(t,e,s)=>`<!-- Generated ${t} template for ${e} -->`,validateTemplate:(t,e)=>({valid:!0,errors:[]}),extractVariables:t=>{const e=/\{\{(\w+)\}\}/g,s=[];let a;for(;(a=e.exec(t))!==null;)s.push(a[1]);return[...new Set(s)]}},q={html:`
    <section class="key-features" data-testid="key-features">
      <div class="key-features__container">
        <div class="key-features__header">
          <h2 class="key-features__title">{{title}}</h2>
          <p class="key-features__subtitle">{{subtitle}}</p>
        </div>
        <div class="key-features__grid" data-testid="key-features-grid">
          <!-- Features will be rendered dynamically from translation data -->
        </div>
        <div class="key-features__footer">
          <a href="{{common_cta_link}}" class="key-features__cta">
            {{common_cta}}
          </a>
        </div>
      </div>
    </section>
  `,variables:["title","subtitle","common_cta","common_cta_link"]},B={html:`
    <section class="features-carousel" data-testid="features-carousel">
      <div class="features-carousel__container">
        <div class="features-carousel__header">
          <h2 class="features-carousel__title">{{title}}</h2>
          <p class="features-carousel__subtitle">{{subtitle}}</p>
        </div>
        <div class="features-carousel__content" data-testid="features-carousel-content">
          <!-- Carousel items will be rendered dynamically from translation data -->
        </div>
        <div class="features-carousel__footer">
          <button class="features-carousel__cta">
            {{common_cta}}
          </button>
        </div>
      </div>
    </section>
  `,variables:["title","subtitle","common_cta","list"]},Y={html:`
    <section class="integration-solutions" data-testid="integration-solutions">
      <div class="integration-solutions__container">
        <div class="integration-solutions__header">
          <h2 class="integration-solutions__title">{{title}}</h2>
          <p class="integration-solutions__subtitle">{{subtitle}}</p>
        </div>
        <div class="integration-solutions__grid" data-testid="integration-solutions-grid">
          <!-- Solutions will be rendered dynamically from translation data -->
        </div>
        <div class="integration-solutions__footer">
          <a href="{{common_cta_link}}" class="integration-solutions__cta">
            {{common_cta}}
          </a>
        </div>
      </div>
    </section>
  `,variables:["title","subtitle","common_cta","common_cta_link","items"]},X={html:`
    <section class="whats-our-impact" data-testid="whats-our-impact">
      <div class="whats-our-impact__container">
        <div class="whats-our-impact__header">
          <h2 class="whats-our-impact__title">
            {{title.regular}} <span class="whats-our-impact__title--highlight">{{title.highlight}}</span> {{title.regularcontiniued}}
          </h2>
        </div>
        <div class="whats-our-impact__stats" data-testid="whats-our-impact-stats">
          {{stats}}
        </div>
      </div>
    </section>
  `,variables:["title","stats"]},Q={html:`
    <section class="why-yesildefter" data-testid="why-yesildefter">
      <div class="why-yesildefter__container">
        <div class="why-yesildefter__header">
          <h2 class="why-yesildefter__title">
            <span class="why-yesildefter__highlight">{{highlight}}</span> {{title}}
          </h2>
          <p class="why-yesildefter__subtitle">{{subtitle}}</p>
          <p class="why-yesildefter__description">{{description}}</p>
        </div>
        <div class="why-yesildefter__benefits" data-testid="why-yesildefter-benefits">
          <!-- Benefits will be rendered dynamically from translation data -->
        </div>
        <div class="why-yesildefter__footer">
          <button class="why-yesildefter__cta">
            {{cta}}
          </button>
        </div>
      </div>
    </section>
  `,variables:["title","subtitle","description","highlight","cta","benefits"]},Z={html:`
    <section class="next-steps" data-testid="next-steps">
      <div class="next-steps__container">
        <div class="next-steps__header">
          <h2 class="next-steps__title">{{title}}</h2>
          <p class="next-steps__subtitle">{{subtitle}}</p>
        </div>
        <div class="next-steps__list" data-testid="next-steps-list">
          <!-- Steps will be rendered dynamically from translation data -->
        </div>
      </div>
    </section>
  `,variables:["title","subtitle","list"]};class h{static render(e){const{template:s,variables:a}=e;m.startTimer("template-render"),m.template("info","Starting template rendering",{operation:"render",metadata:{templateLength:s.length,variableCount:Object.keys(a).length,variables:Object.keys(a)}});let o=s,r=0;const n=/\{\{(\w+(?:\.\w+)+)\}\}/g;let i;for(;(i=n.exec(s))!==null;){const l=i[1],c=l.split("."),u=c[0],p=c.slice(1);if(a[u]&&typeof a[u]=="object"){let d=a[u];for(const _ of p)d=d==null?void 0:d[_];if(d!==void 0){const _=new RegExp(`\\{\\{${l.replace(/\./g,"\\.")}\\}\\}`,"g");o=o.replace(_,String(d)),r++}}}return Object.entries(a).forEach(([l,c])=>{if(new RegExp(`\\{\\{${l}\\.`).test(o)&&typeof c=="object"&&!Array.isArray(c))return;const p=new RegExp(`\\{\\{${l}\\}\\}`,"g"),d=o.match(p);if(d){r+=d.length;let _;Array.isArray(c)?l==="sections"?_=c.map(v=>`
              <div class="why-noir__section-item">
                <div class="why-noir__icon">${v.icon||""}</div>
                <h3 class="why-noir__section-title">${v.title||""}</h3>
                <p class="why-noir__section-description">${v.description||""}</p>
              </div>
            `).join(""):l==="items"?_=c.map(v=>`
              <div class="motifs__item">
                <h3 class="motifs__item-name">${v.name||""}</h3>
                <p class="motifs__item-description">${v.description||""}</p>
              </div>
            `).join(""):l==="stats"?_=c.map(v=>`
              <div class="whats-our-impact__stat">
                <div class="whats-our-impact__stat-value">${v.value||""}</div>
                <div class="whats-our-impact__stat-label">${v.label||""}</div>
              </div>
            `).join(""):_=c.map(v=>typeof v=="object"&&v!==null?`<div>${JSON.stringify(v)}</div>`:`<div>${String(v)}</div>`).join(""):typeof c=="object"&&c!==null?_=JSON.stringify(c):_=c!=null?String(c):"",o=o.replace(p,_),m.template("debug",`Replaced variable: ${l}`,{operation:"replace",metadata:{variable:l,value:_.substring(0,100),replacementCount:d.length}})}}),m.template("info","Template rendering completed",{operation:"render",metadata:{totalReplacements:r,finalLength:o.length,originalLength:s.length}}),m.endTimer("template-render",{replacementCount:r,originalLength:s.length,finalLength:o.length}),o}static extractVariables(e){const s=/\{\{(\w+)\}\}/g,a=[];let o;for(;(o=s.exec(e))!==null;)a.includes(o[1])||a.push(o[1]);return a}}class ee{static render(e){const{template:s,variables:a,styles:o}=e;let n=h.render({template:s,variables:a}).replace(/onclick=/g,"on:click=").replace(/\{\{([^}]+)\}\}/g,"{$1}");return Object.keys(o).forEach(i=>{const l=new RegExp(`class="([^"]*\\b${i}\\b[^"]*)"`,"g");n=n.replace(l,(c,u)=>`class="${u.split(" ").map(d=>o[d]||d).join(" ")}"`)}),n}}const te={hero:D,makeup:z,keyFeatures:q,featuresCarousel:B,integrationSolutions:Y,whatsOurImpact:X,whyYesildefter:Q,nextSteps:Z,section:G,whyNoir:U,motifs:W,newsletter:K};function se(t){const e=te[t];if(!e)throw new Error(`Template not found for component: ${t}`);return e}async function ae(t){const{componentId:e,framework:s,props:a}=t,o=x(e);if(!o)throw new Error(`Component not found in registry: ${e}`);if(s!=="html"&&!o.frameworks.includes(s))throw new Error(`Framework ${s} not supported for component ${e}. Supported: ${o.frameworks.join(", ")}`);const r=se(e);let n="",i;if(s==="html")n=h.render({template:r.html,variables:a});else if(s==="svelte"){const l=r.svelte||r[s];l?(n=ee.render({template:r.html,variables:a,styles:{}}),i=h.render({template:l,variables:a})):(console.warn(`[ComponentLoader] Svelte template not found for ${e}, using HTML template`),n=h.render({template:r.html,variables:a}))}else{n=h.render({template:r.html,variables:a});const l=r[s];l&&(i=h.render({template:l,variables:a}))}return{html:n,code:i,metadata:o}}function $e(t){return x(t)||null}function Le(t,e){const s=x(t);return s?s.frameworks.includes(e):!1}async function oe(t,e="tr-TR"){try{const a=await P(()=>import("./index-CZzzyCqn.js").then(o=>o.q),__vite__mapDeps([0,1]));if(a&&typeof a.getDictionary=="function"){const o=await a.getDictionary(e),r=(i,l)=>l.split(".").reduce((c,u)=>c&&typeof c=="object"?c[u]:void 0,i),n={};for(const i of t){const l=r(o,i);l!==void 0?n[i]=l:n[i]=i}return n}}catch(a){console.warn("[TemplateComposer] @jxion/i18n not available, using fallback",a)}const s={};for(const a of t)s[a]=a;return s}class Ie{static async compose(e,s="tr-TR",a="svelte"){const o=performance.now();console.log(`[TemplateComposer] Rendering ${e.sections.length} sections from ${e.id}.json`);const r=[],n=[];for(const[l,c]of e.sections.entries())try{console.log(`[TemplateComposer] Rendering section ${l+1}/${e.sections.length}: ${c.component}`);const[u,p]=c.component.split(".");let d={};if(c.localeKey&&c.props){const v=Object.keys(c.props).map(b=>{const y=c.props[b];return`${c.localeKey}.${y}`}),O=await oe(v,s);for(const b of Object.keys(c.props)){const y=c.props[b],F=`${c.localeKey}.${y}`,k=O[F];k!==void 0&&k!==F?typeof k=="string"&&k===F?d[b]=y:d[b]=k:d[b]=y}}else d={...c.props||{}};const _=await ae({componentId:u,framework:a||"html",props:d});r.push(_),console.log(`[TemplateComposer] ✅ Section ${l+1} rendered: ${c.component}`)}catch(u){const p=`Failed to render section ${l+1} (${c.component}): ${u instanceof Error?u.message:"Unknown error"}`;console.error(`[TemplateComposer] ❌ ${p}`),n.push(p)}const i=performance.now()-o;return n.length>0?console.warn(`[TemplateComposer] Completed with ${n.length} errors`):console.log(`[TemplateComposer] ✅ All sections rendered in ${i.toFixed(2)}ms`),{id:e.id,sections:r,metadata:{...e.metadata,locale:s},renderTime:i}}static validate(e){const s=[];return e.id||s.push("Template schema must have an 'id' field"),Array.isArray(e.sections)?e.sections.forEach((a,o)=>{a.component||s.push(`Section ${o+1} must have a 'component' field`)}):s.push("Template schema must have a 'sections' array"),{valid:s.length===0,errors:s}}static renderToHTML(e){console.log(`[TemplateComposer] Rendering ${e.sections.length} sections to HTML`);const s=e.sections.map(a=>a.html).join(`
`);return`
      <div data-template-id="${e.id}" data-render-time="${e.renderTime.toFixed(2)}ms">
        ${s}
      </div>
    `}}function ne(t){const{id:e,framework:s,version:a}=t;console.log(`[Jxion-Core] Resolving component: ${e} (${s}${a?` v${a}`:""})`);const o=x(e);if(!o)return console.warn(`[Jxion-Core] Component not found in registry: ${e}`),null;if(!o.frameworks.includes(s))return console.warn(`[Jxion-Core] Framework ${s} not supported for ${e}. Supported: ${o.frameworks.join(", ")}`),null;const r=re(e,s),n=ie(s),i={id:e,framework:s,metadata:o,componentPath:r,adapter:n};return console.log("[Jxion-Core] Component resolved:",{id:i.id,framework:i.framework,version:o.version,path:i.componentPath}),i}function re(t,e){const s=`@jxion/design/src/components/${t}`,o={react:".tsx",vue:".vue",svelte:".svelte",solidjs:".tsx",angular:".ts",html:".html"}[e]||".tsx";return`${s}${o}`}function ie(t){const e={react:"@jxion/core/adapters/react",vue:"@jxion/core/adapters/vue",svelte:"@jxion/core/adapters/svelte",solidjs:"@jxion/core/adapters/solidjs",angular:"@jxion/core/adapters/angular",html:"@jxion/core/adapters/html"};return e[t]||e.html}function Re(t){const e=x("hero");if(!e||!e.frameworks.includes(t))return[];const s=ne({id:"hero",framework:t});return s?[s]:[]}function w(t){let e=t;return{state:e,setState:a=>{typeof a=="function"?e=a(e):e=a}}}const Ne=w,Ee=w,Fe=w,Me=w,Je=w;function S(t,e){t()}const Ve=S,Ae=S,He=S,Oe=S,Pe=S;function j(t,e){return t()}const De=j,ze=j,Ge=j,Ue=j,We=j;function T(t,e){return t}const Ke=T,qe=T,Be=T,Ye=T,Xe=T;function $(t){return{current:t}}const Qe=$,Ze=$,et=$,tt=$,st=$;function L(t){throw new Error("useContext must be used within a Provider")}const at=L,ot=L,nt=L,rt=L,it=L;function I(t,e){let s=e;return{state:s,dispatch:o=>{s=t(s,o)}}}const lt=I,ct=I,dt=I,ut=I,pt=I;function R(t,e){t()}const mt=R,vt=R,_t=R,ht=R,gt=R;function N(t,e,s){typeof t=="function"?t(e()):t&&"current"in t&&(t.current=e())}const ft=N,bt=N,yt=N,kt=N,Ct=N;function E(t,e){console.log(e?e(t):t)}const xt=E,wt=E,St=E,jt=E,Tt=E,C={react:{name:"React",version:"^18.2.0",type:"frontend",dependencies:{react:"^18.2.0","react-dom":"^18.2.0","@jxion/react":"latest"},devDependencies:{"@vitejs/plugin-react":"^4.2.0",vite:"^5.4.0",typescript:"~5.4.0"},scripts:{dev:"vite",build:"vite build",preview:"vite preview"},configFiles:["vite.config.ts","tsconfig.json"],port:3001,buildCommand:"vite build",devCommand:"vite",features:["JSX","Hooks","Context","Suspense"],limitations:["No built-in routing","No SSR by default"]},vue:{name:"Vue",version:"^3.4.0",type:"frontend",dependencies:{vue:"^3.4.0","@jxion/vue":"latest"},devDependencies:{"@vitejs/plugin-vue":"^5.0.0",vite:"^5.4.0",typescript:"~5.4.0"},scripts:{dev:"vite",build:"vite build",preview:"vite preview"},configFiles:["vite.config.ts","tsconfig.json"],port:3e3,buildCommand:"vite build",devCommand:"vite",features:["Composition API","Reactivity","Components","Directives"],limitations:["No built-in routing","No SSR by default"]},svelte:{name:"Svelte",version:"^4.2.0",type:"frontend",dependencies:{svelte:"^4.2.0","@jxion/svelte":"latest"},devDependencies:{"@sveltejs/vite-plugin-svelte":"^3.1.0",vite:"^5.4.0",typescript:"~5.4.0"},scripts:{dev:"vite",build:"vite build",preview:"vite preview"},configFiles:["vite.config.ts","svelte.config.js","tsconfig.json"],port:3002,buildCommand:"vite build",devCommand:"vite",features:["Compile-time optimization","Reactivity","Components"],limitations:["No built-in routing","No SSR by default"]},solidjs:{name:"SolidJS",version:"^1.8.0",type:"frontend",dependencies:{"solid-js":"^1.8.0","solid-js/web":"^1.8.0","@jxion/solidjs":"latest"},devDependencies:{"vite-plugin-solid":"^2.8.0",vite:"^5.4.0",typescript:"~5.4.0"},scripts:{dev:"vite",build:"vite build",preview:"vite preview"},configFiles:["vite.config.ts","tsconfig.json"],port:3004,buildCommand:"vite build",devCommand:"vite",features:["Fine-grained reactivity","JSX","Signals"],limitations:["No built-in routing","No SSR by default"]},angular:{name:"Angular",version:"^18.0.0",type:"frontend",dependencies:{"@angular/core":"^18.0.0","@angular/common":"^18.0.0","@angular/platform-browser":"^18.0.0","@angular/platform-browser-dynamic":"^18.0.0","@jxion/angular":"latest"},devDependencies:{"@angular/cli":"^18.0.0",typescript:"~5.4.0"},scripts:{dev:"ng serve",build:"ng build",test:"ng test"},configFiles:["angular.json","tsconfig.json","tsconfig.app.json"],port:3003,buildCommand:"ng build",devCommand:"ng serve",features:["Dependency Injection","RxJS","TypeScript","CLI"],limitations:["Steeper learning curve","Larger bundle size"]},next:{name:"Next.js",version:"^14.0.0",type:"meta-framework",baseFramework:"react",dependencies:{next:"^14.0.0",react:"^18.2.0","react-dom":"^18.2.0","@jxion/react":"latest"},devDependencies:{typescript:"~5.4.0"},scripts:{dev:"next dev",build:"next build",start:"next start"},configFiles:["next.config.js","tsconfig.json"],port:3e3,buildCommand:"next build",devCommand:"next dev",features:["SSR","Static Generation","API Routes","File-based routing"],limitations:["React only","Vercel-specific features"],ssr:!0,staticGeneration:!0,apiRoutes:!0},nuxt:{name:"Nuxt",version:"^3.8.0",type:"meta-framework",baseFramework:"vue",dependencies:{nuxt:"^3.8.0",vue:"^3.4.0","@jxion/vue":"latest"},devDependencies:{typescript:"~5.4.0"},scripts:{dev:"nuxt dev",build:"nuxt build",start:"nuxt start"},configFiles:["nuxt.config.ts","tsconfig.json"],port:3e3,buildCommand:"nuxt build",devCommand:"nuxt dev",features:["SSR","Static Generation","File-based routing","Auto-imports"],limitations:["Vue only","Nuxt-specific conventions"],ssr:!0,staticGeneration:!0,apiRoutes:!0},sveltekit:{name:"SvelteKit",version:"^2.0.0",type:"meta-framework",baseFramework:"svelte",dependencies:{"@sveltejs/kit":"^2.0.0",svelte:"^4.2.0","@jxion/svelte":"latest"},devDependencies:{typescript:"~5.4.0"},scripts:{dev:"vite dev",build:"vite build",preview:"vite preview"},configFiles:["svelte.config.js","vite.config.ts","tsconfig.json"],port:3e3,buildCommand:"vite build",devCommand:"vite dev",features:["SSR","Static Generation","File-based routing","Progressive enhancement"],limitations:["Svelte only","SvelteKit-specific conventions"],ssr:!0,staticGeneration:!0,apiRoutes:!0},solidstart:{name:"SolidStart",version:"^0.4.0",type:"meta-framework",baseFramework:"solidjs",dependencies:{"solid-start":"^0.4.0","solid-js":"^1.8.0","@jxion/solidjs":"latest"},devDependencies:{typescript:"~5.4.0"},scripts:{dev:"solid-start dev",build:"solid-start build",start:"solid-start start"},configFiles:["solid-start.config.ts","tsconfig.json"],port:3e3,buildCommand:"solid-start build",devCommand:"solid-start dev",features:["SSR","Static Generation","File-based routing","Islands"],limitations:["SolidJS only","Early stage"],ssr:!0,staticGeneration:!0,apiRoutes:!0}};function le(t){m.startTimer(`getFrameworkConfig-${t}`),m.logConfigLoad("framework",t,{availableFrameworks:Object.keys(C)});const e=C[t];return e?m.configuration("info",`Found framework config: ${t}`,{operation:"get",metadata:{framework:t,type:e.type,version:e.version,port:e.port,featureCount:e.features.length,limitationCount:e.limitations.length,dependencyCount:Object.keys(e.dependencies).length,devDependencyCount:Object.keys(e.devDependencies).length}}):m.configuration("warn",`Framework config not found: ${t}`,{operation:"get",metadata:{framework:t,availableFrameworks:Object.keys(C)}}),m.endTimer(`getFrameworkConfig-${t}`,{framework:t}),e}function $t(){return Object.values(C).filter(t=>t.type==="frontend")}function ce(){return Object.values(C).filter(t=>t.type==="meta-framework")}function Lt(t){return ce().filter(e=>e.baseFramework===t)}function It(t,e){const s=le(t);return s?s.features.includes(e):!1}class Rt{static toReact(e,s){m.startTimer("framework-convert-react"),m.logFrameworkConversion("html","react","template");const a=h.render({template:e,variables:s});m.frameworkConversion("debug","Applying React-specific transformations",{operation:"convert",framework:"react",metadata:{originalLength:a.length,transformations:["class -> className","onclick -> onClick","for -> htmlFor","{{}} -> {}"]}});const o=a.replace(/class=/g,"className=").replace(/onclick=/g,"onClick=").replace(/for=/g,"htmlFor=").replace(/\{\{([^}]+)\}\}/g,"{$1}");return m.frameworkConversion("info","React conversion completed",{operation:"convert",framework:"react",metadata:{originalLength:a.length,finalLength:o.length,transformationsApplied:4}}),m.endTimer("framework-convert-react",{framework:"react"}),o}static toVue(e,s){return h.render({template:e,variables:s}).replace(/class=/g,":class=").replace(/onclick=/g,"@click=").replace(/\{\{([^}]+)\}\}/g,"{{ $1 }}")}static toSvelte(e,s){return h.render({template:e,variables:s}).replace(/onclick=/g,"on:click=").replace(/\{\{([^}]+)\}\}/g,"{$1}")}static toSolidJS(e,s){return h.render({template:e,variables:s}).replace(/onclick=/g,"onClick=").replace(/\{\{([^}]+)\}\}/g,"{$1}")}static toAngular(e,s){return h.render({template:e,variables:s}).replace(/class=/g,"[class]=").replace(/onclick=/g,"(click)=").replace(/\{\{([^}]+)\}\}/g,"{{ $1() }}")}static convert(e){const{template:s,variables:a,framework:o}=e;m.startTimer(`framework-convert-${o}`),m.logFrameworkConversion("html",o,"template"),m.frameworkConversion("info",`Starting conversion to ${o}`,{operation:"convert",framework:o,metadata:{templateLength:s.length,variableCount:Object.keys(a).length,supportedFrameworks:["react","vue","svelte","solidjs","angular"]}});let r;try{switch(o){case"react":r=this.toReact(s,a);break;case"vue":r=this.toVue(s,a);break;case"svelte":r=this.toSvelte(s,a);break;case"solidjs":r=this.toSolidJS(s,a);break;case"angular":r=this.toAngular(s,a);break;default:throw new Error(`Unsupported framework: ${o}`)}m.frameworkConversion("info",`Conversion to ${o} completed successfully`,{operation:"convert",framework:o,metadata:{originalLength:s.length,finalLength:r.length,success:!0}})}catch(n){throw m.frameworkConversion("error",`Conversion to ${o} failed`,{operation:"convert",framework:o,metadata:{error:n instanceof Error?n.message:"Unknown error",success:!1}}),n}finally{m.endTimer(`framework-convert-${o}`,{framework:o})}return r}}class Nt{static render(e){const{template:s,variables:a,styles:o,onCtaClick:r}=e,n=h.render({template:s,variables:a});return this.parseHTMLToJSX(n,o,r)}static parseHTMLToJSX(e,s,a){const o=document.createElement("div");o.innerHTML=e.trim();const r=n=>{const i=n.tagName.toLowerCase(),l={};Array.from(n.attributes).forEach(u=>{const p=u.name,d=u.value;switch(p){case"class":const _=d.split(" ").map(v=>s[v]||v).join(" ");l.className=_;break;case"data-testid":l["data-testid"]=d;break;case"onclick":i==="button"&&a&&(l.onClick=a);break;default:l[p]=d}});const c=[];return Array.from(n.childNodes).forEach(u=>{var p;if(u.nodeType===Node.TEXT_NODE){const d=(p=u.textContent)==null?void 0:p.trim();d&&c.push(d)}else u.nodeType===Node.ELEMENT_NODE&&c.push(r(u))}),g.createElement(i,l,...c)};return r(o.firstElementChild)}}class Et{static render(e){const{template:s,variables:a,styles:o}=e;let n=h.render({template:s,variables:a}).replace(/class=/g,":class=").replace(/onclick=/g,"@click=").replace(/\{\{([^}]+)\}\}/g,"{{ $1 }}");return Object.keys(o).forEach(i=>{const l=new RegExp(`:class="([^"]*\\b${i}\\b[^"]*)"`,"g");n=n.replace(l,(c,u)=>`:class="${u.split(" ").map(d=>o[d]||d).join(" ")}"`)}),n}}class Ft{static render(e){const{template:s,variables:a,styles:o}=e;let n=h.render({template:s,variables:a}).replace(/onclick=/g,"onClick=").replace(/\{\{([^}]+)\}\}/g,"{$1}");return Object.keys(o).forEach(i=>{const l=new RegExp(`class="([^"]*\\b${i}\\b[^"]*)"`,"g");n=n.replace(l,(c,u)=>`class="${u.split(" ").map(d=>o[d]||d).join(" ")}"`)}),n}}const V=({href:t,children:e,className:s,target:a,rel:o,onClick:r})=>{const n=t.startsWith("http://")||t.startsWith("https://")||t.startsWith("//"),i=l=>{r&&r(l),!n&&!a&&console.log(`[Jxion-Core] Link adapter: Navigating to ${t}`)};return f.jsx("a",{href:t,className:s,target:a||(n?"_blank":void 0),rel:o||(n?"noopener noreferrer":void 0),onClick:i,children:e})},Mt=()=>{try{const e=new Function('try { return require("next/link").default; } catch { return null; }')();if(!e)throw new Error("next/link not available");return({href:s,children:a,className:o,...r})=>f.jsx(e,{href:s,className:o,...r,children:a})}catch{return console.log("[Jxion-Core] Next.js Link not available, using default adapter"),V}},Jt=()=>{try{const e=new Function('try { return require("react-router-dom"); } catch { return null; }')();if(!e)throw new Error("react-router-dom not available");const{Link:s}=e;return({href:a,children:o,className:r,...n})=>f.jsx(s,{to:a,className:r,...n,children:o})}catch{return console.log("[Jxion-Core] React Router Link not available, using default adapter"),V}},de=()=>(console.log("[Jxion-Core] Using default Link adapter (standard <a> tag)"),V),H=({src:t,alt:e,width:s,height:a,className:o,style:r,loading:n="lazy",...i})=>(console.log(`[Jxion-Core] Image adapter: Loading ${t}`),f.jsx("img",{src:t,alt:e,width:typeof s=="number"?s:void 0,height:typeof a=="number"?a:void 0,className:o,style:{width:typeof s=="string"?s:void 0,height:typeof a=="string"?a:void 0,...r},loading:n})),Vt=()=>{try{const e=new Function('try { return require("next/image").default; } catch { return null; }')();if(!e)throw new Error("next/image not available");return({src:s,alt:a,width:o,height:r,className:n,style:i,fill:l,sizes:c,quality:u,priority:p,placeholder:d,blurDataURL:_,...v})=>(console.log(`[Jxion-Core] Next.js Image adapter: Loading ${s} (optimized)`),l?f.jsx(e,{src:s,alt:a,fill:!0,className:n,style:i,sizes:c,quality:u,priority:p,placeholder:d,blurDataURL:_,...v}):f.jsx(e,{src:s,alt:a,width:typeof o=="number"?o:void 0,height:typeof r=="number"?r:void 0,className:n,style:i,sizes:c,quality:u,priority:p,placeholder:d,blurDataURL:_,...v}))}catch{return console.log("[Jxion-Core] Next.js Image not available, using default adapter"),H}},ue=()=>(console.log("[Jxion-Core] Using default Image adapter (standard <img> tag)"),H),pe=()=>{try{return t=>{const{href:e,children:s,className:a,target:o,rel:r,onClick:n}=t,i=e.startsWith("http://")||e.startsWith("https://")||e.startsWith("//");return console.log(`[Jxion-Core] Svelte Link adapter: Navigating to ${e}`),{tag:"a",props:{href:e,class:a,target:o||(i?"_blank":void 0),rel:r||(i?"noopener noreferrer":void 0),onclick:n},children:s}}}catch{return console.log("[Jxion-Core] SvelteKit not available, using default Svelte adapter"),t=>{const{href:e,children:s,className:a,target:o,rel:r,onClick:n}=t,i=e.startsWith("http://")||e.startsWith("https://")||e.startsWith("//");return{tag:"a",props:{href:e,class:a,target:o||(i?"_blank":void 0),rel:r||(i?"noopener noreferrer":void 0),onclick:n},children:s}}}},At=()=>(console.log("[Jxion-Core] Using Svelte Link adapter"),pe()),me=()=>t=>{const{src:e,alt:s,width:a,height:o,className:r,style:n,loading:i="lazy"}=t;return console.log(`[Jxion-Core] Svelte Image adapter: Loading ${e}`),{tag:"img",props:{src:e,alt:s,width:typeof a=="number"?a:void 0,height:typeof o=="number"?o:void 0,class:r,style:n?Object.entries(n).map(([l,c])=>`${l}: ${c}`).join("; "):void 0,loading:i}}},Ht=()=>(console.log("[Jxion-Core] Using Svelte Image adapter"),me()),ve=()=>{try{const t=new Function('try { return require("vue-router"); } catch { return null; }')();if(!t)throw new Error("vue-router not available");const{RouterLink:e}=t;return{name:"JxionLink",props:{href:String,className:String,target:String,rel:String},setup(s,{slots:a,emit:o}){const r=s.href.startsWith("http://")||s.href.startsWith("https://")||s.href.startsWith("//"),n=i=>{s.onClick&&s.onClick(i),console.log(`[Jxion-Core] Vue Link adapter: Navigating to ${s.href}`)};return()=>{var i,l;return r||s.target?f.jsx("a",{href:s.href,className:s.className,target:s.target||(r?"_blank":void 0),rel:s.rel||(r?"noopener noreferrer":void 0),onClick:n,children:(i=a.default)==null?void 0:i.call(a)}):f.jsx(e,{to:s.href,className:s.className,onClick:n,children:(l=a.default)==null?void 0:l.call(a)})}}}}catch{return console.log("[Jxion-Core] vue-router not available, using default Vue adapter"),{name:"JxionLink",props:{href:String,className:String,target:String,rel:String},setup(t,{slots:e,emit:s}){const a=t.href.startsWith("http://")||t.href.startsWith("https://")||t.href.startsWith("//"),o=r=>{t.onClick&&t.onClick(r),console.log(`[Jxion-Core] Vue Link adapter: Navigating to ${t.href}`)};return()=>{var r;return f.jsx("a",{href:t.href,className:t.className,target:t.target||(a?"_blank":void 0),rel:t.rel||(a?"noopener noreferrer":void 0),onClick:o,children:(r=e.default)==null?void 0:r.call(e)})}}}}},Ot=()=>(console.log("[Jxion-Core] Using Vue Link adapter"),ve()),_e=()=>({name:"JxionImage",props:{src:String,alt:String,width:[Number,String],height:[Number,String],className:String,style:Object,loading:{type:String,default:"lazy",validator:t=>["lazy","eager"].includes(t)}},setup(t){return console.log(`[Jxion-Core] Vue Image adapter: Loading ${t.src}`),()=>f.jsx("img",{src:t.src,alt:t.alt,width:typeof t.width=="number"?t.width:void 0,height:typeof t.height=="number"?t.height:void 0,className:t.className,style:t.style,loading:t.loading})}}),Pt=()=>(console.log("[Jxion-Core] Using Vue Image adapter"),_e());let M=null,J=null;const Dt=()=>(M||(M=de(),console.log("[Jxion-Core] Link adapter initialized")),M),zt=()=>(J||(J=ue(),console.log("[Jxion-Core] Image adapter initialized")),J);export{Rt as FrameworkConverter,Wt as GreetingService,zt as Image,Nt as JSXRenderer,Dt as Link,Kt as MessageService,Ft as SolidJSRenderer,ee as SvelteRenderer,Ie as TemplateComposer,h as TemplateRenderer,Et as VueRenderer,Ce as buttonTemplate,be as cardTemplate,qt as componentRegistry,Bt as convertComponent,Yt as createContentManager,A as createJxionClient,Vt as createNextImageAdapter,Mt as createNextLinkAdapter,Jt as createReactRouterLinkAdapter,me as createSvelteImageAdapter,pe as createSvelteLinkAdapter,_e as createVueImageAdapter,ve as createVueLinkAdapter,ke as ctaTemplate,m as debug,Xt as extractComponentMetadata,je as footerTemplate,C as frameworkConfigs,Qt as getAvailableCategories,Zt as getAvailableFrameworks,x as getComponent,$e as getComponentMetadata,es as getComponentsByCategory,ts as getComponentsByFramework,ss as getContentManager,le as getFrameworkConfig,$t as getFrontendFrameworks,zt as getImage,ue as getImageAdapter,Dt as getLink,de as getLinkAdapter,ce as getMetaFrameworks,Lt as getMetaFrameworksForBase,Re as getResolvableComponents,Ht as getSvelteImageAdapter,At as getSvelteLinkAdapter,Pt as getVueImageAdapter,Ot as getVueLinkAdapter,as as greetingService,xe as headerTemplate,D as heroTemplate,we as inputTemplate,ye as layoutTemplate,ae as loadComponent,os as loadTemplateSchema,z as makeupTemplate,ns as messageService,Se as modalTemplate,W as motifsTemplate,K as newsletterTemplate,ne as resolveComponent,rs as searchComponents,G as sectionTemplate,It as supportsFeature,Le as supportsFramework,Te as templateUtils,T as useCallback,Xe as useCallbackAngular,Ke as useCallbackReact,Ye as useCallbackSolidJS,Be as useCallbackSvelte,qe as useCallbackVue,L as useContext,it as useContextAngular,at as useContextReact,rt as useContextSolidJS,nt as useContextSvelte,ot as useContextVue,E as useDebugValue,Tt as useDebugValueAngular,xt as useDebugValueReact,jt as useDebugValueSolidJS,St as useDebugValueSvelte,wt as useDebugValueVue,S as useEffect,Pe as useEffectAngular,Ve as useEffectReact,Oe as useEffectSolidJS,He as useEffectSvelte,Ae as useEffectVue,fe as useGreetings,N as useImperativeHandle,Ct as useImperativeHandleAngular,ft as useImperativeHandleReact,kt as useImperativeHandleSolidJS,yt as useImperativeHandleSvelte,bt as useImperativeHandleVue,R as useLayoutEffect,gt as useLayoutEffectAngular,mt as useLayoutEffectReact,ht as useLayoutEffectSolidJS,_t as useLayoutEffectSvelte,vt as useLayoutEffectVue,j as useMemo,We as useMemoAngular,De as useMemoReact,Ue as useMemoSolidJS,Ge as useMemoSvelte,ze as useMemoVue,ge as useMessages,I as useReducer,pt as useReducerAngular,lt as useReducerReact,ut as useReducerSolidJS,dt as useReducerSvelte,ct as useReducerVue,$ as useRef,st as useRefAngular,Qe as useRefReact,tt as useRefSolidJS,et as useRefSvelte,Ze as useRefVue,w as useState,Je as useStateAngular,Ne as useStateReact,Me as useStateSolidJS,Fe as useStateSvelte,Ee as useStateVue,U as whyNoirTemplate};
