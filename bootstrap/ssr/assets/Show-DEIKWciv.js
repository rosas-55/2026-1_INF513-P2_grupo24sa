import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head } from "@inertiajs/vue3";
import { Fragment, createBlock, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Compras/Show.vue
var _sfc_main = {
	__name: "Show",
	__ssrInlineRender: true,
	props: { compra: Object },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Compra #" + __props.compra.id }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-3xl px-4 py-8"${_scopeId}><h1 class="text-2xl font-semibold mb-6 theme-section-title"${_scopeId}>Compra #${ssrInterpolate(__props.compra.id)}</h1><div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2"${_scopeId}><div${_scopeId}><strong${_scopeId}>Proveedor:</strong> ${ssrInterpolate(__props.compra.proveedor?.nombre)}</div><div${_scopeId}><strong${_scopeId}>Estado:</strong> ${ssrInterpolate(__props.compra.estado)}</div><div${_scopeId}><strong${_scopeId}>Fecha:</strong> ${ssrInterpolate(__props.compra.fecha)}</div><div${_scopeId}><strong${_scopeId}>Total:</strong> ${ssrInterpolate(__props.compra.total)}</div></div><h2 class="font-medium mb-2"${_scopeId}>Detalles</h2><div class="overflow-x-auto rounded-lg border"${_scopeId}><table class="min-w-full text-sm"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3"${_scopeId}>Insumo</th><th class="px-4 py-3"${_scopeId}>Cantidad</th><th class="px-4 py-3"${_scopeId}>Precio Unit.</th><th class="px-4 py-3"${_scopeId}>Subtotal</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.compra.detalles, (d) => {
							_push(`<tr class="border-t"${_scopeId}><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(d.insumo?.nombre)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(d.cantidad)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(d.precio_unitario)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(d.subtotal)}</td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></div>`);
					} else return [createVNode(unref(Head), { title: "Compra #" + __props.compra.id }, null, 8, ["title"]), createVNode("div", { class: "mx-auto max-w-3xl px-4 py-8" }, [
						createVNode("h1", { class: "text-2xl font-semibold mb-6 theme-section-title" }, "Compra #" + toDisplayString(__props.compra.id), 1),
						createVNode("div", { class: "grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2" }, [
							createVNode("div", null, [createVNode("strong", null, "Proveedor:"), createTextVNode(" " + toDisplayString(__props.compra.proveedor?.nombre), 1)]),
							createVNode("div", null, [createVNode("strong", null, "Estado:"), createTextVNode(" " + toDisplayString(__props.compra.estado), 1)]),
							createVNode("div", null, [createVNode("strong", null, "Fecha:"), createTextVNode(" " + toDisplayString(__props.compra.fecha), 1)]),
							createVNode("div", null, [createVNode("strong", null, "Total:"), createTextVNode(" " + toDisplayString(__props.compra.total), 1)])
						]),
						createVNode("h2", { class: "font-medium mb-2" }, "Detalles"),
						createVNode("div", { class: "overflow-x-auto rounded-lg border" }, [createVNode("table", { class: "min-w-full text-sm" }, [createVNode("thead", { class: "bg-gray-50" }, [createVNode("tr", null, [
							createVNode("th", { class: "px-4 py-3" }, "Insumo"),
							createVNode("th", { class: "px-4 py-3" }, "Cantidad"),
							createVNode("th", { class: "px-4 py-3" }, "Precio Unit."),
							createVNode("th", { class: "px-4 py-3" }, "Subtotal")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.compra.detalles, (d) => {
							return openBlock(), createBlock("tr", {
								key: d.id,
								class: "border-t"
							}, [
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(d.insumo?.nombre), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(d.cantidad), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(d.precio_unitario), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(d.subtotal), 1)
							]);
						}), 128))])])])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Compras/Show.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
