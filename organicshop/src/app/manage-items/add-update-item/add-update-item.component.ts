import { AddUpdateItemService } from 'src/app/manage-items/add-update-item/add-update-item.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { InventoryItem } from '../../models/inventory-item.model';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemExistsService } from './item-exists.service';
import { ManageItemsService } from '../manage-items.service';
import { Observable, Subscription } from 'rxjs';
import { priceZeroValueValidator } from './price-zero-value.validator';


@Component({
  selector: 'app-add-update-item',
  templateUrl: './add-update-item.component.html',
  styleUrls: ['./add-update-item.component.scss']
})
export class AddUpdateItemComponent implements OnInit{

  public action:string = '';
  public ADD_ITEM_TITLE = 'Adicionar itens';
  public UPDATE_ITEM_TITLE = 'Atualizar item';
  subscription: Subscription;

  @ViewChild('itemPrice') itemPrice; 

  public categoryLabel = '';

  newItemForm!: FormGroup;
  un: string;
  kg: string;

  constructor(
    public addUpdateItemService:AddUpdateItemService,
    public manageItemsService: ManageItemsService,
    private formBuilder:FormBuilder,
    private itemExistsService:ItemExistsService,
    public router: Router
    ){
  }

  ngOnInit(): void {

    this.defineForm();

    this.configureSection();

  }

  private defineForm(){

    if (this.addUpdateItemService.getAction() == this.addUpdateItemService.ADD_ITEM){

      this.newItemForm = this.formBuilder.group({
        itemName:['',
                  [Validators.required, Validators.minLength(3)],
                ],
        itemPrice:['',[Validators.required, priceZeroValueValidator]],
        itemType:['un',[Validators.required]],
      },
      {
        validators: [priceZeroValueValidator],
      }
    )

    }else if (this.addUpdateItemService.getAction() == this.addUpdateItemService.UPDATE_ITEM){

      this.newItemForm = this.formBuilder.group({
        itemName:[this.addUpdateItemService.getSelectedItem().itemName, [Validators.required, Validators.minLength(3)]],
        itemPrice:[this.addUpdateItemService.getSelectedItem().itemPrice.toFixed(2), [Validators.required, priceZeroValueValidator]],
        itemType:['un',[Validators.required]],
      },
      {
        validators: [priceZeroValueValidator],
      })

    }

  }

  private configureSection(){
    this.categoryLabel = this.addUpdateItemService.getCatLabel();

    switch(this.addUpdateItemService.getAction()){

      case(this.addUpdateItemService.ADD_ITEM):
      this.action = this.ADD_ITEM_TITLE;
      break;

      case(this.addUpdateItemService.UPDATE_ITEM):
      this.action = this.UPDATE_ITEM_TITLE;
      this.setUpdateRadioValues();
      break;

      default:
      this.action = '';

    }
  }

  private setUpdateRadioValues() {
    if(this.addUpdateItemService.getSelectedItem().itemType == 'un'){
      this.newItemForm.patchValue({itemType:'un'});
    }else if(this.addUpdateItemService.getSelectedItem().itemType == 'kg'){
      this.newItemForm.patchValue({itemType:'kg'});
    }
    
  }

  private hydratePriceItem(){
    let newItem = this.newItemForm.getRawValue() as InventoryItem;
    newItem['itemPrice'] = parseFloat(this.itemPrice.nativeElement.value.replace(',', '.'));
    console.log('New item >>', newItem);
    return newItem; 
  }

  addUpdateItem(){
    if(this.newItemForm.valid){
      if (this.addUpdateItemService.getAction() == this.addUpdateItemService.ADD_ITEM){
        const hydratedItem = this.hydratePriceItem();
        this.subscription = this.addUpdateItemService.addItem(hydratedItem).subscribe({
          next: () => {
            this.router.navigate(['/manage-item', { id: this.addUpdateItemService.getCatId() }]);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => console.info('Register completed!'),
          })
      }else if (this.addUpdateItemService.getAction() == this.addUpdateItemService.UPDATE_ITEM){
        const hydratedItem = this.hydratePriceItem();
        const itemId = this.addUpdateItemService.getSelectedItem()._id;
        this.subscription = this.addUpdateItemService.updateItem(itemId,hydratedItem).subscribe({
          next: () => {
            this.router.navigate(['/manage-item', { id: this.addUpdateItemService.getCatId() }]);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => console.info('Update completed!'),
          }
        )
      }
    }else{
      alert('Invalid form')
    }
  }



}
