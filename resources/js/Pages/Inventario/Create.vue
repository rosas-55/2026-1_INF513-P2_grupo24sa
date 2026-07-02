<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
defineProps({ insumos: Object });
const form = useForm({ insumo_id: '', cantidad: 1, tipo_movimiento: 'ENTRADA', observacion: '', costo_unitario: 0 });
function submit() { form.post(route('inventario.store')); }
</script>
<template>
    <AuthenticatedLayout><Head title="Nuevo Movimiento" /><div class="mx-auto max-w-lg px-4 py-8"><h1 class="text-2xl font-semibold mb-6 theme-section-title">Nuevo Movimiento</h1>
    <form @submit.prevent="submit" class="space-y-4">
        <div><label class="block text-sm font-medium text-secondary">Insumo</label><select v-model="form.insumo_id" required class="mt-1 w-full theme-input"><option value="">Seleccione...</option><option v-for="i in insumos" :key="i.id" :value="i.id">{{ i.nombre }}</option></select></div>
        <div><label class="block text-sm font-medium text-secondary">Tipo</label><select v-model="form.tipo_movimiento" required class="mt-1 w-full theme-input"><option value="ENTRADA">Entrada</option><option value="SALIDA">Salida</option><option value="AJUSTE">Ajuste</option></select></div>
        <div><label class="block text-sm font-medium text-secondary">Cantidad</label><input v-model="form.cantidad" type="number" step="0.01" required class="mt-1 w-full theme-input" /></div>
        <div><label class="block text-sm font-medium text-secondary">Costo Unitario</label><input v-model="form.costo_unitario" type="number" step="0.01" required class="mt-1 w-full theme-input" /></div>
        <div><label class="block text-sm font-medium text-secondary">Observación</label><textarea v-model="form.observacion" class="mt-1 w-full theme-input"></textarea></div>
        <button type="submit" :disabled="form.processing" class="btn-primary">Registrar</button>
    </form></div></AuthenticatedLayout>
</template>

