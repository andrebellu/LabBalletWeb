import { marked } from 'marked';
import insegnanti from '$lib/data/insegnanti.json';

marked.setOptions({
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false
});

export async function load({ params }) {
    const insegnante = insegnanti.find(i => i.slug === params.slug);
    if (!insegnante) {
        return {
            status: 404,
            error: new Error('Insegnante non trovato')
        };
    }

    let curriculumHTML = '';
    try {
        const curriculumModule = await import(`$lib/curricula/${params.slug}.md?raw`);
        curriculumHTML = marked.parse(curriculumModule.default);
    } catch (err) {
        curriculumHTML = '<p>Curriculum non disponibile.</p>';
    }

    return {
        insegnante,
        curriculumHTML
    };
}