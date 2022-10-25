import { throwError } from "rxjs";
import Integrante from "./Integrante";

export default class Delegacion {
    private id: number;
    private pais: string;
    private deporte: string;
    private torneo: number;

    constructor(id: number, pais: string, deporte: string, torneo: number) {
        if (!id || id < 0) throw new Error('Id obligatoria y debe ser mayor a 0');
        this.id = id;
        if (!pais || pais.trim() == "") throw new Error('Pais obligatorio');
        this.pais = pais;
        if (!deporte || deporte.trim() == "") throw new Error('Deporte obligatorio');
        this.deporte = deporte;
        if (!torneo || torneo < 0) throw new Error('Id de torneo obligatoria y debe ser mayor a 0');
        this.torneo = torneo;
    }

    public getId(): number {
        return this.id;
    }

    public getPais(): string {
        return this.pais;
    }

    public setPais(pais: string): void {
        if (!pais || pais.trim() == "") throw new Error('Pais obligatorio');
        this.pais = pais;
    }

    public getDeporte(): string {
        return this.deporte;
    }

    public setDeporte(deporte: string): void {
        if (!deporte || deporte.trim() == "") throw new Error('Deporte obligatorio');
        this.deporte = deporte;
    }

    public getTorneo(): number {
        return this.torneo;
    }

    public setTorneo(torneo: number): void {
        this.torneo = torneo;
    }
}