<script>
    import Carousel from "./Carousel.svelte";
</script>

<div class="hero min-h-screen relative overflow-hidden">
    <Carousel />

    <div class="hero-content text-neutral-content text-center z-50">
        <div class="max-w-md flex flex-col items-center space-y-8 py-12">
            <h1
                class="text-4xl md:text-8xl font-playfair tracking-wide font-rose"
            >
                LabBallet
            </h1>

            <p class="text-xs md:text-3xl font-light italic font-rose">
                Passione e sorrisi
            </p>

            <div class="w-16 lg:w-32 h-0.5 bg-accent my-2"></div>

            <a
                href="#corsi"
                class="btn btn-primary btn-lg px-10 rounded-full mt-4 transform hover:scale-105 transition-all scale-60 md:scale-100"
            >
                Scopri di più
            </a>
        </div>
    </div>

    <div
        class="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-100"
    >
        <i class="fas fa-chevron-down text-white text-2xl opacity-80"></i>
    </div>
</div>
