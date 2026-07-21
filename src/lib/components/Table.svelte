<script>
    // 1. IL DIZIONARIO DATI (Singola fonte di verità)
    const orari = ["9:30", "16:30", "17:00", "17:30", "18:00", "18:30", "18:45", "19:00", "20:00", "21:00"];
    const giorni = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"];

    const corsi = {
        "9:30": { "Lunedì": { nome: "Ginn. Pilates Miofasciale", tipo: "pilates" } },
        "16:30": { "Mercoledì": { nome: "Giocodanza®", tipo: "giocodanza" } },
        "17:00": {
            "Lunedì": { nome: "Classica 2", tipo: "classica" },
            "Venerdì": { nome: "Classica 2", tipo: "classica" }
        },
        "17:30": {
            "Martedì": { nome: "Moderna 4", tipo: "moderna" },
            "Mercoledì": { nome: "Classica 1", tipo: "classica" },
            "Giovedì": { nome: "Moderna 4", tipo: "moderna" }
        },
        "18:00": {
            "Lunedì": { nome: "Moderna 2", tipo: "moderna" },
            "Venerdì": { nome: "Moderna 2", tipo: "moderna" }
        },
        "18:30": { "Mercoledì": { nome: "Mini Mod.", tipo: "moderna" } },
        "18:45": {
            "Martedì": { nome: "Classica 4", tipo: "classica" },
            "Giovedì": { nome: "Classica 4", tipo: "classica" }
        },
        "19:00": {
            "Lunedì": { nome: "Moderna 3", tipo: "moderna" },
            "Venerdì": { nome: "Moderna 3", tipo: "moderna" }
        },
        "20:00": {
            "Lunedì": { nome: "Classica 3", tipo: "classica" },
            "Martedì": { nome: "Ginn. Pilates Miofasciale", tipo: "pilates" },
            "Mercoledì": { nome: "Ginn. Pilates Barre", tipo: "pilates" },
            "Giovedì": { nome: "Body Tonic", tipo: "fitness" },
            "Venerdì": { nome: "Classica 3", tipo: "classica" }
        },
        "21:00": {
            "Lunedì": { nome: "Classico adulti\nprincipianti", tipo: "classica" },
            "Giovedì": { nome: "Moderna adulti\nprincipianti", tipo: "moderna" }
        }
    };

    // Funzione helper per verificare se ci sono corsi in un dato giorno (per la vista mobile)
    const hasCoursesInDay = (giorno) => {
        return orari.some(orario => corsi[orario] && corsi[orario][giorno]);
    };
</script>

<!-- GENERAZIONE MOBILE (Card orizzontali) -->
<div class="md:hidden pb-8">
    <div class="relative">
        <div class="overflow-x-auto snap-x snap-mandatory scroll-smooth whitespace-nowrap pb-6 px-2 space-x-4 hide-scrollbar flex flex-row items-center">

            {#each giorni as giorno}
                <div class="min-w-[280px] sm:min-w-[320px] inline-flex flex-col snap-start bg-base-100 rounded-box shadow border border-base-300 p-3 sm:p-4 h-80 relative overflow-hidden">
                    <h4 class="font-bold text-base sm:text-lg text-center mb-3 sm:mb-4 border-b border-base-300 pb-2">
                        {giorno}
                    </h4>

                    <div class="space-y-3 flex-grow text-xs sm:text-sm overflow-y-auto pr-1">
                        {#if hasCoursesInDay(giorno)}
                            {#each orari as orario}
                                {#if corsi[orario] && corsi[orario][giorno]}
                                    <div class="flex border-b border-base-200 pb-2 last:border-0">
                                        <span class="font-medium flex-shrink-0 w-[3rem] sm:w-[3.5rem] pt-0.5">{orario}</span>
                                        <div class="whitespace-normal break-words text-left flex flex-col items-start gap-0.5">
                                            <span class="font-medium whitespace-pre-line leading-tight">{corsi[orario][giorno].nome}</span>
                                            <span class="block opacity-60 uppercase text-[10px] tracking-wider font-semibold mt-0.5">
                                                {corsi[orario][giorno].tipo}
                                            </span>
                                        </div>
                                    </div>
                                {/if}
                            {/each}
                        {:else}
                            <div class="flex items-center justify-center h-full text-base-content/40 italic">
                                Nessun corso in programma
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}

            <!-- Sabato Fisso (Mobile) -->
            <div class="min-w-[280px] sm:min-w-[320px] inline-flex flex-col snap-start bg-base-100 rounded-box shadow border border-base-300 p-3 sm:p-4 h-80">
                <h4 class="font-bold text-base sm:text-lg text-center mb-3 sm:mb-4 border-b border-base-300 pb-2">Sabato</h4>
                <div class="whitespace-pre-line flex justify-center items-center h-full text-center text-sm font-medium opacity-80">
                    Stage a rotazione
                    <br><br>Laboratorio Teatro Danza
                    <br><br>Heels e molto altro
                </div>
            </div>

        </div>
    </div>
</div>

<!-- GENERAZIONE DESKTOP (Tabella semantica) -->
<div class="hidden md:block rounded-box border border-base-300 bg-base-100 shadow-md overflow-hidden">
    <!-- Aggiunto table-fixed per forzare la distribuzione equa dello spazio -->
    <table class="table table-fixed w-full border-collapse text-xs lg:text-sm xl:text-base">
        <caption class="sr-only">Tabella orari settimanali dei corsi di danza e fitness</caption>

        <thead class="bg-base-200 text-base-content border-b border-base-content/20">
        <tr>
            <!-- L'orario si prende il 10% dello spazio, ogni giorno il 15%, il sabato il 15% (Totale 100%) -->
            <th scope="col" class="border-r border-base-content/10 p-2 lg:p-3 w-[10%] text-center">Orario</th>
            {#each giorni as giorno}
                <th scope="col" class="border-r border-base-content/10 p-2 lg:p-3 w-[15%] text-center">{giorno}</th>
            {/each}
            <th scope="col" class="p-2 lg:p-3 w-[15%] text-center">Sabato</th>
        </tr>
        </thead>

        <tbody class="divide-y divide-base-content/20">
        {#each orari as orario, index}
            <tr class="hover transition-colors">

                <!-- Colonna Orari -->
                <th scope="row" class="border-r border-base-content/10 font-medium p-2 lg:p-3 whitespace-nowrap text-center">
                    <time datetime={orario}>{orario}</time>
                </th>

                <!-- Colonne Giorni (Lunedì-Venerdì) -->
                {#each giorni as giorno}
                    {#if corsi[orario] && corsi[orario][giorno]}
                        <td class="border-r border-base-content/10 p-2 lg:p-3 text-center break-words">
                            <span class="font-medium whitespace-pre-line leading-tight">
                                {corsi[orario][giorno].nome}
                            </span>
                        </td>
                    {:else}
                        <td class="border-r border-base-content/10 p-2 lg:p-3"></td>
                    {/if}
                {/each}

                <!-- Colonna Sabato (Calcola il rowspan dinamicamente solo sulla prima riga) -->
                {#if index === 0}
                    <td rowspan={orari.length} class="align-middle p-2 lg:p-3 border-l border-base-content/10">
                        <div class="whitespace-pre-line text-center text-sm font-semibold opacity-80 leading-relaxed">
                            Stage a rotazione
                            <br><br>Laboratorio<br>Teatro Danza
                            <br><br>Heels<br>e molto altro
                        </div>
                    </td>
                {/if}

            </tr>
        {/each}
        </tbody>
    </table>
</div>