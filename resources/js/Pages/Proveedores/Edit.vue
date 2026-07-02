<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

const props = defineProps({ proveedor: Object });
const form = useForm({ nombre: props.proveedor?.nombre, direccion: props.proveedor?.direccion, telefono: props.proveedor?.telefono });

function submit() {
    form.patch(route('proveedores.update', props.proveedor.id));
}
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Editar Proveedor" />
        <div class="mx-auto max-w-lg px-4 py-8">
            <h1 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Editar Proveedor</h1>
            <form @submit.prevent="submit" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                    <input v-model="form.nombre" type="text" required class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Dirección</label>
                    <input v-model="form.direccion" type="text" class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
                    <input v-model="form.telefono" type="text" class="mt-1 w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-3 py-2" />
                </div>
                <button type="submit" :disabled="form.processing" class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">Actualizar</button>
            </form>
        </div>
    </AuthenticatedLayout>
</template>
