import { Test, TestingModule } from '@nestjs/testing';
import { RegionalsService } from './regionals.service';

describe('RegionalsService', () => {
  let service: RegionalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegionalsService],
    }).compile();

    service = module.get<RegionalsService>(RegionalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
