<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

defineProps({
    venta: Object
});

function formatInt(amount) {
    return Math.round(amount || 0);
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const datePart = dateStr.split('T')[0].split(' ')[0];
    const parts = datePart.split('-');
    if (parts.length === 3) return `${parseInt(parts[2], 10)}/${parts[1]}/${parts[0]}`;
    return dateStr;
}
</script>

<template>
    <AuthenticatedLayout>
        <Head :title="'Venta #' + venta.id" />
        <div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 class="text-2xl font-semibold mb-6 theme-section-title">Venta #{{ venta.id }}</h1>
            
            <div class="theme-card p-6 mb-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                        <span class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Cliente</span>
                        <div class="font-medium" :style="{ color: 'var(--color-text)' }">{{ venta.cliente?.name }}</div>
                    </div>
                    <div>
                        <span class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Vendedor</span>
                        <div class="font-medium" :style="{ color: 'var(--color-text)' }">{{ venta.vendedor?.name }}</div>
                    </div>
                    <div>
                        <span class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Fecha</span>
                        <div class="font-medium" :style="{ color: 'var(--color-text)' }">{{ formatDate(venta.fecha) }}</div>
                    </div>
                    <div>
                        <span class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Tipo</span>
                        <div class="inline-flex items-center gap-1.5 font-medium" :style="{ color: 'var(--color-text)' }">
                            {{ venta.tipo }}
                        </div>
                    </div>
                    <div>
                        <span class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Estado</span>
                        <span class="badge-primary" :class="{'alert-success': venta.estado === 'PAGADA', 'alert-warning': venta.estado === 'PENDIENTE'}">
                            {{ venta.estado }}
                        </span>
                    </div>
                    <div>
                        <span class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1">Total (Bs.)</span>
                        <div class="font-bold text-lg text-primary">Bs. {{ formatInt(venta.total) }}</div>
                        <div class="text-xs text-muted" v-if="venta.interes > 0">(Incluye Bs. {{ formatInt(venta.interes) }} de interés)</div>
                    </div>
                </div>
            </div>

            <h2 class="text-lg font-bold mb-4 theme-section-title">Productos</h2>
            <div class="overflow-x-auto rounded-lg border theme-divider mb-8">
                <table class="theme-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th class="text-center">Cantidad</th>
                            <th class="text-right">Precio Unit.</th>
                            <th class="text-right">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="d in venta.detalles" :key="d.id">
                            <td class="font-medium">{{ d.producto?.nombre }}</td>
                            <td class="text-center">{{ d.cantidad }}</td>
                            <td class="text-right">Bs. {{ formatInt(d.precio_unitario) }}</td>
                            <td class="text-right font-semibold">Bs. {{ formatInt(d.sub_total) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="venta.cuotas?.length">
                <h2 class="text-lg font-bold mb-4 theme-section-title">Plan de Pagos (Cuotas)</h2>
                <div class="overflow-x-auto rounded-lg border theme-divider">
                    <table class="theme-table">
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th class="text-right">Monto (Bs.)</th>
                                <th>Vencimiento</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="c in venta.cuotas" :key="c.id">
                                <td class="font-medium text-primary">Cuota {{ c.nro_cuota }}</td>
                                <td class="text-right font-semibold">Bs. {{ formatInt(c.monto_fijo) }}</td>
                                <td>{{ formatDate(c.fecha_vencimiento) }}</td>
                                <td>
                                    <span class="badge-primary" :class="{'alert-success': c.estado === 'PAGADO', 'alert-warning': c.estado === 'PENDIENTE', 'alert-danger': c.estado === 'VENCIDO'}">
                                        {{ c.estado }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
