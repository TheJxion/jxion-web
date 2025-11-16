import { c as create_ssr_component, e as escape, d as each, v as validate_component } from "./ssr.js";
import { P as ProductCard } from "./ProductCard.js";
const ProductSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { subtitle = "" } = $$props;
  let { products = [] } = $$props;
  let { variant = "grid" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0) $$bindings.subtitle(subtitle);
  if ($$props.products === void 0 && $$bindings.products && products !== void 0) $$bindings.products(products);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  return `<section class="py-16 md:py-24 bg-white"><div class="container-custom"> <div class="text-center mb-12 space-y-4"><h2 class="text-4xl md:text-5xl font-serif text-noir-black">${escape(title)}</h2> ${subtitle ? `<p class="text-lg text-noir-gray-600 font-sans max-w-2xl mx-auto">${escape(subtitle)}</p>` : ``}</div>  ${variant === "grid" ? `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">${each(products, (product) => {
    return `${validate_component(ProductCard, "ProductCard").$$render($$result, { product }, {}, {})}`;
  })}</div>` : ` <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">${each(products, (product) => {
    return `${validate_component(ProductCard, "ProductCard").$$render($$result, { product }, {}, {})}`;
  })}</div>`}</div></section>`;
});
export {
  ProductSection as P
};
