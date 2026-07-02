<script setup>
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    /** Render as vertical list for mobile hamburger menu */
    mobile: { type: Boolean, default: false },
});

const menu = computed(() => usePage().props.menu ?? []);

// ── SVG paths para los iconos que devuelve el backend (codigoToIcon) ──────────
// ponytail: inline SVG map — no dependency on lucide-vue-next for 13 icons
const iconPaths = {
    'layout-dashboard': 'M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z',
    'truck': 'M1 3h15v13H1V3zM16 8h4l3 3v5h-7V8zM5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
    'package': 'M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12',
    'shopping-cart': 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0',
    'warehouse': 'M22 8.35V20a2 2 0 01-2 2H4a2 2 0 01-2-2V8.35A2 2 0 011.1 6.28l8-3.43a2 2 0 011.8 0l8 3.43A2 2 0 0122 8.35zM6 18h12M6 14h12M6 10h12',
    'barcode': 'M3 5v14M7 5v14M11 5v14M15 5v14M19 5v14M3 5h2M3 19h2M19 5h2M19 19h2',
    'book-open': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    'factory': 'M2 20h20M5 20V10l7-5 7 5v10M9 20v-5h6v5M9 10h6',
    'receipt': 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1zM9 9h6M9 13h6',
    'credit-card': 'M1 4h22v16H1V4zm0 7h22',
    'shield-check': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-2-7l2 2 4-4',
    'bar-chart-3': 'M18 20V10M12 20V4M6 20v-6',
    'scroll-text': 'M8 21h12a2 2 0 002-2v-2H10v2a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-2h2v2a2 2 0 002 2zm0-14H4a2 2 0 00-2 2v2h8V7zM8 7a2 2 0 012-2h8a2 2 0 012 2v14H8V7zm4 6h4m-4 4h4m-4-8h4',
    'circle': 'M12 22a10 10 0 100-20 10 10 0 000 20z',
};
</script>

<template>
    <!-- Desktop: barra horizontal completa (row 2 del nav) -->
    <div v-if="!mobile && menu.length" class="hidden sm:flex sm:items-center sm:gap-x-0.5 sm:py-1">
        <NavLink
            v-for="item in menu"
            :key="item.route"
            :href="route(item.route)"
            :active="route().current(item.route)"
        >
            <span class="flex items-center gap-1.5">
                <!-- Icono SVG (aria-hidden: decorativo) -->
                <svg
                    v-if="item.icon && iconPaths[item.icon]"
                    class="h-3.5 w-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path :d="iconPaths[item.icon]" />
                </svg>
                {{ item.name }}
            </span>
        </NavLink>
    </div>

    <!-- Mobile: vertical list inside hamburger -->
    <template v-if="mobile && menu.length">
        <ResponsiveNavLink
            v-for="item in menu"
            :key="item.route"
            :href="route(item.route)"
            :active="route().current(item.route)"
        >
            <span class="flex items-center gap-2">
                <svg
                    v-if="item.icon && iconPaths[item.icon]"
                    class="h-4 w-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path :d="iconPaths[item.icon]" />
                </svg>
                {{ item.name }}
            </span>
        </ResponsiveNavLink>
    </template>
</template>
