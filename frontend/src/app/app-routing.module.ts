import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth/auth.guard";
import {GuestGuard} from "./guards/guest/guest.guard";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'entity/new',
        loadChildren: () => import('./pages/mutable-entity/mutable-entity.module').then(m => m.MutableEntityModule),
      },
      {
        path: 'entity/edit/:id',
        loadChildren: () => import('./pages/mutable-entity/mutable-entity.module').then(m => m.MutableEntityModule),
      },
      {
        path: 'entity/view/:id',
        loadChildren: () => import('./pages/view-entity/view-entity.module').then(m => m.ViewEntityModule),
      }
    ]
  },
  {
    path: '',
    canActivate: [GuestGuard],
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
