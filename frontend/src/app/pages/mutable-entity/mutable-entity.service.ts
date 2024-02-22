import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import Regional from "../../../interfaces/regional.interface";
import AttendedMedicalSpecialties from "../../../interfaces/attended_medical_specialties.interface";
import Entity from "../../../interfaces/entity.interface";

@Injectable({
  providedIn: 'root'
})
export class MutableEntityService {
  regionalUrl = `${environment.apiUrl}/regionals`
  attendedMedicalSpecialtiesUrl = `${environment.apiUrl}/attended-medical-specialties`
  entityUrl = `${environment.apiUrl}/entities`

  constructor(
    private readonly http: HttpClient,
  ) {

  }

  getRegionals() {

    return this.http.get<Regional[]>(this.regionalUrl, {
    })
  }

  getAttendedMedicalSpecialties() {
    return this.http.get<AttendedMedicalSpecialties[]>(this.attendedMedicalSpecialtiesUrl, {
    })
  }

  createEntity(entity: Entity) {
    return this.http.post<Entity>(this.entityUrl, entity, {
    })
  }

  getEntity(id: string) {
    return this.http.get<Entity>(`${this.entityUrl}/${id}`, {
    })
  }

  deleteEntity(id: string) {
    return this.http.delete(`${this.entityUrl}/${id}`, {
    })
  }

  updateEntity(id: string, entity: Entity) {
    return this.http.patch<Entity>(`${this.entityUrl}/${id}`, entity, {
    })
  }
}
