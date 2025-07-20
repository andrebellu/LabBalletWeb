<script>
  import CorsoItem from "$lib/components/CorsoItem.svelte";
  export let data;
</script>

<section class="py-16 text-center p-8">
  <h1 class="text-5xl font-bold mb-4">Corsi di Fitness</h1>
  <p class="text-lg text-gray-600">
    Scopri tutti i nostri corsi di fitness, per restare sempre in forma e
    sentirti bene con il tuo corpo.
  </p>
</section>

<section class="py-20 bg-gray-50 p-4">
  <div class="max-w-5xl mx-auto space-y-12">
    {#each data.corsi as corso}
      <CorsoItem {corso} />
    {/each}
  </div>
</section>
