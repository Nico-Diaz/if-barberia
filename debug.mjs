import { createClient } from '@supabase/supabase-js';

const url = "https://lphtpzflercnreczapow.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaHRwemZsZXJjbnJlY3phcG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzU5NzYsImV4cCI6MjA4NjE1MTk3Nn0.kyV6dvBP-cs6gmLJTpObJcgKDWkFIJPhEpGdKhmm5ek";
const supabase = createClient(url, key);

async function debug() {
    const { data: negocios, error } = await supabase.from('negocios').select('id, slug, nombre, user_id');
    console.log("Error:", error);
    console.log("Negocios:", negocios);
}

debug();
