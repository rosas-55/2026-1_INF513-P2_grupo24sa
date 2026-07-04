<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import axios from 'axios';

// ── Estado local ──────────────────────────────────────────
const abierto = ref(false);
const tema  = ref('jovenes');
const modo  = ref('dia');
const tamanoLetra = ref('normal');
const altoContraste = ref(false);
const guardando = ref(false);

// ── Inicializar desde props ───────────────────────────────
const propsTema = computed(() => usePage().props.tema ?? {});

function cargarDeProps() {
    if (propsTema.value.tema)           tema.value = propsTema.value.tema;
    if (propsTema.value.modo)           modo.value = propsTema.value.modo;
    if (propsTema.value.tamano_letra)   tamanoLetra.value = propsTema.value.tamano_letra;
    if (propsTema.value.alto_contraste !== undefined) altoContraste.value = propsTema.value.alto_contraste;
}

onMounted(() => {
    cargarDeProps();
    aplicarAlDom();
    document.addEventListener('click', onClickFuera);
});
watch(propsTema, cargarDeProps, { deep: true });

// ── Aplicar cambios al DOM (instantáneo) ──────────────────
function aplicarAlDom() {
    const html = document.documentElement;
    html.setAttribute('data-theme', tema.value);
    html.setAttribute('data-modo', modo.value);
    html.setAttribute('data-font-size', tamanoLetra.value);
    html.setAttribute('data-high-contrast', altoContraste.value ? 'true' : 'false');
    // Sincronizar clase 'dark' + color-scheme para Tailwind y navegador
    html.classList.toggle('dark', modo.value === 'noche');
    html.style.colorScheme = modo.value === 'noche' ? 'dark' : 'light';
}

// ── Guardar en backend ────────────────────────────────────
async function guardarPreferencias() {
    guardando.value = true;
    try {
        await axios.patch('/api/tema', {
            tema: tema.value,
            modo: modo.value,
            tamano_letra: tamanoLetra.value,
            alto_contraste: altoContraste.value,
        });

        // Actualizar el prop compartido para que persista entre navegaciones
        usePage().props.tema = {
            tema: tema.value,
            modo: modo.value,
            tamano_letra: tamanoLetra.value,
            alto_contraste: altoContraste.value,
        };
    } catch (e) {
        // Silencioso — el cambio visual ya se aplicó
    } finally {
        guardando.value = false;
    }
}

// ── Cerrar al hacer click fuera ────────────────────────────
function onClickFuera(e) {
    const el = e.target.closest('.theme-switcher');
    if (!el) abierto.value = false;
}

// ── Watchers: aplicar al DOM instantáneamente ─────────────
watch([tema, modo, tamanoLetra, altoContraste], () => {
    aplicarAlDom();
    guardarPreferencias();
});

// ── Labels ─────────────────────────────────────────────────
const temas = [
    { value: 'ninos',   label: 'Niños',   desc: 'Colores vivos y divertidos' },
    { value: 'jovenes', label: 'Jóvenes',  desc: 'Moderno y vibrante' },
    { value: 'adultos', label: 'Adultos',  desc: 'Sobrio y profesional' },
];

const tamanos = [
    { value: 'small',  label: 'A' },
    { value: 'normal', label: 'A' },
    { value: 'large',  label: 'A' },
    { value: 'xlarge', label: 'A' },
];
</script>

