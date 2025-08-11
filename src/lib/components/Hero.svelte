<script>
    import { onMount } from "svelte";

    let Carousel;

    onMount(async () => {
        const module = await import("./Carousel.svelte");
        Carousel = module.default;
    });
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
    />
</svelte:head>

<div class="hero min-h-screen relative overflow-hidden">
    {#if Carousel}
        <Carousel />
    {:else}
        <div class="w-full h-screen bg-gray-200"></div>
    {/if}

    <div class="hero-content text-white text-center z-50 rounded-lg mx-4">
        <div
            class="w-full px-4 flex flex-col items-center space-y-6 md:space-y-8 py-16 md:py-12"
        >
            <h1
                class="text-4xl sm:text-4xl md:text-6xl lg:text-8xl font-playfair tracking-wide font-rose whitespace-nowrap mb-2"
            >
                LABballet <span
                    class="text-xl sm:text-2xl md:text-4xl lg:text-5xl"
                    >asd</span
                >
            </h1>

            <p
                class="text-sm md:text-lg font-light text-white/80 max-w-2xl mx-auto mb-2 md:mb-4"
            >
                Dove passione, professionalità e sorrisi si incontrano per
                crescere insieme nella danza e nel fitness.
            </p>

            <!-- <p class="text-base md:text-3xl font-light italic font-rose">
                Passione e sorrisi
            </p> -->

            <div class="w-20 md:w-32 h-0.5 bg-accent my-2"></div>

            <a
                href="#corsi"
                class="btn btn-primary px-8 py-3 text-base md:text-lg rounded-full mt-2 transition-transform transform hover:scale-105"
            >
                Scopri di più
            </a>
        </div>
    </div>

    <!--     <div
        class="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-50"
    >
        <svg
            class="w-6 h-6 text-white opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
        </svg>
    </div> -->
</div>
