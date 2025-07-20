<script>
  import { onMount } from "svelte";
  export let src = "";
  export let alt = "";
  let loaded = false;
  let imgEl;

  onMount(() => {
    if (imgEl && imgEl.complete) {
      loaded = true;
    }
  });
</script>

<div class="relative w-full h-full">
  {#if !loaded}
    <div
      class="absolute inset-0 bg-gray-200 animate-pulse rounded-xl z-10 flex items-center justify-center"
    >
      <span class="loading loading-spinner text-neutral"></span>
    </div>
  {/if}

  <img
    bind:this={imgEl}
    {src}
    {alt}
    loading="lazy"
    class="w-full h-full object-cover rounded-xl transition-opacity duration-300 ease-in-out"
    class:opacity-0={!loaded}
    on:load={() => (loaded = true)}
    on:error={() => (loaded = true)}
    draggable="false"
  />
</div>
