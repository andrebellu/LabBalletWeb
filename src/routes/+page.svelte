<script>
    import Hero from "$lib/components/Hero.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import InsegnantiCard from "$lib/components/InsegnantiCard.svelte";
    import CorsiSections from "$lib/components/CorsiSections.svelte";
    import WhatsappPopup from "$lib/components/WhatsappPopup.svelte";
    import Table from "$lib/components/Table.svelte";

    export let data;
</script>

<Hero />

<WhatsappPopup />

<div class="corsi-section pt-24" id="corsi">
    <div class="max-w-7xl mx-auto">
        <h2 class="font-bold text-center mb-8 text-4xl md:text-5xl">
            I nostri Corsi
        </h2>
        <p class="text-center mb-12">Scopri i nostri corsi, adatti a tutti.</p>
    </div>
    <CorsiSections />
</div>

<div class="relative">
    <svg
        class="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
    >
        <path
            class="fill-[#f1f1f1]"
            d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"
        />
    </svg>
</div>

<div
    class="insegnanti-section pt-8 md:pt-32 pb-6 md:pb-10 bg-base-200 overflow-x-hidden"
    id="insegnanti"
>
    <div class="max-w-screen-lg mx-auto px-2 md:px-0">
        <h2 class="text-3xl md:text-5xl font-bold text-center mb-6 md:mb-8">
            I nostri Insegnanti
        </h2>
        <p class="text-center mb-8 md:mb-12">
            Conosci i nostri insegnanti, esperti in vari stili di danza.
        </p>
        <div
            class="insegnanti flex flex-row gap-2 md:grid md:grid-cols-3 md:gap-6 md:justify-center md:overflow-x-visible md:w-fit md:mx-auto overflow-x-auto scroll-snap-x scroll-smooth"
        >
            {#each data.insegnanti as insegnante}
                <InsegnantiCard
                    name={insegnante.name}
                    description={insegnante.description}
                    photo={insegnante.photo}
                />
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
    class="table-section pt-8 md:pt-20 lg:pt-32 pb-8 md:pb-16 px-2 md:px-16 lg:px-48 max-w-screen-xl mx-auto"
    id="orari"
>
    <h2 class="text-3xl md:text-5xl font-bold text-center mb-6 md:mb-8">
        I nostri Orari
    </h2>
    <p class="text-center mb-8 md:mb-12">
        Scorri per vedere gli orari dei corsi.
    </p>
    <Table />
</div>

<Footer />
