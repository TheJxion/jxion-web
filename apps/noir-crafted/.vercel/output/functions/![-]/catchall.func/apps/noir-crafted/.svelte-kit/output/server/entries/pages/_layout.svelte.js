import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { A as AppLayout } from "../../chunks/AppLayout.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(AppLayout, "AppLayout").$$render($$result, {}, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
export {
  Layout as default
};
