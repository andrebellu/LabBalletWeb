<script>
    import { onMount } from "svelte";
    import { carousel_links } from "$lib/stores/data";

    let current = 0;
    let interval;

    const next = () => {
        current = (current + 1) % $carousel_links.length;
    };

    const prev = () => {
        current =
            (current - 1 + $carousel_links.length) % $carousel_links.length;
    };

    const startInterval = () => {
        clearInterval(interval);
        interval = setInterval(next, 5000);
    };

    onMount(() => {
        startInterval();
        return () => clearInterval(interval);
    });
</script>

<div class="relative w-full h-full overflow-hidden bg-gray-100">
    {#each $carousel_links as link, index}
        <div
            class="absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out blur-xs"
            style="opacity: {index === current ? 1 : 0}; z-index: {index ===
            current
                ? 10
                : 0};"
            aria-hidden={index !== current}
            role="img"
        >
            <img
                src={link}
                alt={`LabBallet - Immagine ${index + 1}`}
                width="1920"
                height="1080"
                loading={index === 0 ? "eager" : "lazy"}
                decoding={index === 0 ? "sync" : "async"}
                class="w-full h-full object-cover"
            />
        </div>
    {/each}
</div>
