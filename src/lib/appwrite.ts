import { Client, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('TU_PROJECT_ID_AQUÍ');

export const databases = new Databases(client);

// IDs de referencia para usar en el código
export const DATABASE_ID = 'TU_DATABASE_ID';
export const COLLECTION_TURNOS = 'ID_COLECCION_TURNOS';
export const COLLECTION_DIAS_ESPECIALES = 'ID_COLECCION_DIAS';