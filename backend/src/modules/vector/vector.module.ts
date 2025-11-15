import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { VectorService } from './vector.service';
import { VectorController } from './vector.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [VectorController],
  providers: [VectorService],
  exports: [VectorService],
})
export class VectorModule {}