import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import Entity from "../../../interfaces/entity.interface";
import {AuthState} from "../../guards/auth/auth.state";
import {Store} from "@ngxs/store";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  entityUrl = 'http://localhost:3000/entities?';
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

  getEntities(params?: Params) {
    return this.http.get<{
      entities: Entity[],
      length: number,
      page: number

    }>(this.entityUrl + new URLSearchParams(params!).toString(),
      {
        headers: this.headers
      }
    );
  }
}
