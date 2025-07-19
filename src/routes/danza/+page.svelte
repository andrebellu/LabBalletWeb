<script>
    import CorsoItem from "$lib/components/CorsoItem.svelte";
    export let data;
</script>

<section class="py-16 text-center">
    <h1 class="text-5xl font-bold mb-4">Corsi di Danza</h1>
    <p class="text-lg text-gray-600">
        Scopri tutti i nostri corsi di danza, suddivisi per età e livello.
    </p>
</section>

<section class="py-20 bg-gray-50">
    <div class="max-w-5xl mx-auto space-y-12">
        {#each data.corsi as corso}
            <CorsoItem {corso} />
        {/each}
    </div>
</section>
