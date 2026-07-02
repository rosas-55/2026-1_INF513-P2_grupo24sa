<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
const props = defineProps({ producto: Object, insumos: Array });
const form = useForm({ nombre: props.producto?.nombre, precio_venta: props.producto?.precio_venta, stock_actual: props.producto?.stock_actual, insumo_id: props.producto?.insumo_id, estado: props.producto?.estado });
function submit() { form.patch(route('productos.update', props.producto.id)); }
</script>
<template>
    <AuthenticatedLayout><Head title="Editar Producto" /><div class="mx-auto max-w-lg px-4 py-8"><h1 class="text-2xl font-semibold mb-6 theme-section-title">Editar Producto</h1>
    <form @submit.prevent="submit" class="space-y-4">
        <div><label class="block text-sm font-medium text-secondary">Nombre</label><input v-model="form.nombre" required class="mt-1 w-full theme-input" /></div>
        <div><label class="block text-sm font-medium text-secondary">Precio de Venta</label><input v-model="form.precio_venta" type="number" step="0.01" required class="mt-1 w-full theme-input" /></div>
        <div><label class="block text-sm font-medium text-secondary">Stock Actual</label><input v-model="form.stock_actual" type="number" step="0.01" required class="mt-1 w-full theme-input" /></div>
        <div><label class="block text-sm font-medium text-secondary">Insumo asociado</label><select v-model="form.insumo_id" class="mt-1 w-full theme-input"><option :value="null">-- Sin insumo --</option><option v-for="i in insumos" :key="i.id" :value="i.id">{{ i.nombre }}</option></select></div>
        <div><label class="block text-sm font-medium text-secondary">Estado</label><select v-model="form.estado" class="mt-1 w-full theme-input"><option value="ACTIVO">Activo</option><option value="INACTIVO">Inactivo</option></select></div>
        <button type="submit" :disabled="form.processing" class="btn-primary">Actualizar</button>
    </form></div></AuthenticatedLayout>
</template>

