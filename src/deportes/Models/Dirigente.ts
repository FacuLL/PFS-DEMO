import Integrante from "./Integrante";

export default class Dirigente extends Integrante {
    private acceso: number;
    private jefe: boolean;

    constructor(id: number, credencial: string, apellidoNombres: string, fechaNacimiento: Date, paisNacimiento: string, deporte: string, rol: string, acceso: number, delegacion: number, jefe?: boolean) {
        super(id, credencial, apellidoNombres, fechaNacimiento, paisNacimiento, deporte, rol, delegacion);
        if (!acceso) throw new Error('El acceso es obligatorio');
        this.acceso = acceso;
        if (!jefe) this.jefe = false;
        else this.jefe = jefe;
    }

    public getAcceso(): number {
        return this.acceso;
    }

    public setAcceso(acceso: number): void {
        if (!acceso) throw new Error('El acceso es obligatorio');
        this.acceso = acceso;
    }

    public isJefe(): boolean {
        return this.jefe;
    }

    public setJefe(jefe: boolean): void {
        this.jefe = jefe;
    }

    public getTipo(): string {
        return 'dirigente';
    }
}