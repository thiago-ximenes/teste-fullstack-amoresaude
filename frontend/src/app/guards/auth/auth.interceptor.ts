import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpStatusCode
} from '@angular/common/http';
import {Observable, tap, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Store} from "@ngxs/store";
import {UpdateToken} from "./auth.actions";
import {AuthState} from "./auth.state";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(AuthState.token);
    const authReq = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            return this.authService.refreshToken().pipe(
              tap((newToken) => {
                this.store.dispatch(new UpdateToken(newToken.access_token));
              }),
              switchMap((newToken: {access_token: string}) => {

                return next.handle(authReq.clone({setHeaders: {Authorization: `Bearer ${newToken.access_token}`}}));
              })
            );
          }
          return throwError(error);
        }
      ));
  }
}
