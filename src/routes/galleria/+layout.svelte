<script>
</script>

<div class="flex min-h-screen flex-col">
    <main class="flex-1">
        <slot />
    </main>

    <footer class="bg-base-200 text-base-content text-center py-6">
        <p class="text-sm">
            📸 Foto a cura di
            <a href="http://www.mybabyphoto.it" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-secondary">MyBabyPhoto</a>
        </p>
        <p class="text-xs text-gray-500 mt-1">© {new Date().getFullYear()} Tutti i diritti riservati.</p>
    </footer>
</div>