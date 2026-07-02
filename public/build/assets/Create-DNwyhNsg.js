import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, useForm } from "@inertiajs/vue3";
import { Fragment, createBlock, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, vModelSelect, vModelText, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Compras/Create.vue
var _sfc_main = {
	__name: "Create",
	__ssrInlineRender: true,
	props: {
		proveedores: Array,
		insumos: Array
	},
	setup(__props) {
		const form = useForm({
			proveedor_id: "",
			estado: "PENDIENTE",
			detalles: [{
				insumo_id: "",
				cantidad: 1,
				precio_unitario: 0
			}]
		});
		function addDetalle() {
			form.detalles.push({
				insumo_id: "",
				cantidad: 1,
				precio_unitario: 0
			});
		}
		function removeDetalle(i) {
			form.detalles.splice(i, 1);
		}
		function submit() {
			form.post(route("compras.store"));
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Nueva Compra" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-3xl px-4 py-8"${_scopeId}><h1 class="text-2xl font-semibold mb-6 theme-section-title"${_scopeId}>Nueva Compra</h1><form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 gap-4 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Proveedor</label><select required class="mt-1 w-full theme-input"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).proveedor_id) ? ssrLooseContain(unref(form).proveedor_id, "") : ssrLooseEqual(unref(form).proveedor_id, "")) ? " selected" : ""}${_scopeId}>Seleccione...</option><!--[-->`);
						ssrRenderList(__props.proveedores, (p) => {
							_push(`<option${ssrRenderAttr("value", p.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).proveedor_id) ? ssrLooseContain(unref(form).proveedor_id, p.id) : ssrLooseEqual(unref(form).proveedor_id, p.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(p.nombre)}</option>`);
						});
						_push(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Estado</label><select required class="mt-1 w-full theme-input"${_scopeId}><option value="PENDIENTE"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "PENDIENTE") : ssrLooseEqual(unref(form).estado, "PENDIENTE")) ? " selected" : ""}${_scopeId}>Pendiente</option><option value="COMPLETADO"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "COMPLETADO") : ssrLooseEqual(unref(form).estado, "COMPLETADO")) ? " selected" : ""}${_scopeId}>Completado</option><option value="ANULADO"${ssrIncludeBooleanAttr(Array.isArray(unref(form).estado) ? ssrLooseContain(unref(form).estado, "ANULADO") : ssrLooseEqual(unref(form).estado, "ANULADO")) ? " selected" : ""}${_scopeId}>Anulado</option></select></div></div><div${_scopeId}><h2 class="font-medium mb-2"${_scopeId}>Detalles</h2><!--[-->`);
						ssrRenderList(unref(form).detalles, (d, i) => {
							_push(`<div class="grid grid-cols-2 gap-2 mb-2 items-center sm:grid-cols-4"${_scopeId}><select required class="rounded-md border px-2 py-1 text-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(d.insumo_id) ? ssrLooseContain(d.insumo_id, "") : ssrLooseEqual(d.insumo_id, "")) ? " selected" : ""}${_scopeId}>Insumo...</option><!--[-->`);
							ssrRenderList(__props.insumos, (ins) => {
								_push(`<option${ssrRenderAttr("value", ins.id)}${ssrIncludeBooleanAttr(Array.isArray(d.insumo_id) ? ssrLooseContain(d.insumo_id, ins.id) : ssrLooseEqual(d.insumo_id, ins.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(ins.nombre)} (${ssrInterpolate(ins.unidad_medida)})</option>`);
							});
							_push(`<!--]--></select><input${ssrRenderAttr("value", d.cantidad)} type="number" step="0.01" placeholder="Cant." required class="rounded-md border px-2 py-1 text-sm"${_scopeId}><input${ssrRenderAttr("value", d.precio_unitario)} type="number" step="0.01" placeholder="Precio" required class="rounded-md border px-2 py-1 text-sm"${_scopeId}><button type="button" class="text-red-600 text-xs"${_scopeId}>âœ•</button></div>`);
						});
						_push(`<!--]--><button type="button" class="text-indigo-600 text-sm hover:underline"${_scopeId}>+ Agregar detalle</button></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary"${_scopeId}>Guardar Compra</button></form></div>`);
					} else return [createVNode(unref(Head), { title: "Nueva Compra" }), createVNode("div", { class: "mx-auto max-w-3xl px-4 py-8" }, [createVNode("h1", { class: "text-2xl font-semibold mb-6 theme-section-title" }, "Nueva Compra"), createVNode("form", {
						onSubmit: withModifiers(submit, ["prevent"]),
						class: "space-y-6"
					}, [
						createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, [createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Proveedor"), withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => unref(form).proveedor_id = $event,
							required: "",
							class: "mt-1 w-full theme-input"
						}, [createVNode("option", { value: "" }, "Seleccione..."), (openBlock(true), createBlock(Fragment, null, renderList(__props.proveedores, (p) => {
							return openBlock(), createBlock("option", {
								key: p.id,
								value: p.id
							}, toDisplayString(p.nombre), 9, ["value"]);
						}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).proveedor_id]])]), createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Estado"), withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => unref(form).estado = $event,
							required: "",
							class: "mt-1 w-full theme-input"
						}, [
							createVNode("option", { value: "PENDIENTE" }, "Pendiente"),
							createVNode("option", { value: "COMPLETADO" }, "Completado"),
							createVNode("option", { value: "ANULADO" }, "Anulado")
						], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).estado]])])]),
						createVNode("div", null, [
							createVNode("h2", { class: "font-medium mb-2" }, "Detalles"),
							(openBlock(true), createBlock(Fragment, null, renderList(unref(form).detalles, (d, i) => {
								return openBlock(), createBlock("div", {
									key: i,
									class: "grid grid-cols-2 gap-2 mb-2 items-center sm:grid-cols-4"
								}, [
									withDirectives(createVNode("select", {
										"onUpdate:modelValue": ($event) => d.insumo_id = $event,
										required: "",
										class: "rounded-md border px-2 py-1 text-sm"
									}, [createVNode("option", { value: "" }, "Insumo..."), (openBlock(true), createBlock(Fragment, null, renderList(__props.insumos, (ins) => {
										return openBlock(), createBlock("option", {
											key: ins.id,
											value: ins.id
										}, toDisplayString(ins.nombre) + " (" + toDisplayString(ins.unidad_medida) + ")", 9, ["value"]);
									}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, d.insumo_id]]),
									withDirectives(createVNode("input", {
										"onUpdate:modelValue": ($event) => d.cantidad = $event,
										type: "number",
										step: "0.01",
										placeholder: "Cant.",
										required: "",
										class: "rounded-md border px-2 py-1 text-sm"
									}, null, 8, ["onUpdate:modelValue"]), [[vModelText, d.cantidad]]),
									withDirectives(createVNode("input", {
										"onUpdate:modelValue": ($event) => d.precio_unitario = $event,
										type: "number",
										step: "0.01",
										placeholder: "Precio",
										required: "",
										class: "rounded-md border px-2 py-1 text-sm"
									}, null, 8, ["onUpdate:modelValue"]), [[vModelText, d.precio_unitario]]),
									createVNode("button", {
										type: "button",
										onClick: ($event) => removeDetalle(i),
										class: "text-red-600 text-xs"
									}, "âœ•", 8, ["onClick"])
								]);
							}), 128)),
							createVNode("button", {
								type: "button",
								onClick: addDetalle,
								class: "text-indigo-600 text-sm hover:underline"
							}, "+ Agregar detalle")
						]),
						createVNode("button", {
							type: "submit",
							disabled: unref(form).processing,
							class: "btn-primary"
						}, "Guardar Compra", 8, ["disabled"])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Compras/Create.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
