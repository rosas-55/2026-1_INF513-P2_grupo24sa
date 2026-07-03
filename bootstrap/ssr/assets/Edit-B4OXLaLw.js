import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, useForm } from "@inertiajs/vue3";
import { createVNode, unref, useSSRContext, vModelSelect, vModelText, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Pages/Insumos/Edit.vue
var _sfc_main = {
	__name: "Edit",
	__ssrInlineRender: true,
	props: { insumo: Object },
	setup(__props) {
		const props = __props;
		const form = useForm({
			nombre: props.insumo?.nombre,
			descripcion: props.insumo?.descripcion,
			costo_unitario: props.insumo?.costo_unitario,
			stock_actual: props.insumo?.stock_actual,
			stock_minimo: props.insumo?.stock_minimo,
			unidad_medida: props.insumo?.unidad_medida,
			estado: props.insumo?.estado
		});
		function submit() {
			form.patch(route("insumos.update", props.insumo.id));
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Editar Insumo" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-lg px-4 py-8"${_scopeId}><h1 class="text-2xl font-semibold mb-6 theme-section-title"${_scopeId}>Editar Insumo</h1><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Nombre</label><input${ssrRenderAttr("value", unref(form).nombre)} required class="mt-1 w-full theme-input"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Descripción</label><textarea class="mt-1 w-full theme-input"${_scopeId}>${ssrInterpolate(unref(form).descripcion)}</textarea></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Costo Unitario</label><input${ssrRenderAttr("value", unref(form).costo_unitario)} type="number" step="0.01" required class="mt-1 w-full theme-input"${_scopeId}></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Stock Actual</label><input${ssrRenderAttr("value", unref(form).stock_actual)} type="number" step="0.01" required class="mt-1 w-full theme-input"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Stock Mínimo</label><input${ssrRenderAttr("value", unref(form).stock_minimo)} type="number" step="0.01" required class="mt-1 w-full theme-input"${_scopeId}></div></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Unidad de Medida</label><input${ssrRenderAttr("value", unref(form).unidad_medida)} class="mt-1 w-full theme-input"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Estado</label><select class="mt-1 w-full theme-input"${_scopeId}><option value="ACTIVO"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "ACTIVO") : ssrLooseEqual(unref(form).estado, "ACTIVO")) ? " selected" : ""}${_scopeId}>Activo</option><option value="INACTIVO"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "INACTIVO") : ssrLooseEqual(unref(form).estado, "INACTIVO")) ? " selected" : ""}${_scopeId}>Inactivo</option></select></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary"${_scopeId}>Actualizar</button></form></div>`);
					} else return [createVNode(unref(Head), { title: "Editar Insumo" }), createVNode("div", { class: "mx-auto max-w-lg px-4 py-8" }, [createVNode("h1", { class: "text-2xl font-semibold mb-6 theme-section-title" }, "Editar Insumo"), createVNode("form", {
						onSubmit: withModifiers(submit, ["prevent"]),
						class: "space-y-4"
					}, [
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Nombre"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).nombre = $event,
							required: "",
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).nombre]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Descripción"), withDirectives(createVNode("textarea", {
							"onUpdate:modelValue": ($event) => unref(form).descripcion = $event,
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).descripcion]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Costo Unitario"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).costo_unitario = $event,
							type: "number",
							step: "0.01",
							required: "",
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).costo_unitario]])]),
						createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, [createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Stock Actual"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).stock_actual = $event,
							type: "number",
							step: "0.01",
							required: "",
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).stock_actual]])]), createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Stock Mínimo"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).stock_minimo = $event,
							type: "number",
							step: "0.01",
							required: "",
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).stock_minimo]])])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Unidad de Medida"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).unidad_medida = $event,
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).unidad_medida]])]),
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Insumos/Edit.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
