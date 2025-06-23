<script lang="ts">
  export let title: string;
  export let description: string;
  export let photo: string;

  let modal: HTMLDialogElement;
</script>

<button
  class="card bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer w-52 max-w-xs"
  on:click={() => modal.showModal()}
>
  <figure class="px-4 pt-4">
    <img src={photo} alt={title} class="rounded-lg h-40 w-full object-cover" />
  </figure>
  <div class="card-body px-4 pb-4 pt-2">
    <h3 class="text-lg font-semibold text-gray-800 truncate">{title}</h3>
    <p class="text-sm text-gray-600 mt-1 line-clamp-2">{@html description}</p>
  </div>
</button>

<dialog bind:this={modal} class="modal">
  <div class="modal-box relative w-1/2">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >✕</button
      >
    </form>
    <h3 class="text-lg font-bold mb-2">{title}</h3>
    <img
      src={photo}
      alt={title}
      class="rounded-lg mb-4 w-full h-48 object-cover"
    />
    <p class="text-gray-700 text-base">{@html description}</p>
  </div>
</dialog>
