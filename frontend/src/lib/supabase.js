import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging
console.log('Supabase URL:', supabaseUrl ? '✓ Loaded' : '✗ Missing');
console.log('Supabase Key:', supabaseAnonKey ? '✓ Loaded' : '✗ Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ SUPABASE ERROR: Environment variables are missing!');
  console.error('Make sure your .env file has:');
  console.error('VITE_SUPABASE_URL=your_url');
  console.error('VITE_SUPABASE_ANON_KEY=your_key');
  throw new Error('Supabase configuration is missing. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
