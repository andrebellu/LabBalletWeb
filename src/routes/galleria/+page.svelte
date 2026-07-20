<script>
    import { onMount } from "svelte";
    import ImageWithSkeleton from "$lib/components/ImageWithSkeleton.svelte";

    let images = [];
    let images2024 = [];
    let images2025 = [];
    let images2026 = [];

    let currentPage2024 = 1;
    let currentPage2025 = 1;
    let currentPage2026 = 1;

    let isLoading2024 = false;
    let isLoading2025 = false;
    let isLoading2026 = false;

    let hasMore2024 = true;
    let hasMore2025 = true;
    let hasMore2026 = true;

    let showModal = false;
    let modalImage = "";
    let currentIndex = 0;
    let mounted = false;

    let activeTab = "2025";

    async function fillViewportIfNeeded() {
        let tries = 0;
        while (
            (
                (activeTab === "2025" && hasMore2025) ||
                (activeTab === "2024" && hasMore2024) ||
                (activeTab === "2026" && hasMore2026)
            ) &&
            document.body.offsetHeight <= window.innerHeight + 100 &&
            tries < 10
            ) {
            await loadImages();
            tries++;
        }
    }

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
        if (activeTab === "2025") {
            if (isLoading2025 || !hasMore2025) return;
            isLoading2025 = true;
            try {
                const res = await fetch(`/api/images?year=2025&page=${currentPage2025}&limit=50`);
                const data = await res.json();
                if (res.ok) {
                    const prevLen = images2025.length;
                    images2025 = [...images2025, ...data.gruppo2025];
                    if (
                        images2025.length === prevLen ||
                        data.gruppo2025.length === 0
                    ) {
                        hasMore2025 = false;
                    } else {
                        currentPage2025++;
                    }
                }
            } finally {
                isLoading2025 = false;
            }
        } else if(activeTab === "2024") {
            if (isLoading2024 || !hasMore2024) return;
            isLoading2024 = true;
            try {
                const res = await fetch(
                    `/api/images?year=2024&page=${currentPage2024}&limit=50`
                );
                const data = await res.json();
                if (res.ok) {
                    const prevLen = images2024.length;
                    images2024 = [...images2024, ...data.gruppo2024];
                    if (
                        images2024.length === prevLen ||
                        data.gruppo2024.length === 0
                    ) {
                        hasMore2024 = false;
                    } else {
                        currentPage2024++;
                    }
                }
            } finally {
                isLoading2024 = false;
            }
        } else if(activeTab === "2026") {
            if (isLoading2026 || !hasMore2026) return;
            isLoading2026 = true;
            try {
                const res = await fetch(
                    `/api/images?year=2026&page=${currentPage2026}&limit=50`
                );
                const data = await res.json();
                if (res.ok) {
                    const prevLen = images2026.length;
                    images2026 = [...images2026, ...data.gruppo2026];
                    if (
                        images2026.length === prevLen ||
                        data.gruppo2026.length === 0
                    ) {
                        hasMore2026 = false;
                    } else {
                        currentPage2026++;
                    }
                }
            } finally {
                isLoading2026 = false;
            }
        }
    }

    function handleScroll() {
        if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 500
        ) {
            loadImages();
            fillViewportIfNeeded();
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
        currentIndex = index;
        modalImage = images[currentIndex];
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

<!-- Tab -->
<div class="flex border-b border-gray-300 mb-4">
    <button
            class={`px-4 py-2 ${activeTab === "2024" ? "border-b-2 border-primary font-bold" : ""}`}
            on:click={async () => {
                activeTab = "2024";
                if (images2024.length === 0 && hasMore2024) {
                    await loadImages();
                }
                await fillViewportIfNeeded();
            }}
    >
        📺 Ci vediamo in tv
    </button>
    <button
        class={`px-4 py-2 ${activeTab === "2025" ? "border-b-2 border-primary font-bold" : ""}`}
        on:click={async () => {
            activeTab = "2025";
            if (images2025.length === 0 && hasMore2025) {
                await loadImages();
            }
            await fillViewportIfNeeded();
        }}
    >
        ✨ In punta di fiaba
    </button>
    <button
            class={`px-4 py-2 ${activeTab === "2026" ? "border-b-2 border-primary font-bold" : ""}`}
            on:click={async () => {
            activeTab = "2026";
            if (images2026.length === 0 && hasMore2026) {
                await loadImages();
            }
            await fillViewportIfNeeded();
        }}
    >
        🦖 Un museo che danza
    </button>
</div>

<!-- Galleria -->
<div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4"
>
    {#if activeTab === "2025"}
        {#each images2025 as link, i}
            <div
                class="overflow-hidden rounded-xl shadow hover:shadow-lg transition transform hover:scale-105"
            >
                <button
                    type="button"
                    class="w-full h-full p-0 bg-transparent border-none cursor-pointer focus:outline-none"
                    on:click={() => {
                        images = images2025;
                        openModal(link, i);
                    }}
                    aria-label="Apri immagine ingrandita"
                >
                    <ImageWithSkeleton
                        src={link}
                        alt={`Foto 2025 - ${i + 1}`}
                    />
                </button>
            </div>
        {/each}
    {:else if activeTab === "2024"}
        {#each images2024 as link, i}
            <div
                class="overflow-hidden rounded-xl shadow hover:shadow-lg transition transform hover:scale-105"
            >
                <button
                    type="button"
                    class="w-full h-full p-0 bg-transparent border-none cursor-pointer focus:outline-none"
                    on:click={() => {
                        images = images2024;
                        openModal(link, i);
                    }}
                    aria-label="Apri immagine ingrandita"
                >
                    <ImageWithSkeleton
                        src={link}
                        alt={`Foto 2024 - ${i + 1}`}
                    />
                </button>
            </div>
        {/each}
        {:else if activeTab === "2026"}
        {#each images2026 as link, i}
            <div
                    class="overflow-hidden rounded-xl shadow hover:shadow-lg transition transform hover:scale-105"
            >
                <button
                        type="button"
                        class="w-full h-full p-0 bg-transparent border-none cursor-pointer focus:outline-none"
                        on:click={() => {
                        images = images2026;
                        openModal(link, i);
                    }}
                        aria-label="Apri immagine ingrandita"
                >
                    <ImageWithSkeleton
                            src={link}
                            alt={`Foto 2026 - ${i + 1}`}
                    />
                </button>
            </div>
        {/each}
    {/if}
</div>

<!-- Loading indicator -->
{#if (activeTab === "2025" && isLoading2025) || (activeTab === "2024" && isLoading2024) || (activeTab === "2026" && isLoading2026)}
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
