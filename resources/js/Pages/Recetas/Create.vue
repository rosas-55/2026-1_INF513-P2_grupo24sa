<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
defineProps({ productos: Array, insumos: Array });
const form = useForm({ producto_id: '', descripcion: '', tiempo_preparacion: '', insumos: [{ insumo_id: '', cantidad: 1 }] });
function addInsumo() { form.insumos.push({ insumo_id: '', cantidad: 1 }); }
function removeInsumo(i) { form.insumos.splice(i, 1); }
function submit() { form.post(route('recetas.store')); }
</script>
<template>
    <AuthenticatedLayout><Head title="Nueva Receta" /><div class="mx-auto max-w-2xl px-4 py-8"><h1 class="text-2xl font-semibold mb-6 theme-section-title">Nueva Receta</h1>
    <form @submit.prevent="submit" class="space-y-6">
        <div><label class="block text-sm font-medium text-secondary">Producto</label><select v-model="form.producto_id" required class="mt-1 w-full theme-input"><option value="">Seleccione producto sin receta...</option><option v-for="p in productos" :key="p.id" :value="p.id">{{ p.nombre }}</option></select></div>
        <div><label class="block text-sm font-medium text-secondary">Descripción</label><textarea v-model="form.descripcion" class="mt-1 w-full theme-input"></textarea></div>
        <div><label class="block text-sm font-medium text-secondary">Tiempo de Preparación</label><input v-model="form.tiempo_preparacion" class="mt-1 w-full theme-input" /></div>
        <div><h2 class="font-medium mb-2">Insumos</h2><div v-for="(ins, i) in form.insumos" :key="i" class="grid grid-cols-1 gap-2 mb-2 items-stretch sm:grid-cols-3 sm:items-center">
            <select v-model="ins.insumo_id" required class="rounded-md border px-2 py-1 text-sm"><option value="">Insumo...</option><option v-for="insumo in insumos" :key="insumo.id" :value="insumo.id">{{ insumo.nombre }} ({{ insumo.unidad_medida }})</option></select>
            <input v-model="ins.cantidad" type="number" step="0.001" placeholder="Cantidad" required class="rounded-md border px-2 py-1 text-sm" />
            <button type="button" @click="removeInsumo(i)" class="text-red-600 text-xs">�S"</button>
        </div><button type="button" @click="addInsumo" class="text-indigo-600 text-sm">+ Agregar insumo</button></div>
        <button type="submit" :disabled="form.processing" class="btn-primary">Guardar Receta</button>
    </form></div></AuthenticatedLayout>
</template>

