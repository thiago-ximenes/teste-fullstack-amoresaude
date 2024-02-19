import { Test, TestingModule } from '@nestjs/testing';
import { AttendedMedicalSpecialtiesService } from './attended_medical_specialties.service';

describe('AttendedMedicalSpecialtiesService', () => {
  let service: AttendedMedicalSpecialtiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendedMedicalSpecialtiesService],
    }).compile();

    service = module.get<AttendedMedicalSpecialtiesService>(AttendedMedicalSpecialtiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
