<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    href: { type: String, required: true },
});
</script>

<template>
    <!--
        FIX: Reemplazadas clases Tailwind hardcoded (text-gray-700 / dark:bg-gray-800)
        por variables CSS del sistema de temas, de modo que el menú desplegable
        respete el tema activo (niños / jóvenes / adultos) y el modo día/noche.
    -->
    <Link
        :href="href"
        class="block w-full px-4 py-2 text-start text-sm leading-5 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)]"
        :style="{
            color: 'var(--color-text-secondary)',
        }"
        @mouseenter="$event.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'"
        @mouseleave="$event.currentTarget.style.backgroundColor = 'transparent'"
    >
        <slot />
    </Link>
</template>
