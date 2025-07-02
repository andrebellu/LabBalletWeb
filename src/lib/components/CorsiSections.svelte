<script>
    import { goto } from "$app/navigation";
</script>

<!-- Sezione Danza -->
<div class="flex flex-col lg:flex-row-reverse">
    <div class="w-full lg:w-1/2">
        <img
            src="http://www.mybabyphoto.it/LaBallet/20250601_in_punta_di_fiaba/photos/_C253762.jpg"
            alt="Danza"
            class="w-full h-full max-h-[500px] object-cover"
        />
    </div>
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div class="text-center">
            <h2 class="text-5xl font-bold mb-6">Danza</h2>
            <p class="text-lg mb-8">
                Esprimiti con il movimento nei nostri corsi di danza per tutte
                età e livelli.
            </p>
            <button
                class="btn btn-primary px-10 text-lg"
                on:click={() => goto("/danza")}
            >
                Vai ai corsi Danza
            </button>
        </div>
    </div>
</div>

<!-- Sezione Fitness -->
<div class="flex flex-col lg:flex-row">
    <div class="w-full lg:w-1/2">
        <img
            src="https://images.unsplash.com/photo-1591258370814-01609b341790?q=80&w=1080&auto=format&fit=crop"
            alt="Fitness"
            class="w-full h-full max-h-[500px] object-cover"
        />
    </div>
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div class="text-center">
            <h2 class="text-5xl font-bold mb-6">Fitness</h2>
            <p class="text-lg mb-8">
                Allenati con i migliori istruttori per raggiungere i tuoi
                obiettivi.
            </p>
            <button
                class="btn btn-primary px-10 text-lg"
                on:click={() => goto("/fitness")}
            >
                Vai ai corsi Fitness
            </button>
        </div>
    </div>
</div>

<!-- Sezione Stage -->
<div class="flex flex-col lg:flex-row-reverse">
    <div class="w-full lg:w-1/2">
        <img
            src="http://www.mybabyphoto.it/LaBallet/20250601_in_punta_di_fiaba/photos/_C253088.jpg"
            alt="Stage"
            class="w-full h-full max-h-[500px] object-cover"
        />
    </div>
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div class="text-center">
            <h2 class="text-5xl font-bold mb-6">Stage</h2>
            <p class="text-lg mb-8">Partecipa ai nostri stage!</p>
            <button
                class="btn btn-primary px-10 text-lg"
                on:click={() => goto("/stage")}
            >
                Scopri gli Stage
            </button>
        </div>
    </div>
</div>
