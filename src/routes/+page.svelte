<script>
  import "../app.css";
  let { data } = $props();

  import Navbar from "$lib/components/Navbar.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import CorsoCard from "$lib/components/CorsoCard.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import InsegnantiCard from "$lib/components/InsegnantiCard.svelte";
  import CorsiSections from "$lib/components/CorsiSections.svelte";
</script>

<Navbar />
<Hero />
<div class="corsi-section pt-24" id="corsi">
  <div class="max-w-7xl mx-auto">
    <h2 class="font-bold text-center mb-8 text-4xl md:text-5xl">
      I nostri Corsi
    </h2>
    <p class="text-center mb-12">Scopri i nostri corsi, adatti a tutti.</p>
  </div>
  <CorsiSections />
</div>

<div class="stage-section py-24 px-4 bg-gray-50" id="stage">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-8">
      I nostri Stage
    </h2>
    <p class="text-center mb-12">
      Partecipa ai nostri stage con ballerini e coreografi.
    </p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center"
    >
      {#each data.corsi as corso}
        {#if corso.type === "stage"}
          <CorsoCard
            title={corso.title}
            description={corso.description}
            photo={corso.photo}
          />
        {/if}
      {/each}
    </div>
  </div>
</div>

<div class="insegnanti-section pt-10" id="insegnanti">
  <h2 class="text-4xl md:text-5xl font-bold text-center mb-8">
    I nostri Insegnanti
  </h2>
  <p class="text-center mb-12">
    Conosci i nostri insegnanti, esperti in vari stili di danza.
  </p>
  <div
    class="insegnanti flex flex-row gap-6 overflow-x-auto px-4 scroll-snap-x scroll-smooth md:flex-wrap md:justify-center md:overflow-x-visible"
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
<Footer />
