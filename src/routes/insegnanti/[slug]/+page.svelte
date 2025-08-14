<script>
    export let data;
</script>

<section class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row md:items-start gap-8">
        <img
            src={data.insegnante.photo}
            alt={data.insegnante.name}
            class="rounded-lg w-64 h-64 object-cover mx-auto md:mx-0 mb-6 md:mb-0 flex-shrink-0"
        />
        <div class="flex-1">
            <h1 class="text-4xl font-bold mb-2">
                {data.insegnante.name} - Curriculum
            </h1>
            <p class="mb-6 text-lg text-gray-700">
                {data.insegnante.description}
            </p>
            <div class="max-w-none curriculum">{@html data.curriculumHTML}</div>
        </div>
    </div>
</section>
