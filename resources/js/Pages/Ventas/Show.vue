<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
defineProps({ venta: Object });
</script>
<template>
    <AuthenticatedLayout><Head :title="'Venta #' + venta.id" /><div class="mx-auto max-w-3xl px-4 py-8"><h1 class="text-2xl font-semibold mb-6 theme-section-title">Venta #{{ venta.id }}</h1>
        <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2"><div><strong>Cliente:</strong> {{ venta.cliente?.name }}</div><div><strong>Vendedor:</strong> {{ venta.vendedor?.name }}</div><div><strong>Tipo:</strong> {{ venta.tipo }}</div><div><strong>Estado:</strong> {{ venta.estado }}</div><div><strong>Total:</strong> {{ venta.total }}</div><div><strong>Interés:</strong> {{ venta.interes }}</div></div>
        <h2 class="font-medium mb-2">Productos</h2>
        <div class="overflow-x-auto rounded-lg border mb-6"><table class="min-w-full text-sm"><thead class="bg-gray-50"><tr><th class="px-4 py-3">Producto</th><th class="px-4 py-3">Cantidad</th><th class="px-4 py-3">Precio</th><th class="px-4 py-3">Subtotal</th></tr></thead><tbody><tr v-for="d in venta.detalles" :key="d.id" class="border-t"><td class="px-4 py-3">{{ d.producto?.nombre }}</td><td class="px-4 py-3">{{ d.cantidad }}</td><td class="px-4 py-3">{{ d.precio_unitario }}</td><td class="px-4 py-3">{{ d.sub_total }}</td></tr></tbody></table></div>
        <div v-if="venta.cuotas?.length"><h2 class="font-medium mb-2">Cuotas</h2><div class="overflow-x-auto rounded-lg border"><table class="min-w-full text-sm"><thead class="bg-gray-50"><tr><th class="px-4 py-3">N°</th><th class="px-4 py-3">Monto</th><th class="px-4 py-3">Vencimiento</th><th class="px-4 py-3">Estado</th></tr></thead><tbody><tr v-for="c in venta.cuotas" :key="c.id" class="border-t"><td class="px-4 py-3">{{ c.nro_cuota }}</td><td class="px-4 py-3">{{ c.monto_fijo }}</td><td class="px-4 py-3">{{ c.fecha_vencimiento }}</td><td class="px-4 py-3">{{ c.estado }}</td></tr></tbody></table></div></div>
    </div></AuthenticatedLayout>
</template>

