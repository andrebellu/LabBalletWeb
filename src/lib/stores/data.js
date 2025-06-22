import { writable } from 'svelte/store';

export const corsi = writable([
  { title: "Danza Classica", description: "..." , photo: "http://www.mybabyphoto.it/LaBallet/20250601_in_punta_di_fiaba/photos/_C254076.jpg" },
    { title: "Danza Moderna", description: "..." , photo: "http://www.mybabyphoto.it/LaBallet/20250601_in_punta_di_fiaba/photos/_C253442.jpg" },
    { title: "Heels", description: "..." , photo: "http://www.mybabyphoto.it/LaBallet/20250601_in_punta_di_fiaba/photos/_C253088.jpg" },
    { title: "Gioco Danza", description: "..." , photo: "http://www.mybabyphoto.it/LaBallet/20250601_in_punta_di_fiaba/photos/_C253860.jpg" },
    { title: "Pilates", description: "..." , photo: "" },
    { title: "Pilates Bar", description: "..." , photo: "" },
]);

export const insegnanti = writable([
  { name: "Giovanna Staffoni", danceType: "...", description: "...", photo: "http://www.mybabyphoto.it/LaBallet/20240601_ci_vediamo_in_tv/photos/_MBP0665.jpg" },
    { name: "Linda Stefanoni", bio: "..." , description: "...", photo: "http://www.mybabyphoto.it/LaBallet/20250601_in_punta_di_fiaba/photos/_C254488.jpg" },
    { name: "Margherita Feroldi", bio: "..." , description: "...", photo: "..." },
    { name: "Myriam Zinco", bio: "..." , description: "...", photo: "my.png" },
]);
