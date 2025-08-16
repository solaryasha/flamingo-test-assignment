import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://example.supabase.co";
const supabaseKey = process.env.SUPABASE_PK || "your-supabase-key";

export const supabase = createClient(supabaseUrl, supabaseKey);