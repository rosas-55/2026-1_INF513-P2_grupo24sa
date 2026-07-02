<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import axios from 'axios';

const props = defineProps({
    clientes: Array,
    productos: Array,
});

const clientesList = ref([...props.clientes]);

// ── Form state ──────────────────────────────────────────
const form = ref({
    cliente_id: '',
    tipo: 'CONTADO',
    nro_cuotas: 0,
    interes: 0,
    detalles: [{ producto_id: '', cantidad: 1 }],
});
const submitting = ref(false);
const errorMsg = ref('');

function addDetalle() {
    form.value.detalles.push({ producto_id: '', cantidad: 1 });
}
function removeDetalle(i) {
    if (form.value.detalles.length === 1) return;
    form.value.detalles.splice(i, 1);
}

function getSubtotal(d) {
    const p = props.productos.find((x) => x.id == d.producto_id);
    if (!p) return 0;
    return (Number(p.precio_venta) || 0) * (Number(d.cantidad) || 0);
}

const totalEstimado = computed(() => {
    let t = 0;
    for (const d of form.value.detalles) {
        t += getSubtotal(d);
    }
    return t + (Number(form.value.interes) || 0);
});

// ── Creación rápida de cliente ───────────────────────────
const showClientModal = ref(false);
const newClient = ref({ name: '', email: '', cedula: '' });
const creatingClient = ref(false);
const clientError = ref('');

async function createClient() {
    if (creatingClient.value) return;
    creatingClient.value = true;
    clientError.value = '';
    try {
        const { data } = await axios.post(route('ventas.store-client'), newClient.value);
        clientesList.value.push(data);
        form.value.cliente_id = data.id;
        showClientModal.value = false;
        newClient.value = { name: '', email: '', cedula: '' };
    } catch (e) {
        clientError.value = e.response?.data?.message || 'Error al crear el cliente.';
    } finally {
        creatingClient.value = false;
    }
}

// ── Submit ─────────────────────────────────────────────
async function submitSimple() {
    if (submitting.value) return;
    submitting.value = true;
    errorMsg.value = '';
    try {
        await axios.post(route('ventas.store'), form.value);
        window.location.href = route('ventas.index');
    } catch (e) {
        errorMsg.value = e.response?.data?.errors
            ? Object.values(e.response.data.errors).flat().join(' ')
            : e.response?.data?.message || 'Error al registrar la venta.';
    } finally {
        submitting.value = false;
    }
}

</script>

