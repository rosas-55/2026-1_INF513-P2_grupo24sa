<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

const form = useForm({ nombre: '', direccion: '', telefono: '' });

function submit() {
    form.post(route('proveedores.store'));
}
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Nuevo Proveedor" />
        <div class="mx-auto max-w-lg px-4 py-8">
            <h1 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Nuevo Proveedor</h1>
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
                <button type="submit" :disabled="form.processing" class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">Guardar</button>
            </form>
        </div>
    </AuthenticatedLayout>
</template>
