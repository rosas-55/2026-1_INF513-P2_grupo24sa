<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
const props = defineProps({ insumo: Object });
const form = useForm({ nombre: props.insumo?.nombre, descripcion: props.insumo?.descripcion, costo_unitario: props.insumo?.costo_unitario, stock_actual: props.insumo?.stock_actual, stock_minimo: props.insumo?.stock_minimo, unidad_medida: props.insumo?.unidad_medida, estado: props.insumo?.estado });
function submit() { form.patch(route('insumos.update', props.insumo.id)); }
</script>
<template>
    <AuthenticatedLayout><Head title="Editar Insumo" /><div class="mx-auto max-w-lg px-4 py-8"><h1 class="text-2xl font-semibold mb-6 theme-section-title">Editar Insumo</h1>
    <form @submit.prevent="submit" class="space-y-4">
        <div><label class="block text-sm font-medium text-secondary">Nombre</label><input v-model="form.nombre" required class="mt-1 w-full theme-input" /></div>
        <div><label class="block text-sm font-medium text-secondary">Descripción</label><textarea v-model="form.descripcion" class="mt-1 w-full theme-input"></textarea></div>
        <div><label class="block text-sm font-medium text-secondary">Costo Unitario</label><input v-model="form.costo_unitario" type="number" step="0.01" required class="mt-1 w-full theme-input" /></div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><div><label class="block text-sm font-medium text-secondary">Stock Actual</label><input v-model="form.stock_actual" type="number" step="1" required class="mt-1 w-full theme-input" /></div><div><label class="block text-sm font-medium text-secondary">Stock Mínimo</label><input v-model="form.stock_minimo" type="number" step="1" required class="mt-1 w-full theme-input" /></div></div>
        <div><label class="block text-sm font-medium text-secondary">Unidad de Medida</label><input v-model="form.unidad_medida" class="mt-1 w-full theme-input" /></div>
        <div><label class="block text-sm font-medium text-secondary">Estado</label><select v-model="form.estado" class="mt-1 w-full theme-input"><option value="ACTIVO">Activo</option><option value="INACTIVO">Inactivo</option></select></div>
        <button type="submit" :disabled="form.processing" class="btn-primary">Actualizar</button>
    </form></div></AuthenticatedLayout>
</template>

