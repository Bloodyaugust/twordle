import { supabase } from '../supabase/Supabase';

export async function getProfiles() {
  const { data: profiles, error } = await supabase.from('profile').select('*');

  if (error) {
    throw error;
  }

  return profiles;
}

export const queryGetProfiles = {
  queryKey: ['profiles'],
  queryFn: getProfiles,
};
