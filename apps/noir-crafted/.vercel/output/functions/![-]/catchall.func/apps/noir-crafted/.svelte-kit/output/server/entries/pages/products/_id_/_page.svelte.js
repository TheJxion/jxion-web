import { c as create_ssr_component, a as subscribe, b as add_attribute, d as each, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import { B as Button } from "../../../../chunks/Button.js";
import { p as products, a as getProductById } from "../../../../chunks/products.js";
import { c as cart } from "../../../../chunks/cart.js";
import { f as favorites } from "../../../../chunks/favorites.js";
import { t as toast } from "../../../../chunks/toast.js";
import { f as formatCurrency } from "../../../../chunks/format.js";
import { c as content } from "../../../../chunks/content.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let productId;
  let product;
  let formattedPrice;
  let mainImage;
  let images;
  let selectedImage;
  let isFavorite;
  let $favorites, $$unsubscribe_favorites;
  let $page, $$unsubscribe_page;
  let $products, $$unsubscribe_products;
  $$unsubscribe_favorites = subscribe(favorites, (value) => $favorites = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_products = subscribe(products, (value) => $products = value);
  function handleAddToCart() {
    if (product) {
      cart.add(product, 1);
      toast.add(content.ui.addedToCart, "success");
    }
  }
  productId = $page.params.id;
  product = getProductById(productId);
  formattedPrice = product ? formatCurrency(product.price) : "";
  mainImage = product?.image || "";
  images = product?.images || (product?.image ? [product.image] : []);
  selectedImage = mainImage;
  isFavorite = product ? $favorites.some((fav) => fav.id === product.id) : false;
  $$unsubscribe_favorites();
  $$unsubscribe_page();
  $$unsubscribe_products();
  return `${$$result.head += `<!-- HEAD_svelte-1j2azv2_START -->${$$result.title = `<title>${escape(product?.name || "Ürün")} - Noir Crafted</title>`, ""}<meta name="description"${add_attribute("content", product?.description || "", 0)}><!-- HEAD_svelte-1j2azv2_END -->`, ""} ${product ? ` <section class="py-8 md:py-16 bg-white"><div class="container-custom"><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"> <div class="space-y-4"> <div class="aspect-square bg-noir-gray-50 rounded-lg overflow-hidden"><img${add_attribute("src", selectedImage, 0)}${add_attribute("alt", product.name, 0)} class="w-full h-full object-cover object-center" loading="eager"></div>  ${images.length > 1 ? `<div class="grid grid-cols-4 gap-4">${each(images, (image) => {
    return `<button type="button" class="${"aspect-square bg-noir-gray-50 rounded overflow-hidden border-2 " + escape(
      selectedImage === image ? "border-noir-black" : "border-transparent",
      true
    ) + " hover:border-noir-gray-400 transition-colors"}"><img${add_attribute("src", image, 0)}${add_attribute("alt", product.name, 0)} class="w-full h-full object-cover object-center" loading="lazy"> </button>`;
  })}</div>` : ``}</div>  <div class="space-y-6"><div class="space-y-4"><div><span class="text-sm text-noir-gray-600 font-sans uppercase tracking-wide">${escape(product.category)}</span> <h1 class="text-4xl md:text-5xl font-serif text-noir-black mt-2">${escape(product.name)}</h1></div> <div class="flex items-center gap-4"><span class="text-3xl font-semibold text-noir-black">${escape(formattedPrice)}</span> ${!product.inStock ? `<span class="text-sm text-noir-gray-500 uppercase" data-svelte-h="svelte-1ux9ge2">Stokta Yok</span>` : ``}</div> <p class="text-lg text-noir-gray-700 font-sans leading-relaxed">${escape(product.description)}</p></div>  <div class="pt-4 border-t border-noir-gray-200 space-y-3">${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "primary",
      size: "lg",
      onClick: handleAddToCart,
      disabled: !product.inStock,
      className: "w-full"
    },
    {},
    {
      default: () => {
        return `${product.inStock ? `${escape(content.ui.addToCart)}` : `${escape(content.ui.outOfStock)}`}`;
      }
    }
  )} <button type="button" class="w-full flex items-center justify-center gap-2 px-6 py-3 border border-noir-gray-300 rounded-full text-noir-black hover:bg-noir-gray-50 transition-colors font-sans font-semibold"><svg class="${"w-5 h-5 " + escape(isFavorite ? "fill-current" : "", true)}"${add_attribute("fill", isFavorite ? "currentColor" : "none", 0)} stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> ${escape(isFavorite ? "Favorilerden Kaldır" : "Favorilere Ekle")}</button></div>  <div class="pt-4 border-t border-noir-gray-200 space-y-4"><div><h3 class="text-sm font-semibold text-noir-black mb-2 uppercase tracking-wide">${escape(content.product.material.title)}</h3> <p class="text-noir-gray-600 font-sans">${escape(content.product.material.description)}</p></div> <div><h3 class="text-sm font-semibold text-noir-black mb-2 uppercase tracking-wide">${escape(content.product.care.title)}</h3> <p class="text-noir-gray-600 font-sans">${escape(content.product.care.description)}</p></div></div></div></div></div></section>  ${$products.filter((p) => p.category === product.category && p.id !== product.id).length > 0 ? `<section class="py-16 md:py-24 bg-noir-gray-50"><div class="container-custom"><h2 class="text-3xl md:text-4xl font-serif text-noir-black text-center mb-12">${escape(content.product.related.title)}</h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">${each($products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4), (relatedProduct) => {
    return `<a href="${"/products/" + escape(relatedProduct.id, true)}" class="group block bg-white rounded-lg overflow-hidden hover:shadow-card-lg transition-shadow"><div class="aspect-square bg-noir-gray-50 overflow-hidden"><img${add_attribute("src", relatedProduct.image, 0)}${add_attribute("alt", relatedProduct.name, 0)} class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" loading="lazy"></div> <div class="p-4 space-y-2"><h3 class="font-serif font-semibold text-noir-black group-hover:text-noir-gray-700 transition-colors">${escape(relatedProduct.name)}</h3> <p class="text-lg font-semibold text-noir-black">${escape(formatCurrency(relatedProduct.price))} </p></div> </a>`;
  })}</div></div></section>` : ``}` : ` <section class="py-16 md:py-24 bg-white"><div class="container-custom"><div class="text-center space-y-4"><h1 class="text-4xl md:text-5xl font-serif text-noir-black">${escape(content.ui.productNotFound)}</h1> <p class="text-lg text-noir-gray-600 font-sans">${escape(content.ui.productNotFoundDescription)}</p> <a href="/" class="inline-block px-6 py-3 bg-noir-black text-white font-semibold rounded-full hover:bg-noir-gray-800 transition-colors">${escape(content.ui.backToHome)}</a></div></div></section>`}`;
});
export {
  Page as default
};
