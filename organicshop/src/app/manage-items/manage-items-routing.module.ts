import { AddUpdateItemComponent } from './add-update-item/add-update-item.component';
import { ManageItemsComponent } from './manage-items.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageItemComponent } from './manage-item/manage-item.component';
import { AuthGuard } from '../login/auth/auth.guard';

const routes: Routes = [{
  path: '',
  component: ManageItemsComponent,
  children:[
    {
      path: 'manage-item',
      component: ManageItemComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-update-item',
      component: AddUpdateItemComponent,
      canActivate: [AuthGuard],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageItemsRoutingModule { }
