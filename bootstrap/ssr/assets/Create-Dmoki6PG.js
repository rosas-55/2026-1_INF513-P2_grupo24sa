import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import axios from "axios";
import { Head } from "@inertiajs/vue3";
import { Fragment, Teleport, computed, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, vModelSelect, vModelText, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderTeleport } from "vue/server-renderer";
//#region resources/js/Pages/Ventas/Create.vue
var _sfc_main = {
	__name: "Create",
	__ssrInlineRender: true,
	props: {
		clientes: Array,
		productos: Array
	},
	setup(__props) {
		const props = __props;
		const clientesList = ref([...props.clientes]);
		const form = ref({
			cliente_id: "",
			tipo: "CONTADO",
			nro_cuotas: 0,
			interes: 0,
			detalles: [{
				producto_id: "",
				cantidad: 1
			}]
		});
		const submitting = ref(false);
		const errorMsg = ref("");
		function addDetalle() {
			form.value.detalles.push({
				producto_id: "",
				cantidad: 1
			});
		}
		function removeDetalle(i) {
			if (form.value.detalles.length === 1) return;
			form.value.detalles.splice(i, 1);
		}
		function getSubtotal(d) {
			const p = props.productos.find((x) => x.id == d.producto_id);
			if (!p) return 0;
			return (Number(p.precio_venta) || 0) * (Number(d.cantidad) || 0);
		}
		const totalEstimado = computed(() => {
			let t = 0;
			for (const d of form.value.detalles) t += getSubtotal(d);
			return t + (Number(form.value.interes) || 0);
		});
		const showClientModal = ref(false);
		const newClient = ref({
			name: "",
			email: "",
			cedula: ""
		});
		const creatingClient = ref(false);
		const clientError = ref("");
		async function createClient() {
			if (creatingClient.value) return;
			creatingClient.value = true;
			clientError.value = "";
			try {
				const { data } = await axios.post(route("ventas.store-client"), newClient.value);
				clientesList.value.push(data);
				form.value.cliente_id = data.id;
				showClientModal.value = false;
				newClient.value = {
					name: "",
					email: "",
					cedula: ""
				};
			} catch (e) {
				clientError.value = e.response?.data?.message || "Error al crear el cliente.";
			} finally {
				creatingClient.value = false;
			}
		}
		async function submitSimple() {
			if (submitting.value) return;
			submitting.value = true;
			errorMsg.value = "";
			try {
				await axios.post(route("ventas.store"), form.value);
				window.location.href = route("ventas.index");
			} catch (e) {
				errorMsg.value = e.response?.data?.errors ? Object.values(e.response.data.errors).flat().join(" ") : e.response?.data?.message || "Error al registrar la venta.";
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Nueva Venta" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-3xl px-4 py-8"${_scopeId}><h1 class="text-2xl font-semibold mb-6 theme-section-title" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}> Nueva Venta </h1>`);
						if (errorMsg.value) _push(`<div class="mb-4 rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700" role="alert"${_scopeId}>${ssrInterpolate(errorMsg.value)}</div>`);
						else _push(`<!---->`);
						_push(`<form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div class="flex items-end gap-2"${_scopeId}><div class="flex-1"${_scopeId}><label for="venta-cliente" class="block text-sm font-medium text-secondary" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Cliente</label><select id="venta-cliente" required class="mt-1 w-full theme-input" style="${ssrRenderStyle({
							backgroundColor: "var(--color-surface)",
							color: "var(--color-text)",
							borderColor: "var(--color-border-light)"
						})}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(form.value.cliente_id) ? ssrLooseContain(form.value.cliente_id, "") : ssrLooseEqual(form.value.cliente_id, "")) ? " selected" : ""}${_scopeId}>Seleccione…</option><!--[-->`);
						ssrRenderList(clientesList.value, (c) => {
							_push(`<option${ssrRenderAttr("value", c.id)}${ssrIncludeBooleanAttr(Array.isArray(form.value.cliente_id) ? ssrLooseContain(form.value.cliente_id, c.id) : ssrLooseEqual(form.value.cliente_id, c.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(c.name)}</option>`);
						});
						_push(`<!--]--></select></div><button type="button" class="mb-1 rounded border px-3 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] hover:bg-opacity-80 transition-colors" style="${ssrRenderStyle({
							backgroundColor: "var(--color-primary)",
							color: "#ffffff",
							borderColor: "var(--color-primary)"
						})}"${_scopeId}> + Nuevo </button></div><div${_scopeId}><label for="venta-tipo" class="block text-sm font-medium text-secondary" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Tipo</label><select id="venta-tipo" required class="mt-1 w-full theme-input" style="${ssrRenderStyle({
							backgroundColor: "var(--color-surface)",
							color: "var(--color-text)",
							borderColor: "var(--color-border-light)"
						})}"${_scopeId}><option value="CONTADO"${ssrIncludeBooleanAttr(Array.isArray(form.value.tipo) ? ssrLooseContain(form.value.tipo, "CONTADO") : ssrLooseEqual(form.value.tipo, "CONTADO")) ? " selected" : ""}${_scopeId}>Contado</option><option value="CREDITO"${ssrIncludeBooleanAttr(Array.isArray(form.value.tipo) ? ssrLooseContain(form.value.tipo, "CREDITO") : ssrLooseEqual(form.value.tipo, "CREDITO")) ? " selected" : ""}${_scopeId}>Crédito</option></select></div></div>`);
						if (form.value.tipo === "CREDITO") _push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label for="venta-nro-cuotas" class="block text-sm font-medium text-secondary" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>N° de Cuotas</label><input id="venta-nro-cuotas"${ssrRenderAttr("value", form.value.nro_cuotas)} type="number" min="1" max="24" required class="mt-1 w-full theme-input" style="${ssrRenderStyle({
							backgroundColor: "var(--color-surface)",
							color: "var(--color-text)",
							borderColor: "var(--color-border-light)"
						})}"${_scopeId}></div><div${_scopeId}><label for="venta-interes" class="block text-sm font-medium text-secondary" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Interés (Bs.)</label><input id="venta-interes"${ssrRenderAttr("value", form.value.interes)} type="number" step="0.01" class="mt-1 w-full theme-input" style="${ssrRenderStyle({
							backgroundColor: "var(--color-surface)",
							color: "var(--color-text)",
							borderColor: "var(--color-border-light)"
						})}"${_scopeId}></div></div>`);
						else _push(`<!---->`);
						_push(`<div${_scopeId}><h2 class="font-medium mb-2" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Productos</h2><!--[-->`);
						ssrRenderList(form.value.detalles, (d, i) => {
							_push(`<div class="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3 items-center rounded-lg border p-3" style="${ssrRenderStyle({
								borderColor: "var(--color-border-light)",
								backgroundColor: "var(--color-surface-alt)"
							})}"${_scopeId}><div class="sm:col-span-6"${_scopeId}><label${ssrRenderAttr("for", `det-producto-${i}`)} class="block text-xs font-medium mb-1" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Producto ${ssrInterpolate(i + 1)}</label><select${ssrRenderAttr("id", `det-producto-${i}`)} required class="w-full rounded-md border px-2 py-1.5 text-sm" style="${ssrRenderStyle({
								backgroundColor: "var(--color-surface)",
								color: "var(--color-text)",
								borderColor: "var(--color-border-light)"
							})}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(d.producto_id) ? ssrLooseContain(d.producto_id, "") : ssrLooseEqual(d.producto_id, "")) ? " selected" : ""}${_scopeId}>Seleccione un producto…</option><!--[-->`);
							ssrRenderList(__props.productos, (p) => {
								_push(`<option${ssrRenderAttr("value", p.id)}${ssrIncludeBooleanAttr(Array.isArray(d.producto_id) ? ssrLooseContain(d.producto_id, p.id) : ssrLooseEqual(d.producto_id, p.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(p.nombre)} — Bs. ${ssrInterpolate(Number(p.precio_venta).toFixed(2))} (Stock: ${ssrInterpolate(p.stock_actual)}) </option>`);
							});
							_push(`<!--]--></select></div><div class="sm:col-span-3"${_scopeId}><label${ssrRenderAttr("for", `det-cantidad-${i}`)} class="block text-xs font-medium mb-1" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Cantidad</label><input${ssrRenderAttr("id", `det-cantidad-${i}`)}${ssrRenderAttr("value", d.cantidad)} type="number" step="0.01" min="0.01" required class="w-full rounded-md border px-2 py-1.5 text-sm" style="${ssrRenderStyle({
								backgroundColor: "var(--color-surface)",
								color: "var(--color-text)",
								borderColor: "var(--color-border-light)"
							})}"${_scopeId}></div><div class="sm:col-span-2 flex flex-col justify-end h-full"${_scopeId}><span class="text-xs font-medium mb-1" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Subtotal</span><span class="text-sm font-semibold whitespace-nowrap" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}> Bs. ${ssrInterpolate(getSubtotal(d).toFixed(2))}</span></div><div class="sm:col-span-1 flex justify-end sm:justify-center items-end h-full"${_scopeId}><button type="button"${ssrRenderAttr("aria-label", `Quitar producto ${i + 1}`)} class="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 transition-colors"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg></button></div></div>`);
						});
						_push(`<!--]--><button type="button" class="text-indigo-600 text-sm mt-1 inline-block"${_scopeId}>+ Agregar producto</button></div><div class="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><div class="text-sm" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}> Total estimado: <strong style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Bs. ${ssrInterpolate(totalEstimado.value.toFixed(2))}</strong>`);
						if (form.value.tipo === "CREDITO" && form.value.nro_cuotas > 1) _push(`<span${_scopeId}> · ${ssrInterpolate(form.value.nro_cuotas)} cuotas de Bs. ${ssrInterpolate((totalEstimado.value / form.value.nro_cuotas).toFixed(2))}</span>`);
						else _push(`<!---->`);
						_push(`</div><button type="button"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} class="rounded-lg px-6 py-2.5 text-sm font-bold text-white disabled:opacity-50 transition-colors shadow-md" style="${ssrRenderStyle({ backgroundColor: "var(--color-primary)" })}"${_scopeId}>${ssrInterpolate(submitting.value ? "Registrando..." : "Registrar Venta")}</button></div></form></div>`);
						ssrRenderTeleport(_push, (_push) => {
							if (showClientModal.value) {
								_push(`<div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4" style="${ssrRenderStyle({ "background-color": "rgba(0, 0, 0, 0.55)" })}"${_scopeId}><div class="w-full max-w-md rounded-xl shadow-2xl p-6" style="${ssrRenderStyle({ backgroundColor: "var(--color-card-bg)" })}"${_scopeId}><h2 class="text-xl font-semibold mb-4" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Nuevo Cliente</h2><p class="text-sm mb-4" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Cree un cliente rápidamente para esta venta.</p>`);
								if (clientError.value) _push(`<div class="mb-4 rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700"${_scopeId}>${ssrInterpolate(clientError.value)}</div>`);
								else _push(`<!---->`);
								_push(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-secondary" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Nombre Completo</label><input${ssrRenderAttr("value", newClient.value.name)} type="text" required class="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)]" style="${ssrRenderStyle({
									backgroundColor: "var(--color-surface)",
									color: "var(--color-text)",
									borderColor: "var(--color-border-light)"
								})}"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-secondary" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Cédula / NIT</label><input${ssrRenderAttr("value", newClient.value.cedula)} type="text" required class="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)]" style="${ssrRenderStyle({
									backgroundColor: "var(--color-surface)",
									color: "var(--color-text)",
									borderColor: "var(--color-border-light)"
								})}"${_scopeId}><p class="text-xs mt-1" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}> Se usará como contraseña por defecto. </p></div><div${_scopeId}><label class="block text-sm font-medium text-secondary" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Correo Electrónico</label><input${ssrRenderAttr("value", newClient.value.email)} type="email" required class="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)]" style="${ssrRenderStyle({
									backgroundColor: "var(--color-surface)",
									color: "var(--color-text)",
									borderColor: "var(--color-border-light)"
								})}"${_scopeId}></div><div class="flex justify-end gap-3 mt-6 pt-4 border-t" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><button type="button" class="rounded border px-4 py-2 text-sm font-medium hover:bg-opacity-80 transition-colors" style="${ssrRenderStyle({
									backgroundColor: "var(--color-surface)",
									color: "var(--color-text)",
									borderColor: "var(--color-border-light)"
								})}"${_scopeId}> Cancelar </button><button type="submit"${ssrIncludeBooleanAttr(creatingClient.value) ? " disabled" : ""} class="rounded px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 hover:bg-opacity-90 transition-colors" style="${ssrRenderStyle({ backgroundColor: "var(--color-primary)" })}"${_scopeId}>${ssrInterpolate(creatingClient.value ? "Guardando..." : "Guardar Cliente")}</button></div></form></div></div>`);
							} else _push(`<!---->`);
						}, "body", false, _parent);
					} else return [
						createVNode(unref(Head), { title: "Nueva Venta" }),
						createVNode("div", { class: "mx-auto max-w-3xl px-4 py-8" }, [
							createVNode("h1", {
								class: "text-2xl font-semibold mb-6 theme-section-title",
								style: { color: "var(--color-text)" }
							}, " Nueva Venta "),
							errorMsg.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "mb-4 rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700",
								role: "alert"
							}, toDisplayString(errorMsg.value), 1)) : createCommentVNode("", true),
							createVNode("form", {
								onSubmit: withModifiers(() => {}, ["prevent"]),
								class: "space-y-6"
							}, [
								createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [createVNode("div", { class: "flex items-end gap-2" }, [createVNode("div", { class: "flex-1" }, [createVNode("label", {
									for: "venta-cliente",
									class: "block text-sm font-medium text-secondary",
									style: { color: "var(--color-text)" }
								}, "Cliente"), withDirectives(createVNode("select", {
									id: "venta-cliente",
									"onUpdate:modelValue": ($event) => form.value.cliente_id = $event,
									required: "",
									class: "mt-1 w-full theme-input",
									style: {
										backgroundColor: "var(--color-surface)",
										color: "var(--color-text)",
										borderColor: "var(--color-border-light)"
									}
								}, [createVNode("option", { value: "" }, "Seleccione…"), (openBlock(true), createBlock(Fragment, null, renderList(clientesList.value, (c) => {
									return openBlock(), createBlock("option", {
										key: c.id,
										value: c.id
									}, toDisplayString(c.name), 9, ["value"]);
								}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, form.value.cliente_id]])]), createVNode("button", {
									type: "button",
									onClick: ($event) => showClientModal.value = true,
									class: "mb-1 rounded border px-3 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] hover:bg-opacity-80 transition-colors",
									style: {
										backgroundColor: "var(--color-primary)",
										color: "#ffffff",
										borderColor: "var(--color-primary)"
									}
								}, " + Nuevo ", 8, ["onClick"])]), createVNode("div", null, [createVNode("label", {
									for: "venta-tipo",
									class: "block text-sm font-medium text-secondary",
									style: { color: "var(--color-text)" }
								}, "Tipo"), withDirectives(createVNode("select", {
									id: "venta-tipo",
									"onUpdate:modelValue": ($event) => form.value.tipo = $event,
									required: "",
									class: "mt-1 w-full theme-input",
									style: {
										backgroundColor: "var(--color-surface)",
										color: "var(--color-text)",
										borderColor: "var(--color-border-light)"
									}
								}, [createVNode("option", { value: "CONTADO" }, "Contado"), createVNode("option", { value: "CREDITO" }, "Crédito")], 8, ["onUpdate:modelValue"]), [[vModelSelect, form.value.tipo]])])]),
								form.value.tipo === "CREDITO" ? (openBlock(), createBlock("div", {
									key: 0,
									class: "grid grid-cols-1 sm:grid-cols-2 gap-4"
								}, [createVNode("div", null, [createVNode("label", {
									for: "venta-nro-cuotas",
									class: "block text-sm font-medium text-secondary",
									style: { color: "var(--color-text)" }
								}, "N° de Cuotas"), withDirectives(createVNode("input", {
									id: "venta-nro-cuotas",
									"onUpdate:modelValue": ($event) => form.value.nro_cuotas = $event,
									type: "number",
									min: "1",
									max: "24",
									required: "",
									class: "mt-1 w-full theme-input",
									style: {
										backgroundColor: "var(--color-surface)",
										color: "var(--color-text)",
										borderColor: "var(--color-border-light)"
									}
								}, null, 8, ["onUpdate:modelValue"]), [[
									vModelText,
									form.value.nro_cuotas,
									void 0,
									{ number: true }
								]])]), createVNode("div", null, [createVNode("label", {
									for: "venta-interes",
									class: "block text-sm font-medium text-secondary",
									style: { color: "var(--color-text)" }
								}, "Interés (Bs.)"), withDirectives(createVNode("input", {
									id: "venta-interes",
									"onUpdate:modelValue": ($event) => form.value.interes = $event,
									type: "number",
									step: "0.01",
									class: "mt-1 w-full theme-input",
									style: {
										backgroundColor: "var(--color-surface)",
										color: "var(--color-text)",
										borderColor: "var(--color-border-light)"
									}
								}, null, 8, ["onUpdate:modelValue"]), [[
									vModelText,
									form.value.interes,
									void 0,
									{ number: true }
								]])])])) : createCommentVNode("", true),
								createVNode("div", null, [
									createVNode("h2", {
										class: "font-medium mb-2",
										style: { color: "var(--color-text)" }
									}, "Productos"),
									(openBlock(true), createBlock(Fragment, null, renderList(form.value.detalles, (d, i) => {
										return openBlock(), createBlock("div", {
											key: i,
											class: "grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3 items-center rounded-lg border p-3",
											style: {
												borderColor: "var(--color-border-light)",
												backgroundColor: "var(--color-surface-alt)"
											}
										}, [
											createVNode("div", { class: "sm:col-span-6" }, [createVNode("label", {
												for: `det-producto-${i}`,
												class: "block text-xs font-medium mb-1",
												style: { color: "var(--color-text-muted)" }
											}, "Producto " + toDisplayString(i + 1), 9, ["for"]), withDirectives(createVNode("select", {
												id: `det-producto-${i}`,
												"onUpdate:modelValue": ($event) => d.producto_id = $event,
												required: "",
												class: "w-full rounded-md border px-2 py-1.5 text-sm",
												style: {
													backgroundColor: "var(--color-surface)",
													color: "var(--color-text)",
													borderColor: "var(--color-border-light)"
												}
											}, [createVNode("option", { value: "" }, "Seleccione un producto…"), (openBlock(true), createBlock(Fragment, null, renderList(__props.productos, (p) => {
												return openBlock(), createBlock("option", {
													key: p.id,
													value: p.id
												}, toDisplayString(p.nombre) + " — Bs. " + toDisplayString(Number(p.precio_venta).toFixed(2)) + " (Stock: " + toDisplayString(p.stock_actual) + ") ", 9, ["value"]);
											}), 128))], 8, ["id", "onUpdate:modelValue"]), [[vModelSelect, d.producto_id]])]),
											createVNode("div", { class: "sm:col-span-3" }, [createVNode("label", {
												for: `det-cantidad-${i}`,
												class: "block text-xs font-medium mb-1",
												style: { color: "var(--color-text-muted)" }
											}, "Cantidad", 8, ["for"]), withDirectives(createVNode("input", {
												id: `det-cantidad-${i}`,
												"onUpdate:modelValue": ($event) => d.cantidad = $event,
												type: "number",
												step: "0.01",
												min: "0.01",
												required: "",
												class: "w-full rounded-md border px-2 py-1.5 text-sm",
												style: {
													backgroundColor: "var(--color-surface)",
													color: "var(--color-text)",
													borderColor: "var(--color-border-light)"
												}
											}, null, 8, ["id", "onUpdate:modelValue"]), [[
												vModelText,
												d.cantidad,
												void 0,
												{ number: true }
											]])]),
											createVNode("div", { class: "sm:col-span-2 flex flex-col justify-end h-full" }, [createVNode("span", {
												class: "text-xs font-medium mb-1",
												style: { color: "var(--color-text-muted)" }
											}, "Subtotal"), createVNode("span", {
												class: "text-sm font-semibold whitespace-nowrap",
												style: { color: "var(--color-text)" }
											}, " Bs. " + toDisplayString(getSubtotal(d).toFixed(2)), 1)]),
											createVNode("div", { class: "sm:col-span-1 flex justify-end sm:justify-center items-end h-full" }, [createVNode("button", {
												type: "button",
												onClick: ($event) => removeDetalle(i),
												"aria-label": `Quitar producto ${i + 1}`,
												class: "text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 transition-colors"
											}, [(openBlock(), createBlock("svg", {
												class: "w-5 h-5",
												fill: "none",
												stroke: "currentColor",
												viewBox: "0 0 24 24"
											}, [createVNode("path", {
												"stroke-linecap": "round",
												"stroke-linejoin": "round",
												"stroke-width": "2",
												d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											})]))], 8, ["onClick", "aria-label"])])
										]);
									}), 128)),
									createVNode("button", {
										type: "button",
										onClick: addDetalle,
										class: "text-indigo-600 text-sm mt-1 inline-block"
									}, "+ Agregar producto")
								]),
								createVNode("div", {
									class: "flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t",
									style: { borderColor: "var(--color-border-light)" }
								}, [createVNode("div", {
									class: "text-sm",
									style: { color: "var(--color-text-muted)" }
								}, [
									createTextVNode(" Total estimado: "),
									createVNode("strong", { style: { color: "var(--color-text)" } }, "Bs. " + toDisplayString(totalEstimado.value.toFixed(2)), 1),
									form.value.tipo === "CREDITO" && form.value.nro_cuotas > 1 ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(form.value.nro_cuotas) + " cuotas de Bs. " + toDisplayString((totalEstimado.value / form.value.nro_cuotas).toFixed(2)), 1)) : createCommentVNode("", true)
								]), createVNode("button", {
									type: "button",
									onClick: submitSimple,
									disabled: submitting.value,
									class: "rounded-lg px-6 py-2.5 text-sm font-bold text-white disabled:opacity-50 transition-colors shadow-md",
									style: { backgroundColor: "var(--color-primary)" }
								}, toDisplayString(submitting.value ? "Registrando..." : "Registrar Venta"), 9, ["disabled"])])
							], 40, ["onSubmit"])
						]),
						(openBlock(), createBlock(Teleport, { to: "body" }, [showClientModal.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4",
							style: { "background-color": "rgba(0, 0, 0, 0.55)" },
							onClick: withModifiers(($event) => showClientModal.value = false, ["self"])
						}, [createVNode("div", {
							class: "w-full max-w-md rounded-xl shadow-2xl p-6",
							style: { backgroundColor: "var(--color-card-bg)" }
						}, [
							createVNode("h2", {
								class: "text-xl font-semibold mb-4",
								style: { color: "var(--color-text)" }
							}, "Nuevo Cliente"),
							createVNode("p", {
								class: "text-sm mb-4",
								style: { color: "var(--color-text-muted)" }
							}, "Cree un cliente rápidamente para esta venta."),
							clientError.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "mb-4 rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700"
							}, toDisplayString(clientError.value), 1)) : createCommentVNode("", true),
							createVNode("form", {
								onSubmit: withModifiers(createClient, ["prevent"]),
								class: "space-y-4"
							}, [
								createVNode("div", null, [createVNode("label", {
									class: "block text-sm font-medium text-secondary",
									style: { color: "var(--color-text)" }
								}, "Nombre Completo"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => newClient.value.name = $event,
									type: "text",
									required: "",
									class: "mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)]",
									style: {
										backgroundColor: "var(--color-surface)",
										color: "var(--color-text)",
										borderColor: "var(--color-border-light)"
									}
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, newClient.value.name]])]),
								createVNode("div", null, [
									createVNode("label", {
										class: "block text-sm font-medium text-secondary",
										style: { color: "var(--color-text)" }
									}, "Cédula / NIT"),
									withDirectives(createVNode("input", {
										"onUpdate:modelValue": ($event) => newClient.value.cedula = $event,
										type: "text",
										required: "",
										class: "mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)]",
										style: {
											backgroundColor: "var(--color-surface)",
											color: "var(--color-text)",
											borderColor: "var(--color-border-light)"
										}
									}, null, 8, ["onUpdate:modelValue"]), [[vModelText, newClient.value.cedula]]),
									createVNode("p", {
										class: "text-xs mt-1",
										style: { color: "var(--color-text-muted)" }
									}, " Se usará como contraseña por defecto. ")
								]),
								createVNode("div", null, [createVNode("label", {
									class: "block text-sm font-medium text-secondary",
									style: { color: "var(--color-text)" }
								}, "Correo Electrónico"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => newClient.value.email = $event,
									type: "email",
									required: "",
									class: "mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)]",
									style: {
										backgroundColor: "var(--color-surface)",
										color: "var(--color-text)",
										borderColor: "var(--color-border-light)"
									}
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, newClient.value.email]])]),
								createVNode("div", {
									class: "flex justify-end gap-3 mt-6 pt-4 border-t",
									style: { borderColor: "var(--color-border-light)" }
								}, [createVNode("button", {
									type: "button",
									onClick: ($event) => showClientModal.value = false,
									class: "rounded border px-4 py-2 text-sm font-medium hover:bg-opacity-80 transition-colors",
									style: {
										backgroundColor: "var(--color-surface)",
										color: "var(--color-text)",
										borderColor: "var(--color-border-light)"
									}
								}, " Cancelar ", 8, ["onClick"]), createVNode("button", {
									type: "submit",
									disabled: creatingClient.value,
									class: "rounded px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 hover:bg-opacity-90 transition-colors",
									style: { backgroundColor: "var(--color-primary)" }
								}, toDisplayString(creatingClient.value ? "Guardando..." : "Guardar Cliente"), 9, ["disabled"])])
							], 32)
						])], 8, ["onClick"])) : createCommentVNode("", true)]))
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Ventas/Create.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
