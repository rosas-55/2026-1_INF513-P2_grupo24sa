<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { Bar, Doughnut } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Filler,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, Filler);

const props = defineProps({ stats: Object });

// ── Colores del tema activo — actualizados reactivamente via MutationObserver ──
function readThemeColors() {
    const s = getComputedStyle(document.documentElement);
    return {
        primary:   s.getPropertyValue('--color-primary').trim()   || '#6366F1',
        secondary: s.getPropertyValue('--color-secondary').trim() || '#EC4899',
        accent:    s.getPropertyValue('--color-accent').trim()    || '#10B981',
        surface:   s.getPropertyValue('--color-surface').trim()   || '#FFFFFF',
        text:      s.getPropertyValue('--color-text').trim()      || '#1A1530',
        muted:     s.getPropertyValue('--color-text-muted').trim()|| '#8B7EAA',
        border:    s.getPropertyValue('--color-border').trim()    || '#D4D0F0',
    };
}

const themeColors = ref(readThemeColors());

// Escuchar cambios de data-theme / data-modo en <html> para redibujar los charts
let observer;
onMounted(() => {
    observer = new MutationObserver(() => {
        themeColors.value = readThemeColors();
    });
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'data-modo', 'data-high-contrast'],
    });
});
onBeforeUnmount(() => observer?.disconnect());

// ── Datos de gráficos ──────────────────────────────────────
const ventasChart = computed(() => ({
    labels: props.stats.ventasPorMes.labels,
    datasets: [{
        label: 'Ingresos (Bs)',
        data: props.stats.ventasPorMes.totales,
        backgroundColor: themeColors.value.primary + '40',
        borderColor: themeColors.value.primary,
        borderWidth: 2, borderRadius: 6, fill: true,
    }],
}));

const productosChart = computed(() => ({
    labels: props.stats.productosTop.labels,
    datasets: [{
        data: props.stats.productosTop.ventas,
        backgroundColor: [
            themeColors.value.primary,
            themeColors.value.secondary,
            themeColors.value.accent,
            themeColors.value.primary + '99',
            themeColors.value.secondary + '99',
        ],
        borderColor: themeColors.value.surface,
        borderWidth: 3,
    }],
}));

const visitasChart = computed(() => ({
    labels: props.stats.paginasVisitadas.labels,
    datasets: [{
        label: 'Visitas',
        data: props.stats.paginasVisitadas.visitas,
        backgroundColor: themeColors.value.accent + '80',
        borderColor: themeColors.value.accent,
        borderWidth: 2, borderRadius: 4,
    }],
}));

// ── Opciones de gráficos ───────────────────────────────────
const barOptions = computed(() => ({
    responsive: true, maintainAspectRatio: false,
    plugins: {
        legend: { labels: { color: themeColors.value.text, font: { family: 'inherit', size: 12 } } },
        tooltip: { backgroundColor: themeColors.value.text, titleColor: themeColors.value.surface, bodyColor: themeColors.value.surface },
    },
    scales: {
        x: { ticks: { color: themeColors.value.muted }, grid: { color: themeColors.value.border + '40' } },
        y: { ticks: { color: themeColors.value.muted }, grid: { color: themeColors.value.border + '40' } },
    },
}));

const doughnutOptions = computed(() => ({
    responsive: true, maintainAspectRatio: false,
    plugins: {
        legend: { position: 'bottom', labels: { color: themeColors.value.text, font: { family: 'inherit', size: 12 }, padding: 16 } },
    },
}));

const horizontalBarOpts = computed(() => ({
    indexAxis: 'y', responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        x: { ticks: { color: themeColors.value.muted }, grid: { color: themeColors.value.border + '40' } },
        y: { ticks: { color: themeColors.value.text, font: { size: 11 } }, grid: { display: false } },
    },
}));

// ── Formateo ────────────────────────────────────────────────
const fmt = (n) => Number(n ?? 0).toLocaleString('es-BO', { minimumFractionDigits: 2 });
const fmtInt = (n) => Number(n ?? 0).toLocaleString('es-BO');
</script>

