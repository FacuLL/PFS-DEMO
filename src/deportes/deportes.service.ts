import { Injectable } from '@nestjs/common';
import Delegacion from './Models/Delegacion';
import Deportista from './Models/Deportista';
import Integrante from './Models/Integrante';
import Dirigente from './Models/Dirigente'
import Torneo from './Models/Torneo';
import CuerpoTecnico from './Models/CuerpoTecnico';
import Marca from './Models/Marca';
import DeportesTextManager from './Models/TextManager';

@Injectable()
export class DeportesService {

    private indexTorneos: number = 1;
    private listaTorneos: Torneo[] = [];

    private indexDelegaciones: number = 1;
    private listaDelegaciones: Delegacion[] = [];

    private indexIntegrantes: number = 1;
    private listaIntegrantes: Integrante[] = [];

    private indexMarcas: number = 1;
    private listaMarcas: Marca[] = [];

    private textManager = new DeportesTextManager();

    constructor() {
        this.importTorneos();
        this.importDelegaciones();
        this.importIntegrantes();
        this.importMarcas();
    }

    public getTorneos(parametros?: any): Torneo[] {
        let torneos: Torneo[] = this.listaTorneos;
        let filtrado: Torneo[] = [];
        if (parametros.id) {
            torneos.forEach(torneo => {
                if (torneo.getId() == parametros.id) filtrado.push(torneo);
            });
            torneos = filtrado;
            filtrado = [];
        }
        if (parametros.sede) {
            torneos.forEach(torneo => {
                if (torneo.getSede() == parametros.sede) filtrado.push(torneo);
            });
            torneos = filtrado;
            filtrado = [];
        }
        if (parametros.edicion) {
            torneos.forEach(torneo => {
                if (torneo.getEdicion() == parametros.edicion) filtrado.push(torneo);
            });
            torneos = filtrado;
            filtrado = [];
        }
        if (parametros.deporte) {
            torneos.forEach(torneo => {
                if (torneo.getDeporte() == parametros.deporte) filtrado.push(torneo);
            });
            torneos = filtrado;
            filtrado = [];
        }
        if (parametros.tipo) {
            torneos.forEach(torneo => {
                if (torneo.getTipo() == parametros.tipo) filtrado.push(torneo);
            });
            torneos = filtrado;
            filtrado = [];
        }
        return torneos;
    }

    public addTorneo(torneo: any) {
        try {
            if (!torneo.sede || !torneo.edicion || !torneo.deporte || !torneo.tipo) throw new Error ('Faltan datos');
            let nuevotorneo = new Torneo(this.indexTorneos, torneo.sede, torneo.edicion, torneo.deporte, torneo.tipo);
            this.indexTorneos++;
            this.listaTorneos.push(nuevotorneo);
            this.saveTorneos();
            this.importTorneos();
            return 'Torneo añadido con exito';
        }
        catch(e) {
            return e.message;
        }
    }

    public deleteTorneo(id: number) {
        for (let i = 0; i < this.listaTorneos.length; i++) {
            if(this.listaTorneos[i].getId() == id) this.listaTorneos.splice(i, 1);
            return 'Torneo eliminado con exito';
        }
        return 'No existe un torneo con esa id';
    }

    public updateTorneo(id: number, torneo: any) {
        try {
            for (let i = 0; i < this.listaTorneos.length; i++) {
                if(this.listaTorneos[i].getId() == id) {
                    if (!torneo.sede) torneo.sede = this.listaTorneos[i].getSede();
                    if (!torneo.edicion) torneo.edicion = this.listaTorneos[i].getEdicion();
                    if (!torneo.deporte) torneo.deporte = this.listaTorneos[i].getDeporte();
                    if (!torneo.tipo) torneo.tipo = this.listaTorneos[i].getTipo();
                    let nuevotorneo = new Torneo(this.listaTorneos[i].getId(), torneo.sede, torneo.edicion, torneo.deporte, torneo.tipo);
                    this.listaTorneos[i] = nuevotorneo;
                    return 'Torneo actualizado exitosamente';
                }
                else return 'No existe un torneo con esa id';
            }
        }
        catch(e) {
            return e.message;
        }
    }

