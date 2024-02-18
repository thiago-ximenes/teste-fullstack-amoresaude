import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";
import {environment} from "../../environments/environment.prod";

interface LoginResponse {
  access_token: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = `${environment.apiUrl}/auth/login`;

  constructor(
    private readonly http: HttpClient
  ) {
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post<LoginResponse>(this.url, credentials, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }
}
