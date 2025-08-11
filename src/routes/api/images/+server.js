import { listR2Objects } from '$lib/server/r2';

export async function GET({ url }) {
    try {
        const page = parseInt(url.searchParams.get("page") ?? "1", 10);
        const limit = parseInt(url.searchParams.get("limit") ?? "20", 10);

        // Recupera la lista di oggetti con paginazione
        const { objects, totalCount } = await listR2Objects({ page, limit });

        if (!objects || objects.length === 0) {
            return new Response(
                JSON.stringify({ images: [], totalPages: 1, totalCount: 0 }),
                { headers: { 'Content-Type': 'application/json' } }
            );
        }

        const images = objects.map(obj => `https://gallery.labballet.it/${obj.Key}`);

        return new Response(
            JSON.stringify({
                images,
                totalPages: Math.ceil(totalCount / limit),
                totalCount
            }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error("API Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
