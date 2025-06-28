import { supabase } from '$lib/supabaseClient';

export async function load() {
  const [corsiRes, insegnantiRes] = await Promise.all([
    supabase.from('Corsi').select('*').eq("type", "stage"),
    supabase.from('Insegnanti').select('*')
  ]);

  const errors = [corsiRes.error, insegnantiRes.error].filter(Boolean);
  console.log('Corsi:', corsiRes.data);
  console.log('Insegnanti:', insegnantiRes.data);
  if (errors.length > 0) {
    console.error('Errore Supabase:', errors);
    return {
      corsi: [],
      insegnanti: [],
    };
  }

  return {
    corsi: corsiRes.data ?? [],
    insegnanti: insegnantiRes.data ?? [],
  };
}
