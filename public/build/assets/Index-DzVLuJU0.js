import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import axios from "axios";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, Teleport, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx, withModifiers } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderTeleport } from "vue/server-renderer";
//#region resources/js/Pages/Cuotas/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		cuotas: Object,
		ventas: Array,
		filters: Object,
		esCliente: Boolean
	},
	setup(__props) {
		const props = __props;
		const showQrModal = ref(false);
		const qrData = ref(null);
		const qrStatus = ref("idle");
		const qrCuotaId = ref(null);
		let pollTimer = null;
		async function pagarConQr(cuota) {
			qrData.value = null;
			qrStatus.value = "idle";
			qrCuotaId.value = cuota.id;
			showQrModal.value = true;
			try {
				const { data } = await axios.post(route("cuotas.generar-qr", cuota.id));
				qrData.value = data;
				qrStatus.value = "pending";
				startPolling();
			} catch (e) {
				qrStatus.value = "error";
			}
		}
		function startPolling() {
			stopPolling();
			pollTimer = setInterval(pollOnce, 5e3);
		}
		async function pollOnce() {
			if (!qrData.value?.transactionId) return;
			try {
				const { data } = await axios.get(route("pagos.status", qrData.value.transactionId));
				if (data.paid) {
					qrStatus.value = "paid";
					stopPolling();
					try {
						await axios.patch(route("cuotas.confirmar-pago", qrCuotaId.value));
						setTimeout(() => window.location.reload(), 1500);
					} catch (e) {
						console.warn("confirmarPago cuota fallo:", e.response?.data?.error ?? e.message);
					}
				}
			} catch {
				qrStatus.value = "error";
				stopPolling();
			}
		}
		function stopPolling() {
			if (pollTimer) {
				clearInterval(pollTimer);
				pollTimer = null;
			}
		}
		function cerrarQr() {
			showQrModal.value = false;
			stopPolling();
		}
		function estadoClase(estado) {
			return {
				PAGADO: "bg-green-100 text-green-800",
				PENDIENTE: "bg-yellow-100 text-yellow-800",
				VENCIDO: "bg-red-100 text-red-800"
			}[estado] ?? "bg-gray-100 text-gray-700";
		}
		function filtrar(extra = {}) {
			const params = {
				estado: props.filters?.estado || "",
				venta_id: props.filters?.venta_id || "",
				...extra
			};
			window.location.href = route("cuotas.index") + "?" + new URLSearchParams(params).toString();
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Cuotas y Pagos" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>${ssrInterpolate(__props.esCliente ? "Mis Cuotas" : "Cuotas y Pagos")}</h1><p class="text-sm mt-1" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>${ssrInterpolate(__props.esCliente ? "Aqui puedes pagar tus cuotas con QR." : "Gestion de cuotas de ventas a credito.")}</p></div></div>`);
						if (!__props.esCliente) {
							_push(`<div class="flex flex-wrap gap-3 mb-6"${_scopeId}><select${ssrRenderAttr("value", __props.filters?.estado)} class="rounded-lg border px-3 py-2 text-sm" style="${ssrRenderStyle({
								backgroundColor: "var(--color-surface)",
								color: "var(--color-text)",
								borderColor: "var(--color-border-light)"
							})}"${_scopeId}><option value=""${_scopeId}>Todos los estados</option><option value="PENDIENTE"${_scopeId}>Pendiente</option><option value="PAGADO"${_scopeId}>Pagado</option><option value="VENCIDO"${_scopeId}>Vencido</option></select><select${ssrRenderAttr("value", __props.filters?.venta_id)} class="rounded-lg border px-3 py-2 text-sm" style="${ssrRenderStyle({
								backgroundColor: "var(--color-surface)",
								color: "var(--color-text)",
								borderColor: "var(--color-border-light)"
							})}"${_scopeId}><option value=""${_scopeId}>Todas las ventas</option><!--[-->`);
							ssrRenderList(__props.ventas, (v) => {
								_push(`<option${ssrRenderAttr("value", v.id)}${_scopeId}>Venta #${ssrInterpolate(v.id)} - ${ssrInterpolate(v.cliente?.name)}</option>`);
							});
							_push(`<!--]--></select></div>`);
						} else _push(`<!---->`);
						_push(`<div class="rounded-xl border overflow-x-auto" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><table class="min-w-full text-sm"${_scopeId}><thead style="${ssrRenderStyle({ backgroundColor: "var(--color-surface-alt)" })}"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left font-semibold" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Venta</th>`);
						if (!__props.esCliente) _push(`<th class="px-4 py-3 text-left font-semibold" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Cliente</th>`);
						else _push(`<!---->`);
						_push(`<th class="px-4 py-3 text-left font-semibold" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>N Cuota</th><th class="px-4 py-3 text-left font-semibold" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Monto</th><th class="px-4 py-3 text-left font-semibold" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Vencimiento</th><th class="px-4 py-3 text-left font-semibold" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Estado</th><th class="px-4 py-3 text-right font-semibold" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Accion</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.cuotas.data, (c) => {
							_push(`<tr class="border-t transition-colors hover:bg-black/5" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><td class="px-4 py-3 font-medium" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>#${ssrInterpolate(c.venta_id)}</td>`);
							if (!__props.esCliente) _push(`<td class="px-4 py-3" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>${ssrInterpolate(c.venta?.cliente?.name)}</td>`);
							else _push(`<!---->`);
							_push(`<td class="px-4 py-3" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>${ssrInterpolate(c.nro_cuota)}</td><td class="px-4 py-3 font-semibold" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>Bs. ${ssrInterpolate(Number(c.monto_fijo).toFixed(2))}</td><td class="px-4 py-3" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>${ssrInterpolate(c.fecha_vencimiento)}</td><td class="px-4 py-3"${_scopeId}><span class="${ssrRenderClass([estadoClase(c.estado), "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"])}"${_scopeId}>${ssrInterpolate(c.estado)}</span></td><td class="px-4 py-3 text-right"${_scopeId}>`);
							if (c.estado === "PENDIENTE") _push(`<button class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all hover:shadow-md" style="${ssrRenderStyle({ backgroundColor: "var(--color-primary)" })}"${_scopeId}><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"${_scopeId}></path></svg> Pagar con QR </button>`);
							else if (c.estado === "PAGADO") _push(`<span class="text-xs text-green-600 font-semibold"${_scopeId}>Pagada</span>`);
							else _push(`<!---->`);
							_push(`</td></tr>`);
						});
						_push(`<!--]-->`);
						if (!__props.cuotas.data.length) _push(`<tr${_scopeId}><td${ssrRenderAttr("colspan", __props.esCliente ? 6 : 7)} class="px-4 py-10 text-center text-sm" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>${ssrInterpolate(__props.esCliente ? "No tienes cuotas pendientes." : "Sin cuotas registradas.")}</td></tr>`);
						else _push(`<!---->`);
						_push(`</tbody></table></div>`);
						if (__props.cuotas.links?.length > 3) {
							_push(`<div class="mt-4 flex justify-center gap-1"${_scopeId}><!--[-->`);
							ssrRenderList(__props.cuotas.links, (link) => {
								_push(ssrRenderComponent(unref(Link), {
									key: link.label,
									href: link.url || "#",
									class: ["px-3 py-1 rounded-lg border text-sm transition-colors", { "opacity-40 pointer-events-none": !link.url }],
									style: link.active ? {
										backgroundColor: "var(--color-primary)",
										borderColor: "var(--color-primary)",
										color: "#fff"
									} : {
										borderColor: "var(--color-border-light)",
										color: "var(--color-text)"
									}
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
						ssrRenderTeleport(_push, (_push) => {
							if (showQrModal.value) {
								_push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4" style="${ssrRenderStyle({ "background-color": "rgba(0,0,0,0.6)" })}"${_scopeId}><div class="relative w-full max-w-md rounded-2xl shadow-2xl p-8 flex flex-col items-center" style="${ssrRenderStyle({ backgroundColor: "var(--color-card-bg)" })}"${_scopeId}><button class="absolute top-4 right-4 rounded-full p-1.5 transition-colors hover:bg-black/10" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button>`);
								if (qrStatus.value === "idle") _push(`<div class="flex flex-col items-center gap-4 py-12"${_scopeId}><svg class="animate-spin w-10 h-10" viewBox="0 0 24 24" fill="none" style="${ssrRenderStyle({ color: "var(--color-primary)" })}"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"${_scopeId}></path></svg><p class="text-sm font-medium" style="${ssrRenderStyle({ color: "var(--color-text-muted)" })}"${_scopeId}>Generando QR...</p></div>`);
								else if (qrStatus.value === "error") _push(`<div class="flex flex-col items-center gap-3 py-10"${_scopeId}><div class="bg-red-100 rounded-full p-4"${_scopeId}><svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></div><p class="text-sm font-medium text-red-600"${_scopeId}>No se pudo generar el QR. Intenta de nuevo.</p><button class="mt-2 rounded-lg px-4 py-2 text-sm border" style="${ssrRenderStyle({
									color: "var(--color-text)",
									borderColor: "var(--color-border-light)"
								})}"${_scopeId}> Cerrar </button></div>`);
								else if (qrData.value) {
									_push(`<!--[--><div class="text-center mb-5 w-full"${_scopeId}><h2 class="text-xl font-bold" style="${ssrRenderStyle({ color: "var(--color-text)" })}"${_scopeId}>${ssrInterpolate(qrData.value.label)}</h2><div class="text-4xl font-black mt-1 tracking-tight" style="${ssrRenderStyle({ color: "var(--color-primary)" })}"${_scopeId}> Bs. ${ssrInterpolate(Number(qrData.value.amount).toFixed(2))}</div></div><div class="relative w-72 h-72 rounded-2xl p-2 bg-white shadow ring-1 ring-black/5 mb-5"${_scopeId}>`);
									if (qrData.value.qrBase64 && qrStatus.value !== "paid") _push(`<img${ssrRenderAttr("src", `data:image/png;base64,${qrData.value.qrBase64}`)} alt="Codigo QR de pago" class="w-full h-full object-contain"${_scopeId}>`);
									else _push(`<!---->`);
									if (qrStatus.value === "paid") _push(`<div class="absolute inset-0 flex flex-col items-center justify-center rounded-2xl"${_scopeId}><div class="bg-green-500 rounded-full p-5 mb-3 shadow-2xl shadow-green-500/30"${_scopeId}><svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div><span class="font-extrabold text-green-600 text-2xl uppercase tracking-wide"${_scopeId}>Pagado!</span></div>`);
									else _push(`<!---->`);
									_push(`</div><div class="text-center mb-6 w-full"${_scopeId}>`);
									if (qrStatus.value === "pending") _push(`<span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border" style="${ssrRenderStyle({
										backgroundColor: "var(--color-surface-alt)",
										color: "var(--color-text)",
										borderColor: "var(--color-border-light)"
									})}"${_scopeId}><svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" style="${ssrRenderStyle({ color: "var(--color-primary)" })}"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"${_scopeId}></path></svg> Esperando el pago... </span>`);
									else _push(`<!---->`);
									_push(`</div><div class="flex gap-3 w-full"${_scopeId}>`);
									if (qrStatus.value === "pending") _push(`<button class="flex-1 rounded-lg border py-2 text-sm font-medium" style="${ssrRenderStyle({
										backgroundColor: "var(--color-surface)",
										color: "var(--color-text)",
										borderColor: "var(--color-border-light)"
									})}"${_scopeId}> Refrescar </button>`);
									else _push(`<!---->`);
									_push(`<button class="${ssrRenderClass([qrStatus.value === "paid" ? "bg-green-600" : "bg-indigo-600", "flex-1 rounded-lg py-2 text-sm font-bold text-white"])}"${_scopeId}>${ssrInterpolate(qrStatus.value === "paid" ? "Listo" : "Cerrar")}</button></div><!--]-->`);
								} else _push(`<!---->`);
								_push(`</div></div>`);
							} else _push(`<!---->`);
						}, "body", false, _parent);
					} else return [
						createVNode(unref(Head), { title: "Cuotas y Pagos" }),
						createVNode("div", { class: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" }, [
							createVNode("div", { class: "flex items-center justify-between mb-6" }, [createVNode("div", null, [createVNode("h1", {
								class: "text-2xl font-bold",
								style: { color: "var(--color-text)" }
							}, toDisplayString(__props.esCliente ? "Mis Cuotas" : "Cuotas y Pagos"), 1), createVNode("p", {
								class: "text-sm mt-1",
								style: { color: "var(--color-text-muted)" }
							}, toDisplayString(__props.esCliente ? "Aqui puedes pagar tus cuotas con QR." : "Gestion de cuotas de ventas a credito."), 1)])]),
							!__props.esCliente ? (openBlock(), createBlock("div", {
								key: 0,
								class: "flex flex-wrap gap-3 mb-6"
							}, [createVNode("select", {
								value: __props.filters?.estado,
								onChange: ($event) => filtrar({ estado: $event.target.value }),
								class: "rounded-lg border px-3 py-2 text-sm",
								style: {
									backgroundColor: "var(--color-surface)",
									color: "var(--color-text)",
									borderColor: "var(--color-border-light)"
								}
							}, [
								createVNode("option", { value: "" }, "Todos los estados"),
								createVNode("option", { value: "PENDIENTE" }, "Pendiente"),
								createVNode("option", { value: "PAGADO" }, "Pagado"),
								createVNode("option", { value: "VENCIDO" }, "Vencido")
							], 40, ["value", "onChange"]), createVNode("select", {
								value: __props.filters?.venta_id,
								onChange: ($event) => filtrar({ venta_id: $event.target.value }),
								class: "rounded-lg border px-3 py-2 text-sm",
								style: {
									backgroundColor: "var(--color-surface)",
									color: "var(--color-text)",
									borderColor: "var(--color-border-light)"
								}
							}, [createVNode("option", { value: "" }, "Todas las ventas"), (openBlock(true), createBlock(Fragment, null, renderList(__props.ventas, (v) => {
								return openBlock(), createBlock("option", {
									key: v.id,
									value: v.id
								}, "Venta #" + toDisplayString(v.id) + " - " + toDisplayString(v.cliente?.name), 9, ["value"]);
							}), 128))], 40, ["value", "onChange"])])) : createCommentVNode("", true),
							createVNode("div", {
								class: "rounded-xl border overflow-x-auto",
								style: { borderColor: "var(--color-border-light)" }
							}, [createVNode("table", { class: "min-w-full text-sm" }, [createVNode("thead", { style: { backgroundColor: "var(--color-surface-alt)" } }, [createVNode("tr", null, [
								createVNode("th", {
									class: "px-4 py-3 text-left font-semibold",
									style: { color: "var(--color-text-muted)" }
								}, "Venta"),
								!__props.esCliente ? (openBlock(), createBlock("th", {
									key: 0,
									class: "px-4 py-3 text-left font-semibold",
									style: { color: "var(--color-text-muted)" }
								}, "Cliente")) : createCommentVNode("", true),
								createVNode("th", {
									class: "px-4 py-3 text-left font-semibold",
									style: { color: "var(--color-text-muted)" }
								}, "N Cuota"),
								createVNode("th", {
									class: "px-4 py-3 text-left font-semibold",
									style: { color: "var(--color-text-muted)" }
								}, "Monto"),
								createVNode("th", {
									class: "px-4 py-3 text-left font-semibold",
									style: { color: "var(--color-text-muted)" }
								}, "Vencimiento"),
								createVNode("th", {
									class: "px-4 py-3 text-left font-semibold",
									style: { color: "var(--color-text-muted)" }
								}, "Estado"),
								createVNode("th", {
									class: "px-4 py-3 text-right font-semibold",
									style: { color: "var(--color-text-muted)" }
								}, "Accion")
							])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.cuotas.data, (c) => {
								return openBlock(), createBlock("tr", {
									key: c.id,
									class: "border-t transition-colors hover:bg-black/5",
									style: { borderColor: "var(--color-border-light)" }
								}, [
									createVNode("td", {
										class: "px-4 py-3 font-medium",
										style: { color: "var(--color-text)" }
									}, "#" + toDisplayString(c.venta_id), 1),
									!__props.esCliente ? (openBlock(), createBlock("td", {
										key: 0,
										class: "px-4 py-3",
										style: { color: "var(--color-text)" }
									}, toDisplayString(c.venta?.cliente?.name), 1)) : createCommentVNode("", true),
									createVNode("td", {
										class: "px-4 py-3",
										style: { color: "var(--color-text)" }
									}, toDisplayString(c.nro_cuota), 1),
									createVNode("td", {
										class: "px-4 py-3 font-semibold",
										style: { color: "var(--color-text)" }
									}, "Bs. " + toDisplayString(Number(c.monto_fijo).toFixed(2)), 1),
									createVNode("td", {
										class: "px-4 py-3",
										style: { color: "var(--color-text-muted)" }
									}, toDisplayString(c.fecha_vencimiento), 1),
									createVNode("td", { class: "px-4 py-3" }, [createVNode("span", { class: ["inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold", estadoClase(c.estado)] }, toDisplayString(c.estado), 3)]),
									createVNode("td", { class: "px-4 py-3 text-right" }, [c.estado === "PENDIENTE" ? (openBlock(), createBlock("button", {
										key: 0,
										onClick: ($event) => pagarConQr(c),
										class: "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all hover:shadow-md",
										style: { backgroundColor: "var(--color-primary)" }
									}, [(openBlock(), createBlock("svg", {
										class: "w-3.5 h-3.5",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
									})])), createTextVNode(" Pagar con QR ")], 8, ["onClick"])) : c.estado === "PAGADO" ? (openBlock(), createBlock("span", {
										key: 1,
										class: "text-xs text-green-600 font-semibold"
									}, "Pagada")) : createCommentVNode("", true)])
								]);
							}), 128)), !__props.cuotas.data.length ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
								colspan: __props.esCliente ? 6 : 7,
								class: "px-4 py-10 text-center text-sm",
								style: { color: "var(--color-text-muted)" }
							}, toDisplayString(__props.esCliente ? "No tienes cuotas pendientes." : "Sin cuotas registradas."), 9, ["colspan"])])) : createCommentVNode("", true)])])]),
							__props.cuotas.links?.length > 3 ? (openBlock(), createBlock("div", {
								key: 1,
								class: "mt-4 flex justify-center gap-1"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.cuotas.links, (link) => {
								return openBlock(), createBlock(unref(Link), {
									key: link.label,
									href: link.url || "#",
									innerHTML: link.label,
									class: ["px-3 py-1 rounded-lg border text-sm transition-colors", { "opacity-40 pointer-events-none": !link.url }],
									style: link.active ? {
										backgroundColor: "var(--color-primary)",
										borderColor: "var(--color-primary)",
										color: "#fff"
									} : {
										borderColor: "var(--color-border-light)",
										color: "var(--color-text)"
									}
								}, null, 8, [
									"href",
									"innerHTML",
									"class",
									"style"
								]);
							}), 128))])) : createCommentVNode("", true)
						]),
						(openBlock(), createBlock(Teleport, { to: "body" }, [showQrModal.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "fixed inset-0 z-50 flex items-center justify-center p-4",
							style: { "background-color": "rgba(0,0,0,0.6)" },
							onClick: withModifiers(cerrarQr, ["self"])
						}, [createVNode("div", {
							class: "relative w-full max-w-md rounded-2xl shadow-2xl p-8 flex flex-col items-center",
							style: { backgroundColor: "var(--color-card-bg)" }
						}, [createVNode("button", {
							onClick: cerrarQr,
							class: "absolute top-4 right-4 rounded-full p-1.5 transition-colors hover:bg-black/10",
							style: { color: "var(--color-text-muted)" }
						}, [(openBlock(), createBlock("svg", {
							class: "w-5 h-5",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M6 18L18 6M6 6l12 12"
						})]))]), qrStatus.value === "idle" ? (openBlock(), createBlock("div", {
							key: 0,
							class: "flex flex-col items-center gap-4 py-12"
						}, [(openBlock(), createBlock("svg", {
							class: "animate-spin w-10 h-10",
							viewBox: "0 0 24 24",
							fill: "none",
							style: { color: "var(--color-primary)" }
						}, [createVNode("circle", {
							class: "opacity-25",
							cx: "12",
							cy: "12",
							r: "10",
							stroke: "currentColor",
							"stroke-width": "4"
						}), createVNode("path", {
							class: "opacity-75",
							fill: "currentColor",
							d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
						})])), createVNode("p", {
							class: "text-sm font-medium",
							style: { color: "var(--color-text-muted)" }
						}, "Generando QR...")])) : qrStatus.value === "error" ? (openBlock(), createBlock("div", {
							key: 1,
							class: "flex flex-col items-center gap-3 py-10"
						}, [
							createVNode("div", { class: "bg-red-100 rounded-full p-4" }, [(openBlock(), createBlock("svg", {
								class: "w-10 h-10 text-red-500",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M6 18L18 6M6 6l12 12"
							})]))]),
							createVNode("p", { class: "text-sm font-medium text-red-600" }, "No se pudo generar el QR. Intenta de nuevo."),
							createVNode("button", {
								onClick: cerrarQr,
								class: "mt-2 rounded-lg px-4 py-2 text-sm border",
								style: {
									color: "var(--color-text)",
									borderColor: "var(--color-border-light)"
								}
							}, " Cerrar ")
						])) : qrData.value ? (openBlock(), createBlock(Fragment, { key: 2 }, [
							createVNode("div", { class: "text-center mb-5 w-full" }, [createVNode("h2", {
								class: "text-xl font-bold",
								style: { color: "var(--color-text)" }
							}, toDisplayString(qrData.value.label), 1), createVNode("div", {
								class: "text-4xl font-black mt-1 tracking-tight",
								style: { color: "var(--color-primary)" }
							}, " Bs. " + toDisplayString(Number(qrData.value.amount).toFixed(2)), 1)]),
							createVNode("div", { class: "relative w-72 h-72 rounded-2xl p-2 bg-white shadow ring-1 ring-black/5 mb-5" }, [qrData.value.qrBase64 && qrStatus.value !== "paid" ? (openBlock(), createBlock("img", {
								key: 0,
								src: `data:image/png;base64,${qrData.value.qrBase64}`,
								alt: "Codigo QR de pago",
								class: "w-full h-full object-contain"
							}, null, 8, ["src"])) : createCommentVNode("", true), qrStatus.value === "paid" ? (openBlock(), createBlock("div", {
								key: 1,
								class: "absolute inset-0 flex flex-col items-center justify-center rounded-2xl"
							}, [createVNode("div", { class: "bg-green-500 rounded-full p-5 mb-3 shadow-2xl shadow-green-500/30" }, [(openBlock(), createBlock("svg", {
								class: "w-14 h-14 text-white",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "3",
								d: "M5 13l4 4L19 7"
							})]))]), createVNode("span", { class: "font-extrabold text-green-600 text-2xl uppercase tracking-wide" }, "Pagado!")])) : createCommentVNode("", true)]),
							createVNode("div", { class: "text-center mb-6 w-full" }, [qrStatus.value === "pending" ? (openBlock(), createBlock("span", {
								key: 0,
								class: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border",
								style: {
									backgroundColor: "var(--color-surface-alt)",
									color: "var(--color-text)",
									borderColor: "var(--color-border-light)"
								}
							}, [(openBlock(), createBlock("svg", {
								class: "animate-spin h-4 w-4",
								viewBox: "0 0 24 24",
								fill: "none",
								style: { color: "var(--color-primary)" }
							}, [createVNode("circle", {
								class: "opacity-25",
								cx: "12",
								cy: "12",
								r: "10",
								stroke: "currentColor",
								"stroke-width": "4"
							}), createVNode("path", {
								class: "opacity-75",
								fill: "currentColor",
								d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
							})])), createTextVNode(" Esperando el pago... ")])) : createCommentVNode("", true)]),
							createVNode("div", { class: "flex gap-3 w-full" }, [qrStatus.value === "pending" ? (openBlock(), createBlock("button", {
								key: 0,
								onClick: pollOnce,
								class: "flex-1 rounded-lg border py-2 text-sm font-medium",
								style: {
									backgroundColor: "var(--color-surface)",
									color: "var(--color-text)",
									borderColor: "var(--color-border-light)"
								}
							}, " Refrescar ")) : createCommentVNode("", true), createVNode("button", {
								onClick: cerrarQr,
								class: ["flex-1 rounded-lg py-2 text-sm font-bold text-white", qrStatus.value === "paid" ? "bg-green-600" : "bg-indigo-600"]
							}, toDisplayString(qrStatus.value === "paid" ? "Listo" : "Cerrar"), 3)])
						], 64)) : createCommentVNode("", true)])])) : createCommentVNode("", true)]))
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Cuotas/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
