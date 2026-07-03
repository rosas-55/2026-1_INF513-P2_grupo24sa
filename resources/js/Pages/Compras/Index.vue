<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('T')[0].split(' ')[0].split('-');
    if (parts.length === 3) {
        return `${parseInt(parts[2], 10)}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
}

defineProps({ compras: Object, proveedores: Array, filters: Object });
const form = useForm({});
function destroy(id) { if (confirm('¿Eliminar esta compra?')) form.delete(route('compras.destroy', id)); }
</script>
<template>
    <AuthenticatedLayout><Head title="Compras" /><div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6"><h1 class="text-2xl font-semibold dark:text-white">Compras</h1><Link :href="route('compras.create')" class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto">Nueva Compra</Link></div>
        <form class="mb-4"><select v-model="filters.proveedor_id" class="w-full sm:w-auto theme-input text-sm" @change="$inertia.get(route('compras.index'), { proveedor_id: $event.target.value }, { preserveState: true, replace: true })"><option value="">Todos los proveedores</option><option v-for="p in proveedores" :key="p.id" :value="p.id">{{ p.nombre }}</option></select></form>
        <div class="overflow-x-auto rounded-lg border dark:border-gray-700"><table class="min-w-full text-sm text-left text-gray-700 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800"><tr><th class="px-4 py-3">ID</th><th class="px-4 py-3">Proveedor</th><th class="px-4 py-3">Estado</th><th class="px-4 py-3">Fecha</th><th class="px-4 py-3">Total</th><th class="px-4 py-3 text-right">Acciones</th></tr></thead><tbody><tr v-for="c in compras.data" :key="c.id" class="border-t dark:border-gray-700"><td class="px-4 py-3">{{ c.id }}</td><td class="px-4 py-3">{{ c.proveedor?.nombre }}</td><td class="px-4 py-3">{{ c.estado }}</td><td class="px-4 py-3">{{ formatDate(c.fecha) }}</td><td class="px-4 py-3">Bs. {{ Number(c.total).toFixed(2) }}</td><td class="px-4 py-3 text-right space-x-2"><Link :href="route('compras.show', c.id)" class="text-blue-600 hover:underline text-xs">Ver</Link><button @click="destroy(c.id)" class="text-red-600 hover:underline text-xs">Eliminar</button></td></tr><tr v-if="!compras.data.length"><td colspan="6" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">Sin resultados.</td></tr></tbody></table></div>
        <div class="mt-4 flex justify-center" v-if="compras.links"><div class="flex flex-wrap gap-1 text-sm"><Link v-for="link in compras.links" :key="link.label" :href="link.url || '#'" v-html="link.label" class="px-3 py-1 rounded border dark:border-gray-600 dark:text-gray-300" :class="{'bg-indigo-600 text-white': link.active, 'opacity-50 pointer-events-none': !link.url}" /></div></div>
    </div></AuthenticatedLayout>
</template>