    public getDelegaciones(parametros: any): Delegacion[] {
        let delegaciones: Delegacion[] = this.listaDelegaciones;
        let filtrado: Delegacion[] = [];
        if (parametros.id) {
            delegaciones.forEach(delegacion => {
                if (delegacion.getId() == parametros.id) filtrado.push(delegacion);
            })
            delegaciones = filtrado;
            filtrado = [];
        }
        if (parametros.pais) {
            delegaciones.forEach(delegacion => {
                if (delegacion.getPais() == parametros.pais) filtrado.push(delegacion);
            })
            delegaciones = filtrado;
            filtrado = [];
        }
        if (parametros.deporte) {
            delegaciones.forEach(delegacion => {
                if (delegacion.getDeporte() == parametros.deporte) filtrado.push(delegacion);
            })
            delegaciones = filtrado;
            filtrado = [];
        }
        if (parametros.torneo) {
            delegaciones.forEach(delegacion => {
                if (delegacion.getTorneo() == parametros.torneo) filtrado.push(delegacion);
            })
            delegaciones = filtrado;
            filtrado = [];
        }
        return delegaciones;
    }
    
    public addDelegacion(torneoid: number, delegacion: any) {
        let res: string;
        try {
            this.listaTorneos.forEach(torneo => {
                if (torneo.getId() == torneoid) {
                    if (!delegacion.pais || !delegacion.deporte) throw new Error('Faltan datos');
                    if (typeof delegacion.pais != 'string' || typeof delegacion.deporte != 'string') throw new Error('Datos incorrectos');
                    let nuevadelegacion = new Delegacion(this.indexDelegaciones, delegacion.pais, delegacion.deporte, torneo.getId());
                    this.listaDelegaciones.push(nuevadelegacion);
                    this.saveDelegaciones();
                    this.importDelegaciones();
                    this.indexDelegaciones++;
                    res = 'Delegacion añadida exitosamente';
                }
            });
            if (!res) return 'No existe un torneo con esa ID';
            else return res;
        }
        catch(e) {
            return e.message;
        }
    }

    public deleteDelegacion(delegacionid: number) {
        for (let i = 0; i < this.listaDelegaciones.length; i++) {
            const delegacion = this.listaDelegaciones[i];
            if (delegacion.getId() == delegacionid) {
                this.listaDelegaciones.splice(i, 1);
                return 'Delegación eliminada exitosamente';
            }
        }
        return 'No existe una delegacion con dicha Id';
    }

    public updateDelegacion(delegacionid: number, delegacion: any) {
        try {
            for (let i = 0; i < this.listaDelegaciones.length; i++) {
                const midelegacion = this.listaDelegaciones[i];
                if (midelegacion.getId() == delegacionid) {
                    if (!delegacion.pais) delegacion.pais = midelegacion.getPais();
                    if (!delegacion.deporte) delegacion.deporte = midelegacion.getDeporte();
                    if (!delegacion.torneo) delegacion.torneo = midelegacion.getTorneo();
                    let nuevadelegacion = new Delegacion(midelegacion.getId(), delegacion.pais, delegacion.deporte, delegacion.torneo);
                    this.listaDelegaciones[i] = nuevadelegacion;
                    return 'Delegación actualizada exitosamente';
                }
            }
            return 'No existe una delegacion con dicha Id';
        }
        catch(e) {
            return e.message;
        }
    }

    public getIntegrantes(parametros: any): Integrante[] {
        let integrantes: Integrante[] = this.listaIntegrantes;
        let filtrado: Integrante[] = [];
        if (parametros.id) {
            integrantes.forEach(integrante => {
                if (integrante.getId() == parametros.id) filtrado.push(integrante);
            })
            integrantes = filtrado;
            filtrado = [];
        }
        if (parametros.credencial) {
            integrantes.forEach(integrante => {
                if (integrante.getCredencial() == parametros.credencial) filtrado.push(integrante);
            })
            integrantes = filtrado;
            filtrado = [];
        }
        if (parametros.apellidoNombres) {
            integrantes.forEach(integrante => {
                if (integrante.getApellidoNombres() == parametros.apellidoNombres) filtrado.push(integrante);
            })
            integrantes = filtrado;
            filtrado = [];
        }
        if (parametros.fechaNacimiento) {
            integrantes.forEach(integrante => {
                if (integrante.getFechaNacimiento() == parametros.fechaNacimiento) filtrado.push(integrante);
            })
            integrantes = filtrado;
            filtrado = [];
        }
        if (parametros.paisNacimiento) {
            integrantes.forEach(integrante => {
                if (integrante.getPaisNacimiento() == parametros.paisNacimiento) filtrado.push(integrante);
            })
            integrantes = filtrado;
            filtrado = [];
        }
        if (parametros.deporte) {
            integrantes.forEach(integrante => {
                if (integrante.getDeporte() == parametros.deporte) filtrado.push(integrante);
            })
            integrantes = filtrado;
            filtrado = [];
        }
        if (parametros.rol) {
            integrantes.forEach(integrante => {
                if (integrante.getRol() == parametros.rol) filtrado.push(integrante);
            })
            integrantes = filtrado;
            filtrado = [];
        }
        if (parametros.capitan) {
            integrantes.forEach(integrante => {
                if (integrante.getSelf().isCapitan() == parametros.capitan) filtrado.push(integrante);
            })
            integrantes = filtrado;
            filtrado = [];
        }
        if (parametros.marcas) {
            integrantes.forEach(integrante => {
                if (integrante.getSelf().getMarcas() == parametros.marcas) filtrado.push(integrante);
            })
            integrantes = filtrado;
            filtrado = [];
        }
        if (parametros.acceso) {
            integrantes.forEach(integrante => {
                if (integrante.getSelf().getAcceso() == parametros.acceso) filtrado.push(integrante);
            })
            integrantes = filtrado;
            filtrado = [];
        }
        if (parametros.jefe) {
            integrantes.forEach(integrante => {
                if (integrante.getSelf().isJefe() == parametros.jefe) filtrado.push(integrante);
            })
            integrantes = filtrado;
            filtrado = [];
        }
        return integrantes;
    }

    public addIntegrante(delegacionid: number, integrante: any) {
        let res: string;
        try {
            this.listaDelegaciones.forEach(delegacion => {
                if (delegacion.getId() == delegacionid) {
                    if (!integrante.credencial || !integrante.apellidoNombres || !integrante.fechaNacimiento || !integrante.paisNacimiento || !integrante.deporte || !integrante.rol) throw new Error('Faltan datos');
                    if (typeof integrante.credencial != 'string' || typeof integrante.apellidoNombres != 'string' || typeof integrante.fechaNacimiento != 'string' || typeof integrante.paisNacimiento != 'string' || typeof integrante.deporte != 'string' || typeof integrante.rol != 'string') throw new Error('Datos incorrectos');
                    if (!integrante.tipo) throw new Error('Se debe especificar el tipo de integrante (deportista, dirigente o cuerpo tecnico)'); 
                    let tipo: string = integrante.tipo.toLowerCase().trim();
                    if (tipo == 'deportista') {
                        let nuevointegrante = new Deportista(this.indexIntegrantes, integrante.credencial, integrante.apellidoNombres, new Date(integrante.fechaNacimiento), integrante.paisNacimiento, integrante.deporte, integrante.rol, delegacionid, integrante.capitan);
                        this.listaIntegrantes.push(nuevointegrante);
                        this.indexIntegrantes++;
                        res = 'Deportista añadido correctamente';
                    }
                    else if (tipo == 'dirigente') {
                        if (!integrante.acceso) throw new Error('Faltan datos');
                        if (typeof integrante.acceso != 'number') throw new Error('Datos incorrectos');
                        let nuevointegrante = new Dirigente(this.indexIntegrantes, integrante.credencial, integrante.apellidoNombres, new Date(integrante.fechaNacimiento), integrante.paisNacimiento, integrante.deporte, integrante.rol, integrante.acceso, delegacionid, integrante.jefe)
                        this.listaIntegrantes.push(nuevointegrante);
                        this.indexIntegrantes++;
                        res = 'Dirigente añadido correctamente';
                    }
                    else if (tipo == 'cuerpo tecnico') {
                        let nuevointegrante = new CuerpoTecnico(this.indexIntegrantes, integrante.credencial, integrante.apellidoNombres, new Date(integrante.fechaNacimiento), integrante.paisNacimiento, integrante.deporte, integrante.rol, delegacionid, integrante.capitan);
                        this.listaIntegrantes.push(nuevointegrante);
                        this.indexIntegrantes++;
                        this.saveIntegrantes();
                        this.importIntegrantes();
                        res = 'Cuerpo tecnico añadido correctamente';
                    }
                    else throw new Error('Se debe especificar el tipo de integrante (deportista, dirigente o cuerpo tecnico)');
                }
            })
            if (!res) return 'No existe una delegacion con dicha Id';
            else return res;
        }
        catch(e) {
            return e.message;
        }
    }

    public deleteIntegrante(id: number) {
        try {
            for (let i = 0; i < this.listaIntegrantes.length; i++) {
                if (this.listaIntegrantes[i].getId() == id) {
                    this.listaIntegrantes.splice(i, 1);
                    return 'Integrante eliminado exitosamente';
                }
            }
            return 'No existe un integrante con dicha Id';
        }
        catch(e) {
            return e.message
        }
    }

    public updateIntegrante(id: number, integrante: any) {
        try {
            for (let i = 0; i < this.listaIntegrantes.length; i++) {
                const miintegrante = this.listaIntegrantes[i];
                if (miintegrante.getId() == id) {
                    if (!integrante.credencial) integrante.credencial = miintegrante.getCredencial();
                    if (!integrante.apellidoNombres) integrante.apellidoNombres = miintegrante.getApellidoNombres();
                    if (!integrante.fechaNacimiento) integrante.fechaNacimiento = miintegrante.getFechaNacimiento();
                    if (!integrante.paisNacimiento) integrante.paisNacimiento = miintegrante.getPaisNacimiento();
                    if (!integrante.deporte) integrante.deporte = miintegrante.getDeporte();
                    if (!integrante.rol) integrante.rol = miintegrante.getRol();
                    if (miintegrante.getTipo() == 'deportista') {
                        if (!integrante.capitan) integrante.capitan = miintegrante.getSelf().isCapitan();
                        if (!integrante.marcas) integrante.marcas = miintegrante.getSelf().getMarcas();
                        let nuevodeportista = new Deportista(miintegrante.getId(), integrante.credencial, integrante.apellidoNombres, integrante.fechaNacimiento, integrante.paisNacimiento, integrante.deporte, integrante.rol, integrante.capitan, integrante.marcas);
                        this.listaIntegrantes[i] = nuevodeportista;
                        return 'Deportista actualizado exitosamente';
                    }
                    if (miintegrante.getTipo() == 'dirigente') {
                        if (!integrante.acceso) integrante.acceso = miintegrante.getSelf().getAcesso();
                        if (!integrante.jefe) integrante.jefe = miintegrante.getSelf().isJefe();
                        let nuevodirigente = new Dirigente(miintegrante.getId(), integrante.credencial, integrante.apellidoNombres, integrante.fechaNacimiento, integrante.paisNacimiento, integrante.deporte, integrante.rol, integrante.acceso, integrante.jefe);
                        this.listaIntegrantes[i] = nuevodirigente;
                        return 'Dirigente actualizado exitosamente';
                    }
                    if (miintegrante.getTipo() == 'cuerpo tecnico') {
                        if (!integrante.capitan) integrante.capitan = miintegrante.getSelf().getCapitan();
                        let nuevocuerpo = new CuerpoTecnico(miintegrante.getId(), integrante.credencial, integrante.apellidoNombres, integrante.fechaNacimiento, integrante.paisNacimiento, integrante.deporte, integrante.rol, integrante.capitan);
                        this.listaIntegrantes[i] = nuevocuerpo;
                        return 'Cuerpo Técnico actualizado exitosamente';
                    }
                }
            }
            return 'No existe un integrante con dicha Id';
        }
        catch(e) {
            return e.message;
        }
    }

    public getMarcas(parametros: any): Marca[] {
        let marcas: Marca[] = this.listaMarcas;
        let filtrado: Marca[] = [];
        if (parametros.id) {
            marcas.forEach(marca => {
                if (marca.getId() == parametros.id) filtrado.push(marca);
            });
            marcas = filtrado;
            filtrado = [];
        }
        if (parametros.nombre) {
            marcas.forEach(marca => {
                if (marca.getNombre() == parametros.nombre) filtrado.push(marca);
            });
            marcas = filtrado;
            filtrado = [];
        }
        if (parametros.valor) {
            marcas.forEach(marca => {
                if (marca.getValor() == parametros.valor) filtrado.push(marca);
            });
            marcas = filtrado;
            filtrado = [];
        }
        if (parametros.deportista) {
            marcas.forEach(marca => {
                if (marca.getDeportista() == parametros.deportista) filtrado.push(marca);
            });
            marcas = filtrado;
            filtrado = [];
        }
        return marcas;
    }

    public addMarca(deportistaid: number, marca: any): string {
        let res: string;
        try {
            for (let i = 0; i < this.listaIntegrantes.length; i++) {
                const integrante = this.listaIntegrantes[i];
                if (integrante.getId() == deportistaid) {
                    if (integrante.getTipo() == "deportista") {
                        if (!marca.nombre || !marca.valor) throw new Error('Faltan datos');
                        if (typeof marca.nombre != "string" || typeof marca.valor != "string") throw new Error("Datos incorrectos");
                        let nuevamarca = new Marca(this.indexMarcas, marca.nombre, marca.valor, deportistaid);
                        this.listaMarcas.push(nuevamarca);
                        this.saveMarcas();
                        this.importMarcas();
                        this.indexMarcas++;
                        res = 'Marca añadida con exito';
                    }
                    else res = 'El integrante no es un deportista';
                }
            }
            if (!res) 'No existe un integrante con dicha Id';
            else return res;
        }
        catch(e) {
            return e.message;
        }
    }

    public deleteMarca(marcaid: number): string {
        for (let i = 0; i < this.listaMarcas.length; i++) {
            const marca = this.listaMarcas[i];
            if (marca.getId() == marcaid) {
                this.listaMarcas.splice(i,1);
                return 'Marca eliminada con exito';
            }
        }
        return 'No existe una marca con dicha Id';
    }

    public updateMarca(marcaid: number, marca: any): string {
        try {
            for (let i = 0; i < this.listaMarcas.length; i++) {
                const mimarca = this.listaMarcas[i];
                if (mimarca.getId() == marcaid) {
                    if (!marca.nombre) marca.nombre = mimarca.getNombre();
                    if (!marca.valor) marca.valor = mimarca.getValor();
                    if (!marca.deportista) marca.deportista = mimarca.getDeportista();
                    if (typeof marca.nombre != "string" || typeof marca.valor != "string" || typeof marca.deportista != "number") throw new Error ('Datos incorrectos');
                    let nuevamarca = new Marca(mimarca.getId(), marca.nombre, marca.valor, marca.deportista);
                }
            }
        }
        catch(e) {
            return e.message;
        }
    }

    private saveTorneos(): void {
        this.textManager.saveTorneos(this.listaTorneos);
    }

    private saveDelegaciones(): void {
        this.textManager.saveDelegaciones(this.listaDelegaciones);
    }

    private saveIntegrantes(): void {
        this.textManager.saveIntegrantes(this.listaIntegrantes);
    }
    
    private saveMarcas(): void {
        this.textManager.saveMarcas(this.listaMarcas)
    }

    private importTorneos(): void {
        this.listaTorneos = this.textManager.importTorneos()
    }

    private importDelegaciones(): void {
        this.listaDelegaciones = this.textManager.importDelegaciones()
    }

    private importIntegrantes(): void {
        this.listaIntegrantes = this.textManager.importIntegrantes()
    }

    private importMarcas(): void {
        this.listaMarcas = this.textManager.importMarcas()
    }
}
