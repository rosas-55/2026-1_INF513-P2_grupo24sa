<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
defineProps({ recetas: Object, filters: Object });
const form = useForm({});
function destroy(id) { if (confirm('¿Eliminar esta receta?')) form.delete(route('recetas.destroy', id)); }
</script>
<template>
    <AuthenticatedLayout><Head title="Recetas" /><div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6"><h1 class="text-2xl font-semibold dark:text-white">Recetas</h1><Link :href="route('recetas.create')" class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white self-start sm:self-auto">Nueva Receta</Link></div>
        <form class="mb-4"><input v-model="filters.search" type="text" placeholder="Buscar⬦" aria-label="Buscar recetas" autocomplete="off" class="w-full sm:w-auto theme-input text-sm"@change="$inertia.get(route('recetas.index'), { search: $event.target.value }, { preserveState: true, replace: true })" /></form>
        <div class="overflow-x-auto rounded-lg border dark:border-gray-700"><table class="min-w-full text-sm text-left text-gray-700 dark:text-gray-300"><thead class="bg-gray-50 dark:bg-gray-800"><tr><th class="px-4 py-3">Producto</th><th class="px-4 py-3">Descripción</th><th class="px-4 py-3">Tiempo Prep.</th><th class="px-4 py-3 text-right">Acciones</th></tr></thead><tbody><tr v-for="r in recetas.data" :key="r.id" class="border-t dark:border-gray-700"><td class="px-4 py-3">{{ r.producto?.nombre }}</td><td class="px-4 py-3">{{ r.descripcion }}</td><td class="px-4 py-3">{{ r.tiempo_preparacion }}</td><td class="px-4 py-3 text-right space-x-2"><Link :href="route('recetas.edit', r.id)" class="text-indigo-600 hover:underline text-xs">Editar</Link><button @click="destroy(r.id)" class="text-red-600 hover:underline text-xs">Eliminar</button></td></tr><tr v-if="!recetas.data.length"><td colspan="4" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">Sin recetas.</td></tr></tbody></table></div>
        <div class="mt-4 flex justify-center" v-if="recetas.links"><div class="flex flex-wrap gap-1 text-sm"><Link v-for="link in recetas.links" :key="link.label" :href="link.url || '#'" v-html="link.label" class="px-3 py-1 rounded border dark:border-gray-600 dark:text-gray-300" :class="{'bg-indigo-600 text-white': link.active, 'opacity-50 pointer-events-none': !link.url}" /></div></div>
    </div></AuthenticatedLayout>
</template>

