<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';

defineProps({
    usuarios: Object,
    filters: Object,
});

const search = ref('');

function performSearch() {
    router.get(route('usuarios.index'), { search: search.value }, { preserveState: true, replace: true });
}

const form = useForm({});

function destroy(id) {
    if (confirm('¿Eliminar este usuario?')) {
        form.delete(route('usuarios.destroy', id));
    }
}
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Usuarios" />
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <h1 class="text-2xl font-semibold theme-section-title">Usuarios</h1>
                <Link :href="route('usuarios.create')" class="btn-primary inline-flex self-start sm:self-auto">
                    Nuevo Usuario
                </Link>
            </div>

            <div class="mb-4 flex gap-2">
                <input v-model="search" type="text" placeholder="Buscar por nombre, email o carnet..." 
                       class="theme-input w-full sm:max-w-md" @keyup.enter="performSearch" />
                <button @click="performSearch" class="btn-primary">Buscar</button>
            </div>

            <div class="overflow-x-auto rounded-lg border theme-divider">
                <table class="theme-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Carnet</th>
                            <th>Celular</th>
                            <th class="text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in usuarios.data" :key="user.id">
                            <td class="font-medium">{{ user.name }}</td>
                            <td class="text-muted">{{ user.email }}</td>
                            <td>{{ user.cedula || '-' }}</td>
                            <td>{{ user.celular || '-' }}</td>
                            <td class="text-right space-x-3">
                                <Link :href="route('usuarios.edit', user.id)" class="font-medium text-primary hover:underline">Editar</Link>
                                <button @click="destroy(user.id)" class="font-medium alert-danger px-2 py-1 rounded hover:opacity-80 transition-opacity">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                        <tr v-if="!usuarios.data.length">
                            <td colspan="5" class="py-10 text-center text-muted">No hay usuarios registrados.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-6 flex justify-center" v-if="usuarios.links && usuarios.links.length > 3">
                <div class="flex flex-wrap gap-1 text-sm">
                    <Link v-for="link in usuarios.links" :key="link.label"
                          :href="link.url || '#'" v-html="link.label"
                          class="px-3 py-1.5 rounded-md border theme-divider transition-colors"
                          :style="link.active ? { backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)', color: '#fff' } : { color: 'var(--color-text)' }"
                          :class="{'opacity-50 pointer-events-none': !link.url}" />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
