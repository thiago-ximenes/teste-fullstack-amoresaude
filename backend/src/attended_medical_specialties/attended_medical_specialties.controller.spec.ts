import { Test, TestingModule } from '@nestjs/testing';
import { AttendedMedicalSpecialtiesController } from './attended_medical_specialties.controller';
import { AttendedMedicalSpecialtiesService } from './attended_medical_specialties.service';

describe('AttendedMedicalSpecialtiesController', () => {
  let controller: AttendedMedicalSpecialtiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendedMedicalSpecialtiesController],
      providers: [AttendedMedicalSpecialtiesService],
    }).compile();

    controller = module.get<AttendedMedicalSpecialtiesController>(AttendedMedicalSpecialtiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
