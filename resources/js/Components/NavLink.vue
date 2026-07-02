<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    href: { type: String, required: true },
    active: { type: Boolean },
});

/*
    FIX: Las clases anteriores usaban dark:text-gray-100 / border-indigo-400 etc.
    hardcodeados, ignorando el sistema de temas. Ahora se aplican estilos inline
    con CSS variables para respetar los 3 temas (niños/jóvenes/adultos) y
    el modo día/noche.

    Las clases Tailwind solo controlan layout, spacing y transiciones,
    NUNCA colores (esos vienen de las variables).
*/
const classes = computed(() =>
    props.active
        ? 'inline-flex items-center whitespace-nowrap px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out'
        : 'inline-flex items-center whitespace-nowrap px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out',
);

const activeStyle = computed(() =>
    props.active
        ? { color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }
        : { color: 'var(--color-text-secondary)', borderColor: 'transparent' },
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
