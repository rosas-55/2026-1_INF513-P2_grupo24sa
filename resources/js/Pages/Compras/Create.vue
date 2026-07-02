<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
defineProps({ proveedores: Array, insumos: Array });
const form = useForm({ proveedor_id: '', estado: 'PENDIENTE', detalles: [{ insumo_id: '', cantidad: 1, precio_unitario: 0 }] });
function addDetalle() { form.detalles.push({ insumo_id: '', cantidad: 1, precio_unitario: 0 }); }
function removeDetalle(i) { form.detalles.splice(i, 1); }
function submit() { form.post(route('compras.store')); }
</script>
<template>
    <AuthenticatedLayout><Head title="Nueva Compra" /><div class="mx-auto max-w-3xl px-4 py-8"><h1 class="text-2xl font-semibold mb-6 theme-section-title">Nueva Compra</h1>
    <form @submit.prevent="submit" class="space-y-6">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><label class="block text-sm font-medium text-secondary">Proveedor</label><select v-model="form.proveedor_id" required class="mt-1 w-full theme-input"><option value="">Seleccione...</option><option v-for="p in proveedores" :key="p.id" :value="p.id">{{ p.nombre }}</option></select></div>
            <div><label class="block text-sm font-medium text-secondary">Estado</label><select v-model="form.estado" required class="mt-1 w-full theme-input"><option value="PENDIENTE">Pendiente</option><option value="COMPLETADO">Completado</option><option value="ANULADO">Anulado</option></select></div>
        </div>
        <div><h2 class="font-medium mb-2">Detalles</h2><div v-for="(d, i) in form.detalles" :key="i" class="grid grid-cols-2 gap-2 mb-2 items-center sm:grid-cols-4">
            <select v-model="d.insumo_id" required class="rounded-md border px-2 py-1 text-sm"><option value="">Insumo...</option><option v-for="ins in insumos" :key="ins.id" :value="ins.id">{{ ins.nombre }} ({{ ins.unidad_medida }})</option></select>
            <input v-model="d.cantidad" type="number" step="0.01" placeholder="Cant." required class="rounded-md border px-2 py-1 text-sm" />
            <input v-model="d.precio_unitario" type="number" step="0.01" placeholder="Precio" required class="rounded-md border px-2 py-1 text-sm" />
            <button type="button" @click="removeDetalle(i)" class="text-red-600 text-xs">âœ•</button>
        </div><button type="button" @click="addDetalle" class="text-indigo-600 text-sm hover:underline">+ Agregar detalle</button></div>
        <button type="submit" :disabled="form.processing" class="btn-primary">Guardar Compra</button>
    </form></div></AuthenticatedLayout>
</template>

