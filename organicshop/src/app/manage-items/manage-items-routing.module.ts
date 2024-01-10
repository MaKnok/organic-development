import { AddUpdateItemComponent } from './add-update-item/add-update-item.component';
import { ManageItemsComponent } from './manage-items.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageItemComponent } from './manage-item/manage-item.component';

const routes: Routes = [{
  path: '',
  component: ManageItemsComponent,
  children:[
    {
      path: 'manage-item',
      component: ManageItemComponent
    },
    {
      path: 'add-update-item',
      component: AddUpdateItemComponent
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageItemsRoutingModule { }
