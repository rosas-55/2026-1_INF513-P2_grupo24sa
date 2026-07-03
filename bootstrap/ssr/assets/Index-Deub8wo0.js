import { t as _sfc_main$1 } from "./AuthenticatedLayout-Bc0t65_s.js";
import { Head, useForm } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, vModelCheckbox, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Seguridad/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		roles: Array,
		modulos: Array,
		usuarios: Array
	},
	setup(__props) {
		const props = __props;
		const modulosForm = useForm({ modulos: [] });
		const usuariosForm = useForm({ roles: [] });
		const selectedRole = ref(null);
		const selectedUser = ref(null);
		function selectRole(role) {
			selectedRole.value = role;
			modulosForm.modulos = role.modulos.map((m) => m.id);
		}
		function selectUser(user) {
			selectedUser.value = user;
			usuariosForm.roles = user.roles.map((r) => r.id);
		}
		function saveRoleModulos() {
			modulosForm.patch(route("seguridad.role.modulos", selectedRole.value.id), {
				preserveScroll: true,
				onSuccess: () => {
					const role = props.roles.find((r) => r.id === selectedRole.value.id);
					if (role) role.modulos = props.modulos.filter((m) => modulosForm.modulos.includes(m.id));
				}
			});
		}
		function saveUserRoles() {
			usuariosForm.patch(route("seguridad.user.roles", selectedUser.value.id), {
				preserveScroll: true,
				onSuccess: () => {
					const user = props.usuarios.find((u) => u.id === selectedUser.value.id);
					if (user) user.roles = props.roles.filter((r) => usuariosForm.roles.includes(r.id));
				}
			});
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Seguridad y Accesos" }, null, _parent, _scopeId));
						_push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><h1 class="text-3xl font-bold mb-8 theme-section-title"${_scopeId}>Seguridad y Matriz de Accesos</h1><div class="grid grid-cols-1 lg:grid-cols-2 gap-8"${_scopeId}><div class="theme-card p-6 flex flex-col gap-6"${_scopeId}><div${_scopeId}><h2 class="text-xl font-semibold mb-2"${_scopeId}>Roles del Sistema</h2><p class="text-secondary text-sm"${_scopeId}>Selecciona un rol para ver y editar los módulos a los que tiene acceso.</p></div><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
						ssrRenderList(__props.roles, (role) => {
							_push(`<button class="${ssrRenderClass(["px-4 py-2 rounded-md font-medium transition-colors text-sm", selectedRole.value?.id === role.id ? "bg-[var(--color-primary)] text-white shadow-md" : "bg-gray-200 dark:bg-gray-700 text-secondary hover:bg-gray-300 dark:hover:bg-gray-600"])}"${_scopeId}>${ssrInterpolate(role.nombre)}</button>`);
						});
						_push(`<!--]--></div>`);
						if (selectedRole.value) {
							_push(`<div class="mt-4 p-4 border border-[var(--color-border-light)] rounded-lg bg-[var(--color-surface-alt)]"${_scopeId}><h3 class="font-medium text-lg mb-4"${_scopeId}>Módulos permitidos para: <span class="text-primary"${_scopeId}>${ssrInterpolate(selectedRole.value.nombre)}</span></h3><form class="space-y-4"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-2 gap-3"${_scopeId}><!--[-->`);
							ssrRenderList(__props.modulos, (modulo) => {
								_push(`<label class="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors" style="${ssrRenderStyle({ borderColor: "var(--color-border)" })}"${_scopeId}><input type="checkbox"${ssrRenderAttr("value", modulo.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(modulosForm).modulos) ? ssrLooseContain(unref(modulosForm).modulos, modulo.id) : unref(modulosForm).modulos) ? " checked" : ""} class="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"${_scopeId}><span class="text-sm font-medium"${_scopeId}>${ssrInterpolate(modulo.name)}</span></label>`);
							});
							_push(`<!--]--></div><div class="pt-4 flex justify-end"${_scopeId}><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(unref(modulosForm).processing) ? " disabled" : ""}${_scopeId}> Guardar Accesos del Rol </button></div></form></div>`);
						} else _push(`<!---->`);
						_push(`</div><div class="theme-card p-6 flex flex-col gap-6"${_scopeId}><div${_scopeId}><h2 class="text-xl font-semibold mb-2"${_scopeId}>Usuarios y Roles</h2><p class="text-secondary text-sm"${_scopeId}>Selecciona un usuario para asignarle uno o más roles en el sistema.</p></div><div class="max-h-48 overflow-y-auto border rounded-md" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><table class="w-full text-sm text-left"${_scopeId}><thead class="bg-[var(--color-surface-alt)] sticky top-0"${_scopeId}><tr${_scopeId}><th class="px-4 py-2 font-medium"${_scopeId}>Nombre</th><th class="px-4 py-2 font-medium"${_scopeId}>Email</th><th class="px-4 py-2 font-medium"${_scopeId}>Roles Actuales</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.usuarios, (user) => {
							_push(`<tr class="${ssrRenderClass(["cursor-pointer transition-colors border-b last:border-b-0", selectedUser.value?.id === user.id ? "bg-[var(--color-primary-light)]" : "hover:bg-[var(--color-surface-hover)]"])}" style="${ssrRenderStyle({ borderColor: "var(--color-border-light)" })}"${_scopeId}><td class="px-4 py-3 font-medium"${_scopeId}>${ssrInterpolate(user.name)}</td><td class="px-4 py-3 text-secondary"${_scopeId}>${ssrInterpolate(user.email)}</td><td class="px-4 py-3"${_scopeId}><div class="flex flex-wrap gap-1"${_scopeId}><!--[-->`);
							ssrRenderList(user.roles, (r) => {
								_push(`<span class="badge-primary text-xs"${_scopeId}>${ssrInterpolate(r.nombre)}</span>`);
							});
							_push(`<!--]-->`);
							if (!user.roles.length) _push(`<span class="text-xs text-muted italic"${_scopeId}>Sin roles</span>`);
							else _push(`<!---->`);
							_push(`</div></td></tr>`);
						});
						_push(`<!--]--></tbody></table></div>`);
						if (selectedUser.value) {
							_push(`<div class="mt-4 p-4 border border-[var(--color-border-light)] rounded-lg bg-[var(--color-surface-alt)]"${_scopeId}><h3 class="font-medium text-lg mb-4"${_scopeId}>Asignar Roles a: <span class="text-primary"${_scopeId}>${ssrInterpolate(selectedUser.value.name)}</span></h3><form class="space-y-4"${_scopeId}><div class="flex flex-wrap gap-3"${_scopeId}><!--[-->`);
							ssrRenderList(__props.roles, (role) => {
								_push(`<label class="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors bg-[var(--color-surface)]" style="${ssrRenderStyle({ borderColor: "var(--color-border)" })}"${_scopeId}><input type="checkbox"${ssrRenderAttr("value", role.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(usuariosForm).roles) ? ssrLooseContain(unref(usuariosForm).roles, role.id) : unref(usuariosForm).roles) ? " checked" : ""} class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"${_scopeId}><span class="text-sm font-medium"${_scopeId}>${ssrInterpolate(role.nombre)}</span></label>`);
							});
							_push(`<!--]--></div><div class="pt-4 flex justify-end"${_scopeId}><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(unref(usuariosForm).processing) ? " disabled" : ""}${_scopeId}> Guardar Roles del Usuario </button></div></form></div>`);
						} else _push(`<!---->`);
						_push(`</div></div></div>`);
					} else return [createVNode(unref(Head), { title: "Seguridad y Accesos" }), createVNode("div", { class: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" }, [createVNode("h1", { class: "text-3xl font-bold mb-8 theme-section-title" }, "Seguridad y Matriz de Accesos"), createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-8" }, [createVNode("div", { class: "theme-card p-6 flex flex-col gap-6" }, [
						createVNode("div", null, [createVNode("h2", { class: "text-xl font-semibold mb-2" }, "Roles del Sistema"), createVNode("p", { class: "text-secondary text-sm" }, "Selecciona un rol para ver y editar los módulos a los que tiene acceso.")]),
						createVNode("div", { class: "flex flex-wrap gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.roles, (role) => {
							return openBlock(), createBlock("button", {
								key: role.id,
								onClick: ($event) => selectRole(role),
								class: ["px-4 py-2 rounded-md font-medium transition-colors text-sm", selectedRole.value?.id === role.id ? "bg-[var(--color-primary)] text-white shadow-md" : "bg-gray-200 dark:bg-gray-700 text-secondary hover:bg-gray-300 dark:hover:bg-gray-600"]
							}, toDisplayString(role.nombre), 11, ["onClick"]);
						}), 128))]),
						selectedRole.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-4 p-4 border border-[var(--color-border-light)] rounded-lg bg-[var(--color-surface-alt)]"
						}, [createVNode("h3", { class: "font-medium text-lg mb-4" }, [createTextVNode("Módulos permitidos para: "), createVNode("span", { class: "text-primary" }, toDisplayString(selectedRole.value.nombre), 1)]), createVNode("form", {
							onSubmit: withModifiers(saveRoleModulos, ["prevent"]),
							class: "space-y-4"
						}, [createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.modulos, (modulo) => {
							return openBlock(), createBlock("label", {
								key: modulo.id,
								class: "flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors",
								style: { borderColor: "var(--color-border)" }
							}, [withDirectives(createVNode("input", {
								type: "checkbox",
								value: modulo.id,
								"onUpdate:modelValue": ($event) => unref(modulosForm).modulos = $event,
								class: "w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							}, null, 8, ["value", "onUpdate:modelValue"]), [[vModelCheckbox, unref(modulosForm).modulos]]), createVNode("span", { class: "text-sm font-medium" }, toDisplayString(modulo.name), 1)]);
						}), 128))]), createVNode("div", { class: "pt-4 flex justify-end" }, [createVNode("button", {
							type: "submit",
							class: "btn-primary",
							disabled: unref(modulosForm).processing
						}, " Guardar Accesos del Rol ", 8, ["disabled"])])], 32)])) : createCommentVNode("", true)
					]), createVNode("div", { class: "theme-card p-6 flex flex-col gap-6" }, [
						createVNode("div", null, [createVNode("h2", { class: "text-xl font-semibold mb-2" }, "Usuarios y Roles"), createVNode("p", { class: "text-secondary text-sm" }, "Selecciona un usuario para asignarle uno o más roles en el sistema.")]),
						createVNode("div", {
							class: "max-h-48 overflow-y-auto border rounded-md",
							style: { borderColor: "var(--color-border-light)" }
						}, [createVNode("table", { class: "w-full text-sm text-left" }, [createVNode("thead", { class: "bg-[var(--color-surface-alt)] sticky top-0" }, [createVNode("tr", null, [
							createVNode("th", { class: "px-4 py-2 font-medium" }, "Nombre"),
							createVNode("th", { class: "px-4 py-2 font-medium" }, "Email"),
							createVNode("th", { class: "px-4 py-2 font-medium" }, "Roles Actuales")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.usuarios, (user) => {
							return openBlock(), createBlock("tr", {
								key: user.id,
								onClick: ($event) => selectUser(user),
								class: ["cursor-pointer transition-colors border-b last:border-b-0", selectedUser.value?.id === user.id ? "bg-[var(--color-primary-light)]" : "hover:bg-[var(--color-surface-hover)]"],
								style: { borderColor: "var(--color-border-light)" }
							}, [
								createVNode("td", { class: "px-4 py-3 font-medium" }, toDisplayString(user.name), 1),
								createVNode("td", { class: "px-4 py-3 text-secondary" }, toDisplayString(user.email), 1),
								createVNode("td", { class: "px-4 py-3" }, [createVNode("div", { class: "flex flex-wrap gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(user.roles, (r) => {
									return openBlock(), createBlock("span", {
										key: r.id,
										class: "badge-primary text-xs"
									}, toDisplayString(r.nombre), 1);
								}), 128)), !user.roles.length ? (openBlock(), createBlock("span", {
									key: 0,
									class: "text-xs text-muted italic"
								}, "Sin roles")) : createCommentVNode("", true)])])
							], 10, ["onClick"]);
						}), 128))])])]),
						selectedUser.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mt-4 p-4 border border-[var(--color-border-light)] rounded-lg bg-[var(--color-surface-alt)]"
						}, [createVNode("h3", { class: "font-medium text-lg mb-4" }, [createTextVNode("Asignar Roles a: "), createVNode("span", { class: "text-primary" }, toDisplayString(selectedUser.value.name), 1)]), createVNode("form", {
							onSubmit: withModifiers(saveUserRoles, ["prevent"]),
							class: "space-y-4"
						}, [createVNode("div", { class: "flex flex-wrap gap-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.roles, (role) => {
							return openBlock(), createBlock("label", {
								key: role.id,
								class: "flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors bg-[var(--color-surface)]",
								style: { borderColor: "var(--color-border)" }
							}, [withDirectives(createVNode("input", {
								type: "checkbox",
								value: role.id,
								"onUpdate:modelValue": ($event) => unref(usuariosForm).roles = $event,
								class: "w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							}, null, 8, ["value", "onUpdate:modelValue"]), [[vModelCheckbox, unref(usuariosForm).roles]]), createVNode("span", { class: "text-sm font-medium" }, toDisplayString(role.nombre), 1)]);
						}), 128))]), createVNode("div", { class: "pt-4 flex justify-end" }, [createVNode("button", {
							type: "submit",
							class: "btn-primary",
							disabled: unref(usuariosForm).processing
						}, " Guardar Roles del Usuario ", 8, ["disabled"])])], 32)])) : createCommentVNode("", true)
					])])])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Seguridad/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
