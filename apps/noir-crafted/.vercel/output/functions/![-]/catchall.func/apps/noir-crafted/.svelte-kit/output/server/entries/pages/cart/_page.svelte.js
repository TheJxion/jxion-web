import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component, d as each, b as add_attribute } from "../../../chunks/ssr.js";
import { c as cart } from "../../../chunks/cart.js";
import { u as user } from "../../../chunks/user.js";
import { g as goto } from "../../../chunks/client.js";
import { f as formatCurrency } from "../../../chunks/format.js";
import { c as content } from "../../../chunks/content.js";
import { B as Button } from "../../../chunks/Button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cartItems;
  let cartTotal;
  let isAuthenticated;
  let isEmpty;
  let $user, $$unsubscribe_user;
  let $cart, $$unsubscribe_cart;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  function handleCheckout() {
    if (isAuthenticated) {
      goto();
    } else {
      goto();
    }
  }
  function handleContinueShopping() {
    goto();
  }
  cartItems = $cart;
  cartTotal = $cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  isAuthenticated = $user !== null;
  isEmpty = cartItems.length === 0;
  $$unsubscribe_user();
  $$unsubscribe_cart();
  return `${$$result.head += `<!-- HEAD_svelte-607ofn_START -->${$$result.title = `<title>${escape(content.ui.myBasket)} - Noir Crafted</title>`, ""}<!-- HEAD_svelte-607ofn_END -->`, ""} ${isEmpty ? ` <section class="py-16 md:py-24 bg-white min-h-[60vh] flex items-center"><div class="container-custom text-center space-y-6"><div class="space-y-4"><h1 class="text-4xl md:text-5xl font-serif text-noir-black">${escape(content.ui.myBasket)}</h1> <p class="text-lg text-noir-gray-600 font-sans">${escape(content.ui.emptyCart)}</p> <p class="text-base text-noir-gray-500 font-sans">${escape(content.ui.emptyCartDescription)}</p></div> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "primary",
      size: "lg",
      onClick: handleContinueShopping
    },
    {},
    {
      default: () => {
        return `${escape(content.ui.discover)}`;
      }
    }
  )}</div></section>` : ` <section class="py-8 md:py-16 bg-white min-h-[60vh]"><div class="container-custom"><h1 class="text-4xl md:text-5xl font-serif text-noir-black mb-8">${escape(content.ui.myBasket)}</h1> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <div class="lg:col-span-2 space-y-4">${each(cartItems, (item) => {
    return `<div class="bg-white border border-noir-gray-200 rounded-lg p-6 flex flex-col sm:flex-row gap-6 transition-opacity duration-300"> <a href="${"/products/" + escape(item.product.id, true)}" class="flex-shrink-0 w-full sm:w-32 h-32 bg-noir-gray-50 rounded-lg overflow-hidden"><img${add_attribute("src", item.product.image, 0)}${add_attribute("alt", item.product.name, 0)} class="w-full h-full object-cover object-center"></a>  <div class="flex-1 space-y-4"><div class="flex justify-between items-start"><div class="space-y-2"><a href="${"/products/" + escape(item.product.id, true)}" class="text-xl font-serif font-semibold text-noir-black hover:text-noir-gray-700 transition-colors">${escape(item.product.name)}</a> <p class="text-sm text-noir-gray-600 font-sans">${escape(item.product.category)} </p></div> <button type="button" class="text-noir-gray-400 hover:text-noir-black transition-colors" aria-label="Remove item" data-svelte-h="svelte-rajy75"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> </button></div> <div class="flex items-center justify-between"> <div class="flex items-center gap-3"><label class="text-sm font-sans text-noir-gray-600">${escape(content.ui.quantity)}:</label> <div class="flex items-center border border-noir-gray-300 rounded"><button type="button" class="px-3 py-1 text-noir-black hover:bg-noir-gray-100 transition-colors" aria-label="Decrease quantity" data-svelte-h="svelte-4kjby">−</button> <span class="px-4 py-1 text-noir-black font-sans min-w-[3rem] text-center">${escape(item.quantity)}</span> <button type="button" class="px-3 py-1 text-noir-black hover:bg-noir-gray-100 transition-colors" aria-label="Increase quantity" data-svelte-h="svelte-wqpz9z">+</button> </div></div>  <div class="text-right"><p class="text-lg font-semibold text-noir-black">${escape(formatCurrency(item.product.price * item.quantity))}</p> <p class="text-sm text-noir-gray-500 font-sans">${escape(formatCurrency(item.product.price))} / ${escape(content.ui.quantity.toLowerCase())} </p></div> </div></div> </div>`;
  })}</div>  <div class="lg:col-span-1"><div class="bg-noir-gray-50 border border-noir-gray-200 rounded-lg p-6 sticky top-24 space-y-6"><h2 class="text-xl font-serif font-semibold text-noir-black">${escape(content.ui.cart)}</h2> <div class="space-y-4"><div class="flex justify-between items-center text-lg"><span class="font-sans text-noir-gray-700">${escape(content.ui.total)}:</span> <span class="font-serif font-semibold text-noir-black">${escape(formatCurrency(cartTotal))}</span></div></div> <div class="space-y-3 pt-4 border-t border-noir-gray-300">${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "secondary",
      size: "md",
      onClick: handleContinueShopping,
      className: "w-full"
    },
    {},
    {
      default: () => {
        return `${escape(content.ui.continueShopping)}`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "primary",
      size: "md",
      onClick: handleCheckout,
      className: "w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-noir-black font-bold shadow-lg shadow-[#FFD700]/30 transition-all duration-300"
    },
    {},
    {
      default: () => {
        return `${escape(content.ui.proceedToCheckout)}`;
      }
    }
  )} ${!isAuthenticated ? `<p class="text-xs text-noir-gray-500 text-center font-sans mt-2">Ödeme için ${escape(content.ui.signIn)} gereklidir.</p>` : ``}</div></div></div></div></div></section>`}`;
});
export {
  Page as default
};
