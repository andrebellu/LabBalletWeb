import corsi from '$lib/data/corsi.json';

export const prerender = true;

export function load() {
    return {
        corsi: corsi.filter(corso => corso.type === 'stage')
    };
}
