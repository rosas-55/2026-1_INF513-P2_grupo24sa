<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';

const abierto = ref(false);        // dropdown abierto
const query = ref('');
const loading = ref(false);
const groups = ref({});
const errorMsg = ref('');
let debounceTimer = null;
let controller = null;
const root = ref(null);
const inputEl = ref(null);

// ── Etiquetas legibles por grupo ─────────────────────────
const labels = {
    productos:   'Productos',
    insumos:     'Insumos',
    proveedores: 'Proveedores',
    ventas:      'Ventas',
    compras:     'Compras',
};

const totalResultados = computed(
    () => Object.values(groups.value).reduce((acc, arr) => acc + arr.length, 0)
);

const groupEntries = computed(() =>
    Object.entries(groups.value).map(([key, items]) => ({
        key,
        label: labels[key] ?? key,
        items,
    }))
);

// ── Debounce + cancelable fetch ──────────────────────────
watch(query, (q) => {
    clearTimeout(debounceTimer);
    if (controller) controller.abort();
    errorMsg.value = ''; // limpiar error de fetch previo

    const term = q.trim();
    if (term.length < 2) {
        groups.value = {};
        loading.value = false;
        return;
    }

    loading.value = true;
    debounceTimer = setTimeout(async () => {
        controller = new AbortController();
        try {
            const { data } = await axios.get('/buscar', {
                params: { q: term },
                signal: controller.signal,
            });
            groups.value = data.groups ?? {};
            errorMsg.value = '';
        } catch (e) {
            // axios.isCancel cubre tanto CanceledError (axios) como AbortError (AbortController nativo)
            if (!axios.isCancel(e)) {
                errorMsg.value = 'Error al buscar';
                groups.value = {};
            }
        } finally {
            loading.value = false;
        }
    }, 250);
});

// ── Abrir / cerrar dropdown ──────────────────────────────
function abrir() {
    abierto.value = true;
    nextTick(() => inputEl.value?.focus());
}
function cerrar() {
    abierto.value = false;
}
function limpiar() {
    query.value = '';
    groups.value = {};
    inputEl.value?.focus();
}

function ir(resultado) {
    cerrar();
    query.value = '';
    groups.value = {};
    router.visit(resultado.url);
}

// ── Cerrar con Escape o click fuera ──────────────────────
function onKeydown(e) {
    if (e.key === 'Escape') cerrar();
}
function onClickFuera(e) {
    if (root.value && !root.value.contains(e.target)) cerrar();
}

onMounted(() => {
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', onClickFuera);
});
onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onClickFuera);
    clearTimeout(debounceTimer);
    if (controller) controller.abort();
});

defineExpose({ abrir });
</script>

<template>
    <div ref="root" class="relative w-full lg:w-64">
        <div class="relative">
            <!-- Icono lupa -->
            <span
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                :style="{ color: 'var(--color-text-muted)' }"
                aria-hidden="true"
            >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-4.35-4.35M16 10.5A5.5 5.5 0 1 1 5 10.5a5.5 5.5 0 0 1 11 0z" />
                </svg>
            </span>

            <input
                ref="inputEl"
                v-model="query"
                type="search"
                role="combobox"
                :aria-expanded="abierto && (loading || totalResultados > 0 || query.length >= 2)"
                aria-controls="global-search-listbox"
                aria-autocomplete="list"
                :aria-label="'Búsqueda global'"
                placeholder="Buscar productos, ventas…"
                autocomplete="off"
                @focus="abrir"
                class="block w-full rounded-md border py-2 pl-9 pr-9 text-sm transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                :style="{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    borderColor: 'var(--color-border-light)',
                }"
            />

            <!-- Spinner / botón limpiar -->
            <span class="absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                    v-if="loading"
                    class="h-4 w-4 animate-spin"
                    :style="{ color: 'var(--color-primary)' }"
                    fill="none" viewBox="0 0 24 24" aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25" />
                    <path fill="currentColor" d="M4 12a8 8 0 0 1 8-8v3a5 5 0 0 0-5 5H4z" class="opacity-75" />
                </svg>
                <button
                    v-else-if="query.length > 0"
                    type="button"
                    aria-label="Limpiar búsqueda"
                    @click="limpiar"
                    class="rounded p-1 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                    :style="{ color: 'var(--color-text-muted)' }"
                >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </span>
        </div>

        <!-- Dropdown -->
        <div
            v-if="abierto && (loading || query.length >= 2)"
            id="global-search-listbox"
            role="listbox"
            class="absolute left-0 right-0 z-50 mt-1 max-h-96 overflow-y-auto rounded-md border shadow-lg sm:right-auto sm:w-96"
            :style="{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border-light)',
            }"
        >
            <!-- Estado vacío -->
            <div
                v-if="!loading && totalResultados === 0 && query.length >= 2 && !errorMsg"
                class="px-4 py-6 text-center text-sm"
                :style="{ color: 'var(--color-text-muted)' }"
            >
                Sin resultados para «{{ query }}»
            </div>

            <div
                v-else-if="errorMsg"
                class="px-4 py-6 text-center text-sm"
                :style="{ color: 'var(--color-error, #b91c1c)' }"
            >
                {{ errorMsg }}
            </div>

            <div
                v-else-if="query.length < 2"
                class="px-4 py-6 text-center text-sm"
                :style="{ color: 'var(--color-text-muted)' }"
            >
                Escribe al menos 2 caracteres…
            </div>

            <!-- Resultados por grupo -->
            <div v-for="group in groupEntries" :key="group.key">
                <div
                    class="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide"
                    :style="{ color: 'var(--color-text-muted)' }"
                >
                    {{ group.label }}
                </div>
                <button
                    v-for="item in group.items"
                    :key="`${group.key}-${item.id}`"
                    type="button"
                    role="option"
                    @click="ir(item)"
                    class="flex w-full flex-col gap-0.5 px-4 py-2 text-left text-sm transition-colors duration-100 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                    :style="{ color: 'var(--color-text)' }"
                    @mouseenter="$event.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'"
                    @mouseleave="$event.currentTarget.style.backgroundColor = 'transparent'"
                >
                    <span class="font-medium">{{ item.title }}</span>
                    <span class="text-xs" :style="{ color: 'var(--color-text-muted)' }">
                        {{ item.subtitle }}
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>
