import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, vModelSelect, vModelText, watch, withCtx, withDirectives } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Bitacora/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		bitacoras: Object,
		filtros: Object
	},
	setup(__props) {
		const props = __props;
		const form = ref({
			tipo: props.filtros.tipo || "",
			user_id: props.filtros.user_id || ""
		});
		watch(form, (value) => {
			router.get(route("bitacora.index"), value, {
				preserveState: true,
				replace: true
			});
		}, { deep: true });
		function formatDate(dateString) {
			if (!dateString) return "";
			return new Date(dateString).toLocaleString("es-BO", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			});
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Bitácora de Auditoría" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><h1 class="text-3xl font-bold mb-6 theme-section-title"${_scopeId}>Bitácora de Auditoría</h1><div class="theme-card p-6"${_scopeId}><div class="mb-6 flex flex-col sm:flex-row gap-4 bg-[var(--color-surface-alt)] p-4 rounded-lg border" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><div class="flex-1"${_scopeId}><label class="block text-sm font-medium text-secondary mb-1"${_scopeId}>Filtrar por Acción</label><select class="w-full theme-input text-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(form.value.tipo) ? ssrLooseContain(form.value.tipo, "") : ssrLooseEqual(form.value.tipo, "")) ? " selected" : ""}${_scopeId}>Todas las acciones</option><option value="LOGIN"${ssrIncludeBooleanAttr(Array.isArray(form.value.tipo) ? ssrLooseContain(form.value.tipo, "LOGIN") : ssrLooseEqual(form.value.tipo, "LOGIN")) ? " selected" : ""}${_scopeId}>Inicio de Sesión (LOGIN)</option><option value="LOGOUT"${ssrIncludeBooleanAttr(Array.isArray(form.value.tipo) ? ssrLooseContain(form.value.tipo, "LOGOUT") : ssrLooseEqual(form.value.tipo, "LOGOUT")) ? " selected" : ""}${_scopeId}>Cierre de Sesión (LOGOUT)</option><option value="ACCESO"${ssrIncludeBooleanAttr(Array.isArray(form.value.tipo) ? ssrLooseContain(form.value.tipo, "ACCESO") : ssrLooseEqual(form.value.tipo, "ACCESO")) ? " selected" : ""}${_scopeId}>Acceso a Módulo</option><option value="ERROR"${ssrIncludeBooleanAttr(Array.isArray(form.value.tipo) ? ssrLooseContain(form.value.tipo, "ERROR") : ssrLooseEqual(form.value.tipo, "ERROR")) ? " selected" : ""}${_scopeId}>Errores / Accesos Denegados</option><option value="PAGO_QR"${ssrIncludeBooleanAttr(Array.isArray(form.value.tipo) ? ssrLooseContain(form.value.tipo, "PAGO_QR") : ssrLooseEqual(form.value.tipo, "PAGO_QR")) ? " selected" : ""}${_scopeId}>Pagos QR</option></select></div><div class="flex-1"${_scopeId}><label class="block text-sm font-medium text-secondary mb-1"${_scopeId}>ID de Usuario</label><input${ssrRenderAttr("value", form.value.user_id)} type="number" placeholder="Ej. 1" class="w-full theme-input text-sm"${_scopeId}></div><div class="flex items-end"${_scopeId}><button class="btn-outline text-sm h-[38px]"${_scopeId}> Limpiar Filtros </button></div></div><div class="overflow-x-auto border rounded-md" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><table class="w-full text-sm text-left"${_scopeId}><thead class="bg-[var(--color-surface-alt)]"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 font-medium"${_scopeId}>Fecha y Hora</th><th class="px-4 py-3 font-medium"${_scopeId}>Usuario</th><th class="px-4 py-3 font-medium"${_scopeId}>Tipo</th><th class="px-4 py-3 font-medium"${_scopeId}>Recurso / Detalle</th><th class="px-4 py-3 font-medium"${_scopeId}>IP</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.bitacoras.data, (log) => {
							_push(`<tr class="border-b last:border-b-0 hover:bg-[var(--color-surface-hover)] transition-colors" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><td class="px-4 py-3 whitespace-nowrap"${_scopeId}>${ssrInterpolate(formatDate(log.created_at))}</td><td class="px-4 py-3"${_scopeId}>`);
							if (log.user) _push(`<span class="font-medium text-primary"${_scopeId}>${ssrInterpolate(log.user.name)}</span>`);
							else _push(`<span class="text-muted italic"${_scopeId}>Anónimo</span>`);
							_push(`</td><td class="px-4 py-3"${_scopeId}><span class="${ssrRenderClass(["px-2 py-1 text-xs font-semibold rounded-full", log.tipo === "LOGIN" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : log.tipo === "ERROR" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"])}"${_scopeId}>${ssrInterpolate(log.tipo)}</span></td><td class="px-4 py-3 text-secondary max-w-md truncate"${ssrRenderAttr("title", log.recurso)}${_scopeId}>${ssrInterpolate(log.recurso)}</td><td class="px-4 py-3 font-mono text-xs text-muted"${_scopeId}>${ssrInterpolate(log.ip_address)}</td></tr>`);
						});
						_push(`<!--]-->`);
						if (__props.bitacoras.data.length === 0) _push(`<tr${_scopeId}><td colspan="5" class="px-4 py-8 text-center text-muted"${_scopeId}> No se encontraron registros de auditoría. </td></tr>`);
						else _push(`<!---->`);
						_push(`</tbody></table></div>`);
						if (__props.bitacoras.links && __props.bitacoras.data.length > 0) {
							_push(`<div class="mt-6 flex justify-center gap-1"${_scopeId}><!--[-->`);
							ssrRenderList(__props.bitacoras.links, (link, k) => {
								_push(ssrRenderComponent(unref(Link), {
									key: k,
									href: link.url || "#",
									class: ["px-3 py-1 rounded border text-sm", [link.active ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "bg-transparent text-secondary border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]", !link.url && "opacity-50 cursor-not-allowed"]]
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else _push(`<!---->`);
						_push(`</div></div>`);
					} else return [createVNode(unref(Head), { title: "Bitácora de Auditoría" }), createVNode("div", { class: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" }, [createVNode("h1", { class: "text-3xl font-bold mb-6 theme-section-title" }, "Bitácora de Auditoría"), createVNode("div", { class: "theme-card p-6" }, [
						createVNode("div", {
							class: "mb-6 flex flex-col sm:flex-row gap-4 bg-[var(--color-surface-alt)] p-4 rounded-lg border",
							style: { borderColor: "var(--color-border-light)" }
						}, [
							createVNode("div", { class: "flex-1" }, [createVNode("label", { class: "block text-sm font-medium text-secondary mb-1" }, "Filtrar por Acción"), withDirectives(createVNode("select", {
								"onUpdate:modelValue": ($event) => form.value.tipo = $event,
								class: "w-full theme-input text-sm"
							}, [
								createVNode("option", { value: "" }, "Todas las acciones"),
								createVNode("option", { value: "LOGIN" }, "Inicio de Sesión (LOGIN)"),
								createVNode("option", { value: "LOGOUT" }, "Cierre de Sesión (LOGOUT)"),
								createVNode("option", { value: "ACCESO" }, "Acceso a Módulo"),
								createVNode("option", { value: "ERROR" }, "Errores / Accesos Denegados"),
								createVNode("option", { value: "PAGO_QR" }, "Pagos QR")
							], 8, ["onUpdate:modelValue"]), [[vModelSelect, form.value.tipo]])]),
							createVNode("div", { class: "flex-1" }, [createVNode("label", { class: "block text-sm font-medium text-secondary mb-1" }, "ID de Usuario"), withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => form.value.user_id = $event,
								type: "number",
								placeholder: "Ej. 1",
								class: "w-full theme-input text-sm"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, form.value.user_id]])]),
							createVNode("div", { class: "flex items-end" }, [createVNode("button", {
								onClick: ($event) => {
									form.value.tipo = "";
									form.value.user_id = "";
								},
								class: "btn-outline text-sm h-[38px]"
							}, " Limpiar Filtros ", 8, ["onClick"])])
						]),
						createVNode("div", {
							class: "overflow-x-auto border rounded-md",
							style: { borderColor: "var(--color-border-light)" }
						}, [createVNode("table", { class: "w-full text-sm text-left" }, [createVNode("thead", { class: "bg-[var(--color-surface-alt)]" }, [createVNode("tr", null, [
							createVNode("th", { class: "px-4 py-3 font-medium" }, "Fecha y Hora"),
							createVNode("th", { class: "px-4 py-3 font-medium" }, "Usuario"),
							createVNode("th", { class: "px-4 py-3 font-medium" }, "Tipo"),
							createVNode("th", { class: "px-4 py-3 font-medium" }, "Recurso / Detalle"),
							createVNode("th", { class: "px-4 py-3 font-medium" }, "IP")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.bitacoras.data, (log) => {
							return openBlock(), createBlock("tr", {
								key: log.id,
								class: "border-b last:border-b-0 hover:bg-[var(--color-surface-hover)] transition-colors",
								style: { borderColor: "var(--color-border-light)" }
							}, [
								createVNode("td", { class: "px-4 py-3 whitespace-nowrap" }, toDisplayString(formatDate(log.created_at)), 1),
								createVNode("td", { class: "px-4 py-3" }, [log.user ? (openBlock(), createBlock("span", {
									key: 0,
									class: "font-medium text-primary"
								}, toDisplayString(log.user.name), 1)) : (openBlock(), createBlock("span", {
									key: 1,
									class: "text-muted italic"
								}, "Anónimo"))]),
								createVNode("td", { class: "px-4 py-3" }, [createVNode("span", { class: ["px-2 py-1 text-xs font-semibold rounded-full", log.tipo === "LOGIN" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : log.tipo === "ERROR" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"] }, toDisplayString(log.tipo), 3)]),
								createVNode("td", {
									class: "px-4 py-3 text-secondary max-w-md truncate",
									title: log.recurso
								}, toDisplayString(log.recurso), 9, ["title"]),
								createVNode("td", { class: "px-4 py-3 font-mono text-xs text-muted" }, toDisplayString(log.ip_address), 1)
							]);
						}), 128)), __props.bitacoras.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
							colspan: "5",
							class: "px-4 py-8 text-center text-muted"
						}, " No se encontraron registros de auditoría. ")])) : createCommentVNode("", true)])])]),
						__props.bitacoras.links && __props.bitacoras.data.length > 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-6 flex justify-center gap-1"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.bitacoras.links, (link, k) => {
							return openBlock(), createBlock(unref(Link), {
								key: k,
								href: link.url || "#",
								innerHTML: link.label,
								class: ["px-3 py-1 rounded border text-sm", [link.active ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "bg-transparent text-secondary border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]", !link.url && "opacity-50 cursor-not-allowed"]]
							}, null, 8, [
								"href",
								"innerHTML",
								"class"
							]);
						}), 128))])) : createCommentVNode("", true)
					])])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bitacora/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
