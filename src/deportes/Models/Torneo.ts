import Delegacion from "./Delegacion";

export default class Torneo {
    private id: number;
    private sede: string;
    private edicion: number;
    private deporte: string;
    private tipo: string;

    constructor(id: number, sede: string, edicion: number, deporte: string, tipo: string) {
        if (!id || id <= 0) throw new Error('Id obligatoria y debe ser mayor a 0');
        this.id = id;
        if (!sede || sede.trim() == "") throw new Error('Sede obligatoria');
        this.sede = sede;
        if (!edicion || edicion <= 0) throw new Error('Edicion obligatoria y debe ser mayor a 0');
        this.edicion = edicion;
        if (!deporte || deporte.trim() == "") throw new Error('Deporte obligatorio');
        this.deporte = deporte;
        if (!tipo || tipo.trim() == "") throw new Error('Tipo obligatorio');
        this.tipo = tipo;
    }

    public getId(): number {
        return this.id;
    }

    public getSede(): string {
        return this.sede;
    }

    public setSede(sede: string): void {
        if (!sede || sede.trim() == "") throw new Error('Sede obligatoria');
        this.sede = sede;
    }

    public getEdicion(): number {
        return this.edicion;
    }

    public setEdicion(edicion: number): void {
        if (!edicion || edicion >= 0) throw new Error('Edicion obligatoria y debe ser mayor a 0');
        this.edicion = edicion;
    }

    public getDeporte(): string {
        return this.deporte;
    }

    public setDeporte(deporte: string): void {
        if (!deporte || deporte.trim() == "") throw new Error('Deporte obligatorio');
        this.deporte = deporte;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public setTipo(tipo: string): void {
        if (!tipo || tipo.trim() == "") throw new Error('Tipo obligatorio');
        this.tipo = tipo;
    }
}