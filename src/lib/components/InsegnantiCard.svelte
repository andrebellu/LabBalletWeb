<script>
    export let name;
    export let description;
    export let photo;
</script>

<div
    class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 p-4 mb-4 w-64 h-80 shrink-0 scroll-snap-start"
>
    <figure class="flex justify-center mt-4">
        <div class="avatar p-4">
            <div
                class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
            >
                <img
                    src={photo}
                    alt={name}
                    class="object-cover scale-110"
                    height="100"
                    width="100"
                />
            </div>
        </div>
    </figure>
    <div class="card-body items-center text-center px-4">
        <h3 class="card-title text-lg">{name}</h3>
        <p class="text-xs mt-2 line-clamp-3">{description}</p>
    </div>
</div>
