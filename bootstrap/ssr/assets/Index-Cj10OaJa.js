import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Produccion/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: { producciones: Object },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Producción" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6"${_scopeId}><h1 class="text-2xl font-semibold dark:text-white"${_scopeId}>Producción</h1>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("produccion.create"),
							class: "rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Nueva Producción`);
								else return [createTextVNode("Nueva Producción")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><div class="overflow-x-auto rounded-lg border dark:border-gray-700"${_scopeId}><table class="min-w-full text-sm text-left text-gray-700 dark:text-gray-300"${_scopeId}><thead class="bg-gray-50 dark:bg-gray-800"${_scopeId}><tr${_scopeId}><th class="px-4 py-3"${_scopeId}>Fecha</th><th class="px-4 py-3"${_scopeId}>Producto</th><th class="px-4 py-3"${_scopeId}>Cantidad Producida</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.producciones.data, (p) => {
							_push(`<tr class="border-t dark:border-gray-700"${_scopeId}><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(p.fecha)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(p.receta?.producto?.nombre)}</td><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(p.cantidad_producida)}</td></tr>`);
						});
						_push(`<!--]-->`);
						if (!__props.producciones.data.length) _push(`<tr${_scopeId}><td colspan="3" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400"${_scopeId}>Sin registros.</td></tr>`);
						else _push(`<!---->`);
						_push(`</tbody></table></div>`);
						if (__props.producciones.links) {
							_push(`<div class="mt-4 flex justify-center"${_scopeId}><div class="flex flex-wrap gap-1 text-sm"${_scopeId}><!--[-->`);
							ssrRenderList(__props.producciones.links, (link) => {
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
					} else return [createVNode(unref(Head), { title: "Producción" }), createVNode("div", { class: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6" }, [createVNode("h1", { class: "text-2xl font-semibold dark:text-white" }, "Producción"), createVNode(unref(Link), {
							href: _ctx.route("produccion.create"),
							class: "rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto"
						}, {
							default: withCtx(() => [createTextVNode("Nueva Producción")]),
							_: 1
						}, 8, ["href"])]),
						createVNode("div", { class: "overflow-x-auto rounded-lg border dark:border-gray-700" }, [createVNode("table", { class: "min-w-full text-sm text-left text-gray-700 dark:text-gray-300" }, [createVNode("thead", { class: "bg-gray-50 dark:bg-gray-800" }, [createVNode("tr", null, [
							createVNode("th", { class: "px-4 py-3" }, "Fecha"),
							createVNode("th", { class: "px-4 py-3" }, "Producto"),
							createVNode("th", { class: "px-4 py-3" }, "Cantidad Producida")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.producciones.data, (p) => {
							return openBlock(), createBlock("tr", {
								key: p.id,
								class: "border-t dark:border-gray-700"
							}, [
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(p.fecha), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(p.receta?.producto?.nombre), 1),
								createVNode("td", { class: "px-4 py-3" }, toDisplayString(p.cantidad_producida), 1)
							]);
						}), 128)), !__props.producciones.data.length ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
							colspan: "3",
							class: "px-4 py-6 text-center text-gray-500 dark:text-gray-400"
						}, "Sin registros.")])) : createCommentVNode("", true)])])]),
						__props.producciones.links ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-4 flex justify-center"
						}, [createVNode("div", { class: "flex flex-wrap gap-1 text-sm" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.producciones.links, (link) => {
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Produccion/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
