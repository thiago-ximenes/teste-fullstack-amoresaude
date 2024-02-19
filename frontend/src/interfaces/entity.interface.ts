import Regional from "./regional.interface";
import AttendedMedicalSpecialties from "./attended_medical_specialties.interface";

export default interface Entity {
  id: number;
  corporateName: string;
  tradeName: string;
  cnpj: string;
  regional: Regional;
  opening_date: Date;
  active: boolean;
  attended_medical_specialties: AttendedMedicalSpecialties[];
  createdAt: Date;
  updatedAt: Date;
}
