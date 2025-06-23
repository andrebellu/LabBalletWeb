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

<Navbar />
<Hero />
<div class="corsi-section py-24 px-4" id="corsi">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-8">I nostri Corsi</h2>
    <p class="text-center mb-12">
      Scopri i nostri corsi di danza, adatti a tutti i livelli e stili.
    </p>

    <div class="flex flex-col lg:flex-row gap-12">
      <!-- Danza -->
      <div class="w-full lg:w-1/2">
        <h3 class="text-2xl font-semibold mb-6 text-center">Corsi di danza</h3>
        <div
          class="grid grid-cols-1 sm:grid-cols-3 gap-10 justify-items-center"
        >
          {#each $corsi as corso}
            {#if corso.type === "danza"}
              <CorsoCard
                title={corso.title}
                description={corso.description}
                photo={corso.photo}
              />
            {/if}
          {/each}
        </div>
      </div>

      <!-- Fitness -->
      <div class="w-full lg:w-1/2">
        <h3 class="text-2xl font-semibold mb-6 text-center">
          Corsi di fitness
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
          {#each $corsi as corso}
            {#if corso.type === "fitness"}
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
  </div>
</div>

<div class="insegnanti-section" id="insegnanti">
  <h2 class="text-3xl font-bold text-center mb-8">I nostri Insegnanti</h2>
  <p class="text-center mb-12">
    Conosci i nostri insegnanti, esperti in vari stili di danza.
  </p>
  <div
    class="insegnanti flex flex-row gap-6 overflow-x-auto px-4 scroll-snap-x scroll-smooth md:flex-wrap md:justify-center md:overflow-x-visible"
  >
    {#each $insegnanti as insegnante}
      <InsegnantiCard
        name={insegnante.name}
        description={insegnante.description}
        photo={insegnante.photo}
      />
    {/each}
  </div>
</div>

<Footer />
