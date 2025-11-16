import { c as create_ssr_component, b as add_attribute, v as validate_component, e as escape } from "./ssr.js";
import { f as formatCurrency } from "./format.js";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let { variant = "default" } = $$props;
  let { padding = "md" } = $$props;
  let { className = "" } = $$props;
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  classes = `
		${variant === "default" ? "bg-white" : ""}
		${variant === "elevated" ? "bg-white shadow-card-lg" : ""}
		${variant === "outlined" ? "bg-white border border-noir-gray-200" : ""}
		${padding === "none" ? "" : padding === "sm" ? "p-4" : padding === "md" ? "p-6" : "p-8"}
		${className}
	`;
  return `<div${add_attribute("class", classes, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const ProductCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formattedPrice;
  let { product } = $$props;
  let { variant = "default" } = $$props;
  if ($$props.product === void 0 && $$bindings.product && product !== void 0) $$bindings.product(product);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  formattedPrice = formatCurrency(product.price);
  return `${validate_component(Card, "Card").$$render(
    $$result,
    {
      variant: "default",
      className: "group cursor-pointer hover:shadow-card-lg transition-shadow"
    },
    {},
    {
      default: () => {
        return `<a href="${"/products/" + escape(product.id, true)}" class="block"> <div class="relative aspect-square mb-4 bg-noir-gray-50 rounded overflow-hidden"><img${add_attribute("src", product.image, 0)}${add_attribute("alt", product.name, 0)} class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" loading="lazy"></div>  <div class="space-y-2"><h3 class="font-serif text-lg font-semibold text-noir-black group-hover:text-noir-gray-700 transition-colors">${escape(product.name)}</h3> <p class="text-sm text-noir-gray-600 line-clamp-2">${escape(product.description)}</p> ${variant !== "compact" ? `<div class="flex items-center justify-between pt-2"><span class="text-lg font-semibold text-noir-black">${escape(formattedPrice)}</span> ${!product.inStock ? `<span class="text-xs text-noir-gray-500 uppercase" data-svelte-h="svelte-1rfbmo7">Stokta Yok</span>` : ``}</div>` : ``}</div></a>`;
      }
    }
  )}`;
});
export {
  ProductCard as P
};
