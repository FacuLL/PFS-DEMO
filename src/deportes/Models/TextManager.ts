import * as fs from 'fs';
import CuerpoTecnico from './CuerpoTecnico';
import Delegacion from './Delegacion';
import Deportista from './Deportista';
import Dirigente from './Dirigente';
import Integrante from './Integrante';
import Marca from './Marca';
import Torneo from './Torneo';

export default class DeportesTextManager {

    private VALUE_SEPARATOR: string = ",";
    private LINE_SEPARATOR: string = "\n";
    
    private TORNEOS_FILE: string = "C:/PFS2022/4-BE/pfs-demo/src/deportes/Data/Torneos.txt";
    private DELEGACIONES_FILE: string = "C:/PFS2022/4-BE/pfs-demo/src/deportes/Data/Delegaciones.txt";
    private INTEGRANTES_FILE: string = "C:/PFS2022/4-BE/pfs-demo/src/deportes/Data/Integrantes.txt";
    private MARCAS_FILE: string = "C:/PFS2022/4-BE/pfs-demo/src/deportes/Data/Marcas.txt"; 

    constructor() {}

    public saveTorneos(torneos: Torneo[]): void {
        let output: string = "";
        let v: string = this.VALUE_SEPARATOR;
        let l: string = this.LINE_SEPARATOR;
        torneos.forEach(torneo => {
            output+=torneo.getId()+v;
            output+=torneo.getSede()+v;
            output+=torneo.getEdicion()+v;
            output+=torneo.getDeporte()+v;
            output+=torneo.getTipo()+v;
            output+=l;
        });
        fs.writeFileSync(this.TORNEOS_FILE, output.trim());
    }

    public saveDelegaciones(delegaciones: Delegacion[]): void {
        let output: string = "";
        let v: string = this.VALUE_SEPARATOR;
        let l: string = this.LINE_SEPARATOR;
        delegaciones.forEach(delegacion => {
            output+=delegacion.getId()+v;
            output+=delegacion.getPais()+v; 
            output+=delegacion.getDeporte()+v;
            output+=delegacion.getTorneo()+v;
            output+=l;
        });
        fs.writeFileSync(this.DELEGACIONES_FILE, output.trim());
    }

    public saveIntegrantes(integrantes: Integrante[]): void {
        let output: string = "";
        let v: string = this.VALUE_SEPARATOR;
        let l: string = this.LINE_SEPARATOR;
        integrantes.forEach(integrante => {
            let tipo = integrante.getTipo();
            output+=integrante.getId()+v;
            output+=tipo+v;
            output+=integrante.getCredencial()+v;
            output+=integrante.getApellidoNombres()+v;
            output+=integrante.getFechaNacimiento()+v;
            output+=integrante.getPaisNacimiento()+v;
            output+=integrante.getDeporte()+v;
            output+=integrante.getRol()+v;
            output+=integrante.getDelegacion()+v;

            if (tipo == "deportista" || tipo == "cuerpo tecnico") {
                output+=integrante.getSelf().isCapitan()+v;
                
            }
            else if (tipo == "dirigente") {
                output+=integrante.getSelf().getAcceso()+v;
                output+=integrante.getSelf().isJefe()+v;
            }

            output+=l;
        });
        fs.writeFileSync(this.INTEGRANTES_FILE, output.trim());
    }

    public saveMarcas(marcas: Marca[]): void {
        let output: string = "";
        let v: string = this.VALUE_SEPARATOR;
        let l: string = this.LINE_SEPARATOR;
        marcas.forEach(marca => {
            output+=marca.getId()+v;
            output+=marca.getNombre()+v;
            output+=marca.getValor()+v;
            output+=marca.getDeportista()+v;
            output+=l;
        });
        fs.writeFileSync(this.MARCAS_FILE, output.trim());
    }

    public importTorneos(): Torneo[] {
        let torneos: Torneo[] = [];
        let input: string = fs.readFileSync(this.TORNEOS_FILE, 'utf8'); 
        if (input.trim().length <= 0) return [];
        let lines = input.split(this.LINE_SEPARATOR);
        lines.forEach(line => {
            let values = line.split(this.VALUE_SEPARATOR);
            let id = Number(values[0]);
            let sede = values[1];
            let edicion = Number(values[2]);
            let deporte = values[3];
            let tipo = values[4];
            let nuevotorneo = new Torneo(id, sede, edicion, deporte, tipo);
            torneos.push(nuevotorneo);
        });
        return torneos;
    }

    public importDelegaciones(): Delegacion[] {
        let delegaciones: Delegacion[] = [];
        let input: string = fs.readFileSync(this.DELEGACIONES_FILE, 'utf8'); 
        if (input.trim().length <= 0) return [];
        let lines = input.split(this.LINE_SEPARATOR);
        lines.forEach(line => {
            let values = line.split(this.VALUE_SEPARATOR);
            let id = Number(values[0]);
            let pais = values[1];
            let deporte = values[2];
            let torneo = Number(values[3]);
            let nuevadelegacion = new Delegacion(id, pais, deporte, torneo);
            delegaciones.push(nuevadelegacion);
        });
        return delegaciones;
    }

    public importIntegrantes(): Integrante[] {
        let integrantes: Integrante[] = [];
        let input: string = fs.readFileSync(this.DELEGACIONES_FILE, 'utf8'); 
        if (input.trim().length <= 0) return [];
        let lines = input.split(this.LINE_SEPARATOR);
        lines.forEach(line => {
            let values = line.split(this.VALUE_SEPARATOR);
            let id = Number(values[0]);
            let tipo = values[1];
            let credencial = values[2];
            let apellidoNombres = values[3];
            let fechaNacimiento = new Date(values[4]);
            let paisNacimiento = values[5];
            let deporte = values[6];
            let rol = values[7];
            let delegacion = Number(values[8]);

            if (tipo == "deportista") {
                let capitan = !!values[9];
                let nuevodeportista = new Deportista(id, credencial, apellidoNombres, fechaNacimiento, paisNacimiento, deporte, rol, delegacion, capitan);
                integrantes.push(nuevodeportista);
            }
            else if (tipo == "dirigente") {
                let acceso = Number(values[9]);
                let jefe = !!values[10];
                let nuevodirigente = new Dirigente(id, credencial, apellidoNombres, fechaNacimiento, paisNacimiento, deporte, rol, acceso, delegacion, jefe);
                integrantes.push(nuevodirigente);
            }
            else if (tipo == "cuerpo tecnico") {
                let capitan = !!values[9];
                let nuevocuerpo = new CuerpoTecnico(id, credencial, apellidoNombres, fechaNacimiento, paisNacimiento, deporte, rol, delegacion, capitan);
                integrantes.push(nuevocuerpo);
            }
        });
        return integrantes;
    }

    public importMarcas(): Marca[] {
        let marcas: Marca[] = [];
        let input: string = fs.readFileSync(this.DELEGACIONES_FILE, 'utf8'); 
        if (input.trim().length <= 0) return [];
        let lines = input.split(this.LINE_SEPARATOR);
        lines.forEach(line => {
            let values = line.split(this.VALUE_SEPARATOR);
            let id = Number(values[0]);
            let nombre = values[1];
            let valor = values[2];
            let deportista = Number(values[3]);

            let nuevamarca = new Marca(id, nombre, valor, deportista);
            marcas.push(nuevamarca);
        });
        return marcas;
    }
}