import { c as create_ssr_component, b as add_attribute, e as escape } from "./ssr.js";
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let { variant = "primary" } = $$props;
  let { size = "md" } = $$props;
  let { href } = $$props;
  let { onClick } = $$props;
  let { disabled = false } = $$props;
  let { loading = false } = $$props;
  let { type = "button" } = $$props;
  let { className = "" } = $$props;
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0) $$bindings.onClick(onClick);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
  classes = `
		inline-flex items-center justify-center font-semibold transition-all duration-200
		${variant === "primary" ? "bg-noir-black text-white hover:bg-noir-gray-800" : ""}
		${variant === "secondary" ? "bg-noir-primary text-noir-black hover:bg-opacity-90" : ""}
		${variant === "outline" ? "border border-noir-gray-300 text-noir-black hover:bg-noir-gray-50" : ""}
		${variant === "ghost" ? "text-noir-black hover:bg-noir-gray-100" : ""}
		${variant === "text" ? "text-noir-black hover:text-noir-gray-700 underline-offset-4 hover:underline" : ""}
		${size === "sm" ? "px-4 py-2 text-sm" : ""}
		${size === "md" ? "px-6 py-3 text-base" : ""}
		${size === "lg" ? "px-8 py-4 text-lg" : ""}
		${disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
		rounded-full
		${className}
	`;
  return `${href ? `<a${add_attribute("href", href, 0)} class="${[escape(classes, true), disabled ? "disabled" : ""].join(" ").trim()}" role="button"${add_attribute("aria-disabled", disabled, 0)}>${loading ? `<span class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>` : ``} ${slots.default ? slots.default({}) : ``}</a>` : `<button${add_attribute("type", type, 0)} ${disabled ? "disabled" : ""}${add_attribute("class", classes, 0)}>${loading ? `<span class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>` : ``} ${slots.default ? slots.default({}) : ``}</button>`}`;
});
export {
  Button as B
};
