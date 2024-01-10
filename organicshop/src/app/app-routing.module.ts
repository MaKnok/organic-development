import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Routes } from '@angular/router';
import { AuthGuard } from './login/auth/auth.guard';
import { LoginGuard } from './login/auth/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
      canLoad: [LoginGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'manage-items',
    loadChildren: () =>
      import('./manage-items/manage-items.module').then(
        (m) => m.ManageItemsModule
      ),
      canActivate: [AuthGuard],
  },
  {
    path: 'sales',
    loadChildren: () =>
      import('./sales/sales.module').then((m) => m.SalesModule),
      canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./user-listing/user-listing.module').then(
        (m) => m.UserListingModule
      ),
      canActivate: [AuthGuard],
  },
  {
    path: 'new-user',
    loadChildren: () =>
      import('./new-user/new-user.module').then((m) => m.NewUserModule),
      canLoad: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
