<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
defineProps({ compra: Object });
</script>
<template>
    <AuthenticatedLayout><Head :title="'Compra #' + compra.id" /><div class="mx-auto max-w-3xl px-4 py-8">
        <h1 class="text-2xl font-semibold mb-6 theme-section-title">Compra #{{ compra.id }}</h1>
        <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2"><div><strong>Proveedor:</strong> {{ compra.proveedor?.nombre }}</div><div><strong>Estado:</strong> {{ compra.estado }}</div><div><strong>Fecha:</strong> {{ compra.fecha }}</div><div><strong>Total:</strong> {{ compra.total }}</div></div>
        <h2 class="font-medium mb-2">Detalles</h2>
        <div class="overflow-x-auto rounded-lg border"><table class="min-w-full text-sm"><thead class="bg-gray-50"><tr><th class="px-4 py-3">Insumo</th><th class="px-4 py-3">Cantidad</th><th class="px-4 py-3">Precio Unit.</th><th class="px-4 py-3">Subtotal</th></tr></thead><tbody><tr v-for="d in compra.detalles" :key="d.id" class="border-t"><td class="px-4 py-3">{{ d.insumo?.nombre }}</td><td class="px-4 py-3">{{ d.cantidad }}</td><td class="px-4 py-3">{{ d.precio_unitario }}</td><td class="px-4 py-3">{{ d.subtotal }}</td></tr></tbody></table></div>
    </div></AuthenticatedLayout>
</template>

