<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
    roles: Array,
    modulos: Array,
    usuarios: Array,
});

// Formularios para guardar permisos y roles
const modulosForm = useForm({
    modulos: []
});

const usuariosForm = useForm({
    roles: []
});

const selectedRole = ref(null);
const selectedUser = ref(null);

function selectRole(role) {
    selectedRole.value = role;
    modulosForm.modulos = role.modulos.map(m => m.id);
}

function selectUser(user) {
    selectedUser.value = user;
    usuariosForm.roles = user.roles.map(r => r.id);
}

function saveRoleModulos() {
    modulosForm.patch(route('seguridad.role.modulos', selectedRole.value.id), {
        preserveScroll: true,
        onSuccess: () => {
            // Actualizar el rol seleccionado con los nuevos módulos
            const role = props.roles.find(r => r.id === selectedRole.value.id);
            if (role) {
                role.modulos = props.modulos.filter(m => modulosForm.modulos.includes(m.id));
            }
        }
    });
}

function saveUserRoles() {
    usuariosForm.patch(route('seguridad.user.roles', selectedUser.value.id), {
        preserveScroll: true,
        onSuccess: () => {
            const user = props.usuarios.find(u => u.id === selectedUser.value.id);
            if (user) {
                user.roles = props.roles.filter(r => usuariosForm.roles.includes(r.id));
            }
        }
    });
}
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Seguridad y Accesos" />

        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold mb-8 theme-section-title">Seguridad y Matriz de Accesos</h1>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <!-- 1. GESTIÓN DE ROLES Y MÓDULOS -->
                <div class="theme-card p-6 flex flex-col gap-6">
                    <div>
                        <h2 class="text-xl font-semibold mb-2">Roles del Sistema</h2>
                        <p class="text-secondary text-sm">Selecciona un rol para ver y editar los módulos a los que tiene acceso.</p>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <button 
                            v-for="role in roles" 
                            :key="role.id"
                            @click="selectRole(role)"
                            :class="[
                                'px-4 py-2 rounded-md font-medium transition-colors text-sm',
                                selectedRole?.id === role.id ? 'bg-[var(--color-primary)] text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700 text-secondary hover:bg-gray-300 dark:hover:bg-gray-600'
                            ]"
                        >
                            {{ role.nombre }}
                        </button>
                    </div>

                    <div v-if="selectedRole" class="mt-4 p-4 border border-[var(--color-border-light)] rounded-lg bg-[var(--color-surface-alt)]">
                        <h3 class="font-medium text-lg mb-4">Módulos permitidos para: <span class="text-primary">{{ selectedRole.nombre }}</span></h3>
                        
                        <form @submit.prevent="saveRoleModulos" class="space-y-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label v-for="modulo in modulos" :key="modulo.id" class="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors" :style="{ borderColor: 'var(--color-border)' }">
                                    <input 
                                        type="checkbox" 
                                        :value="modulo.id" 
                                        v-model="modulosForm.modulos"
                                        class="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    >
                                    <span class="text-sm font-medium">{{ modulo.name }}</span>
                                </label>
                            </div>

                            <div class="pt-4 flex justify-end">
                                <button type="submit" class="btn-primary" :disabled="modulosForm.processing">
                                    Guardar Accesos del Rol
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- 2. GESTIÓN DE USUARIOS Y ROLES -->
                <div class="theme-card p-6 flex flex-col gap-6">
                    <div>
                        <h2 class="text-xl font-semibold mb-2">Usuarios y Roles</h2>
                        <p class="text-secondary text-sm">Selecciona un usuario para asignarle uno o más roles en el sistema.</p>
                    </div>

                    <div class="max-h-48 overflow-y-auto border rounded-md" :style="{ borderColor: 'var(--color-border-light)' }">
                        <table class="w-full text-sm text-left">
                            <thead class="bg-[var(--color-surface-alt)] sticky top-0">
                                <tr>
                                    <th class="px-4 py-2 font-medium">Nombre</th>
                                    <th class="px-4 py-2 font-medium">Email</th>
                                    <th class="px-4 py-2 font-medium">Roles Actuales</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr 
                                    v-for="user in usuarios" 
                                    :key="user.id" 
                                    @click="selectUser(user)"
                                    :class="[
                                        'cursor-pointer transition-colors border-b last:border-b-0',
                                        selectedUser?.id === user.id ? 'bg-[var(--color-primary-light)]' : 'hover:bg-[var(--color-surface-hover)]'
                                    ]"
                                    :style="{ borderColor: 'var(--color-border-light)' }"
                                >
                                    <td class="px-4 py-3 font-medium">{{ user.name }}</td>
                                    <td class="px-4 py-3 text-secondary">{{ user.email }}</td>
                                    <td class="px-4 py-3">
                                        <div class="flex flex-wrap gap-1">
                                            <span v-for="r in user.roles" :key="r.id" class="badge-primary text-xs">
                                                {{ r.nombre }}
                                            </span>
                                            <span v-if="!user.roles.length" class="text-xs text-muted italic">Sin roles</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-if="selectedUser" class="mt-4 p-4 border border-[var(--color-border-light)] rounded-lg bg-[var(--color-surface-alt)]">
                        <h3 class="font-medium text-lg mb-4">Asignar Roles a: <span class="text-primary">{{ selectedUser.name }}</span></h3>
                        
                        <form @submit.prevent="saveUserRoles" class="space-y-4">
                            <div class="flex flex-wrap gap-3">
                                <label v-for="role in roles" :key="role.id" class="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors bg-[var(--color-surface)]" :style="{ borderColor: 'var(--color-border)' }">
                                    <input 
                                        type="checkbox" 
                                        :value="role.id" 
                                        v-model="usuariosForm.roles"
                                        class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    >
                                    <span class="text-sm font-medium">{{ role.nombre }}</span>
                                </label>
                            </div>

                            <div class="pt-4 flex justify-end">
                                <button type="submit" class="btn-primary" :disabled="usuariosForm.processing">
                                    Guardar Roles del Usuario
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </AuthenticatedLayout>
</template>
