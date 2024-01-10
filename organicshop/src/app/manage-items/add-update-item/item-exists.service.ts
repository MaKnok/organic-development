import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddUpdateItemService } from './add-update-item.service';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemExistsService {

  constructor(private addUpdateItemService:AddUpdateItemService) {
  }

  itemExists(){
    return (control:AbstractControl)=>{
      return control.valueChanges.pipe(
        switchMap((itemName) =>
        this.addUpdateItemService.verifyExistingItem(itemName)
        ),
        map((result) => result.length !== 0 ? {existingItemName: true} : null),
        first()
      );
    }
  }
}
