import { google } from 'googleapis';

export const POST = async ({ request }) => {
    console.log("🚀 INICIANDO PROCESO DE GUARDADO EN SHEETS...");

    try {
        const datos = await request.json();
        console.log("📦 Datos recibidos:", datos.cliente_nombre);

        // CHEQUEO DE VARIABLES
        if (!import.meta.env.GOOGLE_PRIVATE_KEY || !import.meta.env.GOOGLE_CLIENT_EMAIL || !import.meta.env.GOOGLE_SHEET_ID) {
            throw new Error("FALTAN VARIABLES DE ENTORNO EN EL SERVIDOR (.ENV)");
        }

        console.log("🔑 Intentando autenticar con Google...");
        
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: import.meta.env.GOOGLE_CLIENT_EMAIL,
                // Reemplazo crítico para que funcione la clave
                private_key: import.meta.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const fila = [
            datos.fecha,                    // A: Fecha
            datos.hora,                     // B: Hora
            `${datos.cliente_nombre} ${datos.cliente_apellido}`, // C: Cliente
            datos.cliente_telefono || "Sin teléfono", // D: Teléfono
            datos.servicio,                 // E: Servicio
            `$${datos.precio || 0}`,        // F: PRECIO (NUEVO) - Le agregamos el signo $
            datos.profesional,              // G: Profesional
            "Pendiente"                     // H: Estado
        ];

        console.log("📝 Intentando escribir en la hoja...");

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: import.meta.env.GOOGLE_SHEET_ID,
            range: 'Hoja 1!A:G', // <--- VERIFICA QUE TU HOJA SE LLAME ASI
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [fila],
            },
        });

        console.log("✅ ¡ÉXITO! Respuesta de Google:", response.status);

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
        console.error("❌ ERROR FATAL EN GOOGLE SHEETS:");
        console.error(error.message); // <--- ESTO ES LO QUE NECESITO QUE LEAS
        
        // Devolvemos el error al frontend para verlo en red
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
};