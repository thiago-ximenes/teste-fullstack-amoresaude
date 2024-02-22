import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import Entity from "../../../interfaces/entity.interface";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  entityUrl = 'http://localhost:3000/entities?';

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  getEntities(params?: Params) {
    return this.http.get<{
      entities: Entity[],
      length: number,
      page: number

    }>(this.entityUrl + new URLSearchParams(params!).toString(),
    );
  }
}
