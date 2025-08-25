<script>
    import "../app.css";
    import { page } from "$app/stores";
    import Navbar from "$lib/components/Navbar.svelte";

    const metaConfig = {
        "/": {
            title: "LABballet ASD - Associazione di Danza Classica e Moderna a Dello (BS)",
            description:
                "LABballet ASD è l'associazione di danza a Dello (Brescia) con corsi di classica, moderna e fitness per tutte le età. Scopri i nostri insegnanti qualificati e le attività per bambini, ragazzi e adulti.",
            canonical: "https://labballet.it/",
        },
        "/danza": {
            title: "Corsi di Danza Classica e Moderna | LABballet ASD Dello",
            description:
                "Corsi di danza classica e moderna a Dello (BS): lezioni per bambini, ragazzi e adulti, principianti e avanzati. Insegnanti certificati e ambiente professionale.",
            canonical: "https://labballet.it/danza",
        },
        "/fitness": {
            title: "Corsi Fitness e Benessere | LABballet ASD Dello",
            description:
                "Ginnastica pilates barre, ginnastica pilates miofasciale posturale e body tonic per adulti a Dello (Brescia). Programmi personalizzati per il benessere fisico e mentale, con istruttori esperti.",
            canonical: "https://labballet.it/fitness",
        },
        "/galleria": {
            title: "Galleria Fotografica | LABballet ASD Dello",
            description:
                "Sfoglia la galleria fotografica di LABballet ASD: immagini di spettacoli, saggi, eventi e momenti speciali di LABballet a Dello (BS).",
            canonical: "https://labballet.it/galleria",
        },
        "/stage": {
            title: "Stage e Workshop di Danza | LABballet ASD",
            description:
                "Partecipa agli stage e workshop di danza classica, moderna e contemporanea con maestri ospiti e professionisti del settore. Occasioni di crescita e perfezionamento a Dello (BS).",
            canonical: "https://labballet.it/stage",
        },
        "/privacy-policy": {
            title: "Privacy Policy | LABballet ASD Dello",
            description:
                "Informativa sulla privacy di LABballet ASD: scopri come trattiamo i tuoi dati personali e tuteliamo la tua riservatezza secondo la normativa vigente.",
            canonical: "https://labballet.it/privacy-policy",
        },
    };

    $: currentMeta = metaConfig[$page.url.pathname] || {
        title: "LABballet ASD - Associazione di Danza e Fitness a Dello (BS)",
        description:
            "Associazione sportiva dilettantistica specializzata in corsi di danza e fitness per tutte le età a Dello, provincia di Brescia.",
        canonical: "https://labballet.it" + $page.url.pathname,
        ogImage: "/images/og-default.jpg",
    };

    // Schema.org structured data
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "SportsOrganization",
        name: "LABballet ASD",
        description: "Associazione sportiva dilettantistica di danza e fitness",
        url: "https://labballet.it",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Via Borgo Belvedere, 10",
            addressLocality: "Dello",
            addressRegion: "BS",
            postalCode: "25020",
            addressCountry: "IT",
        },
        telephone: "+39-347-0558313",
    };
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
    <title>{currentMeta.title}</title>
    <meta name="description" content={currentMeta.description} />
    <meta
        name="keywords"
        content="danza classica, danza moderna, fitness, ginnastica pilates, dello brescia, corsi danza bambini, associazione danza, labballet"
    />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="author" content="LABballet ASD" />
    <link rel="canonical" href={currentMeta.canonical} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={currentMeta.canonical} />
    <meta property="og:title" content={currentMeta.title} />
    <meta property="og:description" content={currentMeta.description} />
    <meta property="og:image" content={currentMeta.ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="it_IT" />
    <meta property="og:site_name" content="LABballet ASD" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={currentMeta.title} />
    <meta name="twitter:description" content={currentMeta.description} />
    <meta name="twitter:image" content={currentMeta.ogImage} />

    <!-- Structured Data -->
    <!-- <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
    </script> -->

    <!-- Preload critical resources -->
    {#if $page.url.pathname === "/"}
        <link
            rel="preload"
            as="image"
            href="/images/carosello/carosello_hercules.webp"
            fetchpriority="high"
        />
    {/if}

    <!-- Font Preloading -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
    />
    <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        as="style"
        on:load={(e) => {
            e.target.onload = null;
            e.target.rel = "stylesheet";
        }}
    />
    <noscript
        ><link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        /></noscript
    >

    <!-- PWA / Mobile -->
    <meta name="theme-color" content="#8B5CF6" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="format-detection" content="telephone=no" />

    <!-- Geo tags -->
    <meta name="geo.region" content="IT-BS" />
    <meta name="geo.placename" content="Dello" />
    <meta name="geo.position" content="45.4215;10.0766" />
    <meta name="ICBM" content="45.4215, 10.0766" />
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
