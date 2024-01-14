import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, tap, throwError } from 'rxjs';
import { InventoryItem } from '../../models/inventory-item.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AddUpdateItemService {

  public ADD_ITEM: string = 'add-item';
  public UPDATE_ITEM: string = 'update-item';

  private inventoryItem: any[];
  private url: string = environment.apiURL;

  private categoryId: string = '';
  private categoryLabel: string = '';
  private action:string = '';
  private selectedItem:InventoryItem;

  constructor(private httpClient: HttpClient,  public router: Router) {
    this.inventoryItem = [];  
  }

  /*GETTERS AND SETTERS*/

  public getSelectedItem():InventoryItem{
    return this.selectedItem;
  }

  public setSelectedItem(item:InventoryItem){
    this.selectedItem = item; 
  }

  public getCatLabel():string{
    return this.categoryLabel;
  }

  public setCatLabel(label:string){
    this.categoryLabel = label; 
  }

  public getAction():string{
    return this.action;
  }

  public setAction(action:string){
    this.action = action; 
  }

  public getCatId():string{
    return this.categoryId;
  }

  public setCatId(catId:string){
    this.categoryId = catId; 
  }

  get inventoryItems() {
    return this.inventoryItem;
  }

  
  /*HTTP SERVICES*/

  allItems(id: string): Observable<any> {
    return this.httpClient.get<InventoryItem[]>(this.url + '/inventoryItems').pipe(
      map((response) => {
        if (response && response[0][id]) {
          return response[0][id];
        } else {
          return [];
        }
      }),
      tap((response) => console.log(response[0][id])),
      catchError((err) => throwError(() => new Error(err))),
      retry(3)
    );
  }

  searchItems(searchedValue:any): Observable<any> {
    console.log('Searched value >>', searchedValue);

    const search = this.checkRoute(searchedValue);

    return this.httpClient.get<InventoryItem[]>(this.url + '/inventoryItems/search?search=' + search).pipe(
      map((items) => {
        return items;
      }),
      tap((items) => console.log(items)),
      catchError((err) => throwError(() => new Error(err))),
      retry(3)
    );
  }

  checkRoute(searchedValue:any){
    if (this.router.url === '/add-update-item'){
      return searchedValue;
    }else {
      return searchedValue.searchValue;
    }
  }

  addItem(inventoryItem: InventoryItem): Observable<InventoryItem> {
    this.hydrate(inventoryItem);
    console.log('inventoryItem >>', inventoryItem);
    return this.httpClient.post<InventoryItem>(this.url + '/inventoryItems/' + this.getCatId(), inventoryItem);
  }

  updateItem(id: string | number, newUserData: any): Observable<InventoryItem>  {
    this.hydrate(newUserData);
    return this.httpClient.put<InventoryItem>(this.url + '/inventoryItems/' + this.getCatId() + '/' + id, newUserData);
  }

  deleteItem(item:InventoryItem): Observable<InventoryItem> {
    const itemId = item._id
    return this.httpClient.delete<InventoryItem>(this.url + '/inventoryItems/' + this.getCatId() + '/' + itemId);
  }

  private hydrate(inventoryItem: any) {
    inventoryItem.date = new Date();
  }

  verifyExistingItem(searchedValue: any) {
    const list = this.searchItems(searchedValue);
    const filteredList = list.pipe(
      tap((items) => console.log(items)),
      catchError((err) => throwError(() => new Error(err))),
      retry(3)
    );
    console.log(filteredList);
    return filteredList
  }

  /*CLEAR ENVIRONMENT*/

  clearAddUpdateEnvironment(){
    this.inventoryItem = [];
    this.categoryId = '';
    this.categoryLabel = '';
    this.action = '';
  }

}
