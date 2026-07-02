<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
    cuotas:    Object,
    ventas:    Array,
    filters:   Object,
    esCliente: Boolean,
});

const showQrModal   = ref(false);
const qrData        = ref(null);
const qrStatus      = ref('idle');
const qrCuotaId     = ref(null);
let pollTimer       = null;

async function pagarConQr(cuota) {
    qrData.value      = null;
    qrStatus.value    = 'idle';
    qrCuotaId.value   = cuota.id;
    showQrModal.value = true;
    try {
        const { data } = await axios.post(route('cuotas.generar-qr', cuota.id));
        qrData.value   = data;
        qrStatus.value = 'pending';
        startPolling();
    } catch (e) {
        qrStatus.value = 'error';
    }
}

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
                await axios.patch(route('cuotas.confirmar-pago', qrCuotaId.value));
                setTimeout(() => window.location.reload(), 1500);
            } catch (e) {
                console.warn('confirmarPago cuota fallo:', e.response?.data?.error ?? e.message);
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
}

function estadoClase(estado) {
    return {
        PAGADO:    'bg-green-100 text-green-800',
        PENDIENTE: 'bg-yellow-100 text-yellow-800',
        VENCIDO:   'bg-red-100 text-red-800',
    }[estado] ?? 'bg-gray-100 text-gray-700';
}

