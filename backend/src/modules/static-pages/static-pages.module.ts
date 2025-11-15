import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticPage } from '../../entities/static-page.entity';
import { StaticPagesService } from './static-pages.service';
import { StaticPagesController } from './static-pages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StaticPage])],
  controllers: [StaticPagesController],
  providers: [StaticPagesService],
})
export class StaticPagesModule {}