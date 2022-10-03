import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ConcesionariaService } from './concesionaria.service';
import { Vehiculo } from './Models/Vehiculo';

@Controller('concesionaria')
export class ConcesionariaController {
    constructor(private concesionariaService: ConcesionariaService) {}

    // GET

    @Get('')
    getAllVehicles(): Vehiculo[] {
        return this.concesionariaService.getAllVehicles();
    }

    @Get('camionetas')
    getAllCamionetas(): Vehiculo[] {
        return this.concesionariaService.getAllCamionetas();
    }

    @Get('autos')
    getAllAutos(): Vehiculo[] {
        return this.concesionariaService.getAllAutos();
    }

    @Get('marca/:marca')
    getVehiclesByMarca(@Param('marca') marca: string): Vehiculo[] {
        return this.concesionariaService.getVehiclesByMarca(marca);
    }

    @Get('patente/:patente')
    getVehicleByPatente(@Param('patente') patente: string): Vehiculo {
        return this.concesionariaService.getVehicleByPatente(patente);
    }

    @Get('modelo/:modelo')
    getVehiclesByModelo(@Param('modelo') modelo: string): Vehiculo[] {
        return this.concesionariaService.getVehiclesByModelo(modelo);
    }

    @Get('anio/:anioinicio/:aniofin')
    getVehiclesByAño(@Param('anioinicio') añoinicio: number, @Param('aniofin') añofin: number): Vehiculo[] {
        return this.concesionariaService.getVehiclesByAño(añoinicio, añofin);
    }

    @Get('precio/:precioinicio/:preciofin')
    getVehiclesByPrecio(@Param('precioinicio') precioinicio: number, @Param('preciofin') preciofin: number): Vehiculo[] {
        return this.concesionariaService.getVehiclesByPrecio(precioinicio, preciofin);
    }

    // POST

    @Post('auto')
    addAuto(@Body() auto: any): string {
        return this.concesionariaService.addAuto(auto);
    }

    @Post('camioneta')
    addCamioneta(@Body() camioneta: any): string {
        return this.concesionariaService.addCamioneta(camioneta);
    }

    // UPDATE

    @Put(':patente')
    updateVehicle(@Body() vehiculo: any, @Param('patente') patente: string): string {
        return this.concesionariaService.updateVehiculo(vehiculo, patente);
    }

    // DELETE

    @Delete(':patente')
    deleteVehicle(@Param('patente') patente: string): string {
        return this.concesionariaService.deleteVehiculo(patente);
    }
}
