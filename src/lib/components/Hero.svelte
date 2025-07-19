<script>
    import Carousel from "./Carousel.svelte";
</script>

<div class="hero min-h-screen relative overflow-hidden">
    <Carousel />

    <div class="hero-content text-neutral-content text-center z-50">
        <div
            class="max-w-md w-full px-4 flex flex-col items-center space-y-6 md:space-y-8 py-16 md:py-12"
        >
            <h1
                class="text-5xl md:text-8xl font-playfair tracking-wide font-rose"
            >
                LabBallet
            </h1>

            <p class="text-base md:text-3xl font-light italic font-rose">
                Passione e sorrisi
            </p>

            <div class="w-20 md:w-32 h-0.5 bg-accent my-2"></div>

            <a
                href="#corsi"
                class="btn btn-primary px-8 py-3 text-base md:text-lg rounded-full mt-2 transition-transform transform hover:scale-105"
            >
                Scopri di più
            </a>
        </div>
    </div>

    <div
        class="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-50"
    >
        <i class="fas fa-chevron-down text-white text-2xl opacity-80"></i>
    </div>
</div>
