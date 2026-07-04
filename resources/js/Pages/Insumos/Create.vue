<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
const form = useForm({ nombre: '', descripcion: '', costo_unitario: 0, stock_actual: 0, stock_minimo: 0, unidad_medida: '' });
function submit() { form.post(route('insumos.store')); }
</script>
<template>
    <AuthenticatedLayout><Head title="Nuevo Insumo" /><div class="mx-auto max-w-lg px-4 py-8"><h1 class="text-2xl font-semibold mb-6 theme-section-title">Nuevo Insumo</h1>
    <form @submit.prevent="submit" class="space-y-4">
        <div><label class="block text-sm font-medium text-secondary">Nombre</label><input v-model="form.nombre" required class="mt-1 w-full theme-input" /></div>
        <div><label class="block text-sm font-medium text-secondary">Descripción</label><textarea v-model="form.descripcion" class="mt-1 w-full theme-input"></textarea></div>
        <div><label class="block text-sm font-medium text-secondary">Costo Unitario</label><input v-model="form.costo_unitario" type="number" step="0.01" required class="mt-1 w-full theme-input" /></div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><div><label class="block text-sm font-medium text-secondary">Stock Actual</label><input v-model="form.stock_actual" type="number" step="0.01" required class="mt-1 w-full theme-input" /></div><div><label class="block text-sm font-medium text-secondary">Stock Mínimo</label><input v-model="form.stock_minimo" type="number" step="0.01" required class="mt-1 w-full theme-input" /></div></div>
        <div><label class="block text-sm font-medium text-secondary">Unidad de Medida</label><input v-model="form.unidad_medida" class="mt-1 w-full theme-input" /></div>
        <button type="submit" :disabled="form.processing" class="btn-primary">Guardar</button>
    </form></div></AuthenticatedLayout>
</template>

