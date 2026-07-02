<script setup>
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div
        class="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0"
        :style="{ backgroundColor: 'var(--color-surface-alt)' }"
    >
        <!-- Logo -->
        <div>
            <Link href="/">
                <ApplicationLogo
                    class="h-20 w-20 fill-current"
                    :style="{ color: 'var(--color-primary)' }"
                />
            </Link>
        </div>

        <!-- Card -->
        <div
            class="mt-6 w-full overflow-hidden px-6 py-4 shadow-md sm:max-w-md sm:rounded-xl"
            :style="{
                backgroundColor: 'var(--color-card-bg)',
                borderColor: 'var(--color-border-light)',
                border: '1px solid',
            }"
        >
            <slot />
        </div>

        <!-- Footer for Guest -->
        <footer class="mt-8 py-4 text-center w-full pb-8">
            <p class="text-sm" :style="{ color: 'var(--color-text-muted)' }">
                &copy; {{ new Date().getFullYear() }} Grupo 24SA &mdash; INF-513 Tecnolog&iacute;a Web
                <span class="mx-2">·</span>
                <span>Visitas: <strong :style="{ color: 'var(--color-text)' }">{{ $page.props.visitas ?? 0 }}</strong></span>
            </p>
        </footer>
    </div>
</template>
