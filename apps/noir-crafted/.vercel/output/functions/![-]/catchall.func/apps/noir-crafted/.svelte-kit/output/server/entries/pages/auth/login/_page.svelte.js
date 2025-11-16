import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/user.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { p as page } from "../../../../chunks/stores.js";
import { c as content } from "../../../../chunks/content.js";
import { B as Button } from "../../../../chunks/Button.js";
import "../../../../chunks/toast.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let redirectUrl;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let email = "";
  let password = "";
  let loading = false;
  redirectUrl = $page.url.searchParams.get("redirect") || "/";
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1ivbf9x_START -->${$$result.title = `<title>${escape(content.ui.signIn)} - Noir Crafted</title>`, ""}<!-- HEAD_svelte-1ivbf9x_END -->`, ""} <section class="min-h-screen bg-noir-black flex items-center justify-center py-12 px-4"><div class="w-full max-w-md"> <div class="text-center mb-8"><a href="/" class="inline-block text-3xl font-bold uppercase tracking-tight text-white hover:opacity-80 transition-opacity">${escape(content.site.name)}</a></div>  <div class="bg-white rounded-lg p-8 shadow-xl"><h1 class="text-3xl font-serif font-semibold text-noir-black mb-6 text-center">${escape(content.ui.loginTitle)}</h1> ${``} <form class="space-y-5"><div><label for="email" class="block text-sm font-sans font-medium text-noir-black mb-2">${escape(content.ui.email)}</label> <input id="email" type="email" required class="w-full px-4 py-3 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent font-sans text-noir-black" placeholder="ornek@email.com"${add_attribute("value", email, 0)}></div> <div><label for="password" class="block text-sm font-sans font-medium text-noir-black mb-2">${escape(content.ui.password)}</label> <input id="password" type="password" required minlength="6" class="w-full px-4 py-3 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent font-sans text-noir-black" placeholder="••••••••"${add_attribute("value", password, 0)}></div> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "submit",
      variant: "primary",
      size: "lg",
      loading,
      disabled: loading,
      className: "w-full"
    },
    {},
    {
      default: () => {
        return `${escape(content.ui.signIn)}`;
      }
    }
  )}</form> <div class="mt-6 text-center"><p class="text-sm text-noir-gray-600 font-sans">${escape(content.ui.dontHaveAccount)} <a href="${"/auth/register?redirect=" + escape(redirectUrl, true)}" class="text-noir-black font-semibold hover:underline">${escape(content.ui.signUp)}</a></p></div></div></div></section>`;
});
export {
  Page as default
};
