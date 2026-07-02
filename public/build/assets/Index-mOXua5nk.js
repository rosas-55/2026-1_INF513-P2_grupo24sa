import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, vModelSelect, withCtx, withDirectives } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Inventario/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		movimientos: Object,
		insumos: Array,
		filters: Object
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Inventario" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6"${_scopeId}><h1 class="text-2xl font-semibold dark:text-white"${_scopeId}>Inventario</h1>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("inventario.create"),
							class: "rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Nuevo Movimiento`);
								else return [createTextVNode("Nuevo Movimiento")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><form class="mb-4"${_scopeId}><select class="w-full sm:w-auto theme-input text-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(__props.filters.insumo_id) ? ssrLooseContain(__props.filters.insumo_id, "") : ssrLooseEqual(__props.filters.insumo_id, "")) ? " selected" : ""}${_scopeId}>Todos los insumos</option><!--[-->`);
						ssrRenderList(__props.insumos, (i) => {
							_push(`<option${ssrRenderAttr("value", i.id)}${ssrIncludeBooleanAttr(Array.isArray(__props.filters.insumo_id) ? ssrLooseContain(__props.filters.insumo_id, i.id) : ssrLooseEqual(__props.filters.insumo_id, i.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(i.nombre)}</option>`);
						});
						_push(`<!--]--></select></form><div class="overflow-x-auto rounded-lg border dark:border-gray-700"${_scopeId}><table class="min-w-full text-sm text-left text-gray-700 dark:text-gray-300"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-800"${_scopeId}><tr${_scopeId}><th class="px-4 py-3"${_scopeId}>Fecha</th><th class="px-4 py-3"${_scopeId}>Insumo</th><th class="px-4 py-3"${_scopeId}>Tipo</th><th class="px-4 py-3"${_scopeId}>Cantidad</th><th class="px-4 py-3"${_scopeId}>Costo Unit.</th><th class="px-4 py-3"${_scopeId}>Valor Total</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.movimientos.data, (m) => {
							_push(`<tr class="border-t dark:border-gray-700"${_scopeId}><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(m.fecha)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(m.insumo?.nombre)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(m.tipo_movimiento)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(m.cantidad)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(m.costo_unitario)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(m.valor_total)}</td></tr>`);
						});
						_push(`<!--]-->`);
						if (!__props.movimientos.data.length) _push(`<tr${_scopeId}><td colspan="6" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400"${_scopeId}>Sin movimientos.</td></tr>`);
						else _push(`<!---->`);
						_push(`</tbody></table></div>`);
						if (__props.movimientos.links) {
							_push(`<div class="mt-4 flex justify-center"${_scopeId}><div class="flex flex-wrap gap-1 text-sm"${_scopeId}><!--[-->`);
							ssrRenderList(__props.movimientos.links, (link) => {
								_push(ssrRenderComponent(unref(Link), {
									key: link.label,
									href: link.url || "#",
									class: ["px-3 py-1 rounded border dark:border-gray-600 dark:text-gray-300", {
										"bg-indigo-600 text-white": link.active,
										"opacity-50 pointer-events-none": !link.url
									}]
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode(unref(Head), { title: "Inventario" }), createVNode("div", { class: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6" }, [createVNode("h1", { class: "text-2xl font-semibold dark:text-white" }, "Inventario"), createVNode(unref(Link), {
							href: _ctx.route("inventario.create"),
							class: "rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto"
						}, {
							default: withCtx(() => [createTextVNode("Nuevo Movimiento")]),
							_: 1
						}, 8, ["href"])]),
						createVNode("form", { class: "mb-4" }, [withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => __props.filters.insumo_id = $event,
							class: "w-full sm:w-auto theme-input text-sm",
							onChange: ($event) => _ctx.$inertia.get(_ctx.route("inventario.index"), { insumo_id: $event.target.value }, {
								preserveState: true,
								replace: true
							})
						}, [createVNode("option", { value: "" }, "Todos los insumos"), (openBlock(true), createBlock(Fragment, null, renderList(__props.insumos, (i) => {
							return openBlock(), createBlock("option", {
								key: i.id,
								value: i.id
							}, toDisplayString(i.nombre), 9, ["value"]);
						}), 128))], 40, ["onUpdate:modelValue", "onChange"]), [[vModelSelect, __props.filters.insumo_id]])]),
						createVNode("div", { class: "overflow-x-auto rounded-lg border dark:border-gray-700" }, [createVNode("table", { class: "min-w-full text-sm text-left text-gray-700 dark:text-gray-300" }, [createVNode("thead", { class: "bg-gray-50 dark:bg-gray-800" }, [createVNode("tr", null, [
							createVNode("th", { class: "px-4 py-3" }, "Fecha"),
							createVNode("th", { class: "px-4 py-3" }, "Insumo"),
							createVNode("th", { class: "px-4 py-3" }, "Tipo"),
							createVNode("th", { class: "px-4 py-3" }, "Cantidad"),
							createVNode("th", { class: "px-4 py-3" }, "Costo Unit."),
							createVNode("th", { class: "px-4 py-3" }, "Valor Total")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.movimientos.data, (m) => {
							return openBlock(), createBlock("tr", {
								key: m.id,
								class: "border-t dark:border-gray-700"
							}, [
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(m.fecha), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(m.insumo?.nombre), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(m.tipo_movimiento), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(m.cantidad), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(m.costo_unitario), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(m.valor_total), 1)
							]);
						}), 128)), !__props.movimientos.data.length ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
							colspan: "6",
							class: "px-4 py-6 text-center text-gray-500 dark:text-gray-400"
						}, "Sin movimientos.")])) : createCommentVNode("", true)])])]),
						__props.movimientos.links ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-4 flex justify-center"
						}, [createVNode("div", { class: "flex flex-wrap gap-1 text-sm" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.movimientos.links, (link) => {
							return openBlock(), createBlock(unref(Link), {
								key: link.label,
								href: link.url || "#",
								innerHTML: link.label,
								class: ["px-3 py-1 rounded border dark:border-gray-600 dark:text-gray-300", {
									"bg-indigo-600 text-white": link.active,
									"opacity-50 pointer-events-none": !link.url
								}]
							}, null, 8, [
								"href",
								"innerHTML",
								"class"
							]);
						}), 128))])])) : createCommentVNode("", true)
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Inventario/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
