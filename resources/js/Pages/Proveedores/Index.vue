<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({ proveedores: Object, filters: Object });

const form = useForm({});

function destroy(id) {
    if (confirm('¿Eliminar este proveedor?')) {
        form.delete(route('proveedores.destroy', id));
    }
}
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Proveedores" />
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Proveedores</h1>
                <Link :href="route('proveedores.create')" class="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 self-start sm:self-auto">Nuevo Proveedor</Link>
            </div>

            <!-- Search -->
            <form class="mb-4 flex flex-col gap-2 sm:flex-row" @submit.prevent>
                <input v-model="filters.search" type="text" placeholder="Buscar…" aria-label="Buscar proveedores" autocomplete="off" class="w-full sm:w-auto rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2 text-sm" @change="$inertia.get(route('proveedores.index'), { search: $event.target.value }, { preserveState: true, replace: true })" />
            </form>

            <!-- Table -->
            <div class="overflow-x-auto rounded-lg border dark:border-gray-700">
                <table class="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th class="px-4 py-3">Nombre</th>
                            <th class="px-4 py-3">Dirección</th>
                            <th class="px-4 py-3">Teléfono</th>
                            <th class="px-4 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in proveedores.data" :key="p.id" class="border-t dark:border-gray-700">
                            <td class="px-4 py-3">{{ p.nombre }}</td>
                            <td class="px-4 py-3">{{ p.direccion }}</td>
                            <td class="px-4 py-3">{{ p.telefono }}</td>
                            <td class="px-4 py-3 text-right space-x-2">
                                <Link :href="route('proveedores.edit', p.id)" class="text-indigo-600 hover:underline text-xs">Editar</Link>
                                <button @click="destroy(p.id)" class="text-red-600 hover:underline text-xs">Eliminar</button>
                            </td>
                        </tr>
                        <tr v-if="!proveedores.data.length">
                            <td colspan="4" class="px-4 py-6 text-center text-gray-500">Sin resultados.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="mt-4 flex justify-center" v-if="proveedores.links">
                <div class="flex flex-wrap gap-1 text-sm">
                    <Link v-for="link in proveedores.links" :key="link.label" :href="link.url || '#'" v-html="link.label" class="px-3 py-1 rounded border dark:border-gray-600" :class="{'bg-indigo-600 text-white': link.active, 'opacity-50 pointer-events-none': !link.url}" />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
