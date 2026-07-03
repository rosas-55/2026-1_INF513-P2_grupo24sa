import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Ventas/Show.vue
var _sfc_main = {
	__name: "Show",
	__ssrInlineRender: true,
	props: { venta: Object },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Venta #" + __props.venta.id }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-3xl px-4 py-8"${_scopeId}><h1 class="text-2xl font-semibold mb-6 theme-section-title"${_scopeId}>Venta #${ssrInterpolate(__props.venta.id)}</h1><div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2"${_scopeId}><div${_scopeId}><strong${_scopeId}>Cliente:</strong> ${ssrInterpolate(__props.venta.cliente?.name)}</div><div${_scopeId}><strong${_scopeId}>Vendedor:</strong> ${ssrInterpolate(__props.venta.vendedor?.name)}</div><div${_scopeId}><strong${_scopeId}>Tipo:</strong> ${ssrInterpolate(__props.venta.tipo)}</div><div${_scopeId}><strong${_scopeId}>Estado:</strong> ${ssrInterpolate(__props.venta.estado)}</div><div${_scopeId}><strong${_scopeId}>Total:</strong> ${ssrInterpolate(__props.venta.total)}</div><div${_scopeId}><strong${_scopeId}>Interés:</strong> ${ssrInterpolate(__props.venta.interes)}</div></div><h2 class="font-medium mb-2"${_scopeId}>Productos</h2><div class="overflow-x-auto rounded-lg border mb-6"${_scopeId}><table class="min-w-full text-sm"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3"${_scopeId}>Producto</th><th class="px-4 py-3"${_scopeId}>Cantidad</th><th class="px-4 py-3"${_scopeId}>Precio</th><th class="px-4 py-3"${_scopeId}>Subtotal</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.venta.detalles, (d) => {
							_push(`<tr class="border-t"${_scopeId}><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(d.producto?.nombre)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(d.cantidad)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(d.precio_unitario)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(d.sub_total)}</td></tr>`);
						});
						_push(`<!--]--></tbody></table></div>`);
						if (__props.venta.cuotas?.length) {
							_push(`<div${_scopeId}><h2 class="font-medium mb-2"${_scopeId}>Cuotas</h2><div class="overflow-x-auto rounded-lg border"${_scopeId}><table class="min-w-full text-sm"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3"${_scopeId}>N°</th><th class="px-4 py-3"${_scopeId}>Monto</th><th class="px-4 py-3"${_scopeId}>Vencimiento</th><th class="px-4 py-3"${_scopeId}>Estado</th></tr></thead><tbody${_scopeId}><!--[-->`);
							ssrRenderList(__props.venta.cuotas, (c) => {
								_push(`<tr class="border-t"${_scopeId}><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(c.nro_cuota)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(c.monto_fijo)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(c.fecha_vencimiento)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(c.estado)}</td></tr>`);
							});
							_push(`<!--]--></tbody></table></div></div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode(unref(Head), { title: "Venta #" + __props.venta.id }, null, 8, ["title"]), createVNode("div", { class: "mx-auto max-w-3xl px-4 py-8" }, [
						createVNode("h1", { class: "text-2xl font-semibold mb-6 theme-section-title" }, "Venta #" + toDisplayString(__props.venta.id), 1),
						createVNode("div", { class: "grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2" }, [
							createVNode("div", null, [createVNode("strong", null, "Cliente:"), createTextVNode(" " + toDisplayString(__props.venta.cliente?.name), 1)]),
							createVNode("div", null, [createVNode("strong", null, "Vendedor:"), createTextVNode(" " + toDisplayString(__props.venta.vendedor?.name), 1)]),
							createVNode("div", null, [createVNode("strong", null, "Tipo:"), createTextVNode(" " + toDisplayString(__props.venta.tipo), 1)]),
							createVNode("div", null, [createVNode("strong", null, "Estado:"), createTextVNode(" " + toDisplayString(__props.venta.estado), 1)]),
							createVNode("div", null, [createVNode("strong", null, "Total:"), createTextVNode(" " + toDisplayString(__props.venta.total), 1)]),
							createVNode("div", null, [createVNode("strong", null, "Interés:"), createTextVNode(" " + toDisplayString(__props.venta.interes), 1)])
						]),
						createVNode("h2", { class: "font-medium mb-2" }, "Productos"),
						createVNode("div", { class: "overflow-x-auto rounded-lg border mb-6" }, [createVNode("table", { class: "min-w-full text-sm" }, [createVNode("thead", { class: "bg-gray-50" }, [createVNode("tr", null, [
							createVNode("th", { class: "px-4 py-3" }, "Producto"),
							createVNode("th", { class: "px-4 py-3" }, "Cantidad"),
							createVNode("th", { class: "px-4 py-3" }, "Precio"),
							createVNode("th", { class: "px-4 py-3" }, "Subtotal")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.venta.detalles, (d) => {
							return openBlock(), createBlock("tr", {
								key: d.id,
								class: "border-t"
							}, [
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(d.producto?.nombre), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(d.cantidad), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(d.precio_unitario), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(d.sub_total), 1)
							]);
						}), 128))])])]),
						__props.venta.cuotas?.length ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("h2", { class: "font-medium mb-2" }, "Cuotas"), createVNode("div", { class: "overflow-x-auto rounded-lg border" }, [createVNode("table", { class: "min-w-full text-sm" }, [createVNode("thead", { class: "bg-gray-50" }, [createVNode("tr", null, [
							createVNode("th", { class: "px-4 py-3" }, "N°"),
							createVNode("th", { class: "px-4 py-3" }, "Monto"),
							createVNode("th", { class: "px-4 py-3" }, "Vencimiento"),
							createVNode("th", { class: "px-4 py-3" }, "Estado")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.venta.cuotas, (c) => {
							return openBlock(), createBlock("tr", {
								key: c.id,
								class: "border-t"
							}, [
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(c.nro_cuota), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(c.monto_fijo), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(c.fecha_vencimiento), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(c.estado), 1)
							]);
						}), 128))])])])])) : createCommentVNode("", true)
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Ventas/Show.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
