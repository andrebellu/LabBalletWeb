import corsi from '$lib/data/corsi.json';
import insegnanti from '$lib/data/insegnanti.json';

export const prerender = true;

export function load() {
  return {
    corsi,
    insegnanti
  };
}