<template>
    <AuthenticatedLayout>
        <Head title="Nueva Venta" />
        <div class="mx-auto max-w-3xl px-4 py-8">
            <h1 class="text-2xl font-semibold mb-6 theme-section-title" :style="{ color: 'var(--color-text)' }">
                Nueva Venta
            </h1>

            <div v-if="errorMsg" class="mb-4 rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700" role="alert">
                {{ errorMsg }}
            </div>

            <form @submit.prevent class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- Fix #13: label for + id -->
                    <div class="flex items-end gap-2">
                        <div class="flex-1">
                            <label for="venta-cliente" class="block text-sm font-medium text-secondary" :style="{ color: 'var(--color-text)' }">Cliente</label>
                            <select id="venta-cliente" v-model="form.cliente_id" required
                                class="mt-1 w-full theme-input"
                                :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }">
                                <option value="">Seleccione…</option>
                                <option v-for="c in clientesList" :key="c.id" :value="c.id">{{ c.name }}</option>
                            </select>
                        </div>
                        <button type="button" @click="showClientModal = true"
                            class="mb-1 rounded border px-3 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] hover:bg-opacity-80 transition-colors"
                            :style="{ backgroundColor: 'var(--color-primary)', color: '#ffffff', borderColor: 'var(--color-primary)' }">
                            + Nuevo
                        </button>
                    </div>
                    <div>
                        <label for="venta-tipo" class="block text-sm font-medium text-secondary" :style="{ color: 'var(--color-text)' }">Tipo</label>
                        <select id="venta-tipo" v-model="form.tipo" required
                            class="mt-1 w-full theme-input"
                            :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }">
                            <option value="CONTADO">Contado</option>
                            <option value="CREDITO">Crédito</option>
                        </select>
                    </div>
                </div>

                <div v-if="form.tipo === 'CREDITO'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="venta-nro-cuotas" class="block text-sm font-medium text-secondary" :style="{ color: 'var(--color-text)' }">N° de Cuotas</label>
                        <input id="venta-nro-cuotas" v-model.number="form.nro_cuotas" type="number" min="1" max="24" required
                            class="mt-1 w-full theme-input"
                            :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }" />
                    </div>
                    <div>
                        <label for="venta-interes" class="block text-sm font-medium text-secondary" :style="{ color: 'var(--color-text)' }">Interés (Bs.)</label>
                        <input id="venta-interes" v-model.number="form.interes" type="number" step="0.01"
                            class="mt-1 w-full theme-input"
                            :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }" />
                    </div>
                </div>

                <div>
                    <h2 class="font-medium mb-2" :style="{ color: 'var(--color-text)' }">Productos</h2>
                    <div v-for="(d, i) in form.detalles" :key="i"
                        class="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3 items-center rounded-lg border p-3"
                        :style="{ borderColor: 'var(--color-border-light)', backgroundColor: 'var(--color-surface-alt)' }">
                        <div class="sm:col-span-6">
                            <label :for="`det-producto-${i}`" class="block text-xs font-medium mb-1" :style="{ color: 'var(--color-text-muted)' }">Producto {{ i + 1 }}</label>
                            <select :id="`det-producto-${i}`" v-model="d.producto_id" required
                                class="w-full rounded-md border px-2 py-1.5 text-sm"
                                :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }">
                                <option value="">Seleccione un producto…</option>
                                <option v-for="p in productos" :key="p.id" :value="p.id">
                                    {{ p.nombre }} — Bs. {{ Number(p.precio_venta).toFixed(2) }} (Stock: {{ p.stock_actual }})
                                </option>
                            </select>
                        </div>
                        <div class="sm:col-span-3">
                            <label :for="`det-cantidad-${i}`" class="block text-xs font-medium mb-1" :style="{ color: 'var(--color-text-muted)' }">Cantidad</label>
                            <input :id="`det-cantidad-${i}`" v-model.number="d.cantidad" type="number" step="0.01" min="0.01" required
                                class="w-full rounded-md border px-2 py-1.5 text-sm"
                                :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }" />
                        </div>
                        <div class="sm:col-span-2 flex flex-col justify-end h-full">
                            <span class="text-xs font-medium mb-1" :style="{ color: 'var(--color-text-muted)' }">Subtotal</span>
                            <span class="text-sm font-semibold whitespace-nowrap" :style="{ color: 'var(--color-text)' }">
                                Bs. {{ getSubtotal(d).toFixed(2) }}
                            </span>
                        </div>
                        <div class="sm:col-span-1 flex justify-end sm:justify-center items-end h-full">
                            <button type="button" @click="removeDetalle(i)"
                                :aria-label="`Quitar producto ${i + 1}`"
                                class="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                    </div>
                    <button type="button" @click="addDetalle"
                        class="text-indigo-600 text-sm mt-1 inline-block">+ Agregar producto</button>
                </div>

                <div class="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t"
                    :style="{ borderColor: 'var(--color-border-light)' }">
                    <div class="text-sm" :style="{ color: 'var(--color-text-muted)' }">
                        Total estimado: <strong :style="{ color: 'var(--color-text)' }">Bs. {{ totalEstimado.toFixed(2) }}</strong>
                        <span v-if="form.tipo === 'CREDITO' && form.nro_cuotas > 1">
                            &middot; {{ form.nro_cuotas }} cuotas de Bs. {{ (totalEstimado / form.nro_cuotas).toFixed(2) }}
                        </span>
                    </div>
                    <button type="button" @click="submitSimple" :disabled="submitting"
                        class="rounded-lg px-6 py-2.5 text-sm font-bold text-white disabled:opacity-50 transition-colors shadow-md"
                        :style="{ backgroundColor: 'var(--color-primary)' }">
                        {{ submitting ? 'Registrando...' : 'Registrar Venta' }}
                    </button>
                </div>
            </form>
        </div>

        <!-- ════════════ MODAL NUEVO CLIENTE ════════════ -->
        <Teleport to="body">
            <div v-if="showClientModal" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4" style="background-color: rgba(0, 0, 0, 0.55);" @click.self="showClientModal = false">
                <div class="w-full max-w-md rounded-xl shadow-2xl p-6" :style="{ backgroundColor: 'var(--color-card-bg)' }">
                    <h2 class="text-xl font-semibold mb-4" :style="{ color: 'var(--color-text)' }">Nuevo Cliente</h2>
                    <p class="text-sm mb-4" :style="{ color: 'var(--color-text-muted)' }">Cree un cliente rápidamente para esta venta.</p>

                    <div v-if="clientError" class="mb-4 rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">{{ clientError }}</div>

                    <form @submit.prevent="createClient" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-secondary" :style="{ color: 'var(--color-text)' }">Nombre Completo</label>
                            <input v-model="newClient.name" type="text" required
                                class="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)]"
                                :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-secondary" :style="{ color: 'var(--color-text)' }">Cédula / NIT</label>
                            <input v-model="newClient.cedula" type="text" required
                                class="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)]"
                                :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }" />
                            <p class="text-xs mt-1" :style="{ color: 'var(--color-text-muted)' }">
                                Se usará como contraseña por defecto.
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-secondary" :style="{ color: 'var(--color-text)' }">Correo Electrónico</label>
                            <input v-model="newClient.email" type="email" required
                                class="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)]"
                                :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }" />
                        </div>
                        <div class="flex justify-end gap-3 mt-6 pt-4 border-t" :style="{ borderColor: 'var(--color-border-light)' }">
                            <button type="button" @click="showClientModal = false"
                                class="rounded border px-4 py-2 text-sm font-medium hover:bg-opacity-80 transition-colors"
                                :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }">
                                Cancelar
                            </button>
                            <button type="submit" :disabled="creatingClient"
                                class="rounded px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 hover:bg-opacity-90 transition-colors"
                                :style="{ backgroundColor: 'var(--color-primary)' }">
                                {{ creatingClient ? 'Guardando...' : 'Guardar Cliente' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Teleport>
    </AuthenticatedLayout>
</template>
