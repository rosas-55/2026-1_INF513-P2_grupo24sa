import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Reportes/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		datos_visitas: Array,
		total_visitas: Number,
		kpis: Object,
		productos_mas_vendidos: Array,
		ventas_recientes: Array
	},
	setup(__props) {
		function formatCurrency(amount) {
			return new Intl.NumberFormat("es-BO", {
				style: "currency",
				currency: "BOB"
			}).format(amount || 0);
		}
		function formatDate(dateString) {
			if (!dateString) return "";
			return new Date(dateString).toLocaleDateString("es-BO", {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Reportes y Estadísticas" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8"${_scopeId}><div class="flex flex-col md:flex-row md:items-center justify-between gap-4"${_scopeId}><h1 class="text-3xl font-bold theme-section-title"${_scopeId}>Dashboard de Reportes</h1><div class="bg-[var(--color-primary-light)] text-[var(--color-primary)] px-4 py-2 rounded-lg font-semibold flex items-center gap-2"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg> Visitas Totales: ${ssrInterpolate(__props.total_visitas)}</div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"${_scopeId}><div class="theme-card p-6 border-l-4" style="${ssrRenderStyle({ "border-left-color": "var(--color-success)" })}"${_scopeId}><p class="text-sm font-medium text-secondary mb-1"${_scopeId}>Ingresos por Ventas</p><p class="text-2xl font-bold" style="${ssrRenderStyle({ color: "var(--color-success)" })}"${_scopeId}>${ssrInterpolate(formatCurrency(__props.kpis.total_ventas))}</p></div><div class="theme-card p-6 border-l-4" style="${ssrRenderStyle({ "border-left-color": "var(--color-danger)" })}"${_scopeId}><p class="text-sm font-medium text-secondary mb-1"${_scopeId}>Gastos en Compras</p><p class="text-2xl font-bold" style="${ssrRenderStyle({ color: "var(--color-danger)" })}"${_scopeId}>${ssrInterpolate(formatCurrency(__props.kpis.total_compras))}</p></div><div class="theme-card p-6 border-l-4" style="${ssrRenderStyle({ "border-left-color": "var(--color-info)" })}"${_scopeId}><p class="text-sm font-medium text-secondary mb-1"${_scopeId}>Clientes Registrados</p><p class="text-2xl font-bold" style="${ssrRenderStyle({ color: "var(--color-info)" })}"${_scopeId}>${ssrInterpolate(__props.kpis.clientes_registrados)}</p></div><div class="theme-card p-6 border-l-4" style="${ssrRenderStyle({ "border-left-color": "var(--color-warning)" })}"${_scopeId}><p class="text-sm font-medium text-secondary mb-1"${_scopeId}>Productos Activos</p><p class="text-2xl font-bold" style="${ssrRenderStyle({ color: "var(--color-warning)" })}"${_scopeId}>${ssrInterpolate(__props.kpis.productos_activos)}</p></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8"${_scopeId}><div class="theme-card p-6"${_scopeId}><h2 class="text-xl font-semibold mb-4 flex items-center gap-2"${_scopeId}><svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"${_scopeId}></path></svg> Productos Más Vendidos </h2>`);
						if (__props.productos_mas_vendidos.length > 0) {
							_push(`<div class="space-y-4"${_scopeId}><!--[-->`);
							ssrRenderList(__props.productos_mas_vendidos, (prod, index) => {
								_push(`<div class="flex justify-between items-center p-3 rounded-lg bg-[var(--color-surface-alt)]"${_scopeId}><div${_scopeId}><p class="font-medium"${_scopeId}>${ssrInterpolate(prod.nombre)}</p><p class="text-xs text-secondary"${_scopeId}>${ssrInterpolate(parseInt(prod.total_vendido))} unidades vendidas</p></div><div class="text-right"${_scopeId}><p class="font-bold text-[var(--color-success)]"${_scopeId}>${ssrInterpolate(formatCurrency(prod.ingresos))}</p></div></div>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<p class="text-muted italic py-4 text-center"${_scopeId}>No hay datos de ventas registrados.</p>`);
						_push(`</div><div class="theme-card p-6"${_scopeId}><h2 class="text-xl font-semibold mb-4 flex items-center gap-2"${_scopeId}><svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId}></path></svg> Páginas Más Visitadas </h2><div class="overflow-x-auto border rounded-md" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><table class="w-full text-sm text-left"${_scopeId}><thead class="bg-[var(--color-surface-alt)]"${_scopeId}><tr${_scopeId}><th class="px-4 py-2 font-medium"${_scopeId}>Página</th><th class="px-4 py-2 font-medium"${_scopeId}>Ruta</th><th class="px-4 py-2 font-medium text-right"${_scopeId}>Visitas</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.datos_visitas.slice(0, 10), (visita) => {
							_push(`<tr class="border-b last:border-b-0 hover:bg-[var(--color-surface-hover)]" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><td class="px-4 py-3 font-medium"${_scopeId}>${ssrInterpolate(visita.nombre_pagina)}</td><td class="px-4 py-3 text-secondary text-xs"${_scopeId}>${ssrInterpolate(visita.ruta)}</td><td class="px-4 py-3 text-right font-bold"${_scopeId}>${ssrInterpolate(visita.total_visitas)}</td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></div><div class="theme-card p-6 lg:col-span-2"${_scopeId}><h2 class="text-xl font-semibold mb-4 flex items-center gap-2"${_scopeId}><svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Ventas Recientes </h2><div class="overflow-x-auto border rounded-md" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><table class="w-full text-sm text-left"${_scopeId}><thead class="bg-[var(--color-surface-alt)]"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 font-medium"${_scopeId}>Fecha</th><th class="px-4 py-3 font-medium"${_scopeId}>Cliente</th><th class="px-4 py-3 font-medium"${_scopeId}>Tipo</th><th class="px-4 py-3 font-medium"${_scopeId}>Total</th><th class="px-4 py-3 font-medium"${_scopeId}>Estado</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.ventas_recientes, (venta) => {
							_push(`<tr class="border-b last:border-b-0 hover:bg-[var(--color-surface-hover)]" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><td class="px-4 py-3"${_scopeId}>${ssrInterpolate(formatDate(venta.fecha))}</td><td class="px-4 py-3 font-medium"${_scopeId}>${ssrInterpolate(venta.cliente?.name || "Consumidor Final")}</td><td class="px-4 py-3 text-secondary"${_scopeId}>${ssrInterpolate(venta.tipo)}</td><td class="px-4 py-3 font-bold"${_scopeId}>${ssrInterpolate(formatCurrency(venta.total))}</td><td class="px-4 py-3"${_scopeId}><span class="badge-primary"${_scopeId}>${ssrInterpolate(venta.estado)}</span></td></tr>`);
						});
						_push(`<!--]-->`);
						if (__props.ventas_recientes.length === 0) _push(`<tr${_scopeId}><td colspan="5" class="px-4 py-6 text-center text-muted"${_scopeId}>No hay ventas recientes.</td></tr>`);
						else _push(`<!---->`);
						_push(`</tbody></table></div></div></div></div>`);
					} else return [createVNode(unref(Head), { title: "Reportes y Estadísticas" }), createVNode("div", { class: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8" }, [
						createVNode("div", { class: "flex flex-col md:flex-row md:items-center justify-between gap-4" }, [createVNode("h1", { class: "text-3xl font-bold theme-section-title" }, "Dashboard de Reportes"), createVNode("div", { class: "bg-[var(--color-primary-light)] text-[var(--color-primary)] px-4 py-2 rounded-lg font-semibold flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
							class: "w-5 h-5",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						}), createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
						})])), createTextVNode(" Visitas Totales: " + toDisplayString(__props.total_visitas), 1)])]),
						createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" }, [
							createVNode("div", {
								class: "theme-card p-6 border-l-4",
								style: { "border-left-color": "var(--color-success)" }
							}, [createVNode("p", { class: "text-sm font-medium text-secondary mb-1" }, "Ingresos por Ventas"), createVNode("p", {
								class: "text-2xl font-bold",
								style: { color: "var(--color-success)" }
							}, toDisplayString(formatCurrency(__props.kpis.total_ventas)), 1)]),
							createVNode("div", {
								class: "theme-card p-6 border-l-4",
								style: { "border-left-color": "var(--color-danger)" }
							}, [createVNode("p", { class: "text-sm font-medium text-secondary mb-1" }, "Gastos en Compras"), createVNode("p", {
								class: "text-2xl font-bold",
								style: { color: "var(--color-danger)" }
							}, toDisplayString(formatCurrency(__props.kpis.total_compras)), 1)]),
							createVNode("div", {
								class: "theme-card p-6 border-l-4",
								style: { "border-left-color": "var(--color-info)" }
							}, [createVNode("p", { class: "text-sm font-medium text-secondary mb-1" }, "Clientes Registrados"), createVNode("p", {
								class: "text-2xl font-bold",
								style: { color: "var(--color-info)" }
							}, toDisplayString(__props.kpis.clientes_registrados), 1)]),
							createVNode("div", {
								class: "theme-card p-6 border-l-4",
								style: { "border-left-color": "var(--color-warning)" }
							}, [createVNode("p", { class: "text-sm font-medium text-secondary mb-1" }, "Productos Activos"), createVNode("p", {
								class: "text-2xl font-bold",
								style: { color: "var(--color-warning)" }
							}, toDisplayString(__props.kpis.productos_activos), 1)])
						]),
						createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-8" }, [
							createVNode("div", { class: "theme-card p-6" }, [createVNode("h2", { class: "text-xl font-semibold mb-4 flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-[var(--color-primary)]",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
							})])), createTextVNode(" Productos Más Vendidos ")]), __props.productos_mas_vendidos.length > 0 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "space-y-4"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.productos_mas_vendidos, (prod, index) => {
								return openBlock(), createBlock("div", {
									key: index,
									class: "flex justify-between items-center p-3 rounded-lg bg-[var(--color-surface-alt)]"
								}, [createVNode("div", null, [createVNode("p", { class: "font-medium" }, toDisplayString(prod.nombre), 1), createVNode("p", { class: "text-xs text-secondary" }, toDisplayString(parseInt(prod.total_vendido)) + " unidades vendidas", 1)]), createVNode("div", { class: "text-right" }, [createVNode("p", { class: "font-bold text-[var(--color-success)]" }, toDisplayString(formatCurrency(prod.ingresos)), 1)])]);
							}), 128))])) : (openBlock(), createBlock("p", {
								key: 1,
								class: "text-muted italic py-4 text-center"
							}, "No hay datos de ventas registrados."))]),
							createVNode("div", { class: "theme-card p-6" }, [createVNode("h2", { class: "text-xl font-semibold mb-4 flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-[var(--color-primary)]",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
							})])), createTextVNode(" Páginas Más Visitadas ")]), createVNode("div", {
								class: "overflow-x-auto border rounded-md",
								style: { borderColor: "var(--color-border-light)" }
							}, [createVNode("table", { class: "w-full text-sm text-left" }, [createVNode("thead", { class: "bg-[var(--color-surface-alt)]" }, [createVNode("tr", null, [
								createVNode("th", { class: "px-4 py-2 font-medium" }, "Página"),
								createVNode("th", { class: "px-4 py-2 font-medium" }, "Ruta"),
								createVNode("th", { class: "px-4 py-2 font-medium text-right" }, "Visitas")
							])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.datos_visitas.slice(0, 10), (visita) => {
								return openBlock(), createBlock("tr", {
									key: visita.id,
									class: "border-b last:border-b-0 hover:bg-[var(--color-surface-hover)]",
									style: { borderColor: "var(--color-border-light)" }
								}, [
									createVNode("td", { class: "px-4 py-3 font-medium" }, toDisplayString(visita.nombre_pagina), 1),
									createVNode("td", { class: "px-4 py-3 text-secondary text-xs" }, toDisplayString(visita.ruta), 1),
									createVNode("td", { class: "px-4 py-3 text-right font-bold" }, toDisplayString(visita.total_visitas), 1)
								]);
							}), 128))])])])]),
							createVNode("div", { class: "theme-card p-6 lg:col-span-2" }, [createVNode("h2", { class: "text-xl font-semibold mb-4 flex items-center gap-2" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-[var(--color-primary)]",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							})])), createTextVNode(" Ventas Recientes ")]), createVNode("div", {
								class: "overflow-x-auto border rounded-md",
								style: { borderColor: "var(--color-border-light)" }
							}, [createVNode("table", { class: "w-full text-sm text-left" }, [createVNode("thead", { class: "bg-[var(--color-surface-alt)]" }, [createVNode("tr", null, [
								createVNode("th", { class: "px-4 py-3 font-medium" }, "Fecha"),
								createVNode("th", { class: "px-4 py-3 font-medium" }, "Cliente"),
								createVNode("th", { class: "px-4 py-3 font-medium" }, "Tipo"),
								createVNode("th", { class: "px-4 py-3 font-medium" }, "Total"),
								createVNode("th", { class: "px-4 py-3 font-medium" }, "Estado")
							])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.ventas_recientes, (venta) => {
								return openBlock(), createBlock("tr", {
									key: venta.id,
									class: "border-b last:border-b-0 hover:bg-[var(--color-surface-hover)]",
									style: { borderColor: "var(--color-border-light)" }
								}, [
									createVNode("td", { class: "px-4 py-3" }, toDisplayString(formatDate(venta.fecha)), 1),
									createVNode("td", { class: "px-4 py-3 font-medium" }, toDisplayString(venta.cliente?.name || "Consumidor Final"), 1),
									createVNode("td", { class: "px-4 py-3 text-secondary" }, toDisplayString(venta.tipo), 1),
									createVNode("td", { class: "px-4 py-3 font-bold" }, toDisplayString(formatCurrency(venta.total)), 1),
									createVNode("td", { class: "px-4 py-3" }, [createVNode("span", { class: "badge-primary" }, toDisplayString(venta.estado), 1)])
								]);
							}), 128)), __props.ventas_recientes.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
								colspan: "5",
								class: "px-4 py-6 text-center text-muted"
							}, "No hay ventas recientes.")])) : createCommentVNode("", true)])])])])
						])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Reportes/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
