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

    const defaultOgImage = "https://labballet.it/images/og-default.jpg";

    $: currentMeta = {
        ogImage: defaultOgImage,
        ...(metaConfig[$page.url.pathname] || {
            title: "LABballet ASD - Associazione di Danza e Fitness a Dello (BS)",
            description:
                "Associazione sportiva dilettantistica specializzata in corsi di danza e fitness per tutte le età a Dello, provincia di Brescia.",
            canonical: "https://labballet.it" + $page.url.pathname,
        }),
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": ["DanceSchool", "SportsActivityLocation"],
        name: "LABballet ASD",
        description: "Associazione sportiva dilettantistica di danza classica, moderna e fitness a Dello (BS)",
        url: "https://labballet.it",
        logo: "https://labballet.it/images/logo.webp",
        image: defaultOgImage,
        email: "labballetasd@gmail.com",
        telephone: "+39-347-0558313",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Via Borgo Belvedere, 10",
            addressLocality: "Dello",
            addressRegion: "BS",
            postalCode: "25020",
            addressCountry: "IT",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 45.420184,
            longitude: 10.082708,
        },
        sameAs: [
            "https://www.facebook.com/LABballet/",
            "https://www.instagram.com/labballet/",
        ],
    };

    const jsonLd = `<script type="application/ld+json">${JSON.stringify(organizationSchema).replace(/</g, "\\u003c")}</${"script"}>`;
</script>

<svelte:head>
    <title>{currentMeta.title}</title>
    <meta name="description" content={currentMeta.description} />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="author" content="LABballet ASD" />
    <link rel="canonical" href={currentMeta.canonical} />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={currentMeta.canonical} />
    <meta property="og:title" content={currentMeta.title} />
    <meta property="og:description" content={currentMeta.description} />
    <meta property="og:image" content={currentMeta.ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="it_IT" />
    <meta property="og:site_name" content="LABballet ASD" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={currentMeta.title} />
    <meta name="twitter:description" content={currentMeta.description} />
    <meta name="twitter:image" content={currentMeta.ogImage} />

    {@html jsonLd}

    <meta name="theme-color" content="#8B5CF6" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="format-detection" content="telephone=no" />
</svelte:head>

<div class="min-h-screen">
    <Navbar />
    <main class:pt-24={$page.url.pathname !== "/"}>
        <slot />
    </main>
</div>
