<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';

const props = defineProps({
    bitacoras: Object,
    filtros: Object,
});

const form = ref({
    tipo: props.filtros.tipo || '',
    user_id: props.filtros.user_id || '',
});

// Watch para buscar automáticamente cuando cambian los filtros
watch(form, (value) => {
    router.get(route('bitacora.index'), value, {
        preserveState: true,
        replace: true,
    });
}, { deep: true });

function formatDate(dateString) {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleString('es-BO', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Bitácora de Auditoría" />

        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold mb-6 theme-section-title">Bitácora de Auditoría</h1>
            
            <div class="theme-card p-6">
                <!-- Filtros -->
                <div class="mb-6 flex flex-col sm:flex-row gap-4 bg-[var(--color-surface-alt)] p-4 rounded-lg border" :style="{ borderColor: 'var(--color-border-light)' }">
                    <div class="flex-1">
                        <label class="block text-sm font-medium text-secondary mb-1">Filtrar por Acción</label>
                        <select v-model="form.tipo" class="w-full theme-input text-sm">
                            <option value="">Todas las acciones</option>
                            <option value="LOGIN">Inicio de Sesión (LOGIN)</option>
                            <option value="LOGOUT">Cierre de Sesión (LOGOUT)</option>
                            <option value="ACCESO">Acceso a Módulo</option>
                            <option value="ERROR">Errores / Accesos Denegados</option>
                            <option value="PAGO_QR">Pagos QR</option>
                        </select>
                    </div>
                    <div class="flex-1">
                        <label class="block text-sm font-medium text-secondary mb-1">ID de Usuario</label>
                        <input v-model="form.user_id" type="number" placeholder="Ej. 1" class="w-full theme-input text-sm">
                    </div>
                    <div class="flex items-end">
                        <button @click="form.tipo = ''; form.user_id = ''" class="btn-outline text-sm h-[38px]">
                            Limpiar Filtros
                        </button>
                    </div>
                </div>

                <!-- Tabla de Logs -->
                <div class="overflow-x-auto border rounded-md" :style="{ borderColor: 'var(--color-border-light)' }">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-[var(--color-surface-alt)]">
                            <tr>
                                <th class="px-4 py-3 font-medium">Fecha y Hora</th>
                                <th class="px-4 py-3 font-medium">Usuario</th>
                                <th class="px-4 py-3 font-medium">Tipo</th>
                                <th class="px-4 py-3 font-medium">Recurso / Detalle</th>
                                <th class="px-4 py-3 font-medium">IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                v-for="log in bitacoras.data" 
                                :key="log.id" 
                                class="border-b last:border-b-0 hover:bg-[var(--color-surface-hover)] transition-colors"
                                :style="{ borderColor: 'var(--color-border-light)' }"
                            >
                                <td class="px-4 py-3 whitespace-nowrap">{{ formatDate(log.created_at) }}</td>
                                <td class="px-4 py-3">
                                    <span v-if="log.user" class="font-medium text-primary">{{ log.user.name }}</span>
                                    <span v-else class="text-muted italic">Anónimo</span>
                                </td>
                                <td class="px-4 py-3">
                                    <span :class="[
                                        'px-2 py-1 text-xs font-semibold rounded-full',
                                        log.tipo === 'LOGIN' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                                        log.tipo === 'ERROR' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                    ]">
                                        {{ log.tipo }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-secondary max-w-md truncate" :title="log.recurso">
                                    {{ log.recurso }}
                                </td>
                                <td class="px-4 py-3 font-mono text-xs text-muted">{{ log.ip_address }}</td>
                            </tr>
                            <tr v-if="bitacoras.data.length === 0">
                                <td colspan="5" class="px-4 py-8 text-center text-muted">
                                    No se encontraron registros de auditoría.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Paginación Simple -->
                <div v-if="bitacoras.links && bitacoras.data.length > 0" class="mt-6 flex justify-center gap-1">
                    <Link
                        v-for="(link, k) in bitacoras.links"
                        :key="k"
                        :href="link.url || '#'"
                        v-html="link.label"
                        class="px-3 py-1 rounded border text-sm"
                        :class="[
                            link.active ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-transparent text-secondary border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]',
                            !link.url && 'opacity-50 cursor-not-allowed'
                        ]"
                    />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
