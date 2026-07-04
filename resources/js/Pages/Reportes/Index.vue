<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    datos_visitas: Array,
    total_visitas: Number,
    kpis: Object,
    productos_mas_vendidos: Array,
    ventas_recientes: Array,
});

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' }).format(amount || 0);
}

function formatDate(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-BO', { 
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
}
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Reportes y Estadísticas" />

        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 class="text-3xl font-bold theme-section-title">Dashboard de Reportes</h1>
                <div class="bg-[var(--color-primary-light)] text-[var(--color-primary)] px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    Visitas Totales: {{ total_visitas }}
                </div>
            </div>

            <!-- KPIs -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Tarjeta Ventas -->
                <div class="theme-card p-6 border-l-4" style="border-left-color: var(--color-success)">
                    <p class="text-sm font-medium text-secondary mb-1">Ingresos por Ventas</p>
                    <p class="text-2xl font-bold" :style="{ color: 'var(--color-success)' }">
                        {{ formatCurrency(kpis.total_ventas) }}
                    </p>
                </div>

                <!-- Tarjeta Compras -->
                <div class="theme-card p-6 border-l-4" style="border-left-color: var(--color-danger)">
                    <p class="text-sm font-medium text-secondary mb-1">Gastos en Compras</p>
                    <p class="text-2xl font-bold" :style="{ color: 'var(--color-danger)' }">
                        {{ formatCurrency(kpis.total_compras) }}
                    </p>
                </div>

                <!-- Tarjeta Clientes -->
                <div class="theme-card p-6 border-l-4" style="border-left-color: var(--color-info)">
                    <p class="text-sm font-medium text-secondary mb-1">Clientes Registrados</p>
                    <p class="text-2xl font-bold" :style="{ color: 'var(--color-info)' }">
                        {{ kpis.clientes_registrados }}
                    </p>
                </div>

                <!-- Tarjeta Productos -->
                <div class="theme-card p-6 border-l-4" style="border-left-color: var(--color-warning)">
                    <p class="text-sm font-medium text-secondary mb-1">Productos Activos</p>
                    <p class="text-2xl font-bold" :style="{ color: 'var(--color-warning)' }">
                        {{ kpis.productos_activos }}
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Top 5 Productos -->
                <div class="theme-card p-6">
                    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        Productos Más Vendidos
                    </h2>
                    
                    <div v-if="productos_mas_vendidos.length > 0" class="space-y-4">
                        <div v-for="(prod, index) in productos_mas_vendidos" :key="index" class="flex justify-between items-center p-3 rounded-lg bg-[var(--color-surface-alt)]">
                            <div>
                                <p class="font-medium">{{ prod.nombre }}</p>
                                <p class="text-xs text-secondary">{{ parseInt(prod.total_vendido) }} unidades vendidas</p>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-[var(--color-success)]">{{ formatCurrency(prod.ingresos) }}</p>
                            </div>
                        </div>
                    </div>
                    <p v-else class="text-muted italic py-4 text-center">No hay datos de ventas registrados.</p>
                </div>

                <!-- Estadísticas de Páginas -->
                <div class="theme-card p-6">
                    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        Páginas Más Visitadas
                    </h2>
                    
                    <div class="overflow-x-auto border rounded-md" :style="{ borderColor: 'var(--color-border-light)' }">
                        <table class="w-full text-sm text-left">
                            <thead class="bg-[var(--color-surface-alt)]">
                                <tr>
                                    <th class="px-4 py-2 font-medium">Página</th>
                                    <th class="px-4 py-2 font-medium">Ruta</th>
                                    <th class="px-4 py-2 font-medium text-right">Visitas</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="visita in datos_visitas.slice(0, 10)" :key="visita.id" class="border-b last:border-b-0 hover:bg-[var(--color-surface-hover)]" :style="{ borderColor: 'var(--color-border-light)' }">
                                    <td class="px-4 py-3 font-medium">{{ visita.nombre_pagina }}</td>
                                    <td class="px-4 py-3 text-secondary text-xs">{{ visita.ruta }}</td>
                                    <td class="px-4 py-3 text-right font-bold">{{ visita.total_visitas }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Últimas 5 Ventas -->
                <div class="theme-card p-6 lg:col-span-2">
                    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Ventas Recientes
                    </h2>

                    <div class="overflow-x-auto border rounded-md" :style="{ borderColor: 'var(--color-border-light)' }">
                        <table class="w-full text-sm text-left">
                            <thead class="bg-[var(--color-surface-alt)]">
                                <tr>
                                    <th class="px-4 py-3 font-medium">Fecha</th>
                                    <th class="px-4 py-3 font-medium">Cliente</th>
                                    <th class="px-4 py-3 font-medium">Tipo</th>
                                    <th class="px-4 py-3 font-medium">Total</th>
                                    <th class="px-4 py-3 font-medium">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="venta in ventas_recientes" :key="venta.id" class="border-b last:border-b-0 hover:bg-[var(--color-surface-hover)]" :style="{ borderColor: 'var(--color-border-light)' }">
                                    <td class="px-4 py-3">{{ formatDate(venta.fecha) }}</td>
                                    <td class="px-4 py-3 font-medium">{{ venta.cliente?.name || 'Consumidor Final' }}</td>
                                    <td class="px-4 py-3 text-secondary">{{ venta.tipo }}</td>
                                    <td class="px-4 py-3 font-bold">{{ formatCurrency(venta.total) }}</td>
                                    <td class="px-4 py-3">
                                        <span class="badge-primary">{{ venta.estado }}</span>
                                    </td>
                                </tr>
                                <tr v-if="ventas_recientes.length === 0">
                                    <td colspan="5" class="px-4 py-6 text-center text-muted">No hay ventas recientes.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
