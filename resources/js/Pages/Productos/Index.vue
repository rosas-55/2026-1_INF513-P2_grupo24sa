<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
defineProps({ productos: Object, filters: Object });
const form = useForm({});
function destroy(id) { if (confirm('Â¿Desactivar este producto?')) form.delete(route('productos.destroy', id)); }
</script>
<template>
    <AuthenticatedLayout><Head title="Productos" /><div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6"><h1 class="text-2xl font-semibold dark:text-white">Productos</h1><Link :href="route('productos.create')" class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto">Nuevo Producto</Link></div>
        <form class="mb-4"><input v-model="filters.search" type="text" placeholder="Buscarâ€¦" aria-label="Buscar productos" autocomplete="off" class="w-full sm:w-auto theme-input text-sm" @change="$inertia.get(route('productos.index'), { search: $event.target.value }, { preserveState: true, replace: true })" /></form>
        <div class="overflow-x-auto rounded-lg border dark:border-gray-700"><table class="min-w-full text-sm text-left text-gray-700 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800"><tr><th class="px-4 py-3">Nombre</th><th class="px-4 py-3">Precio Venta</th><th class="px-4 py-3">Stock</th><th class="px-4 py-3">Insumo</th><th class="px-4 py-3">Estado</th><th class="px-4 py-3 text-right">Acciones</th></tr></thead><tbody><tr v-for="p in productos.data" :key="p.id" class="border-t dark:border-gray-700"><td class="px-4 py-3">{{ p.nombre }}</td><td class="px-4 py-3">{{ p.precio_venta }}</td><td class="px-4 py-3">{{ p.stock_actual }}</td><td class="px-4 py-3">{{ p.insumo?.nombre }}</td><td class="px-4 py-3">{{ p.estado }}</td><td class="px-4 py-3 text-right space-x-2"><Link :href="route('productos.edit', p.id)" class="text-indigo-600 hover:underline text-xs">Editar</Link><button @click="destroy(p.id)" class="text-red-600 hover:underline text-xs">Desactivar</button></td></tr><tr v-if="!productos.data.length"><td colspan="6" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">Sin resultados.</td></tr></tbody></table></div>
        <div class="mt-4 flex justify-center" v-if="productos.links"><div class="flex flex-wrap gap-1 text-sm"><Link v-for="link in productos.links" :key="link.label" :href="link.url || '#'" v-html="link.label" class="px-3 py-1 rounded border dark:border-gray-600 dark:text-gray-300" :class="{'bg-indigo-600 text-white': link.active, 'opacity-50 pointer-events-none': !link.url}" /></div></div>
    </div></AuthenticatedLayout>
</template>

