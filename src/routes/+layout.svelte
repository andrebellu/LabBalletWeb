<script>
    import "../app.css";
    import { page } from "$app/stores";
    import Navbar from "$lib/components/Navbar.svelte";
</script>

<svelte:head>
    <title>LABballet ASD – Corsi di Danza e Fitness a Dello (BS)</title>
    <meta
        name="description"
        content="LABballet ASD è un'associazione di danza e fitness a Dello (BS) con corsi per tutte le età: classica, moderna, contemporanea e altro. Scopri i nostri insegnanti e orari."
    />

    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={"https://labballet.it" + $page.url.pathname} />

    <!-- Open Graph / Social sharing -->
    <meta property="og:title" content="LABballet ASD" />
    <meta
        property="og:description"
        content="Corsi di danza classica, moderna, contemporanea e altro per ogni età."
    />
    <meta property="og:url" content="https://www.labballet.it" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />

    <!-- Preload immagine hero (LCP) -->
    <link
        rel="preload"
        as="image"
        href="/images/carosello/carosello_hercules.webp"
        fetchpriority="high"
    />

    <!-- Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Mobile / PWA readiness -->
    <meta name="theme-color" content="#ffffff" />
</svelte:head>

<div class="min-h-screen">
    {#if $page.url.pathname !== "/privacy-policy"}
        <Navbar />
    {/if}
    <main
        class:pt-24={$page.url.pathname !== "/" &&
            $page.url.pathname !== "/privacy-policy"}
    >
        <slot />
    </main>
</div>
