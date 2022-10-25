export default class Marca {
    private id: number;
    private nombre: string;
    private valor: string;
    private deportista?: number;

    constructor(id: number, nombre: string, valor: string, deportistaid?: number) {
        if (!id || id < 0) throw new Error('Id obligatoria y debe ser mayor a 0');
        this.id = id;
        if (!nombre || nombre.trim() == "") throw new Error('Nombre obligatorio');
        this.nombre = nombre;
        if (!valor || valor.trim() == "") throw new Error('Valor obligatorio');
        this.valor = valor;
        if (deportistaid || deportistaid > 0) this.deportista = deportistaid;
    }

    public getId(): number {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        if (!nombre || nombre.trim() == "") throw new Error('Nombre obligatorio');
        this.nombre = nombre;
    }

    public getValor(): string {
        return this.valor;
    }

    public setValor(valor: string): void {
        if (!valor || valor.trim() == "") throw new Error('Valor obligatorio');
        this.valor = valor;
    }

    public getDeportista(): number {
        return this.deportista;
    }

    public setDeportista(deportista: number): void {
        if (deportista > 0) this.deportista = deportista;
    }
}