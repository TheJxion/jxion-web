import { c as create_ssr_component, e as escape, v as validate_component, b as add_attribute, a as subscribe, d as each } from "../../chunks/ssr.js";
import { B as Button } from "../../chunks/Button.js";
import { P as ProductSection } from "../../chunks/ProductSection.js";
import { p as products } from "../../chunks/products.js";
import { c as content } from "../../chunks/content.js";
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { subtitle = "" } = $$props;
  let { description } = $$props;
  let { primaryCta } = $$props;
  let { secondaryCta } = $$props;
  let { imageUrl = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0) $$bindings.subtitle(subtitle);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.primaryCta === void 0 && $$bindings.primaryCta && primaryCta !== void 0) $$bindings.primaryCta(primaryCta);
  if ($$props.secondaryCta === void 0 && $$bindings.secondaryCta && secondaryCta !== void 0) $$bindings.secondaryCta(secondaryCta);
  if ($$props.imageUrl === void 0 && $$bindings.imageUrl && imageUrl !== void 0) $$bindings.imageUrl(imageUrl);
  return `<section class="min-h-screen flex items-center bg-white"><div class="container-custom w-full"><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> <div class="space-y-8"><div class="space-y-4">${subtitle ? `<p class="text-sm uppercase tracking-wider text-noir-gray-600 font-sans">${escape(subtitle)}</p>` : ``} <h1 class="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-noir-black"><!-- HTML_TAG_START -->${title.split("\n").map((line) => `${line}<br />`).join("")}<!-- HTML_TAG_END --></h1> ${description ? `<p class="text-lg text-noir-gray-700 font-sans max-w-xl leading-relaxed">${escape(description)}</p>` : ``}</div>  <div class="flex flex-col sm:flex-row gap-4">${primaryCta ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      href: primaryCta.href,
      variant: "primary",
      size: "lg"
    },
    {},
    {
      default: () => {
        return `${escape(primaryCta.text)}`;
      }
    }
  )}` : ``} ${secondaryCta ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      href: secondaryCta.href,
      variant: "text",
      size: "lg"
    },
    {},
    {
      default: () => {
        return `${escape(secondaryCta.text)}`;
      }
    }
  )}` : ``}</div></div>  ${imageUrl ? `<div class="relative h-[600px] lg:h-[800px] w-full"><img${add_attribute("src", imageUrl, 0)} alt="Noir Jewelry" class="w-full h-full object-cover object-center" loading="eager"></div>` : ` <div class="relative h-[600px] lg:h-[800px] w-full bg-noir-gray-100 flex items-center justify-center" data-svelte-h="svelte-6q7eap"><span class="text-noir-gray-400 text-sm">Hero Image</span></div>`}</div></div></section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let featuredProducts;
  let $products, $$unsubscribe_products;
  $$unsubscribe_products = subscribe(products, (value) => $products = value);
  const heroContent = content.home.hero;
  const featuredContent = content.home.featured;
  const whyNoirContent = content.home.whyNoir;
  const motifsContent = content.home.motifs;
  const newsletterContent = content.home.newsletter;
  featuredProducts = $products.slice(0, 8);
  $$unsubscribe_products();
  return `${$$result.head += `<!-- HEAD_svelte-16im18h_START -->${$$result.title = `<title>Noir Crafted - ${escape(content.site.tagline)}</title>`, ""}<meta name="description"${add_attribute("content", content.site.description, 0)}><!-- HEAD_svelte-16im18h_END -->`, ""}  ${validate_component(Hero, "Hero").$$render(
    $$result,
    {
      title: heroContent.title,
      subtitle: heroContent.subtitle,
      description: heroContent.description,
      primaryCta: {
        text: heroContent.primaryCta,
        href: "/collections/kolye"
      },
      secondaryCta: {
        text: heroContent.secondaryCta,
        href: "/about"
      },
      imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=1600&fit=crop"
    },
    {},
    {}
  )}  ${validate_component(ProductSection, "ProductSection").$$render(
    $$result,
    {
      title: featuredContent.title,
      subtitle: featuredContent.subtitle,
      products: featuredProducts,
      variant: "grid"
    },
    {},
    {}
  )}  <section class="py-16 md:py-24 bg-noir-deep-purple-50"><div class="container-custom"><div class="max-w-4xl mx-auto text-center space-y-8"><h2 class="text-4xl md:text-5xl font-serif text-noir-black">${escape(whyNoirContent.title)}</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">${each(whyNoirContent.sections, (section) => {
    return `<div class="space-y-4"><div class="w-16 h-16 mx-auto bg-noir-primary rounded-full flex items-center justify-center text-2xl">${escape(section.icon)}</div> <h3 class="text-xl font-serif font-semibold text-noir-black">${escape(section.title)}</h3> <p class="text-noir-deep-purple-600 font-sans">${escape(section.description)}</p> </div>`;
  })}</div></div></div></section>  <section class="py-16 md:py-24 bg-white"><div class="container-custom"><div class="text-center mb-12 space-y-4"><h2 class="text-4xl md:text-5xl font-serif text-noir-black">${escape(motifsContent.title)}</h2> <p class="text-lg text-noir-deep-purple-600 font-sans max-w-2xl mx-auto">${escape(motifsContent.subtitle)}</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">${each(motifsContent.items, (motif, index) => {
    let hrefs = [
      "/collections/kolye",
      "/collections/yuzuk",
      "/collections/bilezik",
      "/collections/sahmeran"
    ], images = [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-8a0f72382c2d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop"
    ];
    return `  <a${add_attribute("href", hrefs[index], 0)} class="group relative h-64 overflow-hidden rounded-lg bg-noir-deep-purple-100"><div class="absolute inset-0 bg-gradient-to-br from-noir-black/60 to-transparent z-10"></div> <img${add_attribute("src", images[index], 0)}${add_attribute("alt", motif.name, 0)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy"> <div class="absolute bottom-0 left-0 right-0 p-6 z-20"><h3 class="text-2xl font-serif font-semibold text-white mb-2">${escape(motif.name)}</h3> <p class="text-sm text-white/90 font-sans">${escape(motif.description)}</p></div> </a>`;
  })}</div></div></section>  <section class="py-16 md:py-24 bg-noir-black text-white"><div class="container-custom"><div class="max-w-2xl mx-auto text-center space-y-8"><h2 class="text-4xl md:text-5xl font-serif">${escape(newsletterContent.title)}</h2> <p class="text-lg text-noir-deep-purple-400 font-sans">${escape(newsletterContent.description)}</p> <form class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"><input type="email"${add_attribute("placeholder", newsletterContent.placeholder, 0)} class="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-noir-primary focus:border-transparent font-sans" required> <button type="submit" class="px-8 py-4 bg-noir-primary text-noir-black font-semibold rounded-full hover:bg-opacity-90 transition-all font-sans">${escape(newsletterContent.button)}</button></form></div></div></section>`;
});
export {
  Page as default
};
