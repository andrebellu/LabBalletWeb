import { json } from '@sveltejs/kit';
import { listR2Objects } from '$lib/server/r2';
import { SAGGI } from '$lib/saggi.js';

const CACHE_HEADERS = { 'Cache-Control': 'public, max-age=300, s-maxage=3600' };

export async function GET({ url }) {
    const page = Math.max(parseInt(url.searchParams.get('page') ?? '1', 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') ?? '50', 10) || 50, 1), 100);
    const year = url.searchParams.get('year');
    const saggio = SAGGI.find((s) => s.year === year);

    const empty = Object.fromEntries(SAGGI.map((s) => [`gruppo${s.year}`, []]));

    if (!saggio) {
        return json({ ...empty, totalPages: 1, totalCount: 0 }, { headers: CACHE_HEADERS });
    }

    try {
        const { objects, totalCount } = await listR2Objects({ page, limit, prefix: saggio.prefix });
        const urls = objects.map((obj) => `https://gallery.labballet.it/${obj.Key}`).sort();

        return json(
            {
                ...empty,
                [`gruppo${saggio.year}`]: urls,
                totalPages: Math.max(Math.ceil(totalCount / limit), 1),
                totalCount
            },
            { headers: CACHE_HEADERS }
        );
    } catch (err) {
        console.error('API Error:', err);
        return json({ error: 'Impossibile caricare le immagini' }, { status: 500 });
    }
}
