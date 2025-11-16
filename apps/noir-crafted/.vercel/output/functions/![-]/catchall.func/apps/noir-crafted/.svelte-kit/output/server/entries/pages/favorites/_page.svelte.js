import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component, d as each } from "../../../chunks/ssr.js";
import { f as favorites } from "../../../chunks/favorites.js";
import { c as content } from "../../../chunks/content.js";
import { P as ProductCard } from "../../../chunks/ProductCard.js";
import { B as Button } from "../../../chunks/Button.js";
import { g as goto } from "../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let favoriteProducts;
  let isEmpty;
  let $favorites, $$unsubscribe_favorites;
  $$unsubscribe_favorites = subscribe(favorites, (value) => $favorites = value);
  function handleDiscover() {
    goto();
  }
  favoriteProducts = $favorites;
  isEmpty = favoriteProducts.length === 0;
  $$unsubscribe_favorites();
  return `${$$result.head += `<!-- HEAD_svelte-64dlm2_START -->${$$result.title = `<title>${escape(content.ui.favorites)} - Noir Crafted</title>`, ""}<!-- HEAD_svelte-64dlm2_END -->`, ""} ${isEmpty ? ` <section class="py-16 md:py-24 bg-white min-h-[60vh] flex items-center"><div class="container-custom text-center space-y-6"><div class="space-y-4"><h1 class="text-4xl md:text-5xl font-serif text-noir-black">${escape(content.ui.favorites)}</h1> <p class="text-lg text-noir-gray-600 font-sans" data-svelte-h="svelte-1k6uwes">Henüz favori ürününüz bulunmamaktadır.</p> <p class="text-base text-noir-gray-500 font-sans" data-svelte-h="svelte-5dkbeb">Beğendiğiniz ürünleri favorilerinize ekleyerek daha sonra kolayca bulabilirsiniz.</p></div> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "primary",
      size: "lg",
      onClick: handleDiscover
    },
    {},
    {
      default: () => {
        return `${escape(content.ui.discover)}`;
      }
    }
  )}</div></section>` : ` <section class="py-8 md:py-16 bg-white min-h-[60vh]"><div class="container-custom"><h1 class="text-4xl md:text-5xl font-serif text-noir-black mb-8">${escape(content.ui.favorites)}</h1> <p class="text-base text-noir-gray-600 font-sans mb-8">${escape(favoriteProducts.length)} ürün favorilerinizde</p> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">${each(favoriteProducts, (product) => {
    return `${validate_component(ProductCard, "ProductCard").$$render($$result, { product }, {}, {})}`;
  })}</div></div></section>`}`;
});
export {
  Page as default
};
