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

// ── Estado QR ─────────────────────────────────────────────
const showQrModal = ref(false);
const qrData = ref(null);
const qrStatus = ref('idle');
const qrVentaId = ref(null);
let pollTimer = null;

function startPolling() {
    stopPolling();
    pollTimer = setInterval(pollOnce, 5000);
}

async function pollOnce() {
    if (!qrData.value?.transactionId) return;
    try {
        const { data } = await axios.get(route('pagos.status', qrData.value.transactionId));
        if (data.paid) {
            qrStatus.value = 'paid';
            stopPolling();
            try {
                if (qrData.value.target === 'venta') {
                    await axios.patch(route('ventas.confirmar-pago', qrData.value.target_id));
                } else {
                    await axios.patch(route('cuotas.confirmar-pago', qrData.value.target_id));
                }
                setTimeout(() => window.location.href = route('ventas.show', qrVentaId.value), 1500);
            } catch (e) {
                console.warn('confirmarPago fallo:', e.response?.data?.error ?? e.message);
            }
        }
    } catch {
        qrStatus.value = 'error';
        stopPolling();
    }
}

function stopPolling() {
    if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
}

function cerrarQr() {
    showQrModal.value = false;
    stopPolling();
    if (qrVentaId.value) {
        window.location.href = route('ventas.show', qrVentaId.value);
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

async function submitWithPayment() {
    if (submitting.value) return;
    submitting.value = true;
    errorMsg.value = '';
    try {
        const { data } = await axios.post(route('ventas.store-with-payment'), form.value);
        qrVentaId.value = data.venta_id;
        if (data.qrs && data.qrs.length > 0) {
            qrData.value = data.qrs[0];
            qrStatus.value = 'pending';
            showQrModal.value = true;
            startPolling();
        } else {
            window.location.href = route('ventas.show', qrVentaId.value);
        }
    } catch (e) {
        errorMsg.value = e.response?.data?.errors
            ? Object.values(e.response.data.errors).flat().join(' ')
            : e.response?.data?.message || 'Error al registrar la venta y pagar.';
    } finally {
        submitting.value = false;
    }
}

</script>

<template>
    <AuthenticatedLayout>
        <Head title="Nueva Venta" />
        <div class="theme-page px-4 py-8">
            <div class="mx-auto max-w-3xl">
                <h1 class="text-2xl font-semibold mb-6 theme-section-title">
                    Nueva Venta
                </h1>

                <div v-if="errorMsg" class="mb-4 rounded px-4 py-3 text-sm alert-danger" role="alert">
                    {{ errorMsg }}
                </div>

                <div class="theme-card p-6">
                    <form @submit.prevent class="space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <!-- Fix #13: label for + id -->
                            <div class="flex items-end gap-2">
                                <div class="flex-1">
                                    <label for="venta-cliente" class="block text-sm font-medium text-secondary">Cliente</label>
                                    <select id="venta-cliente" v-model="form.cliente_id" required class="mt-1 w-full theme-input">
                                        <option value="">Seleccione…</option>
                                        <option v-for="c in clientesList" :key="c.id" :value="c.id">{{ c.name }}</option>
                                    </select>
                                </div>
                                <button type="button" @click="showClientModal = true" class="mb-1 btn-primary text-sm px-3 py-1.5 h-[42px] flex items-center">
                                    + Nuevo
                                </button>
                            </div>
                            <div>
                                <label for="venta-tipo" class="block text-sm font-medium text-secondary">Tipo</label>
                                <select id="venta-tipo" v-model="form.tipo" required class="mt-1 w-full theme-input">
                                    <option value="CONTADO">Contado</option>
                                    <option value="CREDITO">Crédito</option>
                                </select>
                            </div>
                        </div>

                        <div v-if="form.tipo === 'CREDITO'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label for="venta-nro-cuotas" class="block text-sm font-medium text-secondary">N° de Cuotas</label>
                                <input id="venta-nro-cuotas" v-model.number="form.nro_cuotas" type="number" min="1" max="24" required class="mt-1 w-full theme-input" />
                            </div>
                            <div>
                                <label for="venta-interes" class="block text-sm font-medium text-secondary">Interés (Bs.)</label>
                                <input id="venta-interes" v-model.number="form.interes" type="number" step="0.01" class="mt-1 w-full theme-input" />
                            </div>
                        </div>

                        <div>
                            <h2 class="font-medium mb-2 theme-section-title">Productos</h2>
                            <div v-for="(d, i) in form.detalles" :key="i"
                                class="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3 items-center rounded-lg border p-3 theme-divider bg-surface-alt">
                                <div class="sm:col-span-6">
                                    <label :for="`det-producto-${i}`" class="block text-xs font-medium mb-1 text-muted">Producto {{ i + 1 }}</label>
                                    <select :id="`det-producto-${i}`" v-model="d.producto_id" required class="w-full theme-input text-sm px-2 py-1.5">
                                        <option value="">Seleccione un producto…</option>
                                        <option v-for="p in productos" :key="p.id" :value="p.id">
                                            {{ p.nombre }} — Bs. {{ Number(p.precio_venta).toFixed(2) }} (Stock: {{ p.stock_actual }})
                                        </option>
                                    </select>
                                </div>
                                <div class="sm:col-span-3">
                                    <label :for="`det-cantidad-${i}`" class="block text-xs font-medium mb-1 text-muted">Cantidad</label>
                                    <input :id="`det-cantidad-${i}`" v-model.number="d.cantidad" type="number" step="0.01" min="0.01" required class="w-full theme-input text-sm px-2 py-1.5" />
                                </div>
                                <div class="sm:col-span-2 flex flex-col justify-end h-full">
                                    <span class="text-xs font-medium mb-1 text-muted">Subtotal</span>
                                    <span class="text-sm font-semibold whitespace-nowrap text-primary">
                                        Bs. {{ getSubtotal(d).toFixed(2) }}
                                    </span>
                                </div>
                                <div class="sm:col-span-1 flex justify-end sm:justify-center items-end h-full pb-1">
                                    <button type="button" @click="removeDetalle(i)"
                                        :aria-label="`Quitar producto ${i + 1}`"
                                        class="text-danger hover:opacity-75 transition-opacity">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </div>
                            <button type="button" @click="addDetalle" class="text-primary text-sm font-medium mt-1 inline-block hover:underline">+ Agregar producto</button>
                        </div>

                        <div class="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 mt-6 border-t theme-divider">
                            <div class="text-sm text-muted">
                                Total estimado: <strong class="text-primary text-lg">Bs. {{ totalEstimado.toFixed(2) }}</strong>
                                <span v-if="form.tipo === 'CREDITO' && form.nro_cuotas > 1">
                                    &middot; {{ form.nro_cuotas }} cuotas de Bs. {{ (totalEstimado / form.nro_cuotas).toFixed(2) }}
                                </span>
                            </div>
                            <div class="flex flex-col sm:flex-row gap-3">
                                <button type="button" @click="submitWithPayment" :disabled="submitting"
                                    class="btn-secondary disabled:opacity-50">
                                    Pagar y Generar QR
                                </button>
                                <button type="button" @click="submitSimple" :disabled="submitting"
                                    class="btn-primary disabled:opacity-50">
                                    {{ submitting ? 'Registrando...' : 'Registrar Venta' }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- ════════════ MODAL NUEVO CLIENTE ════════════ -->
        <Teleport to="body">
            <div v-if="showClientModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background-color: rgba(0, 0, 0, 0.55);" @click.self="showClientModal = false">
                <div class="w-full max-w-md theme-card p-6">
                    <h2 class="text-xl font-semibold mb-2 theme-section-title">Nuevo Cliente</h2>
                    <p class="text-sm mb-4 text-muted">Cree un cliente rápidamente para esta venta.</p>

                    <div v-if="clientError" class="mb-4 rounded px-4 py-2 text-sm alert-danger">{{ clientError }}</div>

                    <form @submit.prevent="createClient" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-secondary">Nombre Completo</label>
                            <input v-model="newClient.name" type="text" required class="mt-1 w-full theme-input" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-secondary">Cédula / NIT</label>
                            <input v-model="newClient.cedula" type="text" required class="mt-1 w-full theme-input" />
                            <p class="text-xs mt-1 text-muted">Se usará como contraseña por defecto.</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-secondary">Correo Electrónico</label>
                            <input v-model="newClient.email" type="email" required class="mt-1 w-full theme-input" />
                        </div>
                        <div class="flex justify-end gap-3 mt-6 pt-4 border-t theme-divider">
                            <button type="button" @click="showClientModal = false" class="btn-outline">
                                Cancelar
                            </button>
                            <button type="submit" :disabled="creatingClient" class="btn-primary disabled:opacity-50">
                                {{ creatingClient ? 'Guardando...' : 'Guardar Cliente' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Teleport>

        <!-- MODAL QR POR CUOTA / VENTA -->
        <Teleport to="body">
            <div v-if="showQrModal"
                class="fixed inset-0 z-50 flex items-center justify-center p-4"
                style="background-color: rgba(0,0,0,0.6);"
                @click.self="cerrarQr">
                <div class="relative w-full max-w-md theme-card p-8 flex flex-col items-center">

                    <!-- Boton cerrar -->
                    <button @click="cerrarQr" class="absolute top-4 right-4 rounded-full p-1.5 transition-colors bg-surface hover:bg-surface-alt border theme-divider text-muted">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>

                    <!-- Cargando -->
                    <template v-if="qrStatus === 'idle'">
                        <div class="flex flex-col items-center gap-4 py-12">
                            <svg class="animate-spin w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                            <p class="text-sm font-medium text-muted">Generando QR...</p>
                        </div>
                    </template>

                    <!-- Error -->
                    <template v-else-if="qrStatus === 'error'">
                        <div class="flex flex-col items-center gap-3 py-10">
                            <div class="alert-danger rounded-full p-4">
                                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </div>
                            <p class="text-sm font-medium text-danger">Ocurrió un error. El pago no fue verificado.</p>
                            <button @click="cerrarQr" class="mt-2 btn-outline">
                                Cerrar
                            </button>
                        </div>
                    </template>

                    <!-- QR disponible -->
                    <template v-else-if="qrData">
                        <div class="text-center mb-5 w-full">
                            <h2 class="text-xl font-bold theme-section-title">{{ qrData.label }}</h2>
                            <div class="text-4xl font-black mt-1 tracking-tight text-primary">
                                Bs. {{ Number(qrData.amount).toFixed(2) }}
                            </div>
                        </div>

                        <div class="relative w-72 h-72 rounded-2xl p-2 bg-white shadow ring-1 ring-black/5 mb-5 overflow-hidden">
                            <img v-if="qrData.qrBase64 && qrStatus !== 'paid'"
                                :src="`data:image/png;base64,${qrData.qrBase64}`"
                                alt="Codigo QR de pago"
                                class="w-full h-full object-contain" />
                            <div v-if="qrStatus === 'paid'"
                                class="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm">
                                <div class="bg-green-500 rounded-full p-5 mb-3 shadow-2xl shadow-green-500/30">
                                    <svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                                <span class="font-extrabold text-green-600 text-2xl uppercase tracking-wide">Pagado!</span>
                            </div>
                        </div>

                        <div class="text-center mb-6 w-full">
                            <span v-if="qrStatus === 'pending'"
                                class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border theme-divider bg-surface-alt text-primary">
                                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                                Esperando el pago...
                            </span>
                        </div>

                        <div class="flex gap-3 w-full">
                            <button v-if="qrStatus === 'pending'" @click="pollOnce" class="flex-1 btn-outline">
                                Refrescar
                            </button>
                            <button @click="cerrarQr" class="flex-1 btn-primary">
                                {{ qrStatus === 'paid' ? 'Listo' : 'Cerrar' }}
                            </button>
                        </div>
                    </template>
                </div>
            </div>
        </Teleport>
    </AuthenticatedLayout>
</template>

