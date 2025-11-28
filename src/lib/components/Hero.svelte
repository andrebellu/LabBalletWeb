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

    <div
        class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10"
    ></div>

    <div class="hero-content text-white text-center z-50 rounded-lg mx-4">
        <div
            class="w-full px-4 flex flex-col items-center space-y-6 md:space-y-8 py-16 md:py-12"
        >
            <div class="animate-fade-in-up">
                <h1
                    class="text-4xl sm:text-4xl md:text-6xl lg:text-8xl font-playfair tracking-wide font-rose whitespace-nowrap mb-2 drop-shadow-lg"
                >
                    LABballet <span
                        class="text-xl sm:text-2xl md:text-4xl lg:text-5xl"
                        >asd</span
                    >
                </h1>
            </div>

            <p
                class="text-sm md:text-lg font-light text-white/90 max-w-2xl mx-auto mb-2 md:mb-4 animate-fade-in-up animation-delay-200 drop-shadow-md"
            >
                Dove passione, professionalità e sorrisi si incontrano per
                crescere insieme nella danza e nel fitness.
            </p>

            <div
                class="w-20 md:w-32 h-0.5 bg-accent my-2 animate-scale-x animation-delay-400"
            ></div>

            <a
                href="#corsi"
                class="btn btn-primary px-8 py-3 text-base md:text-lg rounded-full mt-2 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--color-primary),0.6)] animate-fade-in-up animation-delay-600 border-none bg-gradient-to-r from-primary to-secondary text-white"
            >
                Scopri di più
            </a>
        </div>
    </div>

    <div
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-50 cursor-pointer"
        on:click={() =>
            document
                .getElementById("corsi")
                .scrollIntoView({ behavior: "smooth" })}
    >
        <svg
            class="w-8 h-8 text-white opacity-80 hover:opacity-100 transition-opacity"
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
    </div>
</div>

<style>
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes scaleX {
        from {
            transform: scaleX(0);
        }
        to {
            transform: scaleX(1);
        }
    }

    .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
        opacity: 0;
    }

    .animate-scale-x {
        animation: scaleX 0.8s ease-out forwards;
        transform-origin: center;
    }

    .animation-delay-200 {
        animation-delay: 0.2s;
    }

    .animation-delay-400 {
        animation-delay: 0.4s;
    }

    .animation-delay-600 {
        animation-delay: 0.6s;
    }
</style>
