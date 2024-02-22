import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";
import {environment} from "../../../environments/environment.prod";
import User from "../../../interfaces/user.interface";

interface LoginResponse {
  access_token: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = `${environment.apiUrl}/auth/login`;
  userUrl = `${environment.apiUrl}/auth/me`;
  refreshTokenUrl = `${environment.apiUrl}/token/refresh`;

  constructor(
    private readonly http: HttpClient
  ) {
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post<LoginResponse>(this.loginUrl, credentials, {
    }).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }

  me() {
    return this.http.get<User>(this.userUrl, {
    }).pipe(
      map((response: User) => {
        return response;
      })
    );
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('access_token');
    return this.http.put<LoginResponse>(this.refreshTokenUrl, {
      lastToken: refreshToken
    }).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }
}
