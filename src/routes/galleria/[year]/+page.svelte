<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import ImageWithSkeleton from "$lib/components/ImageWithSkeleton.svelte";

    export let data;
    $: saggio = data.saggio;
    $: year = saggio.year;

    let images = [];
    let pageNum = 1;
    let loading = false;
    let hasMore = true;
    let showModal = false;
    let currentIndex = 0;
    let mounted = false;

    $: modalImage = images[currentIndex] ?? "";

    // reset quando cambia anno (navigazione client-side tra /galleria/2024 e /2025)
    $: if (year) {
        images = [];
        pageNum = 1;
        hasMore = true;
        showModal = false;
        if (mounted) init();
    }

    onMount(() => {
        mounted = true;
        init();
        window.addEventListener("keydown", handleKeydown);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("keydown", handleKeydown);
            window.removeEventListener("scroll", handleScroll);
            document.body.classList.remove("overflow-hidden");
        };
    });

    async function init() {
        await loadImages();
        await fillViewportIfNeeded();
    }

    async function loadImages() {
        if (loading || !hasMore) return;
        loading = true;
        const y = year; // guardia contro race se l'utente cambia anno a metà fetch
        try {
            const res = await fetch(`/api/images?year=${y}&page=${pageNum}&limit=50`);
            if (!res.ok) { hasMore = false; return; }
            const json = await res.json();
            if (y !== year) return;
            const batch = json[`gruppo${y}`] ?? json.images ?? [];
            if (batch.length === 0) hasMore = false;
            else { images = [...images, ...batch]; pageNum++; }
        } catch {
            hasMore = false;
        } finally {
            loading = false;
        }
    }

    async function fillViewportIfNeeded() {
        let tries = 0;
        while (hasMore && document.body.offsetHeight <= window.innerHeight + 100 && tries < 10) {
            await loadImages();
            tries++;
        }
    }

    function handleScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) loadImages();
    }

    $: if (mounted) document.body.classList.toggle("overflow-hidden", showModal);

    const openModal = (i) => { currentIndex = i; showModal = true; };
    const closeModal = () => (showModal = false);
    const showPrev = () => currentIndex > 0 && currentIndex--;
    const showNext = () => currentIndex < images.length - 1 && currentIndex++;

    const handleKeydown = (e) => {
        if (!showModal) return;
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "Escape") closeModal();
    };

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains("modal-backdrop")) closeModal();
    };

    let touchStartX = 0;
    const handleTouchStart = (e) => (touchStartX = e.changedTouches[0].screenX);
    const handleTouchEnd = (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (diff > 50) showNext();
        else if (diff < -50) showPrev();
    };
</script>

<svelte:head>
    <title>{saggio.title} · {year}</title>
    <meta property="og:title" content={`${saggio.title} · ${year}`} />
    <meta property="og:image" content={saggio.cover} />
</svelte:head>

<div class="max-w-7xl mx-auto p-4">
    <a href="/galleria" class="mb-4 inline-flex items-center gap-2 text-sm hover:underline">
        ← Torna ai saggi
    </a>

    <h1 class="text-2xl font-bold mb-4">
        {saggio.emoji} {saggio.title}
        <span class="text-gray-400 font-normal">· {year}</span>
    </h1>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {#each images as link, i}
            <div class="overflow-hidden rounded-xl shadow hover:shadow-lg transition transform hover:scale-105">
                <button
                        type="button"
                        class="w-full h-full p-0 bg-transparent border-none cursor-pointer focus:outline-none"
                        on:click={() => openModal(i)}
                        aria-label={`Apri foto ${i + 1}`}
                >
                    <ImageWithSkeleton src={link} alt={`${saggio.title} - foto ${i + 1}`} />
                </button>
            </div>
        {/each}
    </div>

    {#if loading}
        <div class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
    {:else if !hasMore && images.length > 0}
        <p class="text-center text-sm text-gray-400 py-8">Fine delle foto</p>
    {:else if !hasMore}
        <p class="text-center text-sm text-gray-400 py-8">Nessuna foto disponibile.</p>
    {/if}
</div>

{#if showModal}
    <div
            class="modal-backdrop fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            on:click={handleBackdropClick}
            role="button"
            tabindex="0"
            aria-label="Chiudi"
            on:keydown={(e) => { if (e.key === "Enter" || e.key === " ") closeModal(); }}
    >
        <!-- Barra superiore -->
        <div class="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-5 py-4
                    bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
            <span class="text-white/70 text-sm tabular-nums tracking-wide">
                {currentIndex + 1} / {images.length}
            </span>
            <button
                    class="pointer-events-auto text-white/60 hover:text-white transition-colors p-2 -m-2"
                    on:click|stopPropagation={closeModal}
                    aria-label="Chiudi"
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Immagine -->
        <img
                src={modalImage}
                alt={`Foto ${currentIndex + 1}`}
                class="max-h-[92vh] max-w-[94vw] object-contain select-none touch-pan-y"
                on:click|stopPropagation
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
        />

        <!-- Frecce -->
        {#if currentIndex > 0}
            <button
                    class="absolute left-0 inset-y-0 w-16 sm:w-24 flex items-center justify-center
                       text-white/40 hover:text-white hover:bg-gradient-to-r hover:from-black/40 hover:to-transparent
                       transition-all"
                    on:click|stopPropagation={showPrev}
                    aria-label="Precedente"
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6" />
                </svg>
            </button>
        {/if}

        {#if currentIndex < images.length - 1}
            <button
                    class="absolute right-0 inset-y-0 w-16 sm:w-24 flex items-center justify-center
                       text-white/40 hover:text-white hover:bg-gradient-to-l hover:from-black/40 hover:to-transparent
                       transition-all"
                    on:click|stopPropagation={showNext}
                    aria-label="Successiva"
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </button>
        {/if}
    </div>
{/if}



<style>
    .modal-backdrop {
        animation: fade 0.2s ease-out;
    }
    .modal-backdrop img {
        animation: zoom 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes fade {
        from { opacity: 0; }
    }
    @keyframes zoom {
        from { opacity: 0; transform: scale(0.96); }
    }
</style>