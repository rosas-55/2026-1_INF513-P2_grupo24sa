<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
    ventas: Object,
    clientes: Array,
    filters: Object
});

const form = useForm({});

function destroy(id) {
    if (confirm('¿Eliminar esta venta?')) {
        form.delete(route('ventas.destroy', id));
    }
}
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Ventas" />
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <h1 class="text-2xl font-semibold theme-section-title">Ventas</h1>
                <Link :href="route('ventas.create')" class="btn-primary inline-flex self-start sm:self-auto">
                    Nueva Venta
                </Link>
            </div>

            <form class="mb-4 flex flex-col sm:flex-row flex-wrap gap-2">
                <select v-model="filters.cliente_id" class="w-full sm:w-auto theme-input text-sm"
                        @change="$inertia.get(route('ventas.index'), { cliente_id: $event.target.value, estado: filters.estado }, { preserveState: true, replace: true })">
                    <option value="">Todos los clientes</option>
                    <option v-for="c in clientes" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
                <select v-model="filters.estado" class="w-full sm:w-auto theme-input text-sm"
                        @change="$inertia.get(route('ventas.index'), { estado: $event.target.value, cliente_id: filters.cliente_id }, { preserveState: true, replace: true })">
                    <option value="">Todos los estados</option>
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="PAGADA">Pagada</option>
                    <option value="COMPLETADO">Completado</option>
                    <option value="ANULADO">Anulado</option>
                </select>
            </form>

            <div class="overflow-x-auto rounded-lg border theme-divider">
                <table class="theme-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Tipo</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th class="text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="v in ventas.data" :key="v.id">
                            <td class="font-medium text-primary">#{{ v.id }}</td>
                            <td>{{ v.cliente?.name }}</td>
                            <td>{{ v.tipo }}</td>
                            <td class="font-semibold">Bs. {{ Number(v.total).toFixed(2) }}</td>
                            <td>
                                <span class="badge-primary" :class="{'alert-success px-2 py-1 rounded': v.estado === 'PAGADA', 'alert-warning px-2 py-1 rounded': v.estado === 'PENDIENTE'}">
                                    {{ v.estado }}
                                </span>
                            </td>
                            <td class="text-muted">{{ v.fecha }}</td>
                            <td class="text-right space-x-3">
                                <Link :href="route('ventas.show', v.id)" class="font-medium text-primary hover:underline">Ver</Link>
                                <button v-if="v.estado === 'PENDIENTE'" @click="destroy(v.id)" class="font-medium alert-danger px-2 py-1 rounded hover:opacity-80 transition-opacity">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                        <tr v-if="!ventas.data.length">
                            <td colspan="7" class="py-10 text-center text-muted">Sin ventas.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-6 flex justify-center" v-if="ventas.links && ventas.links.length > 3">
                <div class="flex flex-wrap gap-1 text-sm">
                    <Link v-for="link in ventas.links" :key="link.label"
                          :href="link.url || '#'" v-html="link.label"
                          class="px-3 py-1.5 rounded-md border theme-divider transition-colors"
                          :style="link.active ? { backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)', color: '#fff' } : { color: 'var(--color-text)' }"
                          :class="{'opacity-50 pointer-events-none': !link.url}" />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
