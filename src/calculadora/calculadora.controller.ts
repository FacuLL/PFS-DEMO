import { Controller, Get, Param } from '@nestjs/common';
import { CalculadoraService } from './calculadora.service';

@Controller('calculadora')
export class CalculadoraController {
    constructor(private calculadoraService: CalculadoraService) {}

    @Get('sumar/:arg1/:arg2')
    sumar(@Param('arg1') arg1: number, @Param('arg2') arg2: number): number {
        return this.calculadoraService.sumar(arg1, arg2);
    }

    @Get('multiplicar/:arg1/:arg2')
    multiplicar(@Param('arg1') arg1: number, @Param('arg2') arg2: number): number {
        return this.calculadoraService.multiplicar(arg1, arg2);
    }
}
