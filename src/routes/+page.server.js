import { supabase } from '$lib/supabaseClient';

const CACHE_TTL = 60;

export async function load({ cookies }) {
  // Controlla prima i cookie
  const cachedInsegnanti = cookies.get('insegnanti_cache');

  if (cachedInsegnanti) {
    try {
      return {
        insegnanti: JSON.parse(cachedInsegnanti),
        cached: true
      };
    } catch (e) {
      console.error('Error parsing cached data', e);
    }
  }

  // Fetch da Supabase
  const [insegnantiRes] = await Promise.all([
    supabase.from('Insegnanti').select('*')
  ]);

  if (insegnantiRes.error) {
    console.error('Supabase error:', insegnantiRes.error);
    return {
      corsi: [],
      insegnanti: []
    };
  }

  cookies.set('insegnanti_cache', JSON.stringify(insegnantiRes.data), {
    path: '/',
    maxAge: CACHE_TTL * 60,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  return {
    insegnanti: insegnantiRes.data,
    cached: false
  };
}