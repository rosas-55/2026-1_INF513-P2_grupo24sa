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
defineProps({ producciones: Object });
</script>
<template>
    <AuthenticatedLayout><Head title="Producción" /><div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6"><h1 class="text-2xl font-semibold dark:text-white">Producción</h1><Link :href="route('produccion.create')" class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto">Nueva Producción</Link></div>
        <div class="overflow-x-auto rounded-lg border dark:border-gray-700"><table class="min-w-full text-sm text-left text-gray-700 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800"><tr><th class="px-4 py-3">Fecha</th><th class="px-4 py-3">Producto</th><th class="px-4 py-3">Cantidad Producida</th></tr></thead><tbody><tr v-for="p in producciones.data" :key="p.id" class="border-t dark:border-gray-700"><td class="px-4 py-3">{{ formatDate(p.fecha) }}</td><td class="px-4 py-3">{{ p.receta?.producto?.nombre }}</td><td class="px-4 py-3">{{ p.cantidad_producida }}</td></tr><tr v-if="!producciones.data.length"><td colspan="3" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">Sin registros.</td></tr></tbody></table></div>
        <div class="mt-4 flex justify-center" v-if="producciones.links"><div class="flex flex-wrap gap-1 text-sm"><Link v-for="link in producciones.links" :key="link.label" :href="link.url || '#'" v-html="link.label" class="px-3 py-1 rounded border dark:border-gray-600 dark:text-gray-300" :class="{'bg-indigo-600 text-white': link.active, 'opacity-50 pointer-events-none': !link.url}" /></div></div>
    </div></AuthenticatedLayout>
</template>
