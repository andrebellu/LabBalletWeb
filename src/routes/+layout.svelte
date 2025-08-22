<script>
    import "../app.css";
    import { page } from "$app/stores";
    import Navbar from "$lib/components/Navbar.svelte";

    const metaConfig = {
        "/": {
            title: "LABballet ASD - Associazione di Danza Classica e Moderna a Dello (BS)",
            description:
                "Corsi di danza classica, moderna, contemporanea e fitness per bambini, ragazzi e adulti a Dello, Brescia. Insegnanti qualificati e ambienti professionali.",
            canonical: "https://labballet.it/",
        },
        "/danza": {
            title: "Corsi di Danza Classica e Moderna | LABballet ASD Dello",
            description:
                "Scopri i corsi di danza classica, moderna e contemporanea per tutte le età a Dello (BS). Lezioni professionali con insegnanti certificati.",
            canonical: "https://labballet.it/danza",
        },
        "/fitness": {
            title: "Corsi Fitness e Benessere | LABballet ASD Dello",
            description:
                "Pilates, ginnastica dolce e corsi fitness per adulti a Dello (BS). Migliora il tuo benessere con i nostri programmi personalizzati.",
            canonical: "https://labballet.it/fitness",
        },
        "/galleria": {
            title: "Galleria Foto e Video | LABballet ASD Dello",
            description:
                "Guarda le foto dei nostri spettacoli, saggi di danza e momenti dei corsi presso LABballet ASD di Dello, Brescia.",
            canonical: "https://labballet.it/galleria",
        },
        "/stage": {
            title: "Stage e Workshop di Danza | LABballet ASD",
            description:
                "Stage intensivi e workshop di danza classica e moderna con maestri ospiti. Perfezionamento tecnico per allievi avanzati.",
            canonical: "https://labballet.it/stage",
        },
        "/insegnanti": {
            title: "Insegnanti Qualificati | LABballet ASD Dello",
            description:
                "Il nostro team di insegnanti professionisti specializzati in danza classica, moderna, contemporanea e fitness.",
            canonical: "https://labballet.it/insegnanti",
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
        content="danza classica, danza moderna, fitness, pilates, dello brescia, corsi danza bambini, associazione danza, labballet"
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
    <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
    </script>

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
        onload="this.onload=null;this.rel='stylesheet'"
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
