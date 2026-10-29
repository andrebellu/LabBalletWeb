import insegnanti from '$lib/data/insegnanti.json';
import { SAGGI } from '$lib/saggi.js';

export const prerender = true;

const SITE = 'https://labballet.it';

const pages = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/danza', changefreq: 'monthly', priority: '0.9' },
    { path: '/fitness', changefreq: 'monthly', priority: '0.9' },
    { path: '/stage', changefreq: 'monthly', priority: '0.8' },
    { path: '/galleria', changefreq: 'monthly', priority: '0.7' },
    ...SAGGI.map((s) => ({ path: `/galleria/${s.year}`, changefreq: 'yearly', priority: '0.6' })),
    ...insegnanti.map((i) => ({ path: `/insegnanti/${i.slug}`, changefreq: 'yearly', priority: '0.5' })),
    { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' }
];

export function GET() {
    const lastmod = new Date().toISOString().slice(0, 10);
    const urls = pages
        .map(
            (p) => `    <url>
        <loc>${SITE}${p.path}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${p.changefreq}</changefreq>
        <priority>${p.priority}</priority>
    </url>`
        )
        .join('\n');

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

    return new Response(body, {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' }
    });
}
