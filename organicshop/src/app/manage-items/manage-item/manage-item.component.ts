import { InventoryItem } from '../../models/inventory-item.model';
import { Component, OnInit } from '@angular/core';
import { AddUpdateItemService } from '../add-update-item/add-update-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/tools/modal/modal.service'

@Component({
  selector: 'app-manage-item',
  templateUrl: './manage-item.component.html',
  styleUrls: ['./manage-item.component.scss'],
})
export class ManageItemComponent implements OnInit {

  inventoryItems$: InventoryItem[];
  subscription: Subscription;
  categoryId: string = '';
  selectedItem:InventoryItem;

  searchItemForm!: FormGroup;

  modalMessage: string;
  modalIcon: string;
  modalType: string = 'confirmation'

  DELETE_ITEM_MESSAGE: string = 'Deseja mesmo deletar o item ' 
  DELETE_ICON: string = 'fa fa-trash';

  itemNotFound: boolean = false;

  constructor(
    private addUpdateItemService: AddUpdateItemService,
    private route: ActivatedRoute,
    private router: Router, 
    private formBuilder:FormBuilder,
    public modalService:ModalService,
  ) {}

  ngOnInit() {
    this.checkCategory();
    this.provideList();
    this.searchItemForm = this.formBuilder.group({
      searchValue:['',
                   [Validators.required],
                  ],
    })
  }

  ngDoCheck(){
    let id = this.categoryId;
    this.checkCategory();
    if (id !== this.categoryId){
      this.provideList();
    } 
  }

  private checkCategory() {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    console.log('Category Id >>>', this.categoryId);
  }

  private provideList() {
    this.subscription = this.addUpdateItemService
      .allItems(this.categoryId)
      .subscribe({
        next: (res) => {
          console.table(res);
          this.inventoryItems$ = res;
          this.selectedItem = res[0];
          this.addUpdateItemService.setSelectedItem(res[0]);
        },
        error: (error) => {
          console.log('There was an error in Add Update List! >>', error);
        },
        complete: () => console.info('Categories were successfully gotten!'),
      });
  }

  public searchItem(){
    if(this.searchItemForm.valid){
      let searchedItem = this.searchItemForm.getRawValue();
      searchedItem = searchedItem;
      this.subscription = this.addUpdateItemService
      .searchItems(searchedItem)
      .subscribe({
        next: (res) => {
          console.table(res);
          console.log(res);
          this.selectedItem = res[0];
          this.addUpdateItemService.setSelectedItem(res[0]);

          this.inventoryItems$ = res;
          console.log('FOUND ITEMS >>', this.inventoryItems$);

          this.itemNotFound = false; 
        },
        error: (error) => {
          console.log('There was an error in the item search! >>', error);
          this.itemNotFound = true; 
        },
        complete: () => console.info('Items were successfully gotten!'),
      });
    }
  }

  public selectItem(item:InventoryItem ){
    this.selectedItem = item;
    this.addUpdateItemService.setSelectedItem(item);
    console.log('Item Id >>', this.selectedItem);
  }

  public addItem(categoryId:string){
    this.router.navigated = false;
    this.router.navigate(['/add-update-item']);
    this.addUpdateItemService.setCatId(categoryId);
    this.addUpdateItemService.setAction('add-item');
  }

  public editItem(categoryId:string, itemId:InventoryItem){
    this.router.navigated = false;
    this.router.navigate(['/add-update-item']);
    this.addUpdateItemService.setCatId(categoryId);
    this.addUpdateItemService.setAction('update-item');
  }

  public deleteItem(categoryId:string,item:InventoryItem ){
    this.addUpdateItemService.setCatId(categoryId);
    this.subscription = this.addUpdateItemService.deleteItem(item).subscribe({
      next: () => {
        alert('Item deleted!');
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.info('Item deleted!'),
      }
    )
  }

  onModalChangeDeleteItem(event: boolean) {
    this.modalMessage = this.DELETE_ITEM_MESSAGE + this.selectedItem.itemName + ' ?';
    this.modalIcon = this.DELETE_ICON;
    this.modalService.openModal = event;
    console.log('this.modalService.openModal >>>', this.modalService.openModal )
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
    console.log("Manage item unsubscribed");
  }


}
