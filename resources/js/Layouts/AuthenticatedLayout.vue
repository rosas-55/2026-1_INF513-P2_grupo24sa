<script setup>
import { ref } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import DynamicMenu from '@/Components/DynamicMenu.vue';
import GlobalSearch from '@/Components/GlobalSearch.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import ThemeSwitcher from '@/Components/ThemeSwitcher.vue';
import { Link } from '@inertiajs/vue3';

const showingNavigationDropdown = ref(false);
</script>

<template>
    <div class="theme-page">
        <div class="min-h-screen" :style="{ backgroundColor: 'var(--color-surface-alt)' }">

            <!-- ═══════════════════════════════════════════════════════════════════
                 NAVBAR — Layout de 2 filas para evitar solapamiento cuando hay
                 muchos módulos en el menú dinámico (hasta 13 ítems en este proyecto).

                 Fila 1: Logo │ Buscador (flexible) │ ThemeSwitcher │ Usuario ▾
                 Fila 2: DynamicMenu (scrollable horizontal, todos los módulos)

                 En móvil (<sm): solo Logo + Hamburguesa visible.
                 El menú desplegable del hamburger tiene todo lo demás.
                 ═══════════════════════════════════════════════════════════════════ -->
            <nav class="theme-nav border-b" :style="{ borderColor: 'var(--color-border-light)' }">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <!-- ── FILA 1: Topbar (Logo + Acciones) ──────────────────── -->
                    <div class="flex h-14 items-center justify-between gap-3">

                        <!-- Logo -->
                        <div class="flex shrink-0 items-center">
                            <Link :href="route('dashboard')" aria-label="Ir al inicio">
                                <ApplicationLogo
                                    class="block h-8 w-auto fill-current"
                                    :style="{ color: 'var(--color-primary)' }"
                                />
                            </Link>
                        </div>

                        <!-- Buscador global — ocupa el espacio disponible en desktop -->
                        <div class="hidden flex-1 lg:block lg:max-w-sm xl:max-w-md">
                            <GlobalSearch />
                        </div>

                        <!-- Acciones de usuario (desktop) -->
                        <div class="hidden shrink-0 items-center gap-1 sm:flex">
                            <ThemeSwitcher />

                            <!-- Dropdown del usuario -->
                            <div class="relative ms-1">
                                <Dropdown align="right" width="48">
                                    <template #trigger>
                                        <button
                                            type="button"
                                            class="user-btn inline-flex max-w-[9rem] items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium leading-5 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                                            :style="{
                                                backgroundColor: 'var(--color-surface)',
                                                color: 'var(--color-text-secondary)',
                                                borderColor: 'var(--color-border-light)',
                                            }"
                                        >
                                            <span class="min-w-0 truncate">
                                                {{ $page.props.auth.user.name }}
                                            </span>
                                            <svg
                                                class="h-4 w-4 shrink-0"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </template>

                                    <template #content>
                                        <!-- Info del usuario en el dropdown -->
                                        <div class="border-b px-4 py-2" :style="{ borderColor: 'var(--color-border-light)' }">
                                            <p class="truncate text-xs font-semibold" :style="{ color: 'var(--color-text)' }">
                                                {{ $page.props.auth.user.name }}
                                            </p>
                                            <p class="truncate text-xs" :style="{ color: 'var(--color-text-muted)' }">
                                                {{ $page.props.auth.user.email }}
                                            </p>
                                        </div>
                                        <DropdownLink :href="route('profile.edit')">
                                            Perfil
                                        </DropdownLink>
                                        <DropdownLink
                                            :href="route('logout')"
                                            method="post"
                                            as="button"
                                        >
                                            Cerrar sesión
                                        </DropdownLink>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <!-- Botón hamburguesa (solo móvil <sm) -->
                        <div class="flex items-center sm:hidden">
                            <button
                                @click="showingNavigationDropdown = !showingNavigationDropdown"
                                aria-label="Abrir menú de navegación"
                                :aria-expanded="showingNavigationDropdown"
                                class="inline-flex items-center justify-center rounded-md p-2 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                                :style="{ color: 'var(--color-text-secondary)' }"
                            >
                                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        :class="{ hidden: showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown }"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        :class="{ hidden: !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- ── FILA 2: Menú de módulos (solo desktop ≥sm) ──────────
                         overflow-x-auto permite scroll horizontal en pantallas
                         medianas sin romper el layout ni solapar elementos.
                    ─────────────────────────────────────────────────────────── -->
                    <div
                        class="hidden border-t sm:block"
                        :style="{ borderColor: 'var(--color-border-light)' }"
                    >
                        <div class="nav-menu-row overflow-x-auto">
                            <DynamicMenu />
                        </div>
                    </div>
                </div>

                <!-- ── Menú responsive (hamburguesa abierto, solo <sm) ──────── -->
                <div v-show="showingNavigationDropdown" class="sm:hidden">

                    <!-- Búsqueda -->
                    <div class="px-4 pt-3 pb-2">
                        <GlobalSearch />
                    </div>

                    <!-- Módulos de navegación -->
                    <div class="space-y-1 pb-2 pt-1">
                        <DynamicMenu mobile />
                    </div>

                    <!-- ThemeSwitcher -->
                    <div class="border-t px-4 py-2" :style="{ borderColor: 'var(--color-border-light)' }">
                        <ThemeSwitcher />
                    </div>

                    <!-- Usuario -->
                    <div class="border-t pb-2 pt-3" :style="{ borderColor: 'var(--color-border-light)' }">
                        <div class="px-4 pb-2">
                            <p class="truncate text-sm font-medium" :style="{ color: 'var(--color-text)' }">
                                {{ $page.props.auth.user.name }}
                            </p>
                            <p class="truncate text-xs" :style="{ color: 'var(--color-text-muted)' }">
                                {{ $page.props.auth.user.email }}
                            </p>
                        </div>
                        <div class="space-y-1">
                            <ResponsiveNavLink :href="route('profile.edit')">
                                Perfil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('logout')" method="post" as="button">
                                Cerrar sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Encabezado de página (slot opcional) -->
            <header class="theme-header shadow-sm" v-if="$slots.header">
                <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <!-- Contenido principal -->
            <main>
                <slot />
            </main>

            <!-- Footer -->
            <footer class="theme-footer py-4 text-center">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <p class="text-sm" :style="{ color: 'var(--color-text-muted)' }">
                        &copy; {{ new Date().getFullYear() }} Grupo 24SA &mdash; INF-513 Tecnolog&iacute;a Web
                        <span class="mx-2">·</span>
                        <span>Visitas: <strong :style="{ color: 'var(--color-text)' }">{{ $page.props.visitas ?? 0 }}</strong></span>
                    </p>
                </div>
            </footer>
        </div>
    </div>
</template>
