<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    cedula: '',
    celular: '',
    password: '',
});

function submit() {
    form.post(route('usuarios.store'));
}
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Nuevo Usuario" />
        <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 class="text-2xl font-semibold mb-6 theme-section-title">Crear Usuario</h1>
            
            <div class="theme-card p-6">
                <form @submit.prevent="submit" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Nombre</label>
                        <input type="text" v-model="form.name" class="theme-input w-full" required />
                        <div v-if="form.errors.name" class="text-red-500 text-sm mt-1">{{ form.errors.name }}</div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Email</label>
                        <input type="email" v-model="form.email" class="theme-input w-full" required />
                        <div v-if="form.errors.email" class="text-red-500 text-sm mt-1">{{ form.errors.email }}</div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Carnet de Identidad</label>
                        <input type="text" v-model="form.cedula" class="theme-input w-full" required />
                        <div v-if="form.errors.cedula" class="text-red-500 text-sm mt-1">{{ form.errors.cedula }}</div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Celular</label>
                        <input type="text" v-model="form.celular" class="theme-input w-full" />
                        <div v-if="form.errors.celular" class="text-red-500 text-sm mt-1">{{ form.errors.celular }}</div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Contraseña</label>
                        <input type="password" v-model="form.password" class="theme-input w-full" required minlength="8" />
                        <div v-if="form.errors.password" class="text-red-500 text-sm mt-1">{{ form.errors.password }}</div>
                    </div>

                    <div class="pt-4 flex items-center justify-end gap-3">
                        <Link :href="route('usuarios.index')" class="text-muted hover:underline text-sm font-medium">Cancelar</Link>
                        <button type="submit" class="btn-primary" :disabled="form.processing">Guardar Usuario</button>
                    </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
