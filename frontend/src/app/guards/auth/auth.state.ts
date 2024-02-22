import {State, Action, StateContext, Selector} from '@ngxs/store';
import {CheckToken, UpdateToken} from './auth.actions';
import {AuthService} from './auth.service';
import {tap} from 'rxjs/operators';
import {catchError, map, of} from "rxjs";
import {Injectable} from "@angular/core";

export class AuthStateModel {
  token: string | null = null;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: localStorage.getItem('access_token') || null,
    user: null
  }
})
export class AuthState {
  constructor(private readonly authService: AuthService) {
  }

  @Selector()
  static token(state: AuthStateModel) {
    return state.token;
  }

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }

  @Action(CheckToken)
  checkToken(ctx: StateContext<AuthStateModel>) {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return of(false);
    }

    return this.authService.me().pipe(
      tap((user) => {
        ctx.patchState({token, user});
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  @Action(UpdateToken)
  updateToken(ctx: StateContext<AuthStateModel>, {token}: UpdateToken) {
    ctx.patchState({token});
    localStorage.setItem('access_token', token);
  }
}
