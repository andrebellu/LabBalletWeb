<script>
    import "../app.css";
    import { page } from "$app/stores";
    import Navbar from "$lib/components/Navbar.svelte";
</script>

<div class="min-h-screen">
    <Navbar />
    <main class:pt-16={$page.url.pathname !== "/"}>
        <slot />
    </main>
</div>
