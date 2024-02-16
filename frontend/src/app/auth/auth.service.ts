import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";

interface LoginResponse {
  access_token: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post<LoginResponse>('/auth/login', credentials).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }
}