function filtrar(extra = {}) {
    const params = { estado: props.filters?.estado || '', venta_id: props.filters?.venta_id || '', ...extra };
    window.location.href = route('cuotas.index') + '?' + new URLSearchParams(params).toString();
}
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Cuotas y Pagos" />
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

            <div class="flex items-center justify-between mb-6">
                <div>
                    <h1 class="text-2xl font-bold" :style="{ color: 'var(--color-text)' }">
                        {{ esCliente ? 'Mis Cuotas' : 'Cuotas y Pagos' }}
                    </h1>
                    <p class="text-sm mt-1" :style="{ color: 'var(--color-text-muted)' }">
                        {{ esCliente ? 'Aqui puedes pagar tus cuotas con QR.' : 'Gestion de cuotas de ventas a credito.' }}
                    </p>
                </div>
            </div>

            <!-- Filtros solo para staff -->
            <div v-if="!esCliente" class="flex flex-wrap gap-3 mb-6">
                <select :value="filters?.estado" @change="filtrar({ estado: $event.target.value })"
                    class="rounded-lg border px-3 py-2 text-sm"
                    :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }">
                    <option value="">Todos los estados</option>
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="PAGADO">Pagado</option>
                    <option value="VENCIDO">Vencido</option>
                </select>
                <select :value="filters?.venta_id" @change="filtrar({ venta_id: $event.target.value })"
                    class="rounded-lg border px-3 py-2 text-sm"
                    :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }">
                    <option value="">Todas las ventas</option>
                    <option v-for="v in ventas" :key="v.id" :value="v.id">Venta #{{ v.id }} - {{ v.cliente?.name }}</option>
                </select>
            </div>

            <!-- Tabla -->
            <div class="rounded-xl border overflow-x-auto" :style="{ borderColor: 'var(--color-border-light)' }">
                <table class="min-w-full text-sm">
                    <thead :style="{ backgroundColor: 'var(--color-surface-alt)' }">
                        <tr>
                            <th class="px-4 py-3 text-left font-semibold" :style="{ color: 'var(--color-text-muted)' }">Venta</th>
                            <th v-if="!esCliente" class="px-4 py-3 text-left font-semibold" :style="{ color: 'var(--color-text-muted)' }">Cliente</th>
                            <th class="px-4 py-3 text-left font-semibold" :style="{ color: 'var(--color-text-muted)' }">N Cuota</th>
                            <th class="px-4 py-3 text-left font-semibold" :style="{ color: 'var(--color-text-muted)' }">Monto</th>
                            <th class="px-4 py-3 text-left font-semibold" :style="{ color: 'var(--color-text-muted)' }">Vencimiento</th>
                            <th class="px-4 py-3 text-left font-semibold" :style="{ color: 'var(--color-text-muted)' }">Estado</th>
                            <th class="px-4 py-3 text-right font-semibold" :style="{ color: 'var(--color-text-muted)' }">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="c in cuotas.data" :key="c.id"
                            class="border-t transition-colors hover:bg-black/5"
                            :style="{ borderColor: 'var(--color-border-light)' }">
                            <td class="px-4 py-3 font-medium" :style="{ color: 'var(--color-text)' }">#{{ c.venta_id }}</td>
                            <td v-if="!esCliente" class="px-4 py-3" :style="{ color: 'var(--color-text)' }">{{ c.venta?.cliente?.name }}</td>
                            <td class="px-4 py-3" :style="{ color: 'var(--color-text)' }">{{ c.nro_cuota }}</td>
                            <td class="px-4 py-3 font-semibold" :style="{ color: 'var(--color-text)' }">Bs. {{ Number(c.monto_fijo).toFixed(2) }}</td>
                            <td class="px-4 py-3" :style="{ color: 'var(--color-text-muted)' }">{{ c.fecha_vencimiento }}</td>
                            <td class="px-4 py-3">
                                <span class="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold" :class="estadoClase(c.estado)">
                                    {{ c.estado }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <button v-if="c.estado === 'PENDIENTE'" @click="pagarConQr(c)"
                                    class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all hover:shadow-md"
                                    :style="{ backgroundColor: 'var(--color-primary)' }">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                    Pagar con QR
                                </button>
                                <span v-else-if="c.estado === 'PAGADO'" class="text-xs text-green-600 font-semibold">Pagada</span>
                            </td>
                        </tr>
                        <tr v-if="!cuotas.data.length">
                            <td :colspan="esCliente ? 6 : 7" class="px-4 py-10 text-center text-sm" :style="{ color: 'var(--color-text-muted)' }">
                                {{ esCliente ? 'No tienes cuotas pendientes.' : 'Sin cuotas registradas.' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Paginacion -->
            <div class="mt-4 flex justify-center gap-1" v-if="cuotas.links?.length > 3">
                <Link v-for="link in cuotas.links" :key="link.label"
                    :href="link.url || '#'" v-html="link.label"
                    class="px-3 py-1 rounded-lg border text-sm transition-colors"
                    :class="{ 'opacity-40 pointer-events-none': !link.url }"
                    :style="link.active ? { backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)', color: '#fff' } : { borderColor: 'var(--color-border-light)', color: 'var(--color-text)' }" />
            </div>
        </div>

        <!-- MODAL QR POR CUOTA -->
        <Teleport to="body">
            <div v-if="showQrModal"
                class="fixed inset-0 z-50 flex items-center justify-center p-4"
                style="background-color: rgba(0,0,0,0.6);"
                @click.self="cerrarQr">
                <div class="relative w-full max-w-md rounded-2xl shadow-2xl p-8 flex flex-col items-center"
                     :style="{ backgroundColor: 'var(--color-card-bg)' }">

                    <!-- Boton cerrar -->
                    <button @click="cerrarQr"
                        class="absolute top-4 right-4 rounded-full p-1.5 transition-colors hover:bg-black/10"
                        :style="{ color: 'var(--color-text-muted)' }">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>

                    <!-- Cargando -->
                    <template v-if="qrStatus === 'idle'">
                        <div class="flex flex-col items-center gap-4 py-12">
                            <svg class="animate-spin w-10 h-10" viewBox="0 0 24 24" fill="none" :style="{ color: 'var(--color-primary)' }">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                            <p class="text-sm font-medium" :style="{ color: 'var(--color-text-muted)' }">Generando QR...</p>
                        </div>
                    </template>

                    <!-- Error -->
                    <template v-else-if="qrStatus === 'error'">
                        <div class="flex flex-col items-center gap-3 py-10">
                            <div class="bg-red-100 rounded-full p-4">
                                <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </div>
                            <p class="text-sm font-medium text-red-600">No se pudo generar el QR. Intenta de nuevo.</p>
                            <button @click="cerrarQr" class="mt-2 rounded-lg px-4 py-2 text-sm border"
                                :style="{ color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }">
                                Cerrar
                            </button>
                        </div>
                    </template>

                    <!-- QR disponible -->
                    <template v-else-if="qrData">
                        <div class="text-center mb-5 w-full">
                            <h2 class="text-xl font-bold" :style="{ color: 'var(--color-text)' }">{{ qrData.label }}</h2>
                            <div class="text-4xl font-black mt-1 tracking-tight" :style="{ color: 'var(--color-primary)' }">
                                Bs. {{ Number(qrData.amount).toFixed(2) }}
                            </div>
                        </div>

                        <div class="relative w-72 h-72 rounded-2xl p-2 bg-white shadow ring-1 ring-black/5 mb-5">
                            <img v-if="qrData.qrBase64 && qrStatus !== 'paid'"
                                :src="`data:image/png;base64,${qrData.qrBase64}`"
                                alt="Codigo QR de pago"
                                class="w-full h-full object-contain" />
                            <div v-if="qrStatus === 'paid'"
                                class="absolute inset-0 flex flex-col items-center justify-center rounded-2xl">
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
                                class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border"
                                :style="{ backgroundColor: 'var(--color-surface-alt)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }">
                                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" :style="{ color: 'var(--color-primary)' }">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg>
                                Esperando el pago...
                            </span>
                        </div>

                        <div class="flex gap-3 w-full">
                            <button v-if="qrStatus === 'pending'" @click="pollOnce"
                                class="flex-1 rounded-lg border py-2 text-sm font-medium"
                                :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border-light)' }">
                                Refrescar
                            </button>
                            <button @click="cerrarQr"
                                class="flex-1 rounded-lg py-2 text-sm font-bold text-white"
                                :class="qrStatus === 'paid' ? 'bg-green-600' : 'bg-indigo-600'">
                                {{ qrStatus === 'paid' ? 'Listo' : 'Cerrar' }}
                            </button>
                        </div>
                    </template>
                </div>
            </div>
        </Teleport>
    </AuthenticatedLayout>
</template>
