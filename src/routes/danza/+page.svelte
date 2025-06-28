<!-- Hero / Titolo della pagina -->
<section class="py-16 text-center bg-white">
  <h1 class="text-5xl font-bold mb-4">Corsi di Danza</h1>
  <p class="text-lg text-gray-600">
    Scopri tutti i nostri corsi di danza, suddivisi per età e livello.
  </p>
</section>

<!-- Filtro per età/livello/stile (opzionale ma utile se hai tanti corsi) -->
<section class="py-8 px-4 max-w-6xl mx-auto">
  <div class="flex flex-wrap gap-4 justify-center">
    <button class="btn btn-outline">Bambini</button>
    <button class="btn btn-outline">Ragazzi</button>
    <button class="btn btn-outline">Adulti</button>
    <button class="btn btn-outline">Tutti i livelli</button>
  </div>
</section>

<!-- Griglia corsi -->
<section class="py-10 px-4 max-w-6xl mx-auto">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <!-- Card singolo corso -->
    {#each corsiDanza as corso}
      <div
        class="rounded-xl shadow-md overflow-hidden bg-white hover:shadow-xl transition"
      >
        <img
          src={corso.photo}
          alt={corso.title}
          class="w-full h-56 object-cover"
        />
        <div class="p-6">
          <h3 class="text-2xl font-semibold mb-2">{corso.title}</h3>
          <p class="text-gray-600 text-sm mb-4">{corso.shortDescription}</p>
          <button on:click={() => openModal(corso)} class="btn btn-primary"
            >Scopri di più</button
          >
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- Modal dettagli corso -->
{#if selectedCorso}
  <Modal on:close={() => (selectedCorso = null)}>
    <h2 class="text-3xl font-bold mb-2">{selectedCorso.title}</h2>
    <p class="mb-4">{selectedCorso.description}</p>
    <!-- orari, istruttore, livello, iscrizione... -->
  </Modal>
{/if}
