import { error } from "@sveltejs/kit";
import { SAGGI } from "$lib/saggi.js";

export function load({ params }) {
    const saggio = SAGGI.find((s) => s.year === params.year);
    if (!saggio) throw error(404, "Saggio non trovato");
    return { saggio };
}