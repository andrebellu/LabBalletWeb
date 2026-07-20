<script>
    import { SAGGI } from "$lib/saggi.js";
</script>

<svelte:head><title>I nostri saggi</title></svelte:head>

<div class="max-w-6xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-1">I nostri saggi</h1>
    <p class="text-gray-500 mb-6">Scegli un saggio per vedere tutte le foto</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each SAGGI as s}
            <a
            href={`/galleria/${s.year}`}
            class="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all block"
            >
            <img
                    src={s.cover}
                    alt={s.title}
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span class="text-xs uppercase tracking-widest opacity-80">{s.year}</span>
                <h2 class="text-xl font-bold leading-tight">{s.emoji} {s.title}</h2>
            </div>
            </a>
        {/each}
    </div>
</div>