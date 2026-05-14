import { createClient } from '@supabase/supabase-js';

const url = "https://lphtpzflercnreczapow.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaHRwemZsZXJjbnJlY3phcG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzU5NzYsImV4cCI6MjA4NjE1MTk3Nn0.kyV6dvBP-cs6gmLJTpObJcgKDWkFIJPhEpGdKhmm5ek";
const supabase = createClient(url, key);

async function test() {
    // 1. Obtener un negocio id
    const { data: negs, error: errNeg } = await supabase.from('negocios').select('*').limit(1);
    if (errNeg) console.error("Error fetching negocio:", errNeg);
    if (!negs || negs.length === 0) return console.error("No negocios found");

    const neg = negs[0];

    // 2. Intentar insertar un turno
    const { data, error } = await supabase.from('turnos').insert({
        negocio_id: neg.id,
        servicio: 'Corte',
        profesional: 'Nico',
        cliente_nombre: 'Test',
        cliente_apellido: 'Test',
        fecha: '2026-05-15',
        hora: '10:00',
        estado: 'pendiente'
    });

    if (error) {
        console.error("SUPABASE ERROR DETAILS:", error);
    } else {
        console.log("Insert successful:", data);
    }
}

test();
