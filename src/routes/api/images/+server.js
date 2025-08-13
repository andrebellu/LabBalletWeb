import { listR2Objects } from '$lib/server/r2';

export async function GET({ url }) {
    try {
        const page = parseInt(url.searchParams.get("page") ?? "1", 10);
        const limit = parseInt(url.searchParams.get("limit") ?? "20", 10);

        const { objects, totalCount } = await listR2Objects({ page, limit });

        if (!objects || objects.length === 0) {
            return new Response(
                JSON.stringify({
                    gruppo2024: [],
                    gruppo2025: [],
                    totalPages: 1,
                    totalCount: 0
                }),
                { headers: { 'Content-Type': 'application/json' } }
            );
        }

        const urls = objects.map(obj => `https://gallery.labballet.it/${obj.Key}`);

        const gruppo2024 = urls.filter(url => url.includes("/_MBP"));
        const gruppo2025 = urls.filter(url => url.includes("/_C"));

        gruppo2024.sort();
        gruppo2025.sort();

        return new Response(
            JSON.stringify({
                gruppo2024,
                gruppo2025,
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