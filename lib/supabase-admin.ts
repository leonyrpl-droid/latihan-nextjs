import "server-only";
import { createClient } from "@supabase/supabase-js";

// Klien dengan kunci RAHASIA (secret key).
// Hati-hati. Memiliki akses istimewa, termasuk melewati aturan RLS.
// Jangan pernah dipakai di Client Component.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);
