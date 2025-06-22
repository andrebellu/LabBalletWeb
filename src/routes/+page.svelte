<script>
  import "../app.css";
  import { corsi, insegnanti } from "$lib/stores/data";

  import Navbar from "$lib/components/Navbar.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import CorsoCard from "$lib/components/CorsoCard.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import InsegnantiCard from "$lib/components/InsegnantiCard.svelte";
</script>

<div class="background"></div>

<!--<Navbar />-->
<Hero />
<div class="corsi-section py-24 px-4" id="corsi">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-8">I nostri Corsi</h2>
    <p class="text-center mb-12">
      Scopri i nostri corsi di danza, adatti a tutti i livelli e stili.
    </p>
    <div
      class="corsi grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 max-w-6xl mx-auto justify-center items-center"
    >
      {#each $corsi as corso}
        <CorsoCard
          title={corso.title}
          description={corso.description}
          photo={corso.photo}
        />
      {/each}
    </div>
  </div>
</div>

<div class="insegnanti-section" id="insegnanti">
  <h2 class="text-3xl font-bold text-center mb-8">I nostri Insegnanti</h2>
  <p class="text-center mb-12">
    Conosci i nostri insegnanti, esperti in vari stili di danza.
  </p>
  <div
    class="insegnanti grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    {#each $insegnanti as insegnante}
      <InsegnantiCard
        name={insegnante.name}
        danceType={insegnante.danceType}
        description={insegnante.description}
        photo={insegnante.photo}
      />
    {/each}
  </div>
</div>

<Footer />
