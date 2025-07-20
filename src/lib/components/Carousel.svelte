<script>
  import { onMount } from "svelte";
  import { carousel_links } from "$lib/stores/data";

  let current = 0;
  let interval;

  const next = () => {
    current = (current + 1) % $carousel_links.length;
  };

  const prev = () => {
    current = (current - 1 + $carousel_links.length) % $carousel_links.length;
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
      style="
                opacity: {index === current ? 1 : 0};
                z-index: {index === current ? 10 : 0};
            "
    >
      <img
        src={link}
        alt="carousel image {index + 1}"
        class="w-full h-full object-cover"
      />
    </div>
  {/each}

  <!-- Navigation buttons -->
  <div class="absolute inset-0 z-20 flex items-center justify-between px-4">
    <button
      on:click|preventDefault={() => {
        prev();
        startInterval();
      }}
      class="btn btn-circle bg-white/80 hover:bg-white"
    >
      ❮
    </button>
    <button
      on:click|preventDefault={() => {
        next();
        startInterval();
      }}
      class="btn btn-circle bg-white/80 hover:bg-white"
    >
      ❯
    </button>
  </div>
</div>
