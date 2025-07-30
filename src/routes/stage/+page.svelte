<script>
    import CorsoItem from "$lib/components/CorsoItem.svelte";
    export let data;
</script>

<section class="pt-8 pb-4 md:pt-16 md:pb-8 text-center px-2 md:px-8">
    <h1 class="text-3xl md:text-5xl font-bold mb-3 md:mb-4">I nostri stage</h1>
    <p class="text-base md:text-lg text-gray-600">
        Scopri tutti i nostri stage
    </p>
</section>

<section class="pt-8 pb-12 md:pt-20 md:pb-20 bg-gray-50 px-2 md:px-4">
    <div class="max-w-3xl md:max-w-5xl mx-auto space-y-8 md:space-y-12">
        {#each data.corsi as corso}
            <CorsoItem {corso} />
        {/each}
    </div>
</section>
