<script>
  import Hero from "$lib/components/Hero.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import InsegnantiCard from "$lib/components/InsegnantiCard.svelte";
  import CorsiSections from "$lib/components/CorsiSections.svelte";
  import WhatsappPopup from "$lib/components/WhatsappPopup.svelte";
  import Table from "$lib/components/Table.svelte";
  import AnimationFrameSnow from "$lib/components/AnimationFrameSnow.svelte";
  import { reveal } from "$lib/actions/reveal.js";

  export let data;

  const stats = [
    { n: 10, suf: "+", label: "Anni di attività" },
    { n: 120, suf: "", label: "Allieve e allievi" },
    { n: 8, suf: "", label: "Discipline" },
  ];
  let vals = stats.map(() => 0);

  function count(node, i) {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.unobserve(node);
      const target = stats[i].n, dur = 1400, t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        vals[i] = Math.round(target * (1 - Math.pow(1 - p, 3)));
        vals = vals;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(node);
    return { destroy: () => io.disconnect() };
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://labballet.it/",
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "LABballet ASD",
    description:
      "Associazione di danza classica, moderna e fitness a Dello (BS)",
    url: "https://labballet.it",
    telephone: "+39-030-1234567",
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
  };
</script>

<!-- <svelte:head>
    <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
    </script>

    <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
    </script>
</svelte:head> -->

<Hero />

<WhatsappPopup />

<!--<section class="py-20 border-y border-black/10">
  <div class="max-w-4xl mx-auto grid grid-cols-3 gap-6 px-6 text-center">
    {#each stats as s, i}
      <div use:count={i}>
        <div class="font-playfair text-4xl md:text-6xl">{vals[i]}{s.suf}</div>
        <div class="mt-2 text-[11px] uppercase tracking-[0.2em] text-neutral-500">{s.label}</div>
      </div>
    {/each}
  </div>
</section>-->

<div class="corsi-section pt-16 md:pt-24" id="corsi">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-3xl md:text-5xl font-bold text-center mb-4 md:mb-8" use:reveal>
      I nostri Corsi
    </h2>
    <p class="text-center mb-6 md:mb-12 text-base md:text-lg" use:reveal>
      Scopri i nostri corsi, adatti a tutti.
    </p>
  </div>
  <CorsiSections />
</div>

<div
  class="insegnanti-section pt-8 md:pt-16 pb-6 md:pb-10 bg-base-200 overflow-x-hidden"
  id="insegnanti"
>
  <div class="w-full mx-auto px-2 md:px-0">
    <h2 class="text-3xl md:text-5xl font-bold text-center mb-4 md:mb-8">
      I nostri Insegnanti
    </h2>
    <p class="text-center mb-6 md:mb-12 text-base md:text-lg">
      Conosci i nostri insegnanti, esperti in vari stili di danza.
    </p>
    <div
            class="insegnanti flex flex-row md:flex-wrap md:justify-center gap-2 md:gap-8 md:overflow-x-visible md:w-full md:max-w-5xl md:mx-auto overflow-x-auto scroll-snap-x scroll-smooth"
    >
      {#each data.insegnanti as insegnante, i}
        <div class="shrink-0 snap-center flex justify-center" use:reveal={{ delay: i * 90 }}>
          <InsegnantiCard
                  name={insegnante.name}
                  description={insegnante.description}
                  photo={insegnante.photo}
                  slug={insegnante.slug}
          />
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="relative">
  <svg
    class="absolute top-0 left-0 w-full"
    viewBox="0 0 1440 100"
    preserveAspectRatio="none"
  >
    <path
      class="fill-[#dbdbdb]"
      d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"
    />
  </svg>
</div>

<div
  class="table-section pt-8 md:pt-20 lg:pt-32 pb-8 md:pb-16 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto"
  id="orari"
>
  <h2 class="text-3xl md:text-5xl font-bold text-center mb-4 md:mb-8">
    I nostri Orari
  </h2>
  <p class="text-center mb-6 md:mb-12 md:hidden text-base md:text-lg">
    Scorri per vedere gli orari dei corsi.
  </p>
  <div class="px-2 md:px-0">
    <Table />
  </div>
</div>

<Footer />

{#if new Date().getMonth() === 11 || new Date().getMonth() === 0 || new Date().getMonth() === 12 || new Date().getMonth() === 1}
  <AnimationFrameSnow />
{/if}
