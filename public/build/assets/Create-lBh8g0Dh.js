import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, useForm } from "@inertiajs/vue3";
import { Fragment, createBlock, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, vModelSelect, vModelText, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Recetas/Create.vue
var _sfc_main = {
	__name: "Create",
	__ssrInlineRender: true,
	props: {
		productos: Array,
		insumos: Array
	},
	setup(__props) {
		const form = useForm({
			producto_id: "",
			descripcion: "",
			tiempo_preparacion: "",
			insumos: [{
				insumo_id: "",
				cantidad: 1
			}]
		});
		function addInsumo() {
			form.insumos.push({
				insumo_id: "",
				cantidad: 1
			});
		}
		function removeInsumo(i) {
			form.insumos.splice(i, 1);
		}
		function submit() {
			form.post(route("recetas.store"));
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Nueva Receta" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-2xl px-4 py-8"${_scopeId}><h1 class="text-2xl font-semibold mb-6 theme-section-title"${_scopeId}>Nueva Receta</h1><form class="space-y-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Producto</label><select required class="mt-1 w-full theme-input"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).producto_id) ? ssrLooseContain(unref(form).producto_id, "") : ssrLooseEqual(unref(form).producto_id, "")) ? " selected" : ""}${_scopeId}>Seleccione producto sin receta...</option><!--[-->`);
						ssrRenderList(__props.productos, (p) => {
							_push(`<option${ssrRenderAttr("value", p.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).producto_id) ? ssrLooseContain(unref(form).producto_id, p.id) : ssrLooseEqual(unref(form).producto_id, p.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(p.nombre)}</option>`);
						});
						_push(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Descripción</label><textarea class="mt-1 w-full theme-input"${_scopeId}>${ssrInterpolate(unref(form).descripcion)}</textarea></div><div${_scopeId}><label class="block text-sm font-medium text-secondary"${_scopeId}>Tiempo de Preparación</label><input${ssrRenderAttr("value", unref(form).tiempo_preparacion)} class="mt-1 w-full theme-input"${_scopeId}></div><div${_scopeId}><h2 class="font-medium mb-2"${_scopeId}>Insumos</h2><!--[-->`);
						ssrRenderList(unref(form).insumos, (ins, i) => {
							_push(`<div class="grid grid-cols-1 gap-2 mb-2 items-stretch sm:grid-cols-3 sm:items-center"${_scopeId}><select required class="rounded-md border px-2 py-1 text-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(ins.insumo_id) ? ssrLooseContain(ins.insumo_id, "") : ssrLooseEqual(ins.insumo_id, "")) ? " selected" : ""}${_scopeId}>Insumo...</option><!--[-->`);
							ssrRenderList(__props.insumos, (insumo) => {
								_push(`<option${ssrRenderAttr("value", insumo.id)}${ssrIncludeBooleanAttr(Array.isArray(ins.insumo_id) ? ssrLooseContain(ins.insumo_id, insumo.id) : ssrLooseEqual(ins.insumo_id, insumo.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(insumo.nombre)} (${ssrInterpolate(insumo.unidad_medida)})</option>`);
							});
							_push(`<!--]--></select><input${ssrRenderAttr("value", ins.cantidad)} type="number" step="0.001" placeholder="Cantidad" required class="rounded-md border px-2 py-1 text-sm"${_scopeId}><button type="button" class="text-red-600 text-xs"${_scopeId}>�S&quot;</button></div>`);
						});
						_push(`<!--]--><button type="button" class="text-indigo-600 text-sm"${_scopeId}>+ Agregar insumo</button></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="btn-primary"${_scopeId}>Guardar Receta</button></form></div>`);
					} else return [createVNode(unref(Head), { title: "Nueva Receta" }), createVNode("div", { class: "mx-auto max-w-2xl px-4 py-8" }, [createVNode("h1", { class: "text-2xl font-semibold mb-6 theme-section-title" }, "Nueva Receta"), createVNode("form", {
						onSubmit: withModifiers(submit, ["prevent"]),
						class: "space-y-6"
					}, [
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Producto"), withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => unref(form).producto_id = $event,
							required: "",
							class: "mt-1 w-full theme-input"
						}, [createVNode("option", { value: "" }, "Seleccione producto sin receta..."), (openBlock(true), createBlock(Fragment, null, renderList(__props.productos, (p) => {
							return openBlock(), createBlock("option", {
								key: p.id,
								value: p.id
							}, toDisplayString(p.nombre), 9, ["value"]);
						}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).producto_id]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Descripción"), withDirectives(createVNode("textarea", {
							"onUpdate:modelValue": ($event) => unref(form).descripcion = $event,
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).descripcion]])]),
						createVNode("div", null, [createVNode("label", { class: "block text-sm font-medium text-secondary" }, "Tiempo de Preparación"), withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).tiempo_preparacion = $event,
							class: "mt-1 w-full theme-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).tiempo_preparacion]])]),
						createVNode("div", null, [
							createVNode("h2", { class: "font-medium mb-2" }, "Insumos"),
							(openBlock(true), createBlock(Fragment, null, renderList(unref(form).insumos, (ins, i) => {
								return openBlock(), createBlock("div", {
									key: i,
									class: "grid grid-cols-1 gap-2 mb-2 items-stretch sm:grid-cols-3 sm:items-center"
								}, [
									withDirectives(createVNode("select", {
										"onUpdate:modelValue": ($event) => ins.insumo_id = $event,
										required: "",
										class: "rounded-md border px-2 py-1 text-sm"
									}, [createVNode("option", { value: "" }, "Insumo..."), (openBlock(true), createBlock(Fragment, null, renderList(__props.insumos, (insumo) => {
										return openBlock(), createBlock("option", {
											key: insumo.id,
											value: insumo.id
										}, toDisplayString(insumo.nombre) + " (" + toDisplayString(insumo.unidad_medida) + ")", 9, ["value"]);
									}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, ins.insumo_id]]),
									withDirectives(createVNode("input", {
										"onUpdate:modelValue": ($event) => ins.cantidad = $event,
										type: "number",
										step: "0.001",
										placeholder: "Cantidad",
										required: "",
										class: "rounded-md border px-2 py-1 text-sm"
									}, null, 8, ["onUpdate:modelValue"]), [[vModelText, ins.cantidad]]),
									createVNode("button", {
										type: "button",
										onClick: ($event) => removeInsumo(i),
										class: "text-red-600 text-xs"
									}, "�S\"", 8, ["onClick"])
								]);
							}), 128)),
							createVNode("button", {
								type: "button",
								onClick: addInsumo,
								class: "text-indigo-600 text-sm"
							}, "+ Agregar insumo")
						]),
						createVNode("button", {
							type: "submit",
							disabled: unref(form).processing,
							class: "btn-primary"
						}, "Guardar Receta", 8, ["disabled"])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Recetas/Create.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
