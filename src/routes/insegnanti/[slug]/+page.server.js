import { marked } from 'marked';
import insegnanti from '$lib/data/insegnanti.json';

marked.setOptions({
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false
});

function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export async function load({ params }) {
    const insegnante = insegnanti.find(i => i.slug === params.slug);
    if (!insegnante) {
        return {
            status: 404,
            error: new Error('Insegnante non trovato')
        };
    }

    let curriculumHTML = '';
    const toc = [];
    try {
        const curriculumModule = await import(`$lib/curricula/${params.slug}.md?raw`);

        const renderer = new marked.Renderer();
        const slugCounts = new Map();
        renderer.heading = ({ tokens, depth }) => {
            const html = renderer.parser.parseInline(tokens);
            const plain = renderer.parser.parseInline(tokens, renderer.parser.textRenderer);

            let slug = slugify(plain);
            const count = slugCounts.get(slug) ?? 0;
            slugCounts.set(slug, count + 1);
            if (count > 0) slug = `${slug}-${count}`;

            if (depth <= 3) toc.push({ depth, text: plain, slug });
            return `<h${depth} id="${slug}">${html}</h${depth}>\n`;
        };

        curriculumHTML = marked.parse(curriculumModule.default, { renderer });
    } catch (err) {
        curriculumHTML = '<p>Curriculum non disponibile.</p>';
    }

    return {
        insegnante,
        curriculumHTML,
        toc
    };
}