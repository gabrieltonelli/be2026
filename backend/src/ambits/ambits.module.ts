import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmbitsService } from './ambits.service';
import { AmbitsController } from './ambits.controller';
import { Ambit } from './ambit.entity';
import { Category } from './category.entity';
import { Attribute } from './attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ambit, Category, Attribute])],
  providers: [AmbitsService],
  controllers: [AmbitsController],
  exports: [AmbitsService],
})
export class AmbitsModule { }
