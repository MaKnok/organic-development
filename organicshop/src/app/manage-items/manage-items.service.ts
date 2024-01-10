import { catchError, map, retry, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ManageItemsService {
  constructor(private httpClient: HttpClient) {}

  private API: string = environment.apiURL;
  private chosenCategory:string = '';

  FOOD_CAT: string = 'cat-food';
  HEALTH_CAT: string = 'cat-health';
  SUP_CAT: string = 'cat-sup';
  BEAUTY_CAT: string = 'cat-beauty';

  getCategories(): Observable<any> {
    return this.httpClient.get<Category[]>(this.API + '/categories').pipe(
      map((categories) => categories.flatMap((cat) => cat)),
      tap((categories) => console.log(categories)),
      catchError((err) => throwError(() => new Error(err))),
      retry(3)
    );
  }

  setChosenCategory(value:string):void{
    this.chosenCategory = value;
  }

  getChosenCategory():string{
    return this.chosenCategory;
  }
}
