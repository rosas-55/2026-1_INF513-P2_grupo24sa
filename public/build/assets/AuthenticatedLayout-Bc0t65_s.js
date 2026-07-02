import { t as ApplicationLogo_default } from "./ApplicationLogo-oaRXtDJB.js";
import axios from "axios";
import { Link, usePage } from "@inertiajs/vue3";
import { computed, createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, nextTick, onBeforeUnmount, onMounted, onUnmounted, openBlock, ref, renderSlot, toDisplayString, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Components/Dropdown.vue
var _sfc_main$7 = {
	__name: "Dropdown",
	__ssrInlineRender: true,
	props: {
		align: {
			type: String,
			default: "right"
		},
		width: {
			type: String,
			default: "48"
		},
		contentClasses: {
			type: String,
			default: "py-1"
		}
	},
	setup(__props) {
		const props = __props;
		const closeOnEscape = (e) => {
			if (open.value && e.key === "Escape") open.value = false;
		};
		onMounted(() => document.addEventListener("keydown", closeOnEscape));
		onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
		const widthClass = computed(() => {
			return { 48: "w-48" }[props.width.toString()];
		});
		const alignmentClasses = computed(() => {
			if (props.align === "left") return "ltr:origin-top-left rtl:origin-top-right start-0";
			else if (props.align === "right") return "ltr:origin-top-right rtl:origin-top-left end-0";
			else return "origin-top";
		});
		const open = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
			ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
			_push(`</div><div class="fixed inset-0 z-40" style="${ssrRenderStyle(open.value ? null : { display: "none" })}"></div>`);
			if (open.value) {
				_push(`<div class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md shadow-lg"])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}" style="${ssrRenderStyle({
					backgroundColor: "var(--color-card-bg)",
					borderColor: "var(--color-border-light)"
				})}">`);
				ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
				_push(`</div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/DropdownLink.vue
var _sfc_main$6 = {
	__name: "DropdownLink",
	__ssrInlineRender: true,
	props: { href: {
		type: String,
		required: true
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Link), mergeProps({
				href: __props.href,
				class: "block w-full px-4 py-2 text-start text-sm leading-5 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)]",
				style: { color: "var(--color-text-secondary)" },
				onMouseenter: ($event) => $event.currentTarget.style.backgroundColor = "var(--color-surface-hover)",
				onMouseleave: ($event) => $event.currentTarget.style.backgroundColor = "transparent"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/NavLink.vue
var _sfc_main$5 = {
	__name: "NavLink",
	__ssrInlineRender: true,
	props: {
		href: {
			type: String,
			required: true
		},
		active: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => props.active ? "inline-flex items-center whitespace-nowrap px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out" : "inline-flex items-center whitespace-nowrap px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out");
		const activeStyle = computed(() => props.active ? {
			color: "var(--color-primary)",
			borderColor: "var(--color-primary)"
		} : {
			color: "var(--color-text-secondary)",
			borderColor: "transparent"
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Link), mergeProps({
				href: __props.href,
				class: classes.value,
				style: activeStyle.value,
				onMouseenter: ($event) => !__props.active && ($event.currentTarget.style.color = "var(--color-primary)"),
				onMouseleave: ($event) => !__props.active && ($event.currentTarget.style.color = "var(--color-text-secondary)")
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NavLink.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/ResponsiveNavLink.vue
var _sfc_main$4 = {
	__name: "ResponsiveNavLink",
	__ssrInlineRender: true,
	props: {
		href: {
			type: String,
			required: true
		},
		active: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => props.active ? "block w-full ps-3 pe-4 py-2 border-l-4 text-start text-base font-medium focus:outline-none transition duration-150 ease-in-out" : "block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium focus:outline-none transition duration-150 ease-in-out");
		const activeStyle = computed(() => props.active ? {
			color: "var(--color-primary)",
			backgroundColor: "var(--color-primary-light)",
			borderColor: "var(--color-primary)"
		} : {
			color: "var(--color-text-secondary)",
			backgroundColor: "transparent",
			borderColor: "transparent"
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Link), mergeProps({
				href: __props.href,
				class: classes.value,
				style: activeStyle.value,
				onMouseenter: ($event) => !__props.active && ($event.currentTarget.style.color = "var(--color-primary)"),
				onMouseleave: ($event) => !__props.active && ($event.currentTarget.style.color = "var(--color-text-secondary)")
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ResponsiveNavLink.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/DynamicMenu.vue
var _sfc_main$3 = {
	__name: "DynamicMenu",
	__ssrInlineRender: true,
	props: { 
	/** Render as vertical list for mobile hamburger menu */
mobile: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		const menu = computed(() => usePage().props.menu ?? []);
		const iconPaths = {
			"layout-dashboard": "M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z",
			"truck": "M1 3h15v13H1V3zM16 8h4l3 3v5h-7V8zM5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
			"package": "M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12",
			"shopping-cart": "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0",
			"warehouse": "M22 8.35V20a2 2 0 01-2 2H4a2 2 0 01-2-2V8.35A2 2 0 011.1 6.28l8-3.43a2 2 0 011.8 0l8 3.43A2 2 0 0122 8.35zM6 18h12M6 14h12M6 10h12",
			"barcode": "M3 5v14M7 5v14M11 5v14M15 5v14M19 5v14M3 5h2M3 19h2M19 5h2M19 19h2",
			"book-open": "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
			"factory": "M2 20h20M5 20V10l7-5 7 5v10M9 20v-5h6v5M9 10h6",
			"receipt": "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1zM9 9h6M9 13h6",
			"credit-card": "M1 4h22v16H1V4zm0 7h22",
			"shield-check": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-2-7l2 2 4-4",
			"bar-chart-3": "M18 20V10M12 20V4M6 20v-6",
			"scroll-text": "M8 21h12a2 2 0 002-2v-2H10v2a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-2h2v2a2 2 0 002 2zm0-14H4a2 2 0 00-2 2v2h8V7zM8 7a2 2 0 012-2h8a2 2 0 012 2v14H8V7zm4 6h4m-4 4h4m-4-8h4",
			"circle": "M12 22a10 10 0 100-20 10 10 0 000 20z"
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			if (!__props.mobile && menu.value.length) {
				_push(`<div class="hidden sm:flex sm:items-center sm:gap-x-0.5 sm:py-1"><!--[-->`);
				ssrRenderList(menu.value, (item) => {
					_push(ssrRenderComponent(_sfc_main$5, {
						key: item.route,
						href: _ctx.route(item.route),
						active: _ctx.route().current(item.route)
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<span class="flex items-center gap-1.5"${_scopeId}>`);
								if (item.icon && iconPaths[item.icon]) _push(`<svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"${_scopeId}><path${ssrRenderAttr("d", iconPaths[item.icon])}${_scopeId}></path></svg>`);
								else _push(`<!---->`);
								_push(` ${ssrInterpolate(item.name)}</span>`);
							} else return [createVNode("span", { class: "flex items-center gap-1.5" }, [item.icon && iconPaths[item.icon] ? (openBlock(), createBlock("svg", {
								key: 0,
								class: "h-3.5 w-3.5 shrink-0",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2",
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								viewBox: "0 0 24 24",
								"aria-hidden": "true"
							}, [createVNode("path", { d: iconPaths[item.icon] }, null, 8, ["d"])])) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(item.name), 1)])];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			if (__props.mobile && menu.value.length) {
				_push(`<!--[-->`);
				ssrRenderList(menu.value, (item) => {
					_push(ssrRenderComponent(_sfc_main$4, {
						key: item.route,
						href: _ctx.route(item.route),
						active: _ctx.route().current(item.route)
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<span class="flex items-center gap-2"${_scopeId}>`);
								if (item.icon && iconPaths[item.icon]) _push(`<svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"${_scopeId}><path${ssrRenderAttr("d", iconPaths[item.icon])}${_scopeId}></path></svg>`);
								else _push(`<!---->`);
								_push(` ${ssrInterpolate(item.name)}</span>`);
							} else return [createVNode("span", { class: "flex items-center gap-2" }, [item.icon && iconPaths[item.icon] ? (openBlock(), createBlock("svg", {
								key: 0,
								class: "h-4 w-4 shrink-0",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2",
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								viewBox: "0 0 24 24",
								"aria-hidden": "true"
							}, [createVNode("path", { d: iconPaths[item.icon] }, null, 8, ["d"])])) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(item.name), 1)])];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]-->`);
			} else _push(`<!---->`);
			_push(`<!--]-->`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DynamicMenu.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/GlobalSearch.vue
var _sfc_main$2 = {
	__name: "GlobalSearch",
	__ssrInlineRender: true,
	setup(__props, { expose: __expose }) {
		const abierto = ref(false);
		const query = ref("");
		const loading = ref(false);
		const groups = ref({});
		const errorMsg = ref("");
		let debounceTimer = null;
		let controller = null;
		const root = ref(null);
		const inputEl = ref(null);
		const labels = {
			productos: "Productos",
			insumos: "Insumos",
			proveedores: "Proveedores",
			ventas: "Ventas",
			compras: "Compras"
		};
		const totalResultados = computed(() => Object.values(groups.value).reduce((acc, arr) => acc + arr.length, 0));
		const groupEntries = computed(() => Object.entries(groups.value).map(([key, items]) => ({
			key,
			label: labels[key] ?? key,
			items
		})));
		watch(query, (q) => {
			clearTimeout(debounceTimer);
			if (controller) controller.abort();
			errorMsg.value = "";
			const term = q.trim();
			if (term.length < 2) {
				groups.value = {};
				loading.value = false;
				return;
			}
			loading.value = true;
			debounceTimer = setTimeout(async () => {
				controller = new AbortController();
				try {
					const { data } = await axios.get("/buscar", {
						params: { q: term },
						signal: controller.signal
					});
					groups.value = data.groups ?? {};
					errorMsg.value = "";
				} catch (e) {
					if (!axios.isCancel(e)) {
						errorMsg.value = "Error al buscar";
						groups.value = {};
					}
				} finally {
					loading.value = false;
				}
			}, 250);
		});
		function abrir() {
			abierto.value = true;
			nextTick(() => inputEl.value?.focus());
		}
		function cerrar() {
			abierto.value = false;
		}
		function onKeydown(e) {
			if (e.key === "Escape") cerrar();
		}
		function onClickFuera(e) {
			if (root.value && !root.value.contains(e.target)) cerrar();
		}
		onMounted(() => {
			document.addEventListener("keydown", onKeydown);
			document.addEventListener("click", onClickFuera);
		});
		onBeforeUnmount(() => {
			document.removeEventListener("keydown", onKeydown);
			document.removeEventListener("click", onClickFuera);
			clearTimeout(debounceTimer);
			if (controller) controller.abort();
		});
		__expose({ abrir });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "root",
				ref: root,
				class: "relative w-full lg:w-64"
			}, _attrs))}><div class="relative"><span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}" aria-hidden="true"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M16 10.5A5.5 5.5 0 1 1 5 10.5a5.5 5.5 0 0 1 11 0z"></path></svg></span><input${ssrRenderAttr("value", query.value)} type="search" role="combobox"${ssrRenderAttr("aria-expanded", abierto.value && (loading.value || totalResultados.value > 0 || query.value.length >= 2))} aria-controls="global-search-listbox" aria-autocomplete="list"${ssrRenderAttr("aria-label", "Búsqueda global")} placeholder="Buscar productos, ventas…" autocomplete="off" class="block w-full rounded-md border py-2 pl-9 pr-9 text-sm transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]" style="${ssrRenderStyle({
				backgroundColor: "var(--color-surface)",
				color: "var(--color-text)",
				borderColor: "var(--color-border-light)"
			})}"><span class="absolute inset-y-0 right-0 flex items-center pr-2">`);
			if (loading.value) _push(`<svg class="h-4 w-4 animate-spin" style="${ssrRenderStyle({ color: "var(--color-primary)" })}" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 0 1 8-8v3a5 5 0 0 0-5 5H4z" class="opacity-75"></path></svg>`);
			else if (query.value.length > 0) _push(`<button type="button" aria-label="Limpiar búsqueda" class="rounded p-1 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
			else _push(`<!---->`);
			_push(`</span></div>`);
			if (abierto.value && (loading.value || query.value.length >= 2)) {
				_push(`<div id="global-search-listbox" role="listbox" class="absolute left-0 right-0 z-50 mt-1 max-h-96 overflow-y-auto rounded-md border shadow-lg sm:right-auto sm:w-96" style="${ssrRenderStyle({
					backgroundColor: "var(--color-surface)",
					borderColor: "var(--color-border-light)"
				})}">`);
				if (!loading.value && totalResultados.value === 0 && query.value.length >= 2 && !errorMsg.value) _push(`<div class="px-4 py-6 text-center text-sm" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"> Sin resultados para «${ssrInterpolate(query.value)}» </div>`);
				else if (errorMsg.value) _push(`<div class="px-4 py-6 text-center text-sm" style="${ssrRenderStyle({ color: "var(--color-error, #b91c1c)" })}">${ssrInterpolate(errorMsg.value)}</div>`);
				else if (query.value.length < 2) _push(`<div class="px-4 py-6 text-center text-sm" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"> Escribe al menos 2 caracteres… </div>`);
				else _push(`<!---->`);
				_push(`<!--[-->`);
				ssrRenderList(groupEntries.value, (group) => {
					_push(`<div><div class="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}">${ssrInterpolate(group.label)}</div><!--[-->`);
					ssrRenderList(group.items, (item) => {
						_push(`<button type="button" role="option" class="flex w-full flex-col gap-0.5 px-4 py-2 text-left text-sm transition-colors duration-100 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]" style="${ssrRenderStyle({ color: "var(--color-text)" })}"><span class="font-medium">${ssrInterpolate(item.title)}</span><span class="text-xs" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}">${ssrInterpolate(item.subtitle)}</span></button>`);
					});
					_push(`<!--]--></div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/GlobalSearch.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/ThemeSwitcher.vue
var _sfc_main$1 = {
	__name: "ThemeSwitcher",
	__ssrInlineRender: true,
	setup(__props) {
		const abierto = ref(false);
		const tema = ref("jovenes");
		const modo = ref("dia");
		const tamanoLetra = ref("normal");
		const altoContraste = ref(false);
		const guardando = ref(false);
		const propsTema = computed(() => usePage().props.tema ?? {});
		function cargarDeProps() {
			if (propsTema.value.tema) tema.value = propsTema.value.tema;
			if (propsTema.value.modo) modo.value = propsTema.value.modo;
			if (propsTema.value.tamano_letra) tamanoLetra.value = propsTema.value.tamano_letra;
			if (propsTema.value.alto_contraste !== void 0) altoContraste.value = propsTema.value.alto_contraste;
		}
		onMounted(() => {
			cargarDeProps();
			aplicarAlDom();
			document.addEventListener("click", onClickFuera);
		});
		watch(propsTema, cargarDeProps, { deep: true });
		function aplicarAlDom() {
			const html = document.documentElement;
			html.setAttribute("data-theme", tema.value);
			html.setAttribute("data-modo", modo.value);
			html.setAttribute("data-font-size", tamanoLetra.value);
			html.setAttribute("data-high-contrast", altoContraste.value ? "true" : "false");
			html.classList.toggle("dark", modo.value === "noche");
			html.style.colorScheme = modo.value === "noche" ? "dark" : "light";
		}
		async function guardarPreferencias() {
			guardando.value = true;
			try {
				await axios.patch("/api/tema", {
					tema: tema.value,
					modo: modo.value,
					tamano_letra: tamanoLetra.value,
					alto_contraste: altoContraste.value
				});
				usePage().props.tema = {
					tema: tema.value,
					modo: modo.value,
					tamano_letra: tamanoLetra.value,
					alto_contraste: altoContraste.value
				};
			} catch (e) {} finally {
				guardando.value = false;
			}
		}
		function onClickFuera(e) {
			if (!e.target.closest(".theme-switcher")) abierto.value = false;
		}
		watch([
			tema,
			modo,
			tamanoLetra,
			altoContraste
		], () => {
			aplicarAlDom();
			guardarPreferencias();
		});
		const temas = [
			{
				value: "ninos",
				label: "Niños",
				desc: "Colores vivos y divertidos"
			},
			{
				value: "jovenes",
				label: "Jóvenes",
				desc: "Moderno y vibrante"
			},
			{
				value: "adultos",
				label: "Adultos",
				desc: "Sobrio y profesional"
			}
		];
		const tamanos = [
			{
				value: "small",
				label: "A"
			},
			{
				value: "normal",
				label: "A"
			},
			{
				value: "large",
				label: "A"
			},
			{
				value: "xlarge",
				label: "A"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "theme-switcher relative" }, _attrs))}><button type="button" class="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors" style="${ssrRenderStyle({
				color: "var(--color-text-secondary)",
				backgroundColor: abierto.value ? "var(--color-surface-hover)" : "transparent"
			})}"${ssrRenderAttr("aria-label", "Configuración de tema: " + tema.value + ", modo " + modo.value)}${ssrRenderAttr("aria-expanded", abierto.value)}><svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"></path></svg><span class="hidden lg:inline">Tema</span><svg class="h-3 w-3 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path></svg></button>`);
			if (abierto.value) {
				_push(`<div class="absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-xl p-4 shadow-lg ring-1 ring-black/5" style="${ssrRenderStyle({
					backgroundColor: "var(--color-card-bg)",
					borderColor: "var(--color-border-light)",
					boxShadow: "var(--shadow-lg)"
				})}"><fieldset><legend class="mb-2 text-xs font-semibold uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}">Tema</legend><div class="space-y-1"><!--[-->`);
				ssrRenderList(temas, (t) => {
					_push(`<label class="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors" style="${ssrRenderStyle({ backgroundColor: tema.value === t.value ? "var(--color-primary-light)" : "transparent" })}"><input type="radio"${ssrRenderAttr("value", t.value)}${ssrIncludeBooleanAttr(ssrLooseEqual(tema.value, t.value)) ? " checked" : ""} class="sr-only">`);
					if (t.value === "ninos") _push(`<svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path></svg>`);
					else if (t.value === "jovenes") _push(`<svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path></svg>`);
					else _push(`<svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"></path></svg>`);
					_push(`<div><div class="text-sm font-medium" style="${ssrRenderStyle({ color: "var(--color-text)" })}">${ssrInterpolate(t.label)}</div><div class="text-xs" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}">${ssrInterpolate(t.desc)}</div></div></label>`);
				});
				_push(`<!--]--></div></fieldset><hr class="my-3" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"><div class="flex items-center justify-between"><span class="text-xs font-semibold uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}">Modo</span><button type="button" class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors" style="${ssrRenderStyle({ backgroundColor: modo.value === "noche" ? "var(--color-primary)" : "var(--color-border)" })}"${ssrRenderAttr("aria-label", "Cambiar a modo " + (modo.value === "dia" ? "noche" : "día"))}><span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs shadow-sm transition-transform" style="${ssrRenderStyle({ transform: modo.value === "noche" ? "translateX(1.625rem)" : "translateX(0.125rem)" })}">`);
				if (modo.value === "dia") _push(`<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"></path></svg>`);
				else _push(`<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clip-rule="evenodd"></path></svg>`);
				_push(`</span></button></div><hr class="my-3" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"><div><span class="mb-2 block text-xs font-semibold uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}">Tamaño de letra</span><div class="flex gap-1"><!--[-->`);
				ssrRenderList(tamanos, (tz) => {
					_push(`<button type="button" class="flex-1 rounded-lg border py-2 text-center font-semibold transition-colors" style="${ssrRenderStyle({
						backgroundColor: tamanoLetra.value === tz.value ? "var(--color-primary-light)" : "transparent",
						borderColor: tamanoLetra.value === tz.value ? "var(--color-primary)" : "var(--color-border-light)",
						color: "var(--color-text)",
						fontSize: tz.value === "small" ? "0.75rem" : tz.value === "normal" ? "1rem" : tz.value === "large" ? "1.25rem" : "1.5rem"
					})}"${ssrRenderAttr("aria-label", "Tamaño " + tz.value)}${ssrRenderAttr("aria-pressed", tamanoLetra.value === tz.value)}>${ssrInterpolate(tz.label)}</button>`);
				});
				_push(`<!--]--></div></div><hr class="my-3" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"><div class="flex items-center justify-between"><div><span class="text-xs font-semibold uppercase tracking-wider" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}">Alto contraste</span><p class="text-xs" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}">WCAG AAA</p></div><button type="button" class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors" style="${ssrRenderStyle({ backgroundColor: altoContraste.value ? "var(--color-primary)" : "var(--color-border)" })}"${ssrRenderAttr("aria-label", "Alto contraste: " + (altoContraste.value ? "activado" : "desactivado"))}${ssrRenderAttr("aria-pressed", altoContraste.value)}><span class="inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform" style="${ssrRenderStyle({ transform: altoContraste.value ? "translateX(1.625rem)" : "translateX(0.125rem)" })}"></span></button></div>`);
				if (guardando.value) _push(`<div class="mt-3 text-center text-xs" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}">Guardando…</div>`);
				else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ThemeSwitcher.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Layouts/AuthenticatedLayout.vue
var _sfc_main = {
	__name: "AuthenticatedLayout",
	__ssrInlineRender: true,
	setup(__props) {
		const showingNavigationDropdown = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "theme-page" }, _attrs))}><div class="min-h-screen" style="${ssrRenderStyle({ backgroundColor: "var(--color-surface-alt)" })}"><nav class="theme-nav border-b" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-14 items-center justify-between gap-3"><div class="flex shrink-0 items-center">`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("dashboard"),
				"aria-label": "Ir al inicio"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(ApplicationLogo_default, {
						class: "block h-8 w-auto fill-current",
						style: { color: "var(--color-primary)" }
					}, null, _parent, _scopeId));
					else return [createVNode(ApplicationLogo_default, {
						class: "block h-8 w-auto fill-current",
						style: { color: "var(--color-primary)" }
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="hidden flex-1 lg:block lg:max-w-sm xl:max-w-md">`);
			_push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
			_push(`</div><div class="hidden shrink-0 items-center gap-1 sm:flex">`);
			_push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
			_push(`<div class="relative ms-1">`);
			_push(ssrRenderComponent(_sfc_main$7, {
				align: "right",
				width: "48"
			}, {
				trigger: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="user-btn inline-flex max-w-[9rem] items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium leading-5 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]" style="${ssrRenderStyle({
						backgroundColor: "var(--color-surface)",
						color: "var(--color-text-secondary)",
						borderColor: "var(--color-border-light)"
					})}"${_scopeId}><span class="min-w-0 truncate"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name)}</span><svg class="h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button>`);
					else return [createVNode("button", {
						type: "button",
						class: "user-btn inline-flex max-w-[9rem] items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium leading-5 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
						style: {
							backgroundColor: "var(--color-surface)",
							color: "var(--color-text-secondary)",
							borderColor: "var(--color-border-light)"
						}
					}, [createVNode("span", { class: "min-w-0 truncate" }, toDisplayString(_ctx.$page.props.auth.user.name), 1), (openBlock(), createBlock("svg", {
						class: "h-4 w-4 shrink-0",
						xmlns: "http://www.w3.org/2000/svg",
						viewBox: "0 0 20 20",
						fill: "currentColor",
						"aria-hidden": "true"
					}, [createVNode("path", {
						"fill-rule": "evenodd",
						d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
						"clip-rule": "evenodd"
					})]))])];
				}),
				content: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="border-b px-4 py-2" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><p class="truncate text-xs font-semibold" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name)}</p><p class="truncate text-xs" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.email)}</p></div>`);
						_push(ssrRenderComponent(_sfc_main$6, { href: _ctx.route("profile.edit") }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Perfil `);
								else return [createTextVNode(" Perfil ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$6, {
							href: _ctx.route("logout"),
							method: "post",
							as: "button"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Cerrar sesión `);
								else return [createTextVNode(" Cerrar sesión ")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [
						createVNode("div", {
							class: "border-b px-4 py-2",
							style: { borderColor: "var(--color-border-light)" }
						}, [createVNode("p", {
							class: "truncate text-xs font-semibold",
							style: { color: "var(--color-text)" }
						}, toDisplayString(_ctx.$page.props.auth.user.name), 1), createVNode("p", {
							class: "truncate text-xs",
							style: { color: "var(--color-text-muted)" }
						}, toDisplayString(_ctx.$page.props.auth.user.email), 1)]),
						createVNode(_sfc_main$6, { href: _ctx.route("profile.edit") }, {
							default: withCtx(() => [createTextVNode(" Perfil ")]),
							_: 1
						}, 8, ["href"]),
						createVNode(_sfc_main$6, {
							href: _ctx.route("logout"),
							method: "post",
							as: "button"
						}, {
							default: withCtx(() => [createTextVNode(" Cerrar sesión ")]),
							_: 1
						}, 8, ["href"])
					];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="flex items-center sm:hidden"><button aria-label="Abrir menú de navegación"${ssrRenderAttr("aria-expanded", showingNavigationDropdown.value)} class="inline-flex items-center justify-center rounded-md p-2 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]" style="${ssrRenderStyle({ color: "var(--color-text-secondary)" })}"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({
				hidden: showingNavigationDropdown.value,
				"inline-flex": !showingNavigationDropdown.value
			})}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({
				hidden: !showingNavigationDropdown.value,
				"inline-flex": showingNavigationDropdown.value
			})}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><div class="hidden border-t sm:block" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"><div class="nav-menu-row overflow-x-auto">`);
			_push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
			_push(`</div></div></div><div class="sm:hidden" style="${ssrRenderStyle(showingNavigationDropdown.value ? null : { display: "none" })}"><div class="px-4 pt-3 pb-2">`);
			_push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
			_push(`</div><div class="space-y-1 pb-2 pt-1">`);
			_push(ssrRenderComponent(_sfc_main$3, { mobile: "" }, null, _parent));
			_push(`</div><div class="border-t px-4 py-2" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}">`);
			_push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
			_push(`</div><div class="border-t pb-2 pt-3" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"><div class="px-4 pb-2"><p class="truncate text-sm font-medium" style="${ssrRenderStyle({ color: "var(--color-text)" })}">${ssrInterpolate(_ctx.$page.props.auth.user.name)}</p><p class="truncate text-xs" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}">${ssrInterpolate(_ctx.$page.props.auth.user.email)}</p></div><div class="space-y-1">`);
			_push(ssrRenderComponent(_sfc_main$4, { href: _ctx.route("profile.edit") }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Perfil `);
					else return [createTextVNode(" Perfil ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_sfc_main$4, {
				href: _ctx.route("logout"),
				method: "post",
				as: "button"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Cerrar sesión `);
					else return [createTextVNode(" Cerrar sesión ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></nav>`);
			if (_ctx.$slots.header) {
				_push(`<header class="theme-header shadow-sm"><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">`);
				ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
				_push(`</div></header>`);
			} else _push(`<!---->`);
			_push(`<main>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</main><footer class="theme-footer py-4 text-center"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><p class="text-sm" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Grupo 24SA — INF-513 Tecnología Web <span class="mx-2">·</span><span>Visitas: <strong style="${ssrRenderStyle({ color: "var(--color-text)" })}">${ssrInterpolate(_ctx.$page.props.visitas ?? 0)}</strong></span></p></div></footer></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as t };
