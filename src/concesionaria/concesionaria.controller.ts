import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ConcesionariaService } from './concesionaria.service';
import { Vehiculo } from './Models/Vehiculo';

@Controller('concesionaria')
export class ConcesionariaController {
    constructor(private concesionariaService: ConcesionariaService) {}

    // GET

    @Get('')
    getVehicles(@Query() parameters?: any): Vehiculo[] {
        return this.concesionariaService.getVehicles(parameters?parameters:undefined);
    }

    // POST

    @Post('')
    addAuto(@Body() vehiculos: any): string {
        return this.concesionariaService.addVehicles(vehiculos);
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
