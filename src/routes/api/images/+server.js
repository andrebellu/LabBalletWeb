import { listR2Objects } from '$lib/server/r2';

export async function GET({ url }) {
    try {
        const page = parseInt(url.searchParams.get("page") ?? "1", 10);
        const limit = parseInt(url.searchParams.get("limit") ?? "50", 10);
        const year = url.searchParams.get("year");

        let prefix = "";
        if (year === "2024") prefix = "_MBP";
        else if (year === "2025") prefix = "_C";
        else if (year === "2026") prefix = "2026_";

        const { objects, totalCount } = await listR2Objects({ page, limit, prefix });

        if (!objects || objects.length === 0) {
            return new Response(
                JSON.stringify({
                    gruppo2024: [], gruppo2025: [], gruppo2026: [],
                    totalPages: 1, totalCount: 0
                }),
                { headers: { 'Content-Type': 'application/json' } }
            );
        }

        let urls = objects.map(obj => `https://gallery.labballet.it/${obj.Key}`);
        urls.sort();

        return new Response(
            JSON.stringify({
                gruppo2024: year === "2024" ? urls : [],
                gruppo2025: year === "2025" ? urls : [],
                gruppo2026: year === "2026" ? urls : [],
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