import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, useForm } from "@inertiajs/vue3";
import { Fragment, createBlock, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, vModelSelect, vModelText, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Inventario/Create.vue
var _sfc_main = {
	__name: "Create",
	__ssrInlineRender: true,
	props: { insumos: Object },
	setup(__props) {
		const form = useForm({
			insumo_id: "",
			cantidad: 1,
			tipo_movimiento: "ENTRADA",
			observacion: "",
			costo_unitario: 0
		});
		function submit() {
			form.post(route("inventario.store"));
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Nuevo Movimiento" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-lg px-4 py-8"${_scopeId}><h1 class="text-2xl font-semibold mb-6 theme-section-title"${_scopeId}>Nuevo Movimiento</h1><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Insumo</label><select required class="mt-1 w-full theme-input"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).insumo_id) ? ssrLooseContain(unref(form).insumo_id, "") : ssrLooseEqual(unref(form).insumo_id, "")) ? " selected" : ""}${_scopeId}>Seleccione...</option><!--[-->`);
						ssrRenderList(__props.insumos, (i) => {
							_push(`<option${ssrRenderAttr("value", i.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).insumo_id) ? ssrLooseContain(unref(form).insumo_id, i.id) : ssrLooseEqual(unref(form).insumo_id, i.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(i.nombre)}</option>`);
						});
						_push(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Tipo</label><select required class="mt-1 w-full theme-input"${_scopeId}><option value="ENTRADA"${ssrIncludeBooleanAttr(Array.isArray(unref(form).tipo_movimiento) ? ssrLooseContain(unref(form).tipo_movimiento, "ENTRADA") : ssrLooseEqual(unref(form).tipo_movimiento, "ENTRADA")) ? " selected" : ""}${_scopeId}>Entrada</option><option value="SALIDA"${ssrIncludeBooleanAttr(Array.isArray(unref(form).tipo_movimiento) ? ssrLooseContain(unref(form).tipo_movimiento, "SALIDA") : ssrLooseEqual(unref(form).tipo_movimiento, "SALIDA")) ? " selected" : ""}${_scopeId}>Salida</option><option value="AJUSTE"${ssrIncludeBooleanAttr(Array.isArray(unref(form).tipo_movimiento) ? ssrLooseContain(unref(form).tipo_movimiento, "AJUSTE") : ssrLooseEqual(unref(form).tipo_movimiento, "AJUSTE")) ? " selected" : ""}${_scopeId}>Ajuste</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Cantidad</label><input${ssrRenderAttr("value", unref(form).cantidad)} type="number" step="0.01" required class="mt-1 w-full theme-input"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Costo Unitario</label><input${ssrRenderAttr("value", unref(form).costo_unitario)} type="number" step="0.01" required class="mt-1 w-full theme-input"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Observación</label><textarea class="mt-1 w-full theme-input"${_scopeId}>${ssrInterpolate(unref(form).observacion)}</textarea></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary"${_scopeId}>Registrar</button></form></div>`);
					} else return [createVNode(unref(Head), { title: "Nuevo Movimiento" }), createVNode("div", { class: "mx-auto max-w-lg px-4 py-8" }, [createVNode("h1", { class: "text-2xl font-semibold mb-6 theme-section-title" }, "Nuevo Movimiento"), createVNode("form", {
						onSubmit: withModifiers(submit, ["prevent"]),
						class: "space-y-4"
					}, [
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Insumo"), withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => unref(form).insumo_id = $event,
							required: "",
							class: "mt-1 w-full theme-input"
						}, [createVNode("option", { value: "" }, "Seleccione..."), (openBlock(true), createBlock(Fragment, null, renderList(__props.insumos, (i) => {
							return openBlock(), createBlock("option", {
								key: i.id,
								value: i.id
							}, toDisplayString(i.nombre), 9, ["value"]);
						}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).insumo_id]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Tipo"), withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => unref(form).tipo_movimiento = $event,
							required: "",
							class: "mt-1 w-full theme-input"
						}, [
							createVNode("option", { value: "ENTRADA" }, "Entrada"),
							createVNode("option", { value: "SALIDA" }, "Salida"),
							createVNode("option", { value: "AJUSTE" }, "Ajuste")
						], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).tipo_movimiento]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Cantidad"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).cantidad = $event,
							type: "number",
							step: "0.01",
							required: "",
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).cantidad]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Costo Unitario"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).costo_unitario = $event,
							type: "number",
							step: "0.01",
							required: "",
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).costo_unitario]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Observación"), withDirectives(createVNode("textarea", {
							"onUpdate:modelValue": ($event) => unref(form).observacion = $event,
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).observacion]])]),
						createVNode("button", {
							type: "submit",
							disabled: unref(form).processing,
							class: "btn-primary"
						}, "Registrar", 8, ["disabled"])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Inventario/Create.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
