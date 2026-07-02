import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, useForm } from "@inertiajs/vue3";
import { Fragment, createBlock, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, vModelSelect, vModelText, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Productos/Edit.vue
var _sfc_main = {
	__name: "Edit",
	__ssrInlineRender: true,
	props: {
		producto: Object,
		insumos: Array
	},
	setup(__props) {
		const props = __props;
		const form = useForm({
			nombre: props.producto?.nombre,
			precio_venta: props.producto?.precio_venta,
			stock_actual: props.producto?.stock_actual,
			insumo_id: props.producto?.insumo_id,
			estado: props.producto?.estado
		});
		function submit() {
			form.patch(route("productos.update", props.producto.id));
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Editar Producto" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-lg px-4 py-8"${_scopeId}><h1 class="text-2xl font-semibold mb-6 theme-section-title"${_scopeId}>Editar Producto</h1><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Nombre</label><input${ssrRenderAttr("value", unref(form).nombre)} required class="mt-1 w-full theme-input"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Precio de Venta</label><input${ssrRenderAttr("value", unref(form).precio_venta)} type="number" step="0.01" required class="mt-1 w-full theme-input"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Stock Actual</label><input${ssrRenderAttr("value", unref(form).stock_actual)} type="number" step="0.01" required class="mt-1 w-full theme-input"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Insumo asociado</label><select class="mt-1 w-full theme-input"${_scopeId}><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).insumo_id) ? ssrLooseContain(unref(form).insumo_id, null) : ssrLooseEqual(unref(form).insumo_id, null)) ? " selected" : ""}${_scopeId}>-- Sin insumo --</option><!--[-->`);
						ssrRenderList(__props.insumos, (i) => {
							_push(`<option${ssrRenderAttr("value", i.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).insumo_id) ? ssrLooseContain(unref(form).insumo_id, i.id) : ssrLooseEqual(unref(form).insumo_id, i.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(i.nombre)}</option>`);
						});
						_push(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Estado</label><select class="mt-1 w-full theme-input"${_scopeId}><option value="ACTIVO"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "ACTIVO") : ssrLooseEqual(unref(form).estado, "ACTIVO")) ? " selected" : ""}${_scopeId}>Activo</option><option value="INACTIVO"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "INACTIVO") : ssrLooseEqual(unref(form).estado, "INACTIVO")) ? " selected" : ""}${_scopeId}>Inactivo</option></select></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary"${_scopeId}>Actualizar</button></form></div>`);
					} else return [createVNode(unref(Head), { title: "Editar Producto" }), createVNode("div", { class: "mx-auto max-w-lg px-4 py-8" }, [createVNode("h1", { class: "text-2xl font-semibold mb-6 theme-section-title" }, "Editar Producto"), createVNode("form", {
						onSubmit: withModifiers(submit, ["prevent"]),
						class: "space-y-4"
					}, [
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Nombre"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).nombre = $event,
							required: "",
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).nombre]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Precio de Venta"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).precio_venta = $event,
							type: "number",
							step: "0.01",
							required: "",
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).precio_venta]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Stock Actual"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).stock_actual = $event,
							type: "number",
							step: "0.01",
							required: "",
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).stock_actual]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Insumo asociado"), withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => unref(form).insumo_id = $event,
							class: "mt-1 w-full theme-input"
						}, [createVNode("option", { value: null }, "-- Sin insumo --"), (openBlock(true), createBlock(Fragment, null, renderList(__props.insumos, (i) => {
							return openBlock(), createBlock("option", {
								key: i.id,
								value: i.id
							}, toDisplayString(i.nombre), 9, ["value"]);
						}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).insumo_id]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Estado"), withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => unref(form).estado = $event,
							class: "mt-1 w-full theme-input"
						}, [createVNode("option", { value: "ACTIVO" }, "Activo"), createVNode("option", { value: "INACTIVO" }, "Inactivo")], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).estado]])]),
						createVNode("button", {
							type: "submit",
							disabled: unref(form).processing,
							class: "btn-primary"
						}, "Actualizar", 8, ["disabled"])
					], 32)])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Productos/Edit.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
