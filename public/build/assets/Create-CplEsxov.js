import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, useForm } from "@inertiajs/vue3";
import { createVNode, unref, useSSRContext, vModelText, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Pages/Proveedores/Create.vue
var _sfc_main = {
	__name: "Create",
	__ssrInlineRender: true,
	setup(__props) {
		const form = useForm({
			nombre: "",
			direccion: "",
			telefono: ""
		});
		function submit() {
			form.post(route("proveedores.store"));
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Nuevo Proveedor" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-lg px-4 py-8"${_scopeId}><h1 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white"${_scopeId}>Nuevo Proveedor</h1><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}>Nombre</label><input${ssrRenderAttr("value", unref(form).nombre)} type="text" required class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}>Dirección</label><input${ssrRenderAttr("value", unref(form).direccion)} type="text" class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}>Teléfono</label><input${ssrRenderAttr("value", unref(form).telefono)} type="text" class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2"${_scopeId}></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"${_scopeId}>Guardar</button></form></div>`);
					} else return [createVNode(unref(Head), { title: "Nuevo Proveedor" }), createVNode("div", { class: "mx-auto max-w-lg px-4 py-8" }, [createVNode("h1", { class: "text-2xl font-semibold mb-6 text-gray-900 dark:text-white" }, "Nuevo Proveedor"), createVNode("form", {
						onSubmit: withModifiers(submit, ["prevent"]),
						class: "space-y-4"
					}, [
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300" }, "Nombre"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).nombre = $event,
							type: "text",
							required: "",
							class: "mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).nombre]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300" }, "Dirección"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).direccion = $event,
							type: "text",
							class: "mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).direccion]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300" }, "Teléfono"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).telefono = $event,
							type: "text",
							class: "mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).telefono]])]),
						createVNode("button", {
							type: "submit",
							disabled: unref(form).processing,
							class: "rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
						}, "Guardar", 8, ["disabled"])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Proveedores/Create.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
