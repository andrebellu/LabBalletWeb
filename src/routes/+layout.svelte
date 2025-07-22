<script>
  import "../app.css";
  import { page } from "$app/stores";
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<div class="min-h-screen">
  {#if $page.url.pathname !== "/privacy-policy"}
    <Navbar />
  {/if}
  <main
    class:pt-24={$page.url.pathname !== "/" &&
      $page.url.pathname !== "/privacy-policy"}
  >
    <slot />
  </main>
</div>
