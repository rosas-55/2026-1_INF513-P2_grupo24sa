import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, useForm } from "@inertiajs/vue3";
import { Fragment, createBlock, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, vModelSelect, vModelText, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Produccion/Create.vue
var _sfc_main = {
	__name: "Create",
	__ssrInlineRender: true,
	props: { recetas: Array },
	setup(__props) {
		const form = useForm({
			receta_id: "",
			cantidad_producida: 1
		});
		function submit() {
			form.post(route("produccion.store"));
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Nueva Producción" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-lg px-4 py-8"${_scopeId}><h1 class="text-2xl font-semibold mb-6 theme-section-title"${_scopeId}>Nueva Producción</h1><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Receta</label><select required class="mt-1 w-full theme-input"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).receta_id) ? ssrLooseContain(unref(form).receta_id, "") : ssrLooseEqual(unref(form).receta_id, "")) ? " selected" : ""}${_scopeId}>Seleccione...</option><!--[-->`);
						ssrRenderList(__props.recetas, (r) => {
							_push(`<option${ssrRenderAttr("value", r.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).receta_id) ? ssrLooseContain(unref(form).receta_id, r.id) : ssrLooseEqual(unref(form).receta_id, r.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(r.label)}</option>`);
						});
						_push(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Cantidad a Producir</label><input${ssrRenderAttr("value", unref(form).cantidad_producida)} type="number" step="0.01" required class="mt-1 w-full theme-input"${_scopeId}></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary"${_scopeId}>Registrar Producción</button></form></div>`);
					} else return [createVNode(unref(Head), { title: "Nueva Producción" }), createVNode("div", { class: "mx-auto max-w-lg px-4 py-8" }, [createVNode("h1", { class: "text-2xl font-semibold mb-6 theme-section-title" }, "Nueva Producción"), createVNode("form", {
						onSubmit: withModifiers(submit, ["prevent"]),
						class: "space-y-4"
					}, [
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Receta"), withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => unref(form).receta_id = $event,
							required: "",
							class: "mt-1 w-full theme-input"
						}, [createVNode("option", { value: "" }, "Seleccione..."), (openBlock(true), createBlock(Fragment, null, renderList(__props.recetas, (r) => {
							return openBlock(), createBlock("option", {
								key: r.id,
								value: r.id
							}, toDisplayString(r.label), 9, ["value"]);
						}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).receta_id]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Cantidad a Producir"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).cantidad_producida = $event,
							type: "number",
							step: "0.01",
							required: "",
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).cantidad_producida]])]),
						createVNode("button", {
							type: "submit",
							disabled: unref(form).processing,
							class: "btn-primary"
						}, "Registrar Producción", 8, ["disabled"])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Produccion/Create.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
