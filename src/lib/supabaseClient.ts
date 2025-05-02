import { createClient } from "@supabase/supabase-js";

// Prioritize server-side variables, fall back to public ones if needed
const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing Supabase URL. Check SUPABASE_URL environment variable."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing Supabase Anon Key. Check SUPABASE_ANON_KEY environment variable."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
