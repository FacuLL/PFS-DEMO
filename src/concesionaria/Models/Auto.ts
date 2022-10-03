import { Vehiculo } from "./Vehiculo";

export class Auto extends Vehiculo {
    constructor(marca: string, patente: string, modelo: string, año: number, precio: number) {
        super(marca, patente, modelo, año, precio);
    }

    public getVehicleType(): string {
        return 'Auto';
    }
}