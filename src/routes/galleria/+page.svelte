<script>
    import { gallery_links } from "$lib/stores/data";
    import { onMount } from "svelte";

    let showModal = false;
    let modalImage = "";
    let currentIndex = 0;

    const openModal = (image, index) => {
        modalImage = image;
        currentIndex = index;
        showModal = true;
    };

    const closeModal = () => {
        showModal = false;
        modalImage = "";
    };

    const showPrev = () => {
        if (currentIndex > 0) {
            currentIndex--;
            modalImage = $gallery_links[currentIndex];
        }
    };

    const showNext = () => {
        if (currentIndex < $gallery_links.length - 1) {
            currentIndex++;
            modalImage = $gallery_links[currentIndex];
        }
    };

    const handleBackdropClick = (event) => {
        if (event.target.classList.contains("modal-backdrop")) {
            closeModal();
        }
    };

    const handleKeydown = (event) => {
        if (!showModal) return;
        if (event.key === "ArrowLeft") showPrev();
        if (event.key === "ArrowRight") showNext();
        if (event.key === "Escape") closeModal();
    };

    onMount(() => {
        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    });
</script>

<!-- Galleria -->
<div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4"
>
    {#each $gallery_links as link, i}
        <div
            class="overflow-hidden rounded-xl shadow hover:shadow-lg transition transform hover:scale-105"
        >
            <button
                type="button"
                class="w-full h-full p-0 bg-transparent border-none cursor-pointer focus:outline-none"
                on:click={() => openModal(link, i)}
                aria-label="Apri immagine ingrandita"
            >
                <img
                    src={link}
                    alt="Foto danza"
                    loading="lazy"
                    class="w-full h-full object-cover pointer-events-none"
                    draggable="false"
                />
            </button>
        </div>
    {/each}
</div>

<!-- Modale -->
{#if showModal}
    <div
        class="modal-backdrop fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-100"
        on:click={handleBackdropClick}
        role="button"
        tabindex="0"
        aria-label="Chiudi modale"
        on:keydown={(e) => {
            if (e.key === "Enter" || e.key === " ") closeModal();
        }}
    >
        <div class="relative max-w-5xl mx-auto bg-white rounded-lg p-2">
            <!-- Pulsante chiusura -->
            <button
                class="absolute top-2 right-2 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                on:click={closeModal}
            >
                &times;
            </button>

            <!-- Immagine -->
            <img
                src={modalImage}
                alt="Ingrandita"
                class="max-h-[80vh] max-w-full object-contain mx-auto"
            />

            <!-- Freccia sinistra -->
            {#if currentIndex > 0}
                <button
                    class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black shadow rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                    on:click={showPrev}
                >
                    ❮
                </button>
            {/if}

            <!-- Freccia destra -->
            {#if currentIndex < $gallery_links.length - 1}
                <button
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black shadow rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                    on:click={showNext}
                >
                    ❯
                </button>
            {/if}
        </div>
    </div>
{/if}

<footer class="mt-12 bg-base-200 text-base-content text-center py-6">
    <p class="text-sm">
        📸 Foto a cura di
        <a
            href="http://www.mybabyphoto.it"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary underline hover:text-secondary"
        >
            MyBabyPhoto
        </a>
    </p>
    <p class="text-xs text-gray-500 mt-1">
        © {new Date().getFullYear()} Tutti i diritti riservati.
    </p>
</footer>
