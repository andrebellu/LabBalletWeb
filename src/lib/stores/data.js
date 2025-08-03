import { writable, readable } from 'svelte/store';

export let carousel_links = writable([
  "/images/carosello/carosello_hercules.webp",
  "/images/carosello/carosello_bs.webp",
  "/images/carosello/carosello_up.webp",
  "/images/carosello/carosello_sp.webp",
  "/images/carosello/carosello_ariel.webp",
  "/images/carosello/carosello_saluti.webp",
  "/images/carosello/carosello_manico.webp",
  "/images/carosello/carosello_heels.webp"

]);


export const gallery_links = readable([

]);


