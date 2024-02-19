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

  constructor(
    private readonly http: HttpClient
  ) {
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post<LoginResponse>(this.loginUrl, credentials, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }

  me(token: string) {
    return this.http.get<User>(this.userUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map((response: User) => {
        return response;
      })
    );
  }
}
