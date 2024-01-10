import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddUpdateItemService } from 'src/app/manage-items/add-update-item/add-update-item.service'
import { InventoryItem } from 'src/app/models/inventory-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})


export class ModalComponent {

  constructor(private addUpdateItemService: AddUpdateItemService,
              private router: Router,) { }

  DELETE_ICON: string = 'fa fa-trash';
  CHECK_ICON: string = 'fa fa-check';

  CONFIRMATION_MODAL: string = 'confirmation';
  OK_MODAL: string = 'ok';

  statusModal: boolean = true;
  @Input() message: string;
  @Input() icon: string;
  @Input() item: InventoryItem;
  @Input() catId: string; 
  @Input() modalType: string; 
  @Output() changedModal = new EventEmitter()

  yesAnswer(){
    switch(this.icon){
      case this.DELETE_ICON:
        console.log('Item >>', this.item);
        this.addUpdateItemService.setCatId(this.catId);
        this.addUpdateItemService.deleteItem(this.item).subscribe({
            next: () => {
              this.closeModal();
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => console.info('Item was deleted!'),
            });
        break;
      case this.CHECK_ICON:
        this.closeModal();
        this.router.navigate(['']);
        break;
      default:
        this.closeModal();
    }
    this.closeModal();
  }

  closeModal(){
    this.statusModal = false
    this.changedModal.emit(this.statusModal)
  }


}
