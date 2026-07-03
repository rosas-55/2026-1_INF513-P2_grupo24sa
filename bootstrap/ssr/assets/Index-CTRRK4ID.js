import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, vModelText, withCtx, withDirectives, withModifiers } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Proveedores/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		proveedores: Object,
		filters: Object
	},
	setup(__props) {
		const form = useForm({});
		function destroy(id) {
			if (confirm("¿Eliminar este proveedor?")) form.delete(route("proveedores.destroy", id));
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Proveedores" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6"${_scopeId}><h1 class="text-2xl font-semibold text-gray-900 dark:text-white"${_scopeId}>Proveedores</h1>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("proveedores.create"),
							class: "inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 self-start sm:self-auto"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Nuevo Proveedor`);
								else return [createTextVNode("Nuevo Proveedor")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><form class="mb-4 flex flex-col gap-2 sm:flex-row"${_scopeId}><input${ssrRenderAttr("value", __props.filters.search)} type="text" placeholder="Buscar…" aria-label="Buscar proveedores" autocomplete="off" class="w-full sm:w-auto rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2 text-sm"${_scopeId}></form><div class="overflow-x-auto rounded-lg border dark:border-gray-700"${_scopeId}><table class="min-w-full text-sm text-left text-gray-700 dark:text-gray-300"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-800"${_scopeId}><tr${_scopeId}><th class="px-4 py-3"${_scopeId}>Nombre</th><th class="px-4 py-3"${_scopeId}>Dirección</th><th class="px-4 py-3"${_scopeId}>Teléfono</th><th class="px-4 py-3 text-right"${_scopeId}>Acciones</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.proveedores.data, (p) => {
							_push(`<tr class="border-t dark:border-gray-700"${_scopeId}><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(p.nombre)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(p.direccion)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(p.telefono)}</td><td class="px-4 py-3 text-right space-x-2"${_scopeId}>`);
							_push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("proveedores.edit", p.id),
								class: "text-indigo-600 hover:underline text-xs"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`Editar`);
									else return [createTextVNode("Editar")];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`<button class="text-red-600 hover:underline text-xs"${_scopeId}>Eliminar</button></td></tr>`);
						});
						_push(`<!--]-->`);
						if (!__props.proveedores.data.length) _push(`<tr${_scopeId}><td colspan="4" class="px-4 py-6 text-center text-gray-500"${_scopeId}>Sin resultados.</td></tr>`);
						else _push(`<!---->`);
						_push(`</tbody></table></div>`);
						if (__props.proveedores.links) {
							_push(`<div class="mt-4 flex justify-center"${_scopeId}><div class="flex flex-wrap gap-1 text-sm"${_scopeId}><!--[-->`);
							ssrRenderList(__props.proveedores.links, (link) => {
								_push(ssrRenderComponent(unref(Link), {
									key: link.label,
									href: link.url || "#",
									class: ["px-3 py-1 rounded border dark:border-gray-600", {
										"bg-indigo-600 text-white": link.active,
										"opacity-50 pointer-events-none": !link.url
									}]
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode(unref(Head), { title: "Proveedores" }), createVNode("div", { class: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6" }, [createVNode("h1", { class: "text-2xl font-semibold text-gray-900 dark:text-white" }, "Proveedores"), createVNode(unref(Link), {
							href: _ctx.route("proveedores.create"),
							class: "inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 self-start sm:self-auto"
						}, {
							default: withCtx(() => [createTextVNode("Nuevo Proveedor")]),
							_: 1
						}, 8, ["href"])]),
						createVNode("form", {
							class: "mb-4 flex flex-col gap-2 sm:flex-row",
							onSubmit: withModifiers(() => {}, ["prevent"])
						}, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => __props.filters.search = $event,
							type: "text",
							placeholder: "Buscar…",
							"aria-label": "Buscar proveedores",
							autocomplete: "off",
							class: "w-full sm:w-auto rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2 text-sm",
							onChange: ($event) => _ctx.$inertia.get(_ctx.route("proveedores.index"), { search: $event.target.value }, {
								preserveState: true,
								replace: true
							})
						}, null, 40, ["onUpdate:modelValue", "onChange"]), [[vModelText, __props.filters.search]])], 40, ["onSubmit"]),
						createVNode("div", { class: "overflow-x-auto rounded-lg border dark:border-gray-700" }, [createVNode("table", { class: "min-w-full text-sm text-left text-gray-700 dark:text-gray-300" }, [createVNode("thead", { class: "bg-gray-50 dark:bg-gray-800" }, [createVNode("tr", null, [
							createVNode("th", { class: "px-4 py-3" }, "Nombre"),
							createVNode("th", { class: "px-4 py-3" }, "Dirección"),
							createVNode("th", { class: "px-4 py-3" }, "Teléfono"),
							createVNode("th", { class: "px-4 py-3 text-right" }, "Acciones")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.proveedores.data, (p) => {
							return openBlock(), createBlock("tr", {
								key: p.id,
								class: "border-t dark:border-gray-700"
							}, [
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(p.nombre), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(p.direccion), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(p.telefono), 1),
								createVNode("td", { class: "px-4 py-3 text-right space-x-2" }, [createVNode(unref(Link), {
									href: _ctx.route("proveedores.edit", p.id),
									class: "text-indigo-600 hover:underline text-xs"
								}, {
									default: withCtx(() => [createTextVNode("Editar")]),
									_: 1
								}, 8, ["href"]), createVNode("button", {
									onClick: ($event) => destroy(p.id),
									class: "text-red-600 hover:underline text-xs"
								}, "Eliminar", 8, ["onClick"])])
							]);
						}), 128)), !__props.proveedores.data.length ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
							colspan: "4",
							class: "px-4 py-6 text-center text-gray-500"
						}, "Sin resultados.")])) : createCommentVNode("", true)])])]),
						__props.proveedores.links ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-4 flex justify-center"
						}, [createVNode("div", { class: "flex flex-wrap gap-1 text-sm" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.proveedores.links, (link) => {
							return openBlock(), createBlock(unref(Link), {
								key: link.label,
								href: link.url || "#",
								innerHTML: link.label,
								class: ["px-3 py-1 rounded border dark:border-gray-600", {
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Proveedores/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
