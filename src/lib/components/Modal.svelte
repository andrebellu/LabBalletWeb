<script>
    import { createEventDispatcher, onMount } from "svelte";
    export let open = false;
    export let title = "";
    export let content = "";
    const dispatch = createEventDispatcher();

    function close() {
        dispatch("close");
    }

    // Chiudi con ESC
    function onKeydown(e) {
        if (e.key === "Escape") close();
    }

    onMount(() => {
        window.addEventListener("keydown", onKeydown);
        return () => window.removeEventListener("keydown", onKeydown);
    });
</script>

{#if open}
    <div
        class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        on:click={close}
    >
        <div
            class="modal-content bg-white rounded-lg p-6 max-w-lg w-full relative"
            on:click|stopPropagation
        >
            <button
                class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                on:click={close}>✖️</button
            >
            {#if title}
                <h2 class="text-2xl font-bold mb-4">{title}</h2>
            {/if}
            <div class="h-full w-full text-black">
                {@html content}
            </div>
        </div>
    </div>
{/if}
