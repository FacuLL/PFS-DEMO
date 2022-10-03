import { Vehiculo } from "./Vehiculo";

export class Camioneta extends Vehiculo {
    private capacidad: number;

    constructor(marca: string, patente: string, modelo: string, año: number, precio: number, capacidad: number) {
        super(marca, patente, modelo, año, precio);
        if (capacidad < 0) throw Error('La capacidad no puede ser negativa');
        this.capacidad = capacidad;
    }

    public getCapacidad(): number {
        return this.capacidad;
    }

    public setCapacidad(capacidad: number): boolean | undefined {
        if (capacidad < 0) throw Error('La capacidad no puede ser negativa');
        this.capacidad = capacidad;
        return true;
    }

    public getVehicleType(): string {
        return 'Camioneta';
    }
}