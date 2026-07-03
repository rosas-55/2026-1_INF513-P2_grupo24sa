import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head } from "@inertiajs/vue3";
import { computed, createVNode, onBeforeUnmount, onMounted, ref, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { Bar, Doughnut } from "vue-chartjs";
import { ArcElement, BarElement, CategoryScale, Chart, Filler, Legend, LinearScale, Title, Tooltip } from "chart.js";
//#region resources/js/Pages/Dashboard.vue
var _sfc_main = {
	__name: "Dashboard",
	__ssrInlineRender: true,
	props: { stats: Object },
	setup(__props) {
		Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, Filler);
		const props = __props;
		function readThemeColors() {
			const s = getComputedStyle(document.documentElement);
			return {
				primary: s.getPropertyValue("--color-primary").trim() || "#6366F1",
				secondary: s.getPropertyValue("--color-secondary").trim() || "#EC4899",
				accent: s.getPropertyValue("--color-accent").trim() || "#10B981",
				surface: s.getPropertyValue("--color-surface").trim() || "#FFFFFF",
				text: s.getPropertyValue("--color-text").trim() || "#1A1530",
				muted: s.getPropertyValue("--color-text-muted").trim() || "#8B7EAA",
				border: s.getPropertyValue("--color-border").trim() || "#D4D0F0"
			};
		}
		const themeColors = ref(readThemeColors());
		let observer;
		onMounted(() => {
			observer = new MutationObserver(() => {
				themeColors.value = readThemeColors();
			});
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: [
					"data-theme",
					"data-modo",
					"data-high-contrast"
				]
			});
		});
		onBeforeUnmount(() => observer?.disconnect());
		const ventasChart = computed(() => ({
			labels: props.stats.ventasPorMes.labels,
			datasets: [{
				label: "Ingresos (Bs)",
				data: props.stats.ventasPorMes.totales,
				backgroundColor: themeColors.value.primary + "40",
				borderColor: themeColors.value.primary,
				borderWidth: 2,
				borderRadius: 6,
				fill: true
			}]
		}));
		const productosChart = computed(() => ({
			labels: props.stats.productosTop.labels,
			datasets: [{
				data: props.stats.productosTop.ventas,
				backgroundColor: [
					themeColors.value.primary,
					themeColors.value.secondary,
					themeColors.value.accent,
					themeColors.value.primary + "99",
					themeColors.value.secondary + "99"
				],
				borderColor: themeColors.value.surface,
				borderWidth: 3
			}]
		}));
		const visitasChart = computed(() => ({
			labels: props.stats.paginasVisitadas.labels,
			datasets: [{
				label: "Visitas",
				data: props.stats.paginasVisitadas.visitas,
				backgroundColor: themeColors.value.accent + "80",
				borderColor: themeColors.value.accent,
				borderWidth: 2,
				borderRadius: 4
			}]
		}));
		const barOptions = computed(() => ({
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { labels: {
					color: themeColors.value.text,
					font: {
						family: "inherit",
						size: 12
					}
				} },
				tooltip: {
					backgroundColor: themeColors.value.text,
					titleColor: themeColors.value.surface,
					bodyColor: themeColors.value.surface
				}
			},
			scales: {
				x: {
					ticks: { color: themeColors.value.muted },
					grid: { color: themeColors.value.border + "40" }
				},
				y: {
					ticks: { color: themeColors.value.muted },
					grid: { color: themeColors.value.border + "40" }
				}
			}
		}));
		const doughnutOptions = computed(() => ({
			responsive: true,
			maintainAspectRatio: false,
			plugins: { legend: {
				position: "bottom",
				labels: {
					color: themeColors.value.text,
					font: {
						family: "inherit",
						size: 12
					},
					padding: 16
				}
			} }
		}));
		const horizontalBarOpts = computed(() => ({
			indexAxis: "y",
			responsive: true,
			maintainAspectRatio: false,
			plugins: { legend: { display: false } },
			scales: {
				x: {
					ticks: { color: themeColors.value.muted },
					grid: { color: themeColors.value.border + "40" }
				},
				y: {
					ticks: {
						color: themeColors.value.text,
						font: { size: 11 }
					},
					grid: { display: false }
				}
			}
		}));
		const fmt = (n) => Number(n ?? 0).toLocaleString("es-BO", { minimumFractionDigits: 2 });
		const fmtInt = (n) => Number(n ?? 0).toLocaleString("es-BO");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<h2 class="text-xl font-semibold leading-tight" style="${ssrRenderStyle({
						color: "var(--color-text)",
						textWrap: "balance"
					})}"${_scopeId}>Dashboard — Estadísticas</h2>`);
					else return [createVNode("h2", {
						class: "text-xl font-semibold leading-tight",
						style: {
							color: "var(--color-text)",
							textWrap: "balance"
						}
					}, "Dashboard — Estadísticas")];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="py-8"${_scopeId}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"${_scopeId}><div class="theme-card rounded-xl p-4 text-center"${_scopeId}><p class="text-xs uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Ventas totales</p><p class="text-xl sm:text-2xl font-bold mt-1" style="${ssrRenderStyle({ color: "var(--color-primary)" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-variant-numeric": "tabular-nums" })}"${_scopeId}>${ssrInterpolate(fmtInt(__props.stats.resumen.totalVentas))}</span></p></div><div class="theme-card rounded-xl p-4 text-center"${_scopeId}><p class="text-xs uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Ventas del mes</p><p class="text-xl sm:text-2xl font-bold mt-1" style="${ssrRenderStyle({ color: "var(--color-secondary)" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-variant-numeric": "tabular-nums" })}"${_scopeId}>${ssrInterpolate(fmtInt(__props.stats.resumen.ventasMes))}</span></p></div><div class="theme-card rounded-xl p-4 text-center"${_scopeId}><p class="text-xs uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Ingresos mes</p><p class="text-xl sm:text-2xl font-bold mt-1" style="${ssrRenderStyle({ color: "var(--color-accent)" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-variant-numeric": "tabular-nums" })}"${_scopeId}>Bs ${ssrInterpolate(fmt(__props.stats.resumen.ingresosMes))}</span></p></div><div class="theme-card rounded-xl p-4 text-center"${_scopeId}><p class="text-xs uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Productos</p><p class="text-xl sm:text-2xl font-bold mt-1" style="${ssrRenderStyle({ color: "var(--color-primary)" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-variant-numeric": "tabular-nums" })}"${_scopeId}>${ssrInterpolate(fmtInt(__props.stats.resumen.totalProductos))}</span></p></div><div class="theme-card rounded-xl p-4 text-center"${_scopeId}><p class="text-xs uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Visitas</p><p class="text-xl sm:text-2xl font-bold mt-1" style="${ssrRenderStyle({ color: "var(--color-secondary)" })}"${_scopeId}><span style="${ssrRenderStyle({ "font-variant-numeric": "tabular-nums" })}"${_scopeId}>${ssrInterpolate(fmtInt(__props.stats.resumen.visitasTotales))}</span></p></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><div class="theme-card rounded-xl p-4 sm:p-5 lg:col-span-2"${_scopeId}><h3 class="text-sm font-semibold mb-4" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Ventas por mes</h3><div class="h-64 sm:h-72"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Bar), {
							data: ventasChart.value,
							options: barOptions.value
						}, null, _parent, _scopeId));
						_push(`</div></div><div class="theme-card rounded-xl p-4 sm:p-5"${_scopeId}><h3 class="text-sm font-semibold mb-4" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Top 5 productos</h3><div class="h-64 sm:h-72"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Doughnut), {
							data: productosChart.value,
							options: doughnutOptions.value
						}, null, _parent, _scopeId));
						_push(`</div></div><div class="theme-card rounded-xl p-4 sm:p-5 lg:col-span-2"${_scopeId}><h3 class="text-sm font-semibold mb-4" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Páginas más visitadas</h3><div class="h-64 sm:h-72"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Bar), {
							data: visitasChart.value,
							options: horizontalBarOpts.value
						}, null, _parent, _scopeId));
						_push(`</div></div><div class="theme-card rounded-xl p-4 sm:p-5"${_scopeId}><h3 class="text-sm font-semibold mb-4" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Resumen</h3><div class="space-y-4"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Productos activos</span><span class="font-semibold" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>${ssrInterpolate(fmtInt(__props.stats.resumen.totalProductos))}</span></div><hr style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Ventas registradas</span><span class="font-semibold" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>${ssrInterpolate(fmtInt(__props.stats.resumen.totalVentas))}</span></div><hr style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Ingresos este mes</span><span class="font-semibold" style="${ssrRenderStyle({ color: "var(--color-accent)" })}"${_scopeId}>Bs ${ssrInterpolate(fmt(__props.stats.resumen.ingresosMes))}</span></div><hr style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Visitas al sitio</span><span class="font-semibold" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>${ssrInterpolate(fmtInt(__props.stats.resumen.visitasTotales))}</span></div></div></div></div></div></div>`);
					} else return [createVNode("div", { class: "py-8" }, [createVNode("div", { class: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6" }, [createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3" }, [
						createVNode("div", { class: "theme-card rounded-xl p-4 text-center" }, [createVNode("p", {
							class: "text-xs uppercase tracking-wider",
							style: { color: "var(--color-text-muted)" }
						}, "Ventas totales"), createVNode("p", {
							class: "text-xl sm:text-2xl font-bold mt-1",
							style: { color: "var(--color-primary)" }
						}, [createVNode("span", { style: { "font-variant-numeric": "tabular-nums" } }, toDisplayString(fmtInt(__props.stats.resumen.totalVentas)), 1)])]),
						createVNode("div", { class: "theme-card rounded-xl p-4 text-center" }, [createVNode("p", {
							class: "text-xs uppercase tracking-wider",
							style: { color: "var(--color-text-muted)" }
						}, "Ventas del mes"), createVNode("p", {
							class: "text-xl sm:text-2xl font-bold mt-1",
							style: { color: "var(--color-secondary)" }
						}, [createVNode("span", { style: { "font-variant-numeric": "tabular-nums" } }, toDisplayString(fmtInt(__props.stats.resumen.ventasMes)), 1)])]),
						createVNode("div", { class: "theme-card rounded-xl p-4 text-center" }, [createVNode("p", {
							class: "text-xs uppercase tracking-wider",
							style: { color: "var(--color-text-muted)" }
						}, "Ingresos mes"), createVNode("p", {
							class: "text-xl sm:text-2xl font-bold mt-1",
							style: { color: "var(--color-accent)" }
						}, [createVNode("span", { style: { "font-variant-numeric": "tabular-nums" } }, "Bs " + toDisplayString(fmt(__props.stats.resumen.ingresosMes)), 1)])]),
						createVNode("div", { class: "theme-card rounded-xl p-4 text-center" }, [createVNode("p", {
							class: "text-xs uppercase tracking-wider",
							style: { color: "var(--color-text-muted)" }
						}, "Productos"), createVNode("p", {
							class: "text-xl sm:text-2xl font-bold mt-1",
							style: { color: "var(--color-primary)" }
						}, [createVNode("span", { style: { "font-variant-numeric": "tabular-nums" } }, toDisplayString(fmtInt(__props.stats.resumen.totalProductos)), 1)])]),
						createVNode("div", { class: "theme-card rounded-xl p-4 text-center" }, [createVNode("p", {
							class: "text-xs uppercase tracking-wider",
							style: { color: "var(--color-text-muted)" }
						}, "Visitas"), createVNode("p", {
							class: "text-xl sm:text-2xl font-bold mt-1",
							style: { color: "var(--color-secondary)" }
						}, [createVNode("span", { style: { "font-variant-numeric": "tabular-nums" } }, toDisplayString(fmtInt(__props.stats.resumen.visitasTotales)), 1)])])
					]), createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
						createVNode("div", { class: "theme-card rounded-xl p-4 sm:p-5 lg:col-span-2" }, [createVNode("h3", {
							class: "text-sm font-semibold mb-4",
							style: { color: "var(--color-text)" }
						}, "Ventas por mes"), createVNode("div", { class: "h-64 sm:h-72" }, [createVNode(unref(Bar), {
							data: ventasChart.value,
							options: barOptions.value
						}, null, 8, ["data", "options"])])]),
						createVNode("div", { class: "theme-card rounded-xl p-4 sm:p-5" }, [createVNode("h3", {
							class: "text-sm font-semibold mb-4",
							style: { color: "var(--color-text)" }
						}, "Top 5 productos"), createVNode("div", { class: "h-64 sm:h-72" }, [createVNode(unref(Doughnut), {
							data: productosChart.value,
							options: doughnutOptions.value
						}, null, 8, ["data", "options"])])]),
						createVNode("div", { class: "theme-card rounded-xl p-4 sm:p-5 lg:col-span-2" }, [createVNode("h3", {
							class: "text-sm font-semibold mb-4",
							style: { color: "var(--color-text)" }
						}, "Páginas más visitadas"), createVNode("div", { class: "h-64 sm:h-72" }, [createVNode(unref(Bar), {
							data: visitasChart.value,
							options: horizontalBarOpts.value
						}, null, 8, ["data", "options"])])]),
						createVNode("div", { class: "theme-card rounded-xl p-4 sm:p-5" }, [createVNode("h3", {
							class: "text-sm font-semibold mb-4",
							style: { color: "var(--color-text)" }
						}, "Resumen"), createVNode("div", { class: "space-y-4" }, [
							createVNode("div", { class: "flex justify-between items-center" }, [createVNode("span", { style: { color: "var(--color-text-muted)" } }, "Productos activos"), createVNode("span", {
								class: "font-semibold",
								style: { color: "var(--color-text)" }
							}, toDisplayString(fmtInt(__props.stats.resumen.totalProductos)), 1)]),
							createVNode("hr", { style: { borderColor: "var(--color-border-light)" } }),
							createVNode("div", { class: "flex justify-between items-center" }, [createVNode("span", { style: { color: "var(--color-text-muted)" } }, "Ventas registradas"), createVNode("span", {
								class: "font-semibold",
								style: { color: "var(--color-text)" }
							}, toDisplayString(fmtInt(__props.stats.resumen.totalVentas)), 1)]),
							createVNode("hr", { style: { borderColor: "var(--color-border-light)" } }),
							createVNode("div", { class: "flex justify-between items-center" }, [createVNode("span", { style: { color: "var(--color-text-muted)" } }, "Ingresos este mes"), createVNode("span", {
								class: "font-semibold",
								style: { color: "var(--color-accent)" }
							}, "Bs " + toDisplayString(fmt(__props.stats.resumen.ingresosMes)), 1)]),
							createVNode("hr", { style: { borderColor: "var(--color-border-light)" } }),
							createVNode("div", { class: "flex justify-between items-center" }, [createVNode("span", { style: { color: "var(--color-text-muted)" } }, "Visitas al sitio"), createVNode("span", {
								class: "font-semibold",
								style: { color: "var(--color-text)" }
							}, toDisplayString(fmtInt(__props.stats.resumen.visitasTotales)), 1)])
						])])
					])])])];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
