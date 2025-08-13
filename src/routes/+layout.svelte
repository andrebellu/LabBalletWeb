<script>
    import "../app.css";
    import { page } from "$app/stores";
    import Navbar from "$lib/components/Navbar.svelte";

    const metaConfig = {
        "/": {
            title: "LABballet ASD – Associazione di Danza e Fitness a Dello (BS)",
            description:
                "LABballet ASD è un'associazione di danza di Dello (BS) con corsi per bambini e adulti: danza classica, moderna, pilates e fitness. Scopri i nostri insegnanti e orari.",
            canonical: "https://labballet.it/",
        },
        "/danza": {
            title: "Corsi di Danza – LABballet ASD",
            description:
                "Scopri tutti i corsi di danza di LABballet ASD a Dello (BS), per ogni età e livello: classica, moderna e altro.",
            canonical: "https://labballet.it/danza",
        },
        "/fitness": {
            title: "Corsi di Fitness – LABballet ASD",
            description:
                "LABballet ASD offre corsi di fitness a Dello (BS): allenamento per migliorare il tuo benessere.",
            canonical: "https://labballet.it/fitness",
        },
        "/galleria": {
            title: "Galleria Fotografica – LABballet ASD",
            description:
                "Scopri la galleria fotografica di LABballet ASD. Guarda le foto dei nostri saggi.",
            canonical: "https://labballet.it/galleria",
        },
    };

    $: currentMeta = metaConfig[$page.url.pathname] || {
        title: "LABballet ASD – Associazione di Danza e Fitness",
        description:
            "LABballet ASD propone corsi di danza e fitness a Dello (BS) per tutte le età.",
        canonical: "https://labballet.it" + $page.url.pathname,
    };
</script>

<svelte:head>
    <title>{currentMeta.title}</title>
    <meta name="description" content={currentMeta.description} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={currentMeta.canonical} />

    <!-- Open Graph -->
    <meta property="og:title" content={currentMeta.title} />
    <meta property="og:description" content={currentMeta.description} />
    <meta property="og:url" content={currentMeta.canonical} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />

    <!-- Preload hero image (LCP) solo in home -->
    {#if $page.url.pathname === "/"}
        <link
            rel="preload"
            as="image"
            href="/images/carosello/carosello_hercules.webp"
            fetchpriority="high"
        />
    {/if}

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
