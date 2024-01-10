import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  public openModal:boolean = false;

}
