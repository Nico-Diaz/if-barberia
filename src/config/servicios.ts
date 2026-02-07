export const servicios = [
    { id: 'corte', nombre: 'Corte de Pelo', precio: 8000 },
    { id: 'combo', nombre: 'Corte + Barba', precio: 11000 },
];

export const barberos = [
    { id: 'barbero1', nombre: 'Barbero 1' },
    { id: 'barbero2', nombre: 'Barbero 2' },
    { id: 'barbero3', nombre: 'Barbero 3' },
];

export const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(precio);
};