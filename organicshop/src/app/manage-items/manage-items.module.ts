import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageItemsRoutingModule } from './manage-items-routing.module';
import { ManageItemsComponent } from './manage-items.component';
import { ManageItemComponent } from './manage-item/manage-item.component';
import { AddUpdateItemComponent } from './add-update-item/add-update-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatDirective } from '../directives/format.directive'
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ManageItemsComponent, 
                 ManageItemComponent, 
                 AddUpdateItemComponent, 
                 FormatDirective, 
                 ],
  imports: [
    CommonModule,
    ManageItemsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[ManageItemsComponent, FormatDirective],
  providers: [ CurrencyPipe, DecimalPipe ],
})
export class ManageItemsModule { }
