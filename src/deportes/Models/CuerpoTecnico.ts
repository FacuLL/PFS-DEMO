import Integrante from "./Integrante";

export default class CuerpoTecnico extends Integrante {
    private capitan: boolean;

    constructor(id: number, credencial: string, apellidoNombres: string, fechaNacimiento: Date, paisNacimiento: string, deporte: string, rol: string, delegacion: number, capitan?: boolean) {
        super(id, credencial, apellidoNombres, fechaNacimiento, paisNacimiento, deporte, rol, delegacion);
        if (!capitan) this.capitan = false;
        else this.capitan = capitan;
    }

    public isCapitan(): boolean {
        return this.capitan;
    }

    public setCapitan(capitan: boolean): void {
        this.capitan = capitan;
    }

    public getTipo(): string {
        return 'cuerpo tecnico';
    }
}