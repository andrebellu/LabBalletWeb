<script>
  export let title;
  export let description;
  export let photo;
</script>

<div
  class="card bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
>
  <figure class="px-4 pt-4">
    <img src={photo} alt={title} class="rounded-lg h-40 w-full object-cover" />
  </figure>
  <div class="card-body px-4 pb-4 pt-2">
    <h3 class="text-lg font-semibold text-gray-800">{title}</h3>
    <p class="text-sm text-gray-600 mt-1">{description}</p>
  </div>
</div>
