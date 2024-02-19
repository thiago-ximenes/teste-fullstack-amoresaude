import { Test, TestingModule } from '@nestjs/testing';
import { RegionalsController } from './regionals.controller';
import { RegionalsService } from './regionals.service';

describe('RegionalsController', () => {
  let controller: RegionalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionalsController],
      providers: [RegionalsService],
    }).compile();

    controller = module.get<RegionalsController>(RegionalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
