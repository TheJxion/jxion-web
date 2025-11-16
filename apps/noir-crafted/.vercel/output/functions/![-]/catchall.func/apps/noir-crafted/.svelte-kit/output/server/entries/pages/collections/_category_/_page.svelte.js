import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component, b as add_attribute } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import { P as ProductSection } from "../../../../chunks/ProductSection.js";
import { g as getProductsByCategory } from "../../../../chunks/products.js";
import { c as content } from "../../../../chunks/content.js";
function getCategoryName(param) {
  const categoryMap = {
    kolye: "Kolye",
    bilezik: "Bilezik",
    yuzuk: "Yüzük",
    kupe: "Küpe",
    sahmeran: "Şahmeran",
    tokalar: "Yetişkin Tokaları",
    fular: "Fular"
  };
  return categoryMap[param] || "Kolye";
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categoryParam;
  let category;
  let filteredProducts;
  let pageTitle;
  let pageDescription;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  categoryParam = $page.params.category;
  category = getCategoryName(categoryParam);
  filteredProducts = getProductsByCategory(category);
  pageTitle = category;
  pageDescription = `${category} koleksiyonumuzdan özel tasarımlar.`;
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-i74jtn_START -->${$$result.title = `<title>${escape(pageTitle)} - Noir Crafted</title>`, ""}<meta name="description"${add_attribute("content", pageDescription, 0)}><!-- HEAD_svelte-i74jtn_END -->`, ""}  <section class="py-12 md:py-16 bg-white border-b border-noir-gray-200"><div class="container-custom"><div class="text-center space-y-4"><h1 class="text-4xl md:text-5xl lg:text-6xl font-serif text-noir-black">${escape(category)}</h1> <p class="text-lg text-noir-gray-600 font-sans max-w-2xl mx-auto">${escape(pageDescription)}</p></div></div></section>  ${filteredProducts.length > 0 ? `${validate_component(ProductSection, "ProductSection").$$render(
    $$result,
    {
      title: "",
      subtitle: "",
      products: filteredProducts,
      variant: "grid"
    },
    {},
    {}
  )}` : `<section class="py-16 md:py-24 bg-white"><div class="container-custom"><div class="text-center space-y-4"><p class="text-lg text-noir-gray-600 font-sans">${escape(content.ui.noProductsInCategory)}</p> <a href="/" class="inline-block px-6 py-3 bg-noir-black text-white font-semibold rounded-full hover:bg-noir-gray-800 transition-colors">${escape(content.ui.backToHome)}</a></div></div></section>`}`;
});
export {
  Page as default
};
