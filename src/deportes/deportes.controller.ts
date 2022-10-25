import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DeportesService } from './deportes.service';
import Delegacion from './Models/Delegacion';
import Integrante from './Models/Integrante';
import Torneo from './Models/Torneo';

@Controller('deportes')
export class DeportesController {

    constructor(private deportesService: DeportesService) {}

    // GET

    @Get('torneos')
    getTorneos(@Query() parameters: any): Torneo[] {
        return this.deportesService.getTorneos(parameters);
    }

    @Get('delegaciones')
    getdelegaciones(@Query() parameters: any): Delegacion[] {
        return this.deportesService.getDelegaciones(parameters);
    }

    @Get('integrantes')
    getIntegrantes(@Query() parameters: any): Integrante[] {
        return this.deportesService.getIntegrantes(parameters);
    }

    // POST

    @Post('torneos')
    addTorneos(@Body() torneo: any): string {
        return this.deportesService.addTorneo(torneo);
    }

    @Post('torneos/:id')
    addDelegaciones(@Body() delegacion: any, @Param('id') torneoid: number): string {
        return this.deportesService.addDelegacion(torneoid, delegacion);
    }

    @Post('delegaciones/:id')
    addintegrantes(@Body() integrante: any, @Param('id') delegacionid: number): string {
        return this.deportesService.addIntegrante(delegacionid, integrante);
    }

    // DELETE


    @Delete('torneos/:id')
    deleteTorneo(@Param('id') id: number): string {
        return this.deportesService.deleteTorneo(id);
    }

    @Delete('delegaciones/:id')
    deleteDelegacion(@Param('id') id: number): string {
        return this.deportesService.deleteDelegacion(id);
    }

    @Delete('integrantes/:id')
    deleteIntegrante(@Param('id') id: number): string {
        return this.deportesService.deleteIntegrante(id);
    }

    // PUT

    @Put('torneos/:id')
    updateTorneo(@Param('id') id: number, @Body() torneo: any): string {
        return this.deportesService.updateTorneo(id, torneo);
    }

    @Put('delegaciones/:id')
    updateDelegacion(@Param('id') id: number, @Body() delegacion: any): string {
        return this.deportesService.updateDelegacion(id, delegacion);
    }

    @Put('integrantes/:id')
    updateIntegrante(@Param('id') id: number, @Body() integrante: any): string {
        return this.deportesService.updateIntegrante(id, integrante);
    }
}
