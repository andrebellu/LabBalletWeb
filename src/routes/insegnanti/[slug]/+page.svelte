<script>
    export let data;
</script>

<svelte:head>
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="bg-gray-50 min-h-screen pb-16">
    <div class="max-w-5xl mx-auto px-4 pt-8">
        <a
            href="/#insegnanti"
            class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8"
        >
            <span aria-hidden="true">←</span> Torna agli insegnanti
        </a>

        <div class="flex flex-col md:flex-row gap-8 items-start">
            <div class="md:w-64 shrink-0 flex flex-col items-center md:items-stretch gap-6 w-full">
                <img
                    src={data.insegnante.photo}
                    alt={data.insegnante.name}
                    class="rounded-2xl w-56 h-56 md:w-64 md:h-64 object-cover ring-4 ring-white shadow-lg"
                />
                {#if data.toc.length > 1}
                    <nav class="hidden md:block sticky top-28 self-start">
                        <p
                            class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3"
                        >
                            In questa pagina
                        </p>
                        <ul class="space-y-2 text-sm border-l border-gray-200">
                            {#each data.toc as item}
                                <li>
                                    <a
                                        href="#{item.slug}"
                                        class="block -ml-px border-l-2 border-transparent hover:border-primary hover:text-primary transition-colors {item.depth ===
                                        3
                                            ? 'pl-8'
                                            : 'pl-4'}"
                                    >
                                        {item.text}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </nav>
                {/if}
            </div>

            <div class="flex-1 min-w-0 w-full">
                <div class="text-center md:text-left mb-6">
                    <span
                        class="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-3"
                    >
                        {data.insegnante.description}
                    </span>
                    <h1 class="text-3xl md:text-4xl font-bold">
                        {data.insegnante.name}
                    </h1>
                    <p class="text-gray-500 mt-1">Curriculum</p>
                </div>

                <div
                    class="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10"
                >
                    <div class="max-w-none curriculum">{@html data.curriculumHTML}</div>
                </div>
            </div>
        </div>
    </div>
</section>
