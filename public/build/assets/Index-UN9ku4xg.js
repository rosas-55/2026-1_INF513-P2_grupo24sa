import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, vModelText, withCtx, withDirectives } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Recetas/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		recetas: Object,
		filters: Object
	},
	setup(__props) {
		const form = useForm({});
		function destroy(id) {
			if (confirm("¿Eliminar esta receta?")) form.delete(route("recetas.destroy", id));
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Recetas" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6"${_scopeId}><h1 class="text-2xl font-semibold dark:text-white"${_scopeId}>Recetas</h1>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("recetas.create"),
							class: "rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Nueva Receta`);
								else return [createTextVNode("Nueva Receta")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><form class="mb-4"${_scopeId}><input${ssrRenderAttr("value", __props.filters.search)} type="text" placeholder="Buscar⬦" aria-label="Buscar recetas" autocomplete="off" class="w-full sm:w-auto theme-input text-sm"${_scopeId}></form><div class="overflow-x-auto rounded-lg border dark:border-gray-700"${_scopeId}><table class="min-w-full text-sm text-left text-gray-700 dark:text-gray-300"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-800"${_scopeId}><tr${_scopeId}><th class="px-4 py-3"${_scopeId}>Producto</th><th class="px-4 py-3"${_scopeId}>Descripción</th><th class="px-4 py-3"${_scopeId}>Tiempo Prep.</th><th class="px-4 py-3 text-right"${_scopeId}>Acciones</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.recetas.data, (r) => {
							_push(`<tr class="border-t dark:border-gray-700"${_scopeId}><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(r.producto?.nombre)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(r.descripcion)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(r.tiempo_preparacion)}</td><td class="px-4 py-3 text-right space-x-2"${_scopeId}>`);
							_push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("recetas.edit", r.id),
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
						if (!__props.recetas.data.length) _push(`<tr${_scopeId}><td colspan="4" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400"${_scopeId}>Sin recetas.</td></tr>`);
						else _push(`<!---->`);
						_push(`</tbody></table></div>`);
						if (__props.recetas.links) {
							_push(`<div class="mt-4 flex justify-center"${_scopeId}><div class="flex flex-wrap gap-1 text-sm"${_scopeId}><!--[-->`);
							ssrRenderList(__props.recetas.links, (link) => {
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
					} else return [createVNode(unref(Head), { title: "Recetas" }), createVNode("div", { class: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6" }, [createVNode("h1", { class: "text-2xl font-semibold dark:text-white" }, "Recetas"), createVNode(unref(Link), {
							href: _ctx.route("recetas.create"),
							class: "rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto"
						}, {
							default: withCtx(() => [createTextVNode("Nueva Receta")]),
							_: 1
						}, 8, ["href"])]),
						createVNode("form", { class: "mb-4" }, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => __props.filters.search = $event,
							type: "text",
							placeholder: "Buscar⬦",
							"aria-label": "Buscar recetas",
							autocomplete: "off",
							class: "w-full sm:w-auto theme-input text-sm",
							onChange: ($event) => _ctx.$inertia.get(_ctx.route("recetas.index"), { search: $event.target.value }, {
								preserveState: true,
								replace: true
							})
						}, null, 40, ["onUpdate:modelValue", "onChange"]), [[vModelText, __props.filters.search]])]),
						createVNode("div", { class: "overflow-x-auto rounded-lg border dark:border-gray-700" }, [createVNode("table", { class: "min-w-full text-sm text-left text-gray-700 dark:text-gray-300" }, [createVNode("thead", { class: "bg-gray-50 dark:bg-gray-800" }, [createVNode("tr", null, [
							createVNode("th", { class: "px-4 py-3" }, "Producto"),
							createVNode("th", { class: "px-4 py-3" }, "Descripción"),
							createVNode("th", { class: "px-4 py-3" }, "Tiempo Prep."),
							createVNode("th", { class: "px-4 py-3 text-right" }, "Acciones")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.recetas.data, (r) => {
							return openBlock(), createBlock("tr", {
								key: r.id,
								class: "border-t dark:border-gray-700"
							}, [
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(r.producto?.nombre), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(r.descripcion), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(r.tiempo_preparacion), 1),
								createVNode("td", { class: "px-4 py-3 text-right space-x-2" }, [createVNode(unref(Link), {
									href: _ctx.route("recetas.edit", r.id),
									class: "text-indigo-600 hover:underline text-xs"
								}, {
									default: withCtx(() => [createTextVNode("Editar")]),
									_: 1
								}, 8, ["href"]), createVNode("button", {
									onClick: ($event) => destroy(r.id),
									class: "text-red-600 hover:underline text-xs"
								}, "Eliminar", 8, ["onClick"])])
							]);
						}), 128)), !__props.recetas.data.length ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
							colspan: "4",
							class: "px-4 py-6 text-center text-gray-500 dark:text-gray-400"
						}, "Sin recetas.")])) : createCommentVNode("", true)])])]),
						__props.recetas.links ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-4 flex justify-center"
						}, [createVNode("div", { class: "flex flex-wrap gap-1 text-sm" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.recetas.links, (link) => {
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Recetas/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
