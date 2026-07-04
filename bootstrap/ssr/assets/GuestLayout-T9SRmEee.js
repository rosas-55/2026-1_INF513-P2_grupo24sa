import { t as ApplicationLogo_default } from "./ApplicationLogo-oaRXtDJB.js";
import { Link } from "@inertiajs/vue3";
import { createVNode, mergeProps, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Layouts/GuestLayout.vue
var _sfc_main = {
	__name: "GuestLayout",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0",
				style: { backgroundColor: "var(--color-surface-alt)" }
			}, _attrs))}><div>`);
			_push(ssrRenderComponent(unref(Link), { href: "/" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(ApplicationLogo_default, {
						class: "h-20 w-20 fill-current",
						style: { color: "var(--color-primary)" }
					}, null, _parent, _scopeId));
					else return [createVNode(ApplicationLogo_default, {
						class: "h-20 w-20 fill-current",
						style: { color: "var(--color-primary)" }
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="mt-6 w-full overflow-hidden px-6 py-4 shadow-md sm:max-w-md sm:rounded-xl" style="${ssrRenderStyle({
				backgroundColor: "var(--color-card-bg)",
				borderColor: "var(--color-border-light)",
				border: "1px solid"
			})}">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div><footer class="mt-8 py-4 text-center w-full pb-8"><p class="text-sm" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Grupo 24SA — INF-513 Tecnología Web <span class="mx-2">·</span><span>Visitas: <strong style="${ssrRenderStyle({ color: "var(--color-text)" })}">${ssrInterpolate(_ctx.$page.props.visitas ?? 0)}</strong></span></p></footer></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as t };
