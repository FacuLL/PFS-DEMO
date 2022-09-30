import { Injectable } from '@nestjs/common';
import { Auto } from './Models/Auto';
import { Camioneta } from './Models/Camioneta';
import { Vehiculo } from './Models/Vehiculo';

@Injectable()
export class ConcesionariaService {
    private listaVehiculos: Vehiculo[] = [];

    constructor() {}

    getAllVehicles(): Vehiculo[] {
        return this.listaVehiculos;
    }

    getAllCamionetas(): Vehiculo[] {
        let camionetas: Vehiculo[] = [];
        this.listaVehiculos.forEach(vehiculo => {
            if(vehiculo.getVehicleType() == 'Camioneta') camionetas.push(vehiculo);
        });
        return camionetas;
    }

    getAllAutos(): Vehiculo[] {
        let autos: Vehiculo[];
        this.listaVehiculos.forEach(vehiculo => {
            if(vehiculo.getVehicleType() == 'Auto') autos.push(vehiculo);
        })
        return autos;
    }

    getVehicleByPatente(patente: string): Vehiculo | undefined {
        let mivehiculo: Vehiculo;
        this.listaVehiculos.forEach(vehiculo => {
            if (vehiculo.getPatente() == patente) mivehiculo = vehiculo;
        })
        return mivehiculo;
    }

    getVehiclesByMarca(marca: string): Vehiculo[] {
        let vehiculos: Vehiculo[] = [];
        this.listaVehiculos.forEach(vehiculo => {
            if (vehiculo.getMarca() == marca) vehiculos.push(vehiculo);
        })
        return vehiculos;
    }

    getVehiclesByModelo(modelo: string): Vehiculo[] {
        let vehiculos: Vehiculo[] = [];
        this.listaVehiculos.forEach(vehiculo => {
            if (vehiculo.getModelo() == modelo) vehiculos.push(vehiculo);
        })
        return vehiculos;
    }

    getVehiclesByAño(añoinicio: number, añofin: number): Vehiculo[] {
        let vehiculos: Vehiculo[] = [];
        this.listaVehiculos.forEach(vehiculo => {
            if (vehiculo.getAño() >= añoinicio && vehiculo.getAño() <= añofin) vehiculos.push(vehiculo);
        })
        return vehiculos;
    }

    getVehiclesByPrecio(precioinicio: number, preciofin: number): Vehiculo[] {
        let vehiculos: Vehiculo[] = [];
        this.listaVehiculos.forEach(vehiculo => {
            if (vehiculo.getPrecio() >= precioinicio && vehiculo.getPrecio() <= preciofin) vehiculos.push(vehiculo);
        })
        return vehiculos;
    }

    // POST

    addAuto(auto: any): string {
        try {
            if (!auto.marca || !auto.patente || !auto.modelo || !auto.año || !auto.precio) throw Error('Faltan datos');
            if (typeof auto.marca != 'string' || typeof auto.patente != 'string' || typeof auto.modelo != 'string' || typeof auto.año != 'number' || typeof auto.precio != 'number') throw Error('Datos incorrectos');
            for (let i = 0; i < this.listaVehiculos.length; i++) {
                if (this.listaVehiculos[i].getPatente() == auto.patente) return 'Ya existe un vehiculo con dicha patente';
            }
            let nuevoauto = new Auto(auto.marca, auto.patente, auto.modelo, auto.año, auto.precio);
            this.listaVehiculos.push(nuevoauto);
            return 'Auto añadido correctamente'
        }
        catch(e) {
            return e.message;
        }
    }

    addCamioneta(camioneta: any): string {
        try {
            if (!camioneta.marca || !camioneta.patente || !camioneta.modelo || !camioneta.año || !camioneta.precio || !camioneta.capacidad) throw Error('Faltan datos');
            if (typeof camioneta.marca != 'string' || typeof camioneta.patente != 'string' || typeof camioneta.modelo != 'string' || typeof camioneta.año != 'number' || typeof camioneta.precio != 'number' || typeof camioneta.capacidad != "number") throw Error('Datos incorrectos');
            for (let i = 0; i < this.listaVehiculos.length; i++) {
                if (this.listaVehiculos[i].getPatente() == camioneta.patente) return 'Ya existe un vehiculo con dicha patente';
            }
            let nuevacamioneta = new Camioneta(camioneta.marca, camioneta.patente, camioneta.modelo, camioneta.año, camioneta.precio, camioneta.capacidad);
            this.listaVehiculos.push(nuevacamioneta);
            return 'Camioneta añadida correctamente';
        }
        catch(e) {
            return e.message;
        }
    }

    // PUT

    updateVehiculo(nuevovehiculo: any, patente: string): string {
        try {
            for (let i = 0; i < this.listaVehiculos.length; i++) {
                let vehiculo = this.listaVehiculos[i];
                if(vehiculo.getPatente() == patente) {
                    this.listaVehiculos[i] = undefined;
                    for (let i = 0; i < this.listaVehiculos.length; i++) {
                        if (this.listaVehiculos[i].getPatente() == nuevovehiculo.patente) return 'Ya existe un vehiculo con dicha patente';
                    }
                    if (vehiculo.getVehicleType() == 'Auto') {
                        if (!nuevovehiculo.marca || !nuevovehiculo.patente || !nuevovehiculo.modelo || !nuevovehiculo.año || !nuevovehiculo.precio) throw Error('Faltan datos');
                        if (typeof nuevovehiculo.marca != 'string' || typeof nuevovehiculo.patente != 'string' || typeof nuevovehiculo.modelo != 'string' || typeof nuevovehiculo.año != 'number' || typeof nuevovehiculo.precio != 'number') throw Error('Datos incorrectos');
                        let nuevoauto = new Auto(nuevovehiculo.marca, nuevovehiculo.patente, nuevovehiculo.modelo, nuevovehiculo.año, nuevovehiculo.precio);
                        this.listaVehiculos[i] = nuevoauto;
                        return 'Auto actualizado correctamente';
                    }
                    else {
                        if (!nuevovehiculo.marca || !nuevovehiculo.patente || !nuevovehiculo.modelo || !nuevovehiculo.año || !nuevovehiculo.precio || !nuevovehiculo.capacidad) throw Error('Faltan datos');
                        if (typeof nuevovehiculo.marca != 'string' || typeof nuevovehiculo.patente != 'string' || typeof nuevovehiculo.modelo != 'string' || typeof nuevovehiculo.año != 'number' || typeof nuevovehiculo.precio != 'number' || typeof nuevovehiculo.capacidad != "number") throw Error('Datos incorrectos');
                        let nuevacamioneta = new Camioneta(nuevovehiculo.marca, nuevovehiculo.patente, nuevovehiculo.modelo, nuevovehiculo.año, nuevovehiculo.precio, nuevovehiculo.capacidad);
                        this.listaVehiculos.push(nuevacamioneta);
                        return 'Camioneta actualizada correctamente';
                    }
                }
            }
            return 'No existe vehiculo con dicha patente';
        }
        catch(e) {
            return e.message;
        }
    }

    // DELETE

    deleteVehiculo(patente: string): string {
        for (let i = 0; i < this.listaVehiculos.length; i++) {
            if (this.listaVehiculos[i].getPatente() == patente) {
                this.listaVehiculos.splice(i, 1);
                return 'Vehiculo eliminado con exito';
            }
        }
        return 'No existe vehiculo con dicha patente';
    }


}
