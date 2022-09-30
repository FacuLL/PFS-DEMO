export abstract class Vehiculo {
    private marca: string;
    private patente: string;
    private modelo: string;
    private año: number;
    private precio: number;

    constructor(marca: string, patente: string, modelo: string, año: number, precio: number) {
        if(marca.trim() == '') throw Error('La marca no puede estar vacia');
        this.marca = marca;
        if(patente.trim() == '') throw Error('La patente no puede estar vacia');
        this.patente = patente.toUpperCase();
        if(modelo.trim() == '') throw Error('El modelo no puede estar vacio');
        this.modelo = modelo;
        if(año < 0) throw Error('El año no puede ser negativo');
        this.año = Math.floor(año);
        if(precio < 0) throw Error('El precio no puede ser negativo');
        this.precio = precio;
    }

    public getMarca(): string {
        return this.marca;
    }

    public setMarca(marca: string): boolean | undefined {
        if(marca.trim() == '') throw Error('La marca no puede estar vacia');
        this.marca = marca;
        return true;
    }

    public getPatente(): string {
        return this.patente;
    }

    public setPatente(patente: string): boolean | undefined {
        if(patente.trim() == '') throw Error('La patente no puede estar vacia');
        this.patente = patente;
        return true;
    }

    public getModelo(): string {
        return this.modelo;
    }

    public setModelo(modelo: string): boolean | undefined {
        if(modelo.trim() == '') throw Error('El modelo no puede estar vacio');
        this.modelo = modelo;
        return true;
    }

    public getAño(): number {
        return this.año;
    }

    public setAño(año: number): boolean | undefined {
        if(año < 0) throw Error('El año no puede ser negativo');
        this.año = año;
        return true;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public setPrecio(precio: number): boolean | undefined {
        if(precio < 0) throw Error('El precio no puede ser negativo');
        this.precio = precio;
        return true;
    }

    abstract getVehicleType(): string;

}