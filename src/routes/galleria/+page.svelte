<script>
    import { onMount } from "svelte";
    import ImageWithSkeleton from "$lib/components/ImageWithSkeleton.svelte";

    let images = [];
    let currentPage = 1;
    let totalPages = 1;
    let isLoading = false;

    let showModal = false;
    let modalImage = "";
    let currentIndex = 0;
    let mounted = false;

    onMount(async () => {
        mounted = true;
        await loadImages();

        window.addEventListener("keydown", handleKeydown);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
            window.removeEventListener("scroll", handleScroll);
            document.body.classList.remove("overflow-hidden");
        };
    });

    async function loadImages() {
        if (isLoading || currentPage > totalPages) return;

        isLoading = true;
        try {
            const response = await fetch(
                `/api/images?page=${currentPage}&limit=20`
            );
            const data = await response.json();

            if (response.ok) {
                images = [...images, ...data.images];
                totalPages = data.totalPages;
                currentPage++;
            }
        } catch (error) {
            console.error("Error loading images:", error);
        } finally {
            isLoading = false;
        }
    }

    function handleScroll() {
        if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 500
        ) {
            loadImages();
        }
    }

    $: if (mounted) {
        if (showModal) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }

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
            modalImage = images[currentIndex];
        }
    };

    const showNext = () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            modalImage = images[currentIndex];
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

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
        touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    };

    const handleSwipe = () => {
        const diff = touchStartX - touchEndX;
        const threshold = 50;

        if (diff > threshold) {
            showNext();
        } else if (diff < -threshold) {
            showPrev();
        }
    };
</script>

<!-- Galleria -->
<div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4"
>
    {#each images as link, i}
        <div
            class="overflow-hidden rounded-xl shadow hover:shadow-lg transition transform hover:scale-105"
        >
            <button
                type="button"
                class="w-full h-full p-0 bg-transparent border-none cursor-pointer focus:outline-none"
                on:click={() => openModal(link, i)}
                aria-label="Apri immagine ingrandita"
            >
                <ImageWithSkeleton src={link} alt="Foto danza" />
            </button>
        </div>
    {/each}
</div>

<!-- Loading indicator -->
{#if isLoading}
    <div class="text-center py-8">
        <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"
        ></div>
    </div>
{/if}

{#if showModal}
    <div
        class="modal-backdrop fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-100"
        on:click={handleBackdropClick}
        role="button"
        tabindex="0"
        aria-label="Chiudi modal"
        on:keydown={(e) => {
            if (e.key === "Enter" || e.key === " ") closeModal();
        }}
    >
        <div class="relative max-w-5xl mx-auto bg-white rounded-lg p-2">
            <button
                class="absolute top-2 right-2 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                on:click={closeModal}
            >
                &times;
            </button>

            <img
                src={modalImage}
                alt="Ingrandita"
                class="max-h-[80vh] max-w-full object-contain mx-auto touch-pan-y"
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
            />

            {#if currentIndex > 0}
                <button
                    class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black shadow rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                    on:click={showPrev}
                >
                    ❮
                </button>
            {/if}

            {#if currentIndex < images.length - 1}
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
