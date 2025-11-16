import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { A as AppLayout, T as Toast } from "../../../chunks/AppLayout.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(AppLayout, "AppLayout").$$render($$result, { showHeader: false, showFooter: false }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``} ${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Layout as default
};
