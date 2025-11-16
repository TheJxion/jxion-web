import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, d as each, v as validate_component } from "./ssr.js";
import { p as page } from "./stores.js";
import { c as cart } from "./cart.js";
import { f as favorites } from "./favorites.js";
import { c as content } from "./content.js";
import { t as toast } from "./toast.js";
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cartItemCount;
  let favoriteCount;
  let $page, $$unsubscribe_page;
  let $favorites, $$unsubscribe_favorites;
  let $cart, $$unsubscribe_cart;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_favorites = subscribe(favorites, (value) => $favorites = value);
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  let { logoText = content.site.name } = $$props;
  let { logoHref = "/" } = $$props;
  let { navItems = [
    {
      text: content.nav.kolye,
      href: "/collections/kolye"
    },
    {
      text: content.nav.bilezik,
      href: "/collections/bilezik"
    },
    {
      text: content.nav.yuzuk,
      href: "/collections/yuzuk"
    },
    {
      text: content.nav.kupe,
      href: "/collections/kupe"
    },
    {
      text: content.nav.sahmeran,
      href: "/collections/sahmeran"
    },
    {
      text: content.nav.tokalar,
      href: "/collections/tokalar"
    },
    {
      text: content.nav.fular,
      href: "/collections/fular"
    }
  ] } = $$props;
  function isActive(href) {
    return $page.url.pathname.startsWith(href);
  }
  if ($$props.logoText === void 0 && $$bindings.logoText && logoText !== void 0) $$bindings.logoText(logoText);
  if ($$props.logoHref === void 0 && $$bindings.logoHref && logoHref !== void 0) $$bindings.logoHref(logoHref);
  if ($$props.navItems === void 0 && $$bindings.navItems && navItems !== void 0) $$bindings.navItems(navItems);
  $page.url.pathname;
  cartItemCount = $cart.reduce((sum, item) => sum + item.quantity, 0);
  favoriteCount = $favorites.length;
  $$unsubscribe_page();
  $$unsubscribe_favorites();
  $$unsubscribe_cart();
  return `<header class="sticky top-0 z-50 bg-white border-b border-noir-gray-200"><nav class="container-custom py-4"><div class="flex items-center justify-between"> <a${add_attribute("href", logoHref, 0)} class="text-2xl font-bold uppercase tracking-tight text-noir-black hover:opacity-80 transition-opacity">${escape(logoText)}</a>  <div class="hidden lg:flex items-center space-x-8">${each(navItems, (item) => {
    return `<a${add_attribute("href", item.href, 0)} class="${"text-sm font-medium text-noir-black hover:text-noir-gray-700 transition-colors " + escape(
      isActive(item.href) ? "border-b-2 border-noir-black pb-1" : "",
      true
    )}">${escape(item.text)} </a>`;
  })}</div>  <div class="flex items-center space-x-4"><button type="button" class="p-2 rounded-full hover:bg-noir-gray-100 transition-colors" aria-label="Search" data-svelte-h="svelte-f3ljbr"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button> <a href="/favorites" class="${"relative p-2 rounded-full hover:bg-noir-gray-100 transition-colors " + escape(isActive("/favorites") ? "bg-noir-gray-100" : "", true)}" aria-label="Favorites"><svg class="w-5 h-5"${add_attribute("fill", isActive("/favorites") ? "currentColor" : "none", 0)} stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> ${favoriteCount > 0 ? `<span class="absolute -top-1 -right-1 w-5 h-5 bg-[#FFD700] text-noir-black text-xs font-bold rounded-full flex items-center justify-center">${escape(favoriteCount)}</span>` : ``}</a> <a href="/cart" class="${"relative p-2 rounded-full hover:bg-noir-gray-100 transition-all " + escape("", true)}" aria-label="Shopping Cart"><svg class="${"w-5 h-5 transition-all " + escape(
    "",
    true
  )}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> ${cartItemCount > 0 ? `<span class="${"absolute -top-1 -right-1 w-5 h-5 bg-[#FFD700] text-noir-black text-xs font-bold rounded-full flex items-center justify-center transition-all " + escape("", true)}">${escape(cartItemCount)}</span>` : ``}</a></div></div>  <div class="lg:hidden mt-4 pt-4 border-t border-noir-gray-200"><div class="flex flex-wrap gap-4">${each(navItems, (item) => {
    return `<a${add_attribute("href", item.href, 0)} class="${"text-sm font-medium text-noir-black hover:text-noir-gray-700 transition-colors " + escape(
      isActive(item.href) ? "border-b-2 border-noir-black pb-1" : "",
      true
    )}">${escape(item.text)} </a>`;
  })}</div></div></nav></header>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { logoText = content.site.name } = $$props;
  let { description = content.footer.description } = $$props;
  if ($$props.logoText === void 0 && $$bindings.logoText && logoText !== void 0) $$bindings.logoText(logoText);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  return `<footer class="bg-noir-black text-white py-12"><div class="container-custom"><div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"> <div class="space-y-4"><h3 class="text-2xl font-bold uppercase tracking-tight">${escape(logoText)}</h3> <p class="text-noir-gray-400 text-sm leading-relaxed">${escape(description)}</p></div>  <div><h4 class="font-semibold mb-4 uppercase tracking-wide text-sm">${escape(content.footer.sections.corporate.title)}</h4> <ul class="space-y-2 text-sm text-noir-gray-400">${each(content.footer.sections.corporate.links, (link) => {
    return `<li><a${add_attribute("href", link.href, 0)} class="hover:text-white transition-colors">${escape(link.text)}</a></li>`;
  })}</ul></div>  <div><h4 class="font-semibold mb-4 uppercase tracking-wide text-sm">${escape(content.footer.sections.customerService.title)}</h4> <ul class="space-y-2 text-sm text-noir-gray-400">${each(content.footer.sections.customerService.links, (link) => {
    return `<li><a${add_attribute("href", link.href, 0)} class="hover:text-white transition-colors">${escape(link.text)}</a></li>`;
  })}</ul></div>  <div><h4 class="font-semibold mb-4 uppercase tracking-wide text-sm">${escape(content.footer.sections.legal.title)}</h4> <ul class="space-y-2 text-sm text-noir-gray-400">${each(content.footer.sections.legal.links, (link) => {
    return `<li><a${add_attribute("href", link.href, 0)} class="hover:text-white transition-colors">${escape(link.text)}</a></li>`;
  })}</ul></div></div>  <div class="border-t border-noir-gray-800 pt-8 text-center text-sm text-noir-gray-500"><p>© ${escape((/* @__PURE__ */ new Date()).getFullYear())} ${escape(logoText)}. ${escape(content.footer.copyright)}</p></div></div></footer>`;
});
const css = {
  code: ".toast-container.svelte-1j1ygef{position:fixed;top:1rem;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:0.75rem;max-width:400px}.toast.svelte-1j1ygef{background:white;border-radius:8px;padding:1rem 1.25rem;box-shadow:0 4px 12px rgba(0, 0, 0, 0.15);cursor:pointer;animation:svelte-1j1ygef-slideIn 0.3s ease-out;border-left:4px solid;transition:transform 0.2s, opacity 0.2s}.toast.svelte-1j1ygef:hover{transform:translateX(-4px)}.toast-success.svelte-1j1ygef{border-left-color:#10b981}.toast-error.svelte-1j1ygef{border-left-color:#ef4444}.toast-info.svelte-1j1ygef{border-left-color:#3b82f6}.toast-content.svelte-1j1ygef{display:flex;align-items:center;gap:0.75rem}.toast-message.svelte-1j1ygef{font-family:'Satoshi', sans-serif;font-size:0.875rem;color:#222222;line-height:1.5}@keyframes svelte-1j1ygef-slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}",
  map: `{"version":3,"file":"Toast.svelte","sources":["Toast.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { toast } from \\"$stores/toast\\";\\nimport { onMount } from \\"svelte\\";\\n$: toasts = $toast;\\n<\/script>\\n\\n<div class=\\"toast-container\\">\\n\\t{#each toasts as toastItem (toastItem.id)}\\n\\t\\t<div\\n\\t\\t\\tclass=\\"toast toast-{toastItem.type || 'success'}\\"\\n\\t\\t\\trole=\\"alert\\"\\n\\t\\t\\ton:click={() => toast.remove(toastItem.id)}\\n\\t\\t>\\n\\t\\t\\t<div class=\\"toast-content\\">\\n\\t\\t\\t\\t<span class=\\"toast-message\\">{toastItem.message}</span>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t{/each}\\n</div>\\n\\n<style>\\n\\t.toast-container {\\n\\t\\tposition: fixed;\\n\\t\\ttop: 1rem;\\n\\t\\tright: 1rem;\\n\\t\\tz-index: 9999;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tgap: 0.75rem;\\n\\t\\tmax-width: 400px;\\n\\t}\\n\\n\\t.toast {\\n\\t\\tbackground: white;\\n\\t\\tborder-radius: 8px;\\n\\t\\tpadding: 1rem 1.25rem;\\n\\t\\tbox-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\\n\\t\\tcursor: pointer;\\n\\t\\tanimation: slideIn 0.3s ease-out;\\n\\t\\tborder-left: 4px solid;\\n\\t\\ttransition: transform 0.2s, opacity 0.2s;\\n\\t}\\n\\n\\t.toast:hover {\\n\\t\\ttransform: translateX(-4px);\\n\\t}\\n\\n\\t.toast-success {\\n\\t\\tborder-left-color: #10b981;\\n\\t}\\n\\n\\t.toast-error {\\n\\t\\tborder-left-color: #ef4444;\\n\\t}\\n\\n\\t.toast-info {\\n\\t\\tborder-left-color: #3b82f6;\\n\\t}\\n\\n\\t.toast-content {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tgap: 0.75rem;\\n\\t}\\n\\n\\t.toast-message {\\n\\t\\tfont-family: 'Satoshi', sans-serif;\\n\\t\\tfont-size: 0.875rem;\\n\\t\\tcolor: #222222;\\n\\t\\tline-height: 1.5;\\n\\t}\\n\\n\\t@keyframes slideIn {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: translateX(100%);\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t\\tto {\\n\\t\\t\\ttransform: translateX(0);\\n\\t\\t\\topacity: 1;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n"],"names":[],"mappings":"AAoBC,+BAAiB,CAChB,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,OAAO,CACZ,SAAS,CAAE,KACZ,CAEA,qBAAO,CACN,UAAU,CAAE,KAAK,CACjB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,IAAI,CAAC,OAAO,CACrB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC1C,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,sBAAO,CAAC,IAAI,CAAC,QAAQ,CAChC,WAAW,CAAE,GAAG,CAAC,KAAK,CACtB,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,IACrC,CAEA,qBAAM,MAAO,CACZ,SAAS,CAAE,WAAW,IAAI,CAC3B,CAEA,6BAAe,CACd,iBAAiB,CAAE,OACpB,CAEA,2BAAa,CACZ,iBAAiB,CAAE,OACpB,CAEA,0BAAY,CACX,iBAAiB,CAAE,OACpB,CAEA,6BAAe,CACd,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,OACN,CAEA,6BAAe,CACd,WAAW,CAAE,SAAS,CAAC,CAAC,UAAU,CAClC,SAAS,CAAE,QAAQ,CACnB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GACd,CAEA,WAAW,sBAAQ,CAClB,IAAK,CACJ,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,OAAO,CAAE,CACV,CACA,EAAG,CACF,SAAS,CAAE,WAAW,CAAC,CAAC,CACxB,OAAO,CAAE,CACV,CACD"}`
};
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let toasts;
  let $toast, $$unsubscribe_toast;
  $$unsubscribe_toast = subscribe(toast, (value) => $toast = value);
  $$result.css.add(css);
  toasts = $toast;
  $$unsubscribe_toast();
  return `<div class="toast-container svelte-1j1ygef">${each(toasts, (toastItem) => {
    return `<div class="${"toast toast-" + escape(toastItem.type || "success", true) + " svelte-1j1ygef"}" role="alert"><div class="toast-content svelte-1j1ygef"><span class="toast-message svelte-1j1ygef">${escape(toastItem.message)}</span></div> </div>`;
  })} </div>`;
});
const AppLayout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showHeader = true } = $$props;
  let { showFooter = true } = $$props;
  if ($$props.showHeader === void 0 && $$bindings.showHeader && showHeader !== void 0) $$bindings.showHeader(showHeader);
  if ($$props.showFooter === void 0 && $$bindings.showFooter && showFooter !== void 0) $$bindings.showFooter(showFooter);
  return `<div class="min-h-screen flex flex-col">${showHeader ? `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}` : ``} <main class="flex-1">${slots.default ? slots.default({}) : ``}</main> ${showFooter ? `${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}` : ``} ${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}</div>`;
});
export {
  AppLayout as A,
  Toast as T
};
