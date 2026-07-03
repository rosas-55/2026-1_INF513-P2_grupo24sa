<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('T')[0].split(' ')[0].split('-');
    if (parts.length === 3) {
        return `${parseInt(parts[2], 10)}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
}
defineProps({ compra: Object });
</script>
<template>
    <AuthenticatedLayout><Head :title="'Compra #' + compra.id" /><div class="mx-auto max-w-3xl px-4 py-8">
        <h1 class="text-2xl font-semibold mb-6 theme-section-title">Compra #{{ compra.id }}</h1>
        <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2"><div><strong>Proveedor:</strong> {{ compra.proveedor?.nombre }}</div><div><strong>Estado:</strong> {{ compra.estado }}</div><div><strong>Fecha:</strong> {{ formatDate(compra.fecha) }}</div><div><strong>Total:</strong> Bs. {{ Number(compra.total).toFixed(2) }}</div></div>
        <div class="overflow-x-auto rounded-lg border"><table class="min-w-full text-sm text-left">
            <thead class="bg-gray-50"><tr><th class="px-4 py-2">Insumo</th><th class="px-4 py-2">Cantidad</th><th class="px-4 py-2">Precio Unit.</th><th class="px-4 py-2">Subtotal</th></tr></thead>
            <tbody><tr v-for="d in compra.detalles" :key="d.id" class="border-t"><td class="px-4 py-2">{{ d.insumo?.nombre }}</td><td class="px-4 py-2">{{ d.cantidad }}</td><td class="px-4 py-2">Bs. {{ Number(d.precio_unitario).toFixed(2) }}</td><td class="px-4 py-2">Bs. {{ Number(d.subtotal).toFixed(2) }}</td></tr></tbody>
        </table></div>
    </div></AuthenticatedLayout>
</template>
