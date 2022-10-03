import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculadoraService {
    constructor() {}

    sumar(num1: number, num2: number): number {
        return Number(num1) + Number(num2);
    }

    multiplicar(num1: number, num2: number): number {
        return Number(num1) * Number(num2);
    }
}
