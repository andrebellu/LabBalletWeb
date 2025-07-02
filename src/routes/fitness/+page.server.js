import { supabase } from '$lib/supabaseClient';

const CACHE_TTL = 60;

export async function load({ cookies }) {
    // Controlla prima i cookie
    const cachedCorsi = cookies.get('fitness_cache');

    if (cachedCorsi) {
        try {
            return {
                corsi: JSON.parse(cachedCorsi),
                cached: true
            };
        } catch (e) {
            console.error('Error parsing cached data', e);
        }
    }

    // Fetch da Supabase
    const [corsiRes] = await Promise.all([
        supabase.from('Corsi').select('*').eq("type", "fitness"),
    ]);

    if (corsiRes.error) {
        console.error('Supabase error:', corsiRes.error);
        return {
            corsi: []
        };
    }

    // Salva nei cookie (impostando il max-age)
    cookies.set('fitness_cache', JSON.stringify(corsiRes.data), {
        path: '/',
        maxAge: CACHE_TTL * 60,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });

    return {
        corsi: corsiRes.data,
        cached: false
    };
}