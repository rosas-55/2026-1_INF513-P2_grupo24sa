<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    href: { type: String, required: true },
    active: { type: Boolean },
});

/*
    FIX: Las clases anteriores usaban dark:text-indigo-300 / dark:bg-indigo-900/50
    hardcodeados, ignorando el sistema de temas.
    Ahora layout/spacing = Tailwind, colores = CSS variables.
*/
const classes = computed(() =>
    props.active
        ? 'block w-full ps-3 pe-4 py-2 border-l-4 text-start text-base font-medium focus:outline-none transition duration-150 ease-in-out'
        : 'block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium focus:outline-none transition duration-150 ease-in-out',
);

const activeStyle = computed(() =>
    props.active
        ? {
            color: 'var(--color-primary)',
            backgroundColor: 'var(--color-primary-light)',
            borderColor: 'var(--color-primary)',
          }
        : {
            color: 'var(--color-text-secondary)',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          },
);
</script>

<template>
    <Link
        :href="href"
        :class="classes"
        :style="activeStyle"
        @mouseenter="!active && ($event.currentTarget.style.color = 'var(--color-primary)')"
        @mouseleave="!active && ($event.currentTarget.style.color = 'var(--color-text-secondary)')"
    >
        <slot />
    </Link>
</template>
