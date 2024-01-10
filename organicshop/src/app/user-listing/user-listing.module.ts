import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListingComponent } from './user-listing.component';
import { UserListingRoutingModule } from './user-listing-routing.module';

@NgModule({
  declarations: [UserListingComponent],
  imports: [CommonModule, UserListingRoutingModule],
  exports: [UserListingComponent],
})
export class UserListingModule {}
