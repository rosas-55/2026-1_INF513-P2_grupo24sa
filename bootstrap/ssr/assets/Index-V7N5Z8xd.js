import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, vModelSelect, withCtx, withDirectives } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Ventas/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		ventas: Object,
		clientes: Array,
		filters: Object
	},
	setup(__props) {
		const form = useForm({});
		function destroy(id) {
			if (confirm("Â¿Eliminar esta venta?")) form.delete(route("ventas.destroy", id));
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Ventas" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6"${_scopeId}><h1 class="text-2xl font-semibold dark:text-white"${_scopeId}>Ventas</h1>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("ventas.create"),
							class: "rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Nueva Venta`);
								else return [createTextVNode("Nueva Venta")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><form class="mb-4 flex flex-col sm:flex-row flex-wrap gap-2"${_scopeId}><select class="w-full sm:w-auto theme-input text-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(__props.filters.cliente_id) ? ssrLooseContain(__props.filters.cliente_id, "") : ssrLooseEqual(__props.filters.cliente_id, "")) ? " selected" : ""}${_scopeId}>Todos los clientes</option><!--[-->`);
						ssrRenderList(__props.clientes, (c) => {
							_push(`<option${ssrRenderAttr("value", c.id)}${ssrIncludeBooleanAttr(Array.isArray(__props.filters.cliente_id) ? ssrLooseContain(__props.filters.cliente_id, c.id) : ssrLooseEqual(__props.filters.cliente_id, c.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(c.name)}</option>`);
						});
						_push(`<!--]--></select><select class="w-full sm:w-auto theme-input text-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(__props.filters.estado) ? ssrLooseContain(__props.filters.estado, "") : ssrLooseEqual(__props.filters.estado, "")) ? " selected" : ""}${_scopeId}>Todos los estados</option><option value="PENDIENTE"${ssrIncludeBooleanAttr(Array.isArray(__props.filters.estado) ? ssrLooseContain(__props.filters.estado, "PENDIENTE") : ssrLooseEqual(__props.filters.estado, "PENDIENTE")) ? " selected" : ""}${_scopeId}>Pendiente</option><option value="COMPLETADO"${ssrIncludeBooleanAttr(Array.isArray(__props.filters.estado) ? ssrLooseContain(__props.filters.estado, "COMPLETADO") : ssrLooseEqual(__props.filters.estado, "COMPLETADO")) ? " selected" : ""}${_scopeId}>Completado</option><option value="ANULADO"${ssrIncludeBooleanAttr(Array.isArray(__props.filters.estado) ? ssrLooseContain(__props.filters.estado, "ANULADO") : ssrLooseEqual(__props.filters.estado, "ANULADO")) ? " selected" : ""}${_scopeId}>Anulado</option></select></form><div class="overflow-x-auto rounded-lg border dark:border-gray-700"${_scopeId}><table class="min-w-full text-sm text-left text-gray-700 dark:text-gray-300"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-800"${_scopeId}><tr${_scopeId}><th class="px-4 py-3"${_scopeId}>ID</th><th class="px-4 py-3"${_scopeId}>Cliente</th><th class="px-4 py-3"${_scopeId}>Tipo</th><th class="px-4 py-3"${_scopeId}>Total</th><th class="px-4 py-3"${_scopeId}>Estado</th><th class="px-4 py-3"${_scopeId}>Fecha</th><th class="px-4 py-3 text-right"${_scopeId}>Acciones</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.ventas.data, (v) => {
							_push(`<tr class="border-t dark:border-gray-700"${_scopeId}><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(v.id)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(v.cliente?.name)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(v.tipo)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(v.total)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(v.estado)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(v.fecha)}</td><td class="px-4 py-3 text-right space-x-2"${_scopeId}>`);
							_push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("ventas.show", v.id),
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
						if (!__props.ventas.data.length) _push(`<tr${_scopeId}><td colspan="7" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400"${_scopeId}>Sin ventas.</td></tr>`);
						else _push(`<!---->`);
						_push(`</tbody></table></div>`);
						if (__props.ventas.links) {
							_push(`<div class="mt-4 flex justify-center"${_scopeId}><div class="flex flex-wrap gap-1 text-sm"${_scopeId}><!--[-->`);
							ssrRenderList(__props.ventas.links, (link) => {
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
					} else return [createVNode(unref(Head), { title: "Ventas" }), createVNode("div", { class: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6" }, [createVNode("h1", { class: "text-2xl font-semibold dark:text-white" }, "Ventas"), createVNode(unref(Link), {
							href: _ctx.route("ventas.create"),
							class: "rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto"
						}, {
							default: withCtx(() => [createTextVNode("Nueva Venta")]),
							_: 1
						}, 8, ["href"])]),
						createVNode("form", { class: "mb-4 flex flex-col sm:flex-row flex-wrap gap-2" }, [withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => __props.filters.cliente_id = $event,
							class: "w-full sm:w-auto theme-input text-sm",
							onChange: ($event) => _ctx.$inertia.get(_ctx.route("ventas.index"), {
								cliente_id: $event.target.value,
								estado: __props.filters.estado
							}, {
								preserveState: true,
								replace: true
							})
						}, [createVNode("option", { value: "" }, "Todos los clientes"), (openBlock(true), createBlock(Fragment, null, renderList(__props.clientes, (c) => {
							return openBlock(), createBlock("option", {
								key: c.id,
								value: c.id
							}, toDisplayString(c.name), 9, ["value"]);
						}), 128))], 40, ["onUpdate:modelValue", "onChange"]), [[vModelSelect, __props.filters.cliente_id]]), withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => __props.filters.estado = $event,
							class: "w-full sm:w-auto theme-input text-sm",
							onChange: ($event) => _ctx.$inertia.get(_ctx.route("ventas.index"), {
								estado: $event.target.value,
								cliente_id: __props.filters.cliente_id
							}, {
								preserveState: true,
								replace: true
							})
						}, [
							createVNode("option", { value: "" }, "Todos los estados"),
							createVNode("option", { value: "PENDIENTE" }, "Pendiente"),
							createVNode("option", { value: "COMPLETADO" }, "Completado"),
							createVNode("option", { value: "ANULADO" }, "Anulado")
						], 40, ["onUpdate:modelValue", "onChange"]), [[vModelSelect, __props.filters.estado]])]),
						createVNode("div", { class: "overflow-x-auto rounded-lg border dark:border-gray-700" }, [createVNode("table", { class: "min-w-full text-sm text-left text-gray-700 dark:text-gray-300" }, [createVNode("thead", { class: "bg-gray-50 dark:bg-gray-800" }, [createVNode("tr", null, [
							createVNode("th", { class: "px-4 py-3" }, "ID"),
							createVNode("th", { class: "px-4 py-3" }, "Cliente"),
							createVNode("th", { class: "px-4 py-3" }, "Tipo"),
							createVNode("th", { class: "px-4 py-3" }, "Total"),
							createVNode("th", { class: "px-4 py-3" }, "Estado"),
							createVNode("th", { class: "px-4 py-3" }, "Fecha"),
							createVNode("th", { class: "px-4 py-3 text-right" }, "Acciones")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.ventas.data, (v) => {
							return openBlock(), createBlock("tr", {
								key: v.id,
								class: "border-t dark:border-gray-700"
							}, [
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(v.id), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(v.cliente?.name), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(v.tipo), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(v.total), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(v.estado), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(v.fecha), 1),
								createVNode("td", { class: "px-4 py-3 text-right space-x-2" }, [createVNode(unref(Link), {
									href: _ctx.route("ventas.show", v.id),
									class: "text-blue-600 hover:underline text-xs"
								}, {
									default: withCtx(() => [createTextVNode("Ver")]),
									_: 1
								}, 8, ["href"]), createVNode("button", {
									onClick: ($event) => destroy(v.id),
									class: "text-red-600 hover:underline text-xs"
								}, "Eliminar", 8, ["onClick"])])
							]);
						}), 128)), !__props.ventas.data.length ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
							colspan: "7",
							class: "px-4 py-6 text-center text-gray-500 dark:text-gray-400"
						}, "Sin ventas.")])) : createCommentVNode("", true)])])]),
						__props.ventas.links ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-4 flex justify-center"
						}, [createVNode("div", { class: "flex flex-wrap gap-1 text-sm" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.ventas.links, (link) => {
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Ventas/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
