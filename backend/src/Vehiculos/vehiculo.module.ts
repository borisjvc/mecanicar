import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from './dto/vehiculo.entity';
import { VehiculoService } from './vehiculo.service';
import { VehiculoController } from './vehiculo.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Vehiculo])],
    controllers: [],
    providers: [VehiculoController],
    exports: [VehiculoService], 
})
export class TrabajosModule { }