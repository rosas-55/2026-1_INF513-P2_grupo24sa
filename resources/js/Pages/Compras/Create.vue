<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
defineProps({ proveedores: Array, insumos: Array });
const form = useForm({ proveedor_id: '', estado: 'PENDIENTE', fecha: '', detalles: [{ insumo_id: '', cantidad: 1, precio_unitario: 0 }] });
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
            <div><label class="block text-sm font-medium text-secondary">Fecha (Opcional)</label><input v-model="form.fecha" type="datetime-local" class="mt-1 w-full theme-input" /></div>
        </div>
        <div>
            <h2 class="font-medium mb-4 theme-section-title">Detalles</h2>
            <div v-for="(d, i) in form.detalles" :key="i" class="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-4 items-center rounded-lg border p-3 theme-divider bg-surface-alt">
                <div class="sm:col-span-5">
                    <label class="block text-xs font-medium mb-1 text-secondary">Insumo</label>
                    <select v-model="d.insumo_id" required class="w-full theme-input text-sm px-2 py-1.5"><option value="">Seleccione un insumo...</option><option v-for="ins in insumos" :key="ins.id" :value="ins.id">{{ ins.nombre }} ({{ ins.unidad_medida }})</option></select>
                </div>
                <div class="sm:col-span-3">
                    <label class="block text-xs font-medium mb-1 text-secondary">Cantidad</label>
                    <input v-model="d.cantidad" type="number" step="1" min="1" required class="w-full theme-input text-sm px-2 py-1.5" />
                </div>
                <div class="sm:col-span-3">
                    <label class="block text-xs font-medium mb-1 text-secondary">Precio Unitario</label>
                    <input v-model="d.precio_unitario" type="number" step="0.01" min="0" required class="w-full theme-input text-sm px-2 py-1.5" />
                </div>
                <div class="sm:col-span-1 flex justify-end sm:justify-center items-end h-full pb-1">
                    <button type="button" @click="removeDetalle(i)" class="text-danger hover:opacity-75 transition-opacity" title="Quitar detalle">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
            </div>
            <button type="button" @click="addDetalle" class="text-indigo-600 text-sm font-medium hover:underline">+ Agregar detalle</button>
        </div>
        <button type="submit" :disabled="form.processing" class="btn-primary">Guardar Compra</button>
    </form></div></AuthenticatedLayout>
</template>

