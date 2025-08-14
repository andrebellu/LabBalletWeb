import { marked } from 'marked';
import fs from 'fs';
import path from 'path';
import insegnanti from '$lib/data/insegnanti.json';

marked.setOptions({
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false
});

export async function load({ params }) {
    console.log('Loading insegnante:', params.slug);
    console.log('Available insegnanti:', insegnanti);
    const insegnante = insegnanti.find(i => i.slug === params.slug);
    if (!insegnante) {
        return {
            status: 404,
            error: new Error('Insegnante non trovato')
        };
    }

    const filePath = path.resolve(`src/lib/curricula/${params.slug}.md`);
    let curriculumHTML = '';
    try {
        const markdown = fs.readFileSync(filePath, 'utf-8');
        curriculumHTML = marked.parse(markdown);
    } catch (err) {
        curriculumHTML = '<p>Curriculum non disponibile.</p>';
    }

    return {
        insegnante,
        curriculumHTML
    };
}
