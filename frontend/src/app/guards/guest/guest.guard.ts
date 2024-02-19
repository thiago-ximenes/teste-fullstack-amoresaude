import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngxs/store";
import {map, Observable} from "rxjs";
import {CheckToken} from "../auth/auth.actions";
import {AuthState} from "../auth/auth.state";

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.dispatch(new CheckToken()).pipe(
      map(() => {
        const token = this.store.selectSnapshot(AuthState.token);
        const user = this.store.selectSnapshot(AuthState.user);

        const isAuthenticated = token && user;

        if (isAuthenticated) {
          this.router.navigate(['/home']);
          return false;
        }

        return true;
      })
    );
  }
}
