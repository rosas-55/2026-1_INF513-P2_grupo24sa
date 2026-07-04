import { mergeModels, mergeProps, onMounted, ref, useModel, useSSRContext } from "vue";
import { ssrGetDynamicModelProps, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
//#region resources/js/Components/InputError.vue
var _sfc_main$2 = {
	__name: "InputError",
	__ssrInlineRender: true,
	props: { message: { type: String } },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps(_attrs, { style: __props.message ? null : { display: "none" } }))}><p class="text-sm text-red-600 dark:text-red-400">${ssrInterpolate(__props.message)}</p></div>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputError.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/InputLabel.vue
var _sfc_main$1 = {
	__name: "InputLabel",
	__ssrInlineRender: true,
	props: { value: { type: String } },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<label${ssrRenderAttrs(mergeProps({
				class: "block text-sm font-medium",
				style: { color: "var(--color-text)" }
			}, _attrs))}>`);
			if (__props.value) _push(`<span>${ssrInterpolate(__props.value)}</span>`);
			else {
				_push(`<span>`);
				ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
				_push(`</span>`);
			}
			_push(`</label>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputLabel.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/TextInput.vue
var _sfc_main = {
	__name: "TextInput",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({ type: {
		type: String,
		default: "text"
	} }, {
		"modelValue": {
			type: [String, Number],
			required: true
		},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props, { expose: __expose }) {
		const model = useModel(__props, "modelValue");
		const input = ref(null);
		onMounted(() => {
			if (input.value.hasAttribute("autofocus")) input.value.focus();
		});
		__expose({ focus: () => input.value.focus() });
		return (_ctx, _push, _parent, _attrs) => {
			let _temp0;
			_push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
				type: __props.type,
				class: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600",
				ref_key: "input",
				ref: input
			}, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, model.value))))}>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TextInput.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main$1 as n, _sfc_main$2 as r, _sfc_main as t };
