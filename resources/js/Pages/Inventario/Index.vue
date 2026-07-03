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

defineProps({ movimientos: Object, insumos: Array, filters: Object });
</script>
<template>
    <AuthenticatedLayout><Head title="Inventario" /><div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6"><h1 class="text-2xl font-semibold dark:text-white">Inventario</h1><Link :href="route('inventario.create')" class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto">Nuevo Movimiento</Link></div>
        <form class="mb-4"><select v-model="filters.insumo_id" class="w-full sm:w-auto theme-input text-sm"@change="$inertia.get(route('inventario.index'), { insumo_id: $event.target.value }, { preserveState: true, replace: true })"><option value="">Todos los insumos</option><option v-for="i in insumos" :key="i.id" :value="i.id">{{ i.nombre }}</option></select></form>
        <div class="overflow-x-auto rounded-lg border dark:border-gray-700"><table class="min-w-full text-sm text-left text-gray-700 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800"><tr><th class="px-4 py-3">Fecha</th><th class="px-4 py-3">Insumo</th><th class="px-4 py-3">Tipo</th><th class="px-4 py-3">Cantidad</th><th class="px-4 py-3">Costo Unit.</th><th class="px-4 py-3">Valor Total</th></tr></thead><tbody><tr v-for="m in movimientos.data" :key="m.id" class="border-t dark:border-gray-700"><td class="px-4 py-3">{{ formatDate(m.fecha) }}</td><td class="px-4 py-3">{{ m.insumo?.nombre }}</td><td class="px-4 py-3">{{ m.tipo_movimiento }}</td><td class="px-4 py-3">{{ m.cantidad }}</td><td class="px-4 py-3">Bs. {{ m.costo_unitario }}</td><td class="px-4 py-3">Bs. {{ m.valor_total }}</td></tr><tr v-if="!movimientos.data.length"><td colspan="6" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">Sin movimientos.</td></tr></tbody></table></div>
        <div class="mt-4 flex justify-center" v-if="movimientos.links"><div class="flex flex-wrap gap-1 text-sm"><Link v-for="link in movimientos.links" :key="link.label" :href="link.url || '#'" v-html="link.label" class="px-3 py-1 rounded border dark:border-gray-600 dark:text-gray-300" :class="{'bg-indigo-600 text-white': link.active, 'opacity-50 pointer-events-none': !link.url}" /></div></div>
    </div></AuthenticatedLayout>
</template>

