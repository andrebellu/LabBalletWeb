<script>
    export let corso;
    let isOpen = false;

    import { slide } from "svelte/transition";

    function toggle() {
        isOpen = !isOpen;
    }
</script>

<div class="flex flex-col md:flex-row gap-6 items-center">
    <img
        src={corso.photo}
        alt={corso.title}
        class="rounded-lg shadow-md w-full md:w-1/2 h-64 object-cover"
    />
    <div class="md:w-1/2 text-center md:text-left">
        <h3 class="text-3xl font-bold mb-2">{corso.title}</h3>
        <p class="text-gray-600 mb-4">{corso.shortDescription}</p>
        <button on:click={toggle} class="btn btn-primary">
            {isOpen ? "Chiudi" : "Scopri di più"}
        </button>
    </div>
</div>

{#if isOpen}
    <div
        in:slide
        out:slide
        class="bg-white rounded-md shadow-inner p-6 mt-4 border border-gray-200"
    >
        <h4 class="text-xl font-semibold mb-2">Dettagli del corso</h4>
        <p class="text-gray-700">{@html corso.description}</p>
    </div>
{/if}