<template>
    <Head title="Dashboard" />
    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight" :style="{ color: 'var(--color-text)', textWrap: 'balance' }">Dashboard — Estadísticas</h2>
        </template>

        <div class="py-8">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">

                <!-- Tarjetas de resumen -->
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    <div class="theme-card rounded-xl p-4 text-center">
                        <p class="text-xs uppercase tracking-wider" :style="{ color: 'var(--color-text-muted)' }">Ventas totales</p>
                        <p class="text-xl sm:text-2xl font-bold mt-1" :style="{ color: 'var(--color-primary)' }"><span style="font-variant-numeric:tabular-nums">{{ fmtInt(stats.resumen.totalVentas) }}</span></p>
                    </div>
                    <div class="theme-card rounded-xl p-4 text-center">
                        <p class="text-xs uppercase tracking-wider" :style="{ color: 'var(--color-text-muted)' }">Ventas del mes</p>
                        <p class="text-xl sm:text-2xl font-bold mt-1" :style="{ color: 'var(--color-secondary)' }"><span style="font-variant-numeric:tabular-nums">{{ fmtInt(stats.resumen.ventasMes) }}</span></p>
                    </div>
                    <div class="theme-card rounded-xl p-4 text-center">
                        <p class="text-xs uppercase tracking-wider" :style="{ color: 'var(--color-text-muted)' }">Ingresos mes</p>
                        <p class="text-xl sm:text-2xl font-bold mt-1" :style="{ color: 'var(--color-accent)' }"><span style="font-variant-numeric:tabular-nums">Bs {{ fmt(stats.resumen.ingresosMes) }}</span></p>
                    </div>
                    <div class="theme-card rounded-xl p-4 text-center">
                        <p class="text-xs uppercase tracking-wider" :style="{ color: 'var(--color-text-muted)' }">Productos</p>
                        <p class="text-xl sm:text-2xl font-bold mt-1" :style="{ color: 'var(--color-primary)' }"><span style="font-variant-numeric:tabular-nums">{{ fmtInt(stats.resumen.totalProductos) }}</span></p>
                    </div>
                    <div class="theme-card rounded-xl p-4 text-center">
                        <p class="text-xs uppercase tracking-wider" :style="{ color: 'var(--color-text-muted)' }">Visitas</p>
                        <p class="text-xl sm:text-2xl font-bold mt-1" :style="{ color: 'var(--color-secondary)' }"><span style="font-variant-numeric:tabular-nums">{{ fmtInt(stats.resumen.visitasTotales) }}</span></p>
                    </div>
                </div>

                <!-- Gráficos -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="theme-card rounded-xl p-4 sm:p-5 lg:col-span-2">
                        <h3 class="text-sm font-semibold mb-4" :style="{ color: 'var(--color-text)' }">Ventas por mes</h3>
                        <div class="h-64 sm:h-72"><Bar :data="ventasChart" :options="barOptions" /></div>
                    </div>
                    <div class="theme-card rounded-xl p-4 sm:p-5">
                        <h3 class="text-sm font-semibold mb-4" :style="{ color: 'var(--color-text)' }">Top 5 productos</h3>
                        <div class="h-64 sm:h-72"><Doughnut :data="productosChart" :options="doughnutOptions" /></div>
                    </div>
                    <div class="theme-card rounded-xl p-4 sm:p-5 lg:col-span-2">
                        <h3 class="text-sm font-semibold mb-4" :style="{ color: 'var(--color-text)' }">Páginas más visitadas</h3>
                        <div class="h-64 sm:h-72"><Bar :data="visitasChart" :options="horizontalBarOpts" /></div>
                    </div>
                    <div class="theme-card rounded-xl p-4 sm:p-5">
                        <h3 class="text-sm font-semibold mb-4" :style="{ color: 'var(--color-text)' }">Resumen</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <span :style="{ color: 'var(--color-text-muted)' }">Productos activos</span>
                                <span class="font-semibold" :style="{ color: 'var(--color-text)' }">{{ fmtInt(stats.resumen.totalProductos) }}</span>
                            </div>
                            <hr :style="{ borderColor: 'var(--color-border-light)' }">
                            <div class="flex justify-between items-center">
                                <span :style="{ color: 'var(--color-text-muted)' }">Ventas registradas</span>
                                <span class="font-semibold" :style="{ color: 'var(--color-text)' }">{{ fmtInt(stats.resumen.totalVentas) }}</span>
                            </div>
                            <hr :style="{ borderColor: 'var(--color-border-light)' }">
                            <div class="flex justify-between items-center">
                                <span :style="{ color: 'var(--color-text-muted)' }">Ingresos este mes</span>
                                <span class="font-semibold" :style="{ color: 'var(--color-accent)' }">Bs {{ fmt(stats.resumen.ingresosMes) }}</span>
                            </div>
                            <hr :style="{ borderColor: 'var(--color-border-light)' }">
                            <div class="flex justify-between items-center">
                                <span :style="{ color: 'var(--color-text-muted)' }">Visitas al sitio</span>
                                <span class="font-semibold" :style="{ color: 'var(--color-text)' }">{{ fmtInt(stats.resumen.visitasTotales) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
