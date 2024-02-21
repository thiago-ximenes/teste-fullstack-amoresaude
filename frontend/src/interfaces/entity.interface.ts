import Regional from "./regional.interface";
import AttendedMedicalSpecialties from "./attended_medical_specialties.interface";

export default interface Entity {
  id: number;
  corporateName: string;
  tradeName: string;
  cnpj: string;
  regional: Regional;
  openingDate: Date;
  active: boolean;
  attendedMedicalSpecialties: AttendedMedicalSpecialties[];
  createdAt: Date;
  updatedAt: Date;
}
