import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create the client if we have valid-looking credentials, otherwise export null to avoid crashing
export const supabase = (supabaseUrl && supabaseUrl !== 'your_supabase_project_url') 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
