import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CalculadoraService } from './calculadora/calculadora.service';
import { CalculadoraController } from './calculadora/calculadora.controller';
import { ConcesionariaService } from './concesionaria/concesionaria.service';
import { ConcesionariaController } from './concesionaria/concesionaria.controller';


@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath:join(__dirname,'..','app')})
  ],
  controllers: [AppController, CalculadoraController, ConcesionariaController],
  providers: [AppService, CalculadoraService, ConcesionariaService],
})
export class AppModule {}
