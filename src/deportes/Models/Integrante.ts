export default abstract class Integrante {
    protected id: number;
    protected credencial: string;
    protected apellidoNombres: string;
    protected fechaNacimiento: Date;
    protected paisNacimiento: string;
    protected deporte: string;
    protected rol: string;
    protected delegacion: number;

    constructor(id: number, credencial: string, apellidoNombres: string, fechaNacimiento: Date, paisNacimiento: string, deporte: string, rol: string, delegacion: number) {
        if (!id || id < 0) throw new Error('Id obligatoria y debe ser mayor a 0');
        this.id = id;
        if (!credencial || credencial.trim() == "") throw new Error('Credencial obligatoria');
        this.credencial = credencial;
        if (!apellidoNombres || apellidoNombres.trim() == "") throw new Error('Apellido/s y Nombre/s obligatorios');
        this.apellidoNombres = apellidoNombres;
        if (!fechaNacimiento) throw new Error('Fecha de nacimiento obligatoria');
        this.fechaNacimiento = fechaNacimiento;
        if (!paisNacimiento || paisNacimiento.trim() == "") throw new Error('Pais de nacimiento obligatorio');
        this.paisNacimiento = paisNacimiento;
        if (!deporte || deporte.trim() == "") throw new Error('Deporte obligatorio');
        this.deporte = deporte;
        if (!rol || rol.trim() == "") throw new Error('Rol obligatorio');
        this.rol = rol;
        if (!delegacion || delegacion < 0) throw new Error('Delegacion obligatoria y debe ser mayor a 0');
        this.delegacion = delegacion;
    }

    public getId(): number {
        return this.id;
    }

    public getCredencial(): string {
        return this.credencial;
    }

    public setCredencial(credencial: string): void {
        if (!credencial || credencial.trim() == "") throw new Error('Credencial obligatoria');
        this.credencial = credencial;
    }

    public getApellidoNombres(): string {
        return this.apellidoNombres;
    }

    public setApellidoNombres(apellidoNombres: string): void {
        if (!apellidoNombres || apellidoNombres.trim() == "") throw new Error('Apellido/s y Nombre/s obligatorios');
        this.apellidoNombres = apellidoNombres;
    }

    public getFechaNacimiento(): Date {
        return this.fechaNacimiento;
    }

    public setFechaNacimiento(fechaNacimiento: Date): void {
        if (!fechaNacimiento) throw new Error('Fecha de nacimiento obligatoria');
        this.fechaNacimiento = fechaNacimiento;
    }

    public getPaisNacimiento(): string {
        return this.paisNacimiento;
    }

    public setPaisNacimiento(paisNacimiento: string): void {
        if (!paisNacimiento || paisNacimiento.trim() == "") throw new Error('Pais de nacimiento obligatorio');
        this.paisNacimiento = paisNacimiento;
    }

    public getDeporte(): string {
        return this.deporte;
    }

    public setDeporte(deporte: string): void {
        if (!deporte || deporte.trim() == "") throw new Error('Deporte obligatorio');
        this.deporte = deporte;
    }

    public getRol(): string {
        return this.rol;
    }

    public setRol(rol: string): void {
        if (!rol || rol.trim() == "") throw new Error('Rol obligatorio');
        this.rol = rol;
    }

    public getDelegacion(): number {
        return this.delegacion;
    }

    public setDelegacion(delegacion: number): void {
        this.delegacion = delegacion;
    }

    abstract getTipo(): string;

    public getSelf(): any {
        return this;
    }

}