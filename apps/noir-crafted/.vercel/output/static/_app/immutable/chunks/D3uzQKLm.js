import{_ as S}from"./C1FmrZbK.js";import{r as x}from"./8Ff3uIvk.js";const ht={html:`
    <div class="hero-wrapper">
      <div class="video">
        <video
          id="hero-video"
          muted
          playsinline
          preload="auto"
          src="/videos/output.mp4"
        ></video>
      </div>
      
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
  `};var F={defaultLocale:"en-US",locales:["en-US","tr-TR"]},G=function(a,i,e,s){function n(t){return t instanceof e?t:new e(function(o){o(t)})}return new(e||(e=Promise))(function(t,o){function l(c){try{r(s.next(c))}catch(d){o(d)}}function u(c){try{r(s.throw(c))}catch(d){o(d)}}function r(c){c.done?t(c.value):n(c.value).then(l,u)}r((s=s.apply(a,i||[])).next())})},M=function(a,i){var e={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},s,n,t,o;return o={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function l(r){return function(c){return u([r,c])}}function u(r){if(s)throw new TypeError("Generator is already executing.");for(;o&&(o=0,r[0]&&(e=0)),e;)try{if(s=1,n&&(t=r[0]&2?n.return:r[0]?n.throw||((t=n.return)&&t.call(n),0):n.next)&&!(t=t.call(n,r[1])).done)return t;switch(n=0,t&&(r=[r[0]&2,t.value]),r[0]){case 0:case 1:t=r;break;case 4:return e.label++,{value:r[1],done:!1};case 5:e.label++,n=r[1],r=[0];continue;case 7:r=e.ops.pop(),e.trys.pop();continue;default:if(t=e.trys,!(t=t.length>0&&t[t.length-1])&&(r[0]===6||r[0]===2)){e=0;continue}if(r[0]===3&&(!t||r[1]>t[0]&&r[1]<t[3])){e.label=r[1];break}if(r[0]===6&&e.label<t[1]){e.label=t[1],t=r;break}if(t&&e.label<t[2]){e.label=t[2],e.ops.push(r);break}t[2]&&e.ops.pop(),e.trys.pop();continue}r=i.call(a,e)}catch(c){r=[6,c],n=0}finally{s=t=0}if(r[0]&5)throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}},P={"en-US":function(){return S(()=>import("./CwXt3aYH.js"),[],import.meta.url).then(function(a){return a.default})},"tr-TR":function(){return S(()=>import("./imbpsnVk.js"),[],import.meta.url).then(function(a){return a.default})}},B=function(a){var i=a==null?void 0:a.toString().toLowerCase();switch(i){case"tr-tr":return"tr-TR";case"en-us":default:return"en-US"}},L=function(a){return G(void 0,void 0,void 0,function(){var i,e,s;return M(this,function(n){return i=B(a),e=(s=P[i])!==null&&s!==void 0?s:P["en-US"],[2,e()]})})},j=function(a){return B(a)};const D=Object.freeze(Object.defineProperty({__proto__:null,getDictionary:L,getSupportedLocale:j},Symbol.toStringTag,{value:"Module"}));var E=function(){return E=Object.assign||function(a){for(var i,e=1,s=arguments.length;e<s;e++){i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(a[n]=i[n])}return a},E.apply(this,arguments)},z=function(a,i,e,s){function n(t){return t instanceof e?t:new e(function(o){o(t)})}return new(e||(e=Promise))(function(t,o){function l(c){try{r(s.next(c))}catch(d){o(d)}}function u(c){try{r(s.throw(c))}catch(d){o(d)}}function r(c){c.done?t(c.value):n(c.value).then(l,u)}r((s=s.apply(a,i||[])).next())})},Y=function(a,i){var e={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},s,n,t,o;return o={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function l(r){return function(c){return u([r,c])}}function u(r){if(s)throw new TypeError("Generator is already executing.");for(;o&&(o=0,r[0]&&(e=0)),e;)try{if(s=1,n&&(t=r[0]&2?n.return:r[0]?n.throw||((t=n.return)&&t.call(n),0):n.next)&&!(t=t.call(n,r[1])).done)return t;switch(n=0,t&&(r=[r[0]&2,t.value]),r[0]){case 0:case 1:t=r;break;case 4:return e.label++,{value:r[1],done:!1};case 5:e.label++,n=r[1],r=[0];continue;case 7:r=e.ops.pop(),e.trys.pop();continue;default:if(t=e.trys,!(t=t.length>0&&t[t.length-1])&&(r[0]===6||r[0]===2)){e=0;continue}if(r[0]===3&&(!t||r[1]>t[0]&&r[1]<t[3])){e.label=r[1];break}if(r[0]===6&&e.label<t[1]){e.label=t[1],t=r;break}if(t&&e.label<t[2]){e.label=t[2],e.ops.push(r);break}t[2]&&e.ops.pop(),e.trys.pop();continue}r=i.call(a,e)}catch(c){r=[6,c],n=0}finally{s=t=0}if(r[0]&5)throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}},J={dictionary:null,status:"idle",error:null},K="en-US",X=function(a,i){var e,s,n=(e=i==null?void 0:i.fallbackLocale)!==null&&e!==void 0?e:K,t=(s=i==null?void 0:i.skip)!==null&&s!==void 0?s:!1,o=x.useMemo(function(){return j(a??n)},[a,n]),l=x.useState(J),u=l[0],r=l[1],c=x.useRef(t);x.useEffect(function(){c.current=t},[t]),x.useEffect(function(){if(c.current){r(J);return}var v=!0;r(function(p){return E(E({},p),{status:"loading",error:null})});var m=function(){return z(void 0,void 0,void 0,function(){var p,f;return Y(this,function(y){switch(y.label){case 0:return y.trys.push([0,2,,3]),[4,L(o)];case 1:return p=y.sent(),v?(r({dictionary:p??null,status:"success",error:null}),[3,3]):[2];case 2:return f=y.sent(),v?(r({dictionary:null,status:"error",error:f}),[3,3]):[2];case 3:return[2]}})})};return m(),function(){v=!1}},[o]);var d=u.dictionary,h=u.status,I=u.error;return{dictionary:d,status:h,isLoading:h==="loading",isSuccess:h==="success",isError:h==="error",error:I,locale:o}},q=function(a,i,e){if(e===void 0&&(e=""),!a)return e;for(var s=a,n=0,t=i;n<t.length;n++){var o=t[n];if(s&&typeof s=="object"&&o in s)s=s[o];else return e}return typeof s=="string"?s:e},Q={},T=function(){return T=Object.assign||function(a){for(var i,e=1,s=arguments.length;e<s;e++){i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(a[n]=i[n])}return a},T.apply(this,arguments)},C=function(a,i,e,s){function n(t){return t instanceof e?t:new e(function(o){o(t)})}return new(e||(e=Promise))(function(t,o){function l(c){try{r(s.next(c))}catch(d){o(d)}}function u(c){try{r(s.throw(c))}catch(d){o(d)}}function r(c){c.done?t(c.value):n(c.value).then(l,u)}r((s=s.apply(a,[])).next())})},k=function(a,i){var e={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},s,n,t,o;return o={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function l(r){return function(c){return u([r,c])}}function u(r){if(s)throw new TypeError("Generator is already executing.");for(;o&&(o=0,r[0]&&(e=0)),e;)try{if(s=1,n&&(t=r[0]&2?n.return:r[0]?n.throw||((t=n.return)&&t.call(n),0):n.next)&&!(t=t.call(n,r[1])).done)return t;switch(n=0,t&&(r=[r[0]&2,t.value]),r[0]){case 0:case 1:t=r;break;case 4:return e.label++,{value:r[1],done:!1};case 5:e.label++,n=r[1],r=[0];continue;case 7:r=e.ops.pop(),e.trys.pop();continue;default:if(t=e.trys,!(t=t.length>0&&t[t.length-1])&&(r[0]===6||r[0]===2)){e=0;continue}if(r[0]===3&&(!t||r[1]>t[0]&&r[1]<t[3])){e.label=r[1];break}if(r[0]===6&&e.label<t[1]){e.label=t[1],t=r;break}if(t&&e.label<t[2]){e.label=t[2],e.ops.push(r);break}t[2]&&e.ops.pop(),e.trys.pop();continue}r=i.call(a,e)}catch(c){r=[6,c],n=0}finally{s=t=0}if(r[0]&5)throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}},N=function(a){var i,e;return typeof window<"u"?(i=window.__ENV__)===null||i===void 0?void 0:i[a]:typeof process<"u"?(e=Q)===null||e===void 0?void 0:e[a]:void 0},W={baseUrl:N("NEXT_PUBLIC_API_BASE")||N("VITE_API_BASE")||"http://localhost:3005",enabled:!0},_=T({},W);function Z(a){_=T(T({},_),a),console.log("[Jxion-i18n] Backend configured:",_)}function tt(a,i){return C(this,void 0,void 0,function(){var e,s,n,t;return k(this,function(o){switch(o.label){case 0:if(!_.enabled||!_.baseUrl)return[2,null];o.label=1;case 1:return o.trys.push([1,4,,5]),[4,fetch("".concat(_.baseUrl,"/trpc/getTranslation"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:a,locale:i})})];case 2:if(e=o.sent(),!e.ok)throw new Error("Backend API error: ".concat(e.status));return[4,e.json()];case 3:return s=o.sent(),[2,((t=s.result)===null||t===void 0?void 0:t.data)||null];case 4:return n=o.sent(),console.warn("[Jxion-i18n] Backend fetch failed for ".concat(a,", using fallback:"),n),[2,null];case 5:return[2]}})})}function et(a,i){return C(this,void 0,void 0,function(){var e,s,n,t;return k(this,function(o){switch(o.label){case 0:if(!_.enabled||!_.baseUrl)return[2,null];o.label=1;case 1:return o.trys.push([1,4,,5]),[4,fetch("".concat(_.baseUrl,"/trpc/getTranslations"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({keys:a,locale:i})})];case 2:if(e=o.sent(),!e.ok)throw new Error("Backend API error: ".concat(e.status));return[4,e.json()];case 3:return s=o.sent(),[2,((t=s.result)===null||t===void 0?void 0:t.data)||null];case 4:return n=o.sent(),console.warn("[Jxion-i18n] Backend fetch failed for ".concat(a.length," keys, using fallback:"),n),[2,null];case 5:return[2]}})})}function rt(a,i,e){return C(this,void 0,void 0,function(){var s,n,t,o,l;return k(this,function(u){switch(u.label){case 0:if(!_.enabled||!_.baseUrl)return[2,!1];u.label=1;case 1:return u.trys.push([1,4,,5]),[4,fetch("".concat(_.baseUrl,"/trpc/updateTranslation"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:a,locale:i,value:e})})];case 2:if(s=u.sent(),!s.ok)throw new Error("Backend API error: ".concat(s.status));return[4,s.json()];case 3:return n=u.sent(),[2,((l=(o=n.result)===null||o===void 0?void 0:o.data)===null||l===void 0?void 0:l.success)===!0];case 4:return t=u.sent(),console.error("[Jxion-i18n] Backend update failed for ".concat(a,":"),t),[2,!1];case 5:return[2]}})})}function nt(a){return C(this,void 0,void 0,function(){var i,e,s,n,t;return k(this,function(o){switch(o.label){case 0:if(!_.enabled||!_.baseUrl)return[2,!1];o.label=1;case 1:return o.trys.push([1,4,,5]),[4,fetch("".concat(_.baseUrl,"/trpc/updateTranslations"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({translations:a})})];case 2:if(i=o.sent(),!i.ok)throw new Error("Backend API error: ".concat(i.status));return[4,i.json()];case 3:return e=o.sent(),[2,((t=(n=e.result)===null||n===void 0?void 0:n.data)===null||t===void 0?void 0:t.success)===!0];case 4:return s=o.sent(),console.error("[Jxion-i18n] Backend batch update failed:",s),[2,!1];case 5:return[2]}})})}function st(a){return C(this,void 0,void 0,function(){var i,e,s,n,t;return k(this,function(o){switch(o.label){case 0:if(!_.enabled||!_.baseUrl)return[2,!1];o.label=1;case 1:return o.trys.push([1,4,,5]),[4,fetch("".concat(_.baseUrl,"/trpc/clearTranslationCache"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({locale:a})})];case 2:if(i=o.sent(),!i.ok)throw new Error("Backend API error: ".concat(i.status));return[4,i.json()];case 3:return e=o.sent(),[2,((t=(n=e.result)===null||n===void 0?void 0:n.data)===null||t===void 0?void 0:t.success)===!0];case 4:return s=o.sent(),console.error("[Jxion-i18n] Backend cache clear failed:",s),[2,!1];case 5:return[2]}})})}var b=function(a,i,e,s){function n(t){return t instanceof e?t:new e(function(o){o(t)})}return new(e||(e=Promise))(function(t,o){function l(c){try{r(s.next(c))}catch(d){o(d)}}function u(c){try{r(s.throw(c))}catch(d){o(d)}}function r(c){c.done?t(c.value):n(c.value).then(l,u)}r((s=s.apply(a,i||[])).next())})},g=function(a,i){var e={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},s,n,t,o;return o={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function l(r){return function(c){return u([r,c])}}function u(r){if(s)throw new TypeError("Generator is already executing.");for(;o&&(o=0,r[0]&&(e=0)),e;)try{if(s=1,n&&(t=r[0]&2?n.return:r[0]?n.throw||((t=n.return)&&t.call(n),0):n.next)&&!(t=t.call(n,r[1])).done)return t;switch(n=0,t&&(r=[r[0]&2,t.value]),r[0]){case 0:case 1:t=r;break;case 4:return e.label++,{value:r[1],done:!1};case 5:e.label++,n=r[1],r=[0];continue;case 7:r=e.ops.pop(),e.trys.pop();continue;default:if(t=e.trys,!(t=t.length>0&&t[t.length-1])&&(r[0]===6||r[0]===2)){e=0;continue}if(r[0]===3&&(!t||r[1]>t[0]&&r[1]<t[3])){e.label=r[1];break}if(r[0]===6&&e.label<t[1]){e.label=t[1],t=r;break}if(t&&e.label<t[2]){e.label=t[2],e.ops.push(r);break}t[2]&&e.ops.pop(),e.trys.pop();continue}r=i.call(a,e)}catch(c){r=[6,c],n=0}finally{s=t=0}if(r[0]&5)throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}},H=function(a,i,e){if(e||arguments.length===2)for(var s=0,n=i.length,t;s<n;s++)(t||!(s in i))&&(t||(t=Array.prototype.slice.call(i,0,s)),t[s]=i[s]);return a.concat(t||Array.prototype.slice.call(i))},w=new Map,at=5*60*1e3,it=30*60*1e3;function A(a){return b(this,void 0,void 0,function(){var i,e,s,n,t,o,l,u;return g(this,function(r){switch(r.label){case 0:if(i=a,e=Date.now(),w.has(i)){if(s=w.get(i),n=e-s.timestamp,n<at)return console.log("[Jxion-i18n] Cache HIT (fresh): ".concat(a)),[2,s.data];if(n<it)return console.log("[Jxion-i18n] Cache HIT (stale): ".concat(a," - revalidating in background")),ot(a).catch(console.error),[2,s.data]}return console.log("[Jxion-i18n] Cache MISS: ".concat(a," - fetching...")),t={},o=null,o?(t=o,console.log("[Jxion-i18n] Loaded from backend: ".concat(a)),[3,5]):[3,1];case 1:return r.trys.push([1,4,,5]),[4,S(()=>Promise.resolve().then(()=>D),void 0,import.meta.url)];case 2:return l=r.sent().getDictionary,[4,l(a)];case 3:return t=r.sent(),console.log("[Jxion-i18n] Loaded from dictionary: ".concat(a)),[3,5];case 4:return u=r.sent(),console.error("[Jxion-i18n] Failed to load translations for locale: ".concat(a),u),a!=="tr-TR"?[2,A("tr-TR")]:[2,{}];case 5:return w.set(i,{data:t,timestamp:e,stale:!1}),[2,t]}})})}function ot(a){return b(this,void 0,void 0,function(){var i,e,s;return g(this,function(n){switch(n.label){case 0:return n.trys.push([0,3,,4]),[4,S(()=>Promise.resolve().then(()=>D),void 0,import.meta.url)];case 1:return i=n.sent().getDictionary,[4,i(a)];case 2:return e=n.sent(),w.set(a,{data:e,timestamp:Date.now(),stale:!1}),console.log("[Jxion-i18n] Cache revalidated: ".concat(a)),[3,4];case 3:return s=n.sent(),console.error("[Jxion-i18n] Revalidation failed for ".concat(a,":"),s),[3,4];case 4:return[2]}})})}function V(a,i){return i.split(".").reduce(function(e,s){return e&&typeof e=="object"?e[s]:void 0},a)}function U(a,i){return i?a.replace(/\{(\w+)\}/g,function(e,s){return i[s]!==void 0?String(i[s]):e}):a}var R=function(a){for(var i=[],e=1;e<arguments.length;e++)i[e-1]=arguments[e];return b(void 0,H([a],i,!0),void 0,function(s,n,t){var o,l,u,r;return n===void 0&&(n="tr-TR"),g(this,function(c){switch(c.label){case 0:return c.trys.push([0,3,,4]),[4,tt(s,n)];case 1:return o=c.sent(),o?[2,U(o,t)]:[4,A(n)];case 2:return l=c.sent(),u=V(l,s),u===void 0?(console.warn("[Jxion-i18n] Translation key not found: ".concat(s," (locale: ").concat(n,")")),[2,s]):[2,U(String(u),t)];case 3:return r=c.sent(),console.error("[Jxion-i18n] Error getting translation for key: ".concat(s),r),[2,s];case 4:return[2]}})})},ct=function(a){for(var i=[],e=1;e<arguments.length;e++)i[e-1]=arguments[e];return b(void 0,H([a],i,!0),void 0,function(s,n){var t,o,v,l,u,f,h,r,c,d,f,h,I,v,m,p,f;return n===void 0&&(n="tr-TR"),g(this,function(y){switch(y.label){case 0:return y.trys.push([0,3,,4]),[4,et(s,n)];case 1:return t=y.sent(),[4,A(n)];case 2:for(o=y.sent(),v={},l=0,u=s;l<u.length;l++)f=u[l],h=V(o,f),v[f]=h!==void 0?String(h):f;if(t)for(r=0,c=Object.entries(t);r<c.length;r++)d=c[r],f=d[0],h=d[1],h&&h!==f&&typeof h=="string"&&(v[f]=h);return[2,v];case 3:for(I=y.sent(),console.error("[Jxion-i18n] Error getting translations:",I),v={},m=0,p=s;m<p.length;m++)f=p[m],v[f]=f;return[2,v];case 4:return[2]}})})},lt=function(a){return a===void 0&&(a="tr-TR"),{t:function(i,e){return R(i,a,e)},locale:a,update:function(i,e){return $(i,a,e)}}},O=function(a){return b(void 0,void 0,void 0,function(){return g(this,function(i){switch(i.label){case 0:return a?(w.delete(a),console.log("[Jxion-i18n] Cache cleared: ".concat(a))):(w.clear(),console.log("[Jxion-i18n] Cache cleared: all locales")),[4,st(a)];case 1:return i.sent(),[2]}})})},ut=function(a){Z(a)},$=function(a,i,e){return b(void 0,void 0,void 0,function(){var s;return g(this,function(n){switch(n.label){case 0:return console.log("[Jxion-i18n] Updating translation: ".concat(a," (").concat(i,")")),[4,rt(a,i,e)];case 1:return s=n.sent(),s?[4,O(i)]:[3,3];case 2:n.sent(),console.log("[Jxion-i18n] Translation updated and cache cleared: ".concat(a)),n.label=3;case 3:return[2,s]}})})},dt=function(a){return b(void 0,void 0,void 0,function(){var i,e,s,n,t,o;return g(this,function(l){switch(l.label){case 0:return console.log("[Jxion-i18n] Updating ".concat(a.length," translations")),[4,nt(a)];case 1:if(i=l.sent(),!i)return[3,6];e=new Set(a.map(function(u){return u.locale})),s=Array.from(e),n=0,t=s,l.label=2;case 2:return n<t.length?(o=t[n],[4,O(o)]):[3,5];case 3:l.sent(),l.label=4;case 4:return n++,[3,2];case 5:console.log("[Jxion-i18n] Translations updated and cache cleared"),l.label=6;case 6:return[2,i]}})})};const vt=Object.freeze(Object.defineProperty({__proto__:null,clearTranslationCache:O,configureI18nBackend:ut,getCorrectFromDictionary:q,getDictionary:L,getSupportedLocale:j,getTranslation:R,getTranslations:ct,i18n:F,updateTranslation:$,updateTranslations:dt,useDictionary:X,useTranslation:lt},Symbol.toStringTag,{value:"Module"}));export{L as a,O as c,ct as g,ht as h,vt as i};
