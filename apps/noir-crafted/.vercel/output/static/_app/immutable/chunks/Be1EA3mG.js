import{d as r}from"./8Ff3uIvk.js";import{h as u}from"./D3uzQKLm.js";import{s as _}from"./pA_TqmMh.js";import{T as l,S as h}from"./FQXsMPHc.js";const g={html:`
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
  `,variables:["message","phoneNumber","contactLabel"]},v={html:`
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
  `,variables:["title","sections"]},f={html:`
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
  `,variables:["title","subtitle","items"]},y={html:`
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
  `,variables:["title","description","placeholder","button"]},m={hero:{name:"Hero",version:"1.0.0",category:"Layout",description:"Hero section component with title, subtitle, description, and CTA",props:{title:"string",subtitle:"string",description:"string",ctaText:"string",statsValue:"string",statsLabel:"string",stats:"string",statslabel:"string",cardSubtitle:"string",testId:"string",onCtaClick:"function"},examples:[{title:"Basic Hero",description:"Simple hero section with title and CTA",code:`<Hero 
  title="Welcome to Jxion"
  subtitle="Multi-Framework Components"
  description="Build amazing applications"
  ctaText="Get Started"
/>`,framework:"react"},{title:"Hero with Stats",description:"Hero section with statistics card",code:`<Hero 
  title="Welcome to Jxion"
  subtitle="Multi-Framework Components"
  description="Build amazing applications"
  ctaText="Get Started"
  statsValue="7"
  statsLabel="Years Experience"
  cardSubtitle="Trusted by developers"
/>`,framework:"vue"}],frameworks:["react","vue","svelte","solidjs","angular"]},makeup:{name:"MakeUp",version:"1.0.0",category:"Layout",description:"MakeUp banner component with message and contact info",props:{message:"string",phoneNumber:"string",contactLabel:"string"},examples:[],frameworks:["react","vue","svelte","solidjs","angular"]},keyFeatures:{name:"KeyFeatures",version:"1.0.0",category:"Content",description:"Key features section with title, subtitle, and feature cards",props:{title:"string",subtitle:"string",common_cta:"string",common_cta_link:"string"},examples:[],frameworks:["react","vue","svelte","solidjs","angular"]},featuresCarousel:{name:"FeaturesCarousel",version:"1.0.0",category:"Content",description:"Carousel of feature cards with icons and descriptions",props:{title:"string",subtitle:"string",common_cta:"string",list:"array"},examples:[],frameworks:["react","vue","svelte","solidjs","angular"]},integrationSolutions:{name:"IntegrationSolutions",version:"1.0.0",category:"Content",description:"Integration solutions grid with items and features",props:{title:"string",subtitle:"string",common_cta:"string",common_cta_link:"string",items:"array"},examples:[],frameworks:["react","vue","svelte","solidjs","angular"]},whatsOurImpact:{name:"WhatsOurImpact",version:"1.0.0",category:"Content",description:"Impact stats section with title and statistics",props:{title:"object",stats:"array"},examples:[],frameworks:["react","vue","svelte","solidjs","angular"]},whyYesildefter:{name:"WhyYesildefter",version:"1.0.0",category:"Content",description:"Why choose section with benefits and CTA",props:{title:"string",subtitle:"string",description:"string",highlight:"string",cta:"string",benefits:"array"},examples:[],frameworks:["react","vue","svelte","solidjs","angular"]},nextSteps:{name:"NextSteps",version:"1.0.0",category:"Content",description:"Next steps section with action items",props:{title:"string",subtitle:"string",list:"array"},examples:[],frameworks:["react","vue","svelte","solidjs","angular"]},section:{name:"Section",version:"1.0.0",category:"Layout",description:"Generic section component for flexible content display",props:{variant:"string",size:"string",title:"string",subtitle:"string",description:"string",content:"string",footerContent:"string"},examples:[],frameworks:["react","vue","svelte","solidjs","angular"]},whyNoir:{name:"WhyNoir",version:"1.0.0",category:"Content",description:"Why choose Noir section with benefits",props:{title:"string",sections:"array"},examples:[],frameworks:["react","vue","svelte","solidjs","angular"]},motifs:{name:"Motifs",version:"1.0.0",category:"Content",description:"Design motifs section with items grid",props:{title:"string",subtitle:"string",items:"array"},examples:[],frameworks:["react","vue","svelte","solidjs","angular"]},newsletter:{name:"Newsletter",version:"1.0.0",category:"Content",description:"Newsletter signup section",props:{title:"string",description:"string",placeholder:"string",button:"string"},examples:[],frameworks:["react","vue","svelte","solidjs","angular"]}};function p(t){r.startTimer(`getComponent-${t}`),r.logComponentRegistry("get",t,{availableComponents:Object.keys(m)});const e=m[t];return e?r.component("info",`Found component: ${t}`,{component:t,operation:"get",metadata:{version:e.version,category:e.category,frameworks:e.frameworks,propCount:Object.keys(e.props).length,exampleCount:e.examples.length}}):r.component("warn",`Component not found: ${t}`,{component:t,operation:"get",metadata:{availableComponents:Object.keys(m)}}),r.endTimer(`getComponent-${t}`,{component:t}),e}const w={html:`
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
  `,variables:["title","subtitle","common_cta","common_cta_link"]},b={html:`
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
  `,variables:["title","subtitle","common_cta","list"]},k={html:`
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
  `,variables:["title","subtitle","common_cta","common_cta_link","items"]},C={html:`
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
  `,variables:["title","stats"]},x={html:`
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
  `,variables:["title","subtitle","description","highlight","cta","benefits"]},T={html:`
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
  `,variables:["title","subtitle","list"]},S={hero:u,makeup:g,keyFeatures:w,featuresCarousel:b,integrationSolutions:k,whatsOurImpact:C,whyYesildefter:x,nextSteps:T,section:_,whyNoir:v,motifs:f,newsletter:y};function j(t){const e=S[t];if(!e)throw new Error(`Template not found for component: ${t}`);return e}async function H(t){const{componentId:e,framework:s,props:a}=t,c=p(e);if(!c)throw new Error(`Component not found in registry: ${e}`);if(s!=="html"&&!c.frameworks.includes(s))throw new Error(`Framework ${s} not supported for component ${e}. Supported: ${c.frameworks.join(", ")}`);const i=j(e);let o="",d;if(s==="html")o=l.render({template:i.html,variables:a});else if(s==="svelte"){const n=i.svelte||i[s];n?(o=h.render({template:i.html,variables:a,styles:{}}),d=l.render({template:n,variables:a})):(console.warn(`[ComponentLoader] Svelte template not found for ${e}, using HTML template`),o=l.render({template:i.html,variables:a}))}else{o=l.render({template:i.html,variables:a});const n=i[s];n&&(d=l.render({template:n,variables:a}))}return{html:o,code:d,metadata:c}}function I(t){return p(t)||null}export{I as g,H as l};
