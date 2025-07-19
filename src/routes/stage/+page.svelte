<script>
    export let data;
</script>

<!-- Hero / Titolo della pagina -->
<section class="py-16 text-center">
    <h1 class="text-5xl font-bold mb-4">I nostri stage</h1>
    <p class="text-lg text-gray-600">Scopri tutti i nostri stage.</p>
</section>

<section class="py-20 bg-gray-50">
    <div class="max-w-5xl mx-auto space-y-12">
        {#each data.corsi as corso, i}
            <div class="flex flex-col md:flex-row gap-6 items-center">
                <img
                    src={corso.photo}
                    alt={corso.title}
                    class="rounded-lg shadow-md w-full md:w-1/2 h-64 object-cover"
                />
                <div class="md:w-1/2 text-center md:text-left">
                    <h3 class="text-3xl font-bold mb-2">{corso.title}</h3>
                    <p class="text-gray-600 mb-4">{corso.shortDescription}</p>
                    <button
                        on:click={() => openModal(corso)}
                        class="btn btn-primary"
                    >
                        Scopri di più
                    </button>
                </div>
            </div>
        {/each}
    </div>
</section>
