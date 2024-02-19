import { Module } from '@nestjs/common';
import { RegionalsService } from './regionals.service';
import { RegionalsController } from './regionals.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Regional} from "./entities/regional.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Regional])],
  controllers: [RegionalsController],
  providers: [RegionalsService],
})
export class RegionalsModule {}
