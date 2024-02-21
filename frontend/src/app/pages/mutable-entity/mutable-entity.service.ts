import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import Regional from "../../../interfaces/regional.interface";
import {Store} from "@ngxs/store";
import {AuthState} from "../../guards/auth/auth.state";
import AttendedMedicalSpecialties from "../../../interfaces/attended_medical_specialties.interface";
import Entity from "../../../interfaces/entity.interface";

@Injectable({
  providedIn: 'root'
})
export class MutableEntityService {
  regionalUrl = `${environment.apiUrl}/regionals`
  attendedMedicalSpecialtiesUrl = `${environment.apiUrl}/attended-medical-specialties`
  entityUrl = `${environment.apiUrl}/entities`

  headers = {}

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store
  ) {
    const token = this.store.selectSnapshot(AuthState.token)
    this.headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  }

  getRegionals() {
    return this.http.get<Regional[]>(this.regionalUrl, {
      headers: this.headers
    })
  }

  getAttendedMedicalSpecialties() {
    return this.http.get<AttendedMedicalSpecialties[]>(this.attendedMedicalSpecialtiesUrl, {
      headers: this.headers
    })
  }

  createEntity(entity: Entity) {
    return this.http.post<Entity>(this.entityUrl, entity, {
      headers: this.headers
    })
  }

  getEntity(id: string) {
    return this.http.get<Entity>(`${this.entityUrl}/${id}`, {
      headers: this.headers
    })
  }

  deleteEntity(id: string) {
    return this.http.delete(`${this.entityUrl}/${id}`, {
      headers: this.headers
    })
  }

  updateEntity(id: string, entity: Entity) {
    return this.http.patch<Entity>(`${this.entityUrl}/${id}`, entity, {
      headers: this.headers
    })
  }
}
