import { Injectable } from '@nestjs/common';
import { throwError } from 'rxjs';
import { Auto } from './Models/Auto';
import { Camioneta } from './Models/Camioneta';
import { Vehiculo } from './Models/Vehiculo';

@Injectable()
export class ConcesionariaService {
    private listaVehiculos: Vehiculo[] = [];

    constructor() {}

    getVehicles(parameters?: any): Vehiculo[] {
        let vehiculos: Vehiculo[] = this.listaVehiculos;
        let filtrado: Vehiculo[] = [];
        if(parameters.tipo == "Cualquiera") parameters.tipo = undefined;
        if(parameters.patente) {
            vehiculos.forEach(vehiculo => {
                if (vehiculo.getPatente() == parameters.patente) filtrado.push(vehiculo);
            })
            vehiculos = filtrado;
            filtrado = [];
        }
        if(parameters.tipo) {
            vehiculos.forEach(vehiculo => {
                if (vehiculo.getVehicleType() == parameters.tipo) filtrado.push(vehiculo);
            })
            vehiculos = filtrado;
            filtrado = [];
        }
        if(parameters.marca) {
            vehiculos.forEach(vehiculo => {
                if (vehiculo.getMarca() == parameters.marca) filtrado.push(vehiculo);
            })
            vehiculos = filtrado;
            filtrado = [];
        }
        if(parameters.modelo) {
            vehiculos.forEach(vehiculo => {
                if (vehiculo.getModelo() == parameters.modelo) filtrado.push(vehiculo);
            })
            vehiculos = filtrado;
            filtrado = [];
        }
        if(parameters.precioinicial) {
            vehiculos.forEach(vehiculo => {
                if (vehiculo.getPrecio() >= parameters.precioinicial) filtrado.push(vehiculo);
            })
            vehiculos = filtrado;
            filtrado = [];
        }
        if(parameters.preciofinal) {
            vehiculos.forEach(vehiculo => {
                if (vehiculo.getPrecio() <= parameters.preciofinal) filtrado.push(vehiculo);
            })
            vehiculos = filtrado;
            filtrado = [];
        }
        if(parameters.anioinicial) {
            vehiculos.forEach(vehiculo => {
                if (vehiculo.getAño() >= parameters.anioinicial) filtrado.push(vehiculo);
            })
            vehiculos = filtrado;
            filtrado = [];
        }
        if(parameters.aniofinal) {
            vehiculos.forEach(vehiculo => {
                if (vehiculo.getAño() <= parameters.aniofinal) filtrado.push(vehiculo);
            })
            vehiculos = filtrado;
            filtrado = [];
        }
        if(parameters.anioinicial) {
            vehiculos.forEach(vehiculo => {
                if (vehiculo.getAño() >= parameters.anioinicial) filtrado.push(vehiculo);
            })
            vehiculos = filtrado;
            filtrado = [];
        }
        if(parameters.aniofinal) {
            vehiculos.forEach(vehiculo => {
                if (vehiculo.getAño() <= parameters.aniofinal) filtrado.push(vehiculo);
            })
            vehiculos = filtrado;
            filtrado = [];
        }
        return vehiculos;
    }

    // POST

    addVehicles(vehiculos: any): string {
        try {
            if (vehiculos.length == 0) return 'Debe haber al menos 1 vehiculo para añadir';
            for (let i = 0; i < vehiculos.length; i++) {
                const vehiculo = vehiculos[i];
                if (!vehiculo.marca || !vehiculo.patente || !vehiculo.modelo || !vehiculo.año || !vehiculo.precio) throw Error('Faltan datos');
                if (typeof vehiculo.marca != 'string' || typeof vehiculo.patente != 'string' || typeof vehiculo.modelo != 'string' || typeof vehiculo.año != 'number' || typeof vehiculo.precio != 'number') throw Error('Datos incorrectos');
                for (let i = 0; i < this.listaVehiculos.length; i++) {
                    if (this.listaVehiculos[i].getPatente() == vehiculo.patente) return 'Ya existe un vehiculo con dicha patente';
                }
                if (vehiculo.capacidad) {
                    if (typeof vehiculo.capacidad == 'number') {
                        let nuevacamioneta = new Camioneta(vehiculo.marca, vehiculo.patente, vehiculo.modelo, vehiculo.año, vehiculo.precio, vehiculo.capacidad);
                        this.listaVehiculos.push(nuevacamioneta);
                        if (vehiculos.length == 1) return 'Camioneta añadido correctamente'
                    }
                    else throw new Error('Datos incorrectos')
                }
                else {
                    let nuevovehiculo = new Auto(vehiculo.marca, vehiculo.patente, vehiculo.modelo, vehiculo.año, vehiculo.precio);
                    this.listaVehiculos.push(nuevovehiculo);
                    if (vehiculos.length == 1) return 'Auto añadido correctamente'
                }   
            }
            return 'Vehiculos añadidos correctamente';
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
                    if (nuevovehiculo.getVehicleType() == 'Auto') {
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
                        this.listaVehiculos[i] = nuevacamioneta;
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