<template>
    <div class="theme-switcher relative">
        <!-- Botón disparador -->
        <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors"
            :style="{
                color: 'var(--color-text-secondary)',
                backgroundColor: abierto ? 'var(--color-surface-hover)' : 'transparent',
            }"
            @click.stop="abierto = !abierto"
            :aria-label="'Configuración de tema: ' + tema + ', modo ' + modo"
            :aria-expanded="abierto"
        >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
            </svg>
            <span class="hidden lg:inline">Tema</span>
            <svg class="h-3 w-3 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
        </button>

        <!-- Panel desplegable -->
        <div
            v-if="abierto"
            class="absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-xl p-4 shadow-lg ring-1 ring-black/5"
            :style="{
                backgroundColor: 'var(--color-card-bg)',
                borderColor: 'var(--color-border-light)',
                boxShadow: 'var(--shadow-lg)',
            }"
        >
            <!-- TEMA -->
            <fieldset>
                <legend class="mb-2 text-xs font-semibold uppercase tracking-wider" :style="{ color: 'var(--color-text-muted)' }">Tema</legend>
                <div class="space-y-1">
                    <label
                        v-for="t in temas" :key="t.value"
                        class="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors"
                        :style="{ backgroundColor: tema === t.value ? 'var(--color-primary-light)' : 'transparent' }"
                        @click="tema = t.value"
                    >
                        <input type="radio" :value="t.value" v-model="tema" class="sr-only" />
                        <!-- Icono por tema -->
                        <svg v-if="t.value === 'ninos'" class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                        <svg v-else-if="t.value === 'jovenes'" class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                        <svg v-else class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                        </svg>
                        <div>
                            <div class="text-sm font-medium" :style="{ color: 'var(--color-text)' }">{{ t.label }}</div>
                            <div class="text-xs" :style="{ color: 'var(--color-text-muted)' }">{{ t.desc }}</div>
                        </div>
                    </label>
                </div>
            </fieldset>

            <hr class="my-3" :style="{ borderColor: 'var(--color-border-light)' }">

            <!-- MODO DÍA/NOCHE -->
            <div class="flex items-center justify-between">
                <span class="text-xs font-semibold uppercase tracking-wider" :style="{ color: 'var(--color-text-muted)' }">Modo</span>
                <button
                    type="button"
                    class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors"
                    :style="{ backgroundColor: modo === 'noche' ? 'var(--color-primary)' : 'var(--color-border)' }"
                    @click="modo = modo === 'dia' ? 'noche' : 'dia'"
                    :aria-label="'Cambiar a modo ' + (modo === 'dia' ? 'noche' : 'día')"
                >
                    <span
                        class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs shadow-sm transition-transform"
                        :style="{ transform: modo === 'noche' ? 'translateX(1.625rem)' : 'translateX(0.125rem)' }"
                    >
                        <!-- Sol -->
                        <svg v-if="modo === 'dia'" class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                        </svg>
                        <!-- Luna -->
                        <svg v-else class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </button>
            </div>

            <hr class="my-3" :style="{ borderColor: 'var(--color-border-light)' }">

            <!-- TAMAÑO DE LETRA -->
            <div>
                <span class="mb-2 block text-xs font-semibold uppercase tracking-wider" :style="{ color: 'var(--color-text-muted)' }">Tamaño de letra</span>
                <div class="flex gap-1">
                    <button
                        v-for="tz in tamanos" :key="tz.value"
                        type="button"
                        class="flex-1 rounded-lg border py-2 text-center font-semibold transition-colors"
                        :style="{
                            backgroundColor: tamanoLetra === tz.value ? 'var(--color-primary-light)' : 'transparent',
                            borderColor: tamanoLetra === tz.value ? 'var(--color-primary)' : 'var(--color-border-light)',
                            color: 'var(--color-text)',
                            fontSize: tz.value === 'small' ? '0.75rem' : tz.value === 'normal' ? '1rem' : tz.value === 'large' ? '1.25rem' : '1.5rem',
                        }"
                        @click="tamanoLetra = tz.value"
                        :aria-label="'Tamaño ' + tz.value"
                        :aria-pressed="tamanoLetra === tz.value"
                    >{{ tz.label }}</button>
                </div>
            </div>

            <hr class="my-3" :style="{ borderColor: 'var(--color-border-light)' }">

            <!-- ALTO CONTRASTE -->
            <div class="flex items-center justify-between">
                <div>
                    <span class="text-xs font-semibold uppercase tracking-wider" :style="{ color: 'var(--color-text-muted)' }">Alto contraste</span>
                    <p class="text-xs" :style="{ color: 'var(--color-text-muted)' }">WCAG AAA</p>
                </div>
                <button
                    type="button"
                    class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors"
                    :style="{ backgroundColor: altoContraste ? 'var(--color-primary)' : 'var(--color-border)' }"
                    @click="altoContraste = !altoContraste"
                    :aria-label="'Alto contraste: ' + (altoContraste ? 'activado' : 'desactivado')"
                    :aria-pressed="altoContraste"
                >
                    <span
                        class="inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform"
                        :style="{ transform: altoContraste ? 'translateX(1.625rem)' : 'translateX(0.125rem)' }"
                    />
                </button>
            </div>

            <div v-if="guardando" class="mt-3 text-center text-xs" :style="{ color: 'var(--color-text-muted)' }">Guardando…</div>
        </div>
    </div>
</template>
