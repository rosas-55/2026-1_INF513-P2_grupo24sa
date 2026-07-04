<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
defineProps({ recetas: Array });
const form = useForm({ receta_id: '', cantidad_producida: 1 });
function submit() { form.post(route('produccion.store')); }
</script>
<template>
    <AuthenticatedLayout><Head title="Nueva Producción" /><div class="mx-auto max-w-lg px-4 py-8"><h1 class="text-2xl font-semibold mb-6 theme-section-title">Nueva Producción</h1>
    <form @submit.prevent="submit" class="space-y-4">
        <div><label class="block text-sm font-medium text-secondary">Receta</label><select v-model="form.receta_id" required class="mt-1 w-full theme-input"><option value="">Seleccione...</option><option v-for="r in recetas" :key="r.id" :value="r.id">{{ r.label }}</option></select></div>
        <div><label class="block text-sm font-medium text-secondary">Cantidad a Producir</label><input v-model="form.cantidad_producida" type="number" step="0.01" required class="mt-1 w-full theme-input" /></div>
        <button type="submit" :disabled="form.processing" class="btn-primary">Registrar Producción</button>
    </form></div></AuthenticatedLayout>
</template>

