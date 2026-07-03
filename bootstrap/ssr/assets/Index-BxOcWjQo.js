import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, vModelSelect, withCtx, withDirectives } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Compras/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		compras: Object,
		proveedores: Array,
		filters: Object
	},
	setup(__props) {
		const form = useForm({});
		function destroy(id) {
			if (confirm("Â¿Eliminar esta compra?")) form.delete(route("compras.destroy", id));
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Compras" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6"${_scopeId}><h1 class="text-2xl font-semibold dark:text-white"${_scopeId}>Compras</h1>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("compras.create"),
							class: "rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Nueva Compra`);
								else return [createTextVNode("Nueva Compra")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><form class="mb-4"${_scopeId}><select class="w-full sm:w-auto theme-input text-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(__props.filters.proveedor_id) ? ssrLooseContain(__props.filters.proveedor_id, "") : ssrLooseEqual(__props.filters.proveedor_id, "")) ? " selected" : ""}${_scopeId}>Todos los proveedores</option><!--[-->`);
						ssrRenderList(__props.proveedores, (p) => {
							_push(`<option${ssrRenderAttr("value", p.id)}${ssrIncludeBooleanAttr(Array.isArray(__props.filters.proveedor_id) ? ssrLooseContain(__props.filters.proveedor_id, p.id) : ssrLooseEqual(__props.filters.proveedor_id, p.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(p.nombre)}</option>`);
						});
						_push(`<!--]--></select></form><div class="overflow-x-auto rounded-lg border dark:border-gray-700"${_scopeId}><table class="min-w-full text-sm text-left text-gray-700 dark:text-gray-300"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-800"${_scopeId}><tr${_scopeId}><th class="px-4 py-3"${_scopeId}>ID</th><th class="px-4 py-3"${_scopeId}>Proveedor</th><th class="px-4 py-3"${_scopeId}>Estado</th><th class="px-4 py-3"${_scopeId}>Fecha</th><th class="px-4 py-3"${_scopeId}>Total</th><th class="px-4 py-3 text-right"${_scopeId}>Acciones</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.compras.data, (c) => {
							_push(`<tr class="border-t dark:border-gray-700"${_scopeId}><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(c.id)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(c.proveedor?.nombre)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(c.estado)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(c.fecha)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(c.total)}</td><td class="px-4 py-3 text-right space-x-2"${_scopeId}>`);
							_push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("compras.show", c.id),
								class: "text-blue-600 hover:underline text-xs"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`Ver`);
									else return [createTextVNode("Ver")];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`<button class="text-red-600 hover:underline text-xs"${_scopeId}>Eliminar</button></td></tr>`);
						});
						_push(`<!--]-->`);
						if (!__props.compras.data.length) _push(`<tr${_scopeId}><td colspan="6" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400"${_scopeId}>Sin resultados.</td></tr>`);
						else _push(`<!---->`);
						_push(`</tbody></table></div>`);
						if (__props.compras.links) {
							_push(`<div class="mt-4 flex justify-center"${_scopeId}><div class="flex flex-wrap gap-1 text-sm"${_scopeId}><!--[-->`);
							ssrRenderList(__props.compras.links, (link) => {
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
					} else return [createVNode(unref(Head), { title: "Compras" }), createVNode("div", { class: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6" }, [createVNode("h1", { class: "text-2xl font-semibold dark:text-white" }, "Compras"), createVNode(unref(Link), {
							href: _ctx.route("compras.create"),
							class: "rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto"
						}, {
							default: withCtx(() => [createTextVNode("Nueva Compra")]),
							_: 1
						}, 8, ["href"])]),
						createVNode("form", { class: "mb-4" }, [withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => __props.filters.proveedor_id = $event,
							class: "w-full sm:w-auto theme-input text-sm",
							onChange: ($event) => _ctx.$inertia.get(_ctx.route("compras.index"), { proveedor_id: $event.target.value }, {
								preserveState: true,
								replace: true
							})
						}, [createVNode("option", { value: "" }, "Todos los proveedores"), (openBlock(true), createBlock(Fragment, null, renderList(__props.proveedores, (p) => {
							return openBlock(), createBlock("option", {
								key: p.id,
								value: p.id
							}, toDisplayString(p.nombre), 9, ["value"]);
						}), 128))], 40, ["onUpdate:modelValue", "onChange"]), [[vModelSelect, __props.filters.proveedor_id]])]),
						createVNode("div", { class: "overflow-x-auto rounded-lg border dark:border-gray-700" }, [createVNode("table", { class: "min-w-full text-sm text-left text-gray-700 dark:text-gray-300" }, [createVNode("thead", { class: "bg-gray-50 dark:bg-gray-800" }, [createVNode("tr", null, [
							createVNode("th", { class: "px-4 py-3" }, "ID"),
							createVNode("th", { class: "px-4 py-3" }, "Proveedor"),
							createVNode("th", { class: "px-4 py-3" }, "Estado"),
							createVNode("th", { class: "px-4 py-3" }, "Fecha"),
							createVNode("th", { class: "px-4 py-3" }, "Total"),
							createVNode("th", { class: "px-4 py-3 text-right" }, "Acciones")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.compras.data, (c) => {
							return openBlock(), createBlock("tr", {
								key: c.id,
								class: "border-t dark:border-gray-700"
							}, [
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(c.id), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(c.proveedor?.nombre), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(c.estado), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(c.fecha), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(c.total), 1),
								createVNode("td", { class: "px-4 py-3 text-right space-x-2" }, [createVNode(unref(Link), {
									href: _ctx.route("compras.show", c.id),
									class: "text-blue-600 hover:underline text-xs"
								}, {
									default: withCtx(() => [createTextVNode("Ver")]),
									_: 1
								}, 8, ["href"]), createVNode("button", {
									onClick: ($event) => destroy(c.id),
									class: "text-red-600 hover:underline text-xs"
								}, "Eliminar", 8, ["onClick"])])
							]);
						}), 128)), !__props.compras.data.length ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
							colspan: "6",
							class: "px-4 py-6 text-center text-gray-500 dark:text-gray-400"
						}, "Sin resultados.")])) : createCommentVNode("", true)])])]),
						__props.compras.links ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-4 flex justify-center"
						}, [createVNode("div", { class: "flex flex-wrap gap-1 text-sm" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.compras.links, (link) => {
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Compras/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
