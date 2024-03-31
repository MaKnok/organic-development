import { TestBed, inject  } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ManageItemsService } from './manage-items.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/models/category.model';
import { of } from 'rxjs';

describe('ManageItemsService', () => {
  let service: ManageItemsService;
  let httpTestingController: HttpTestingController;
  const apiURL = environment.apiURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ManageItemsService]
    });
    service = TestBed.inject(ManageItemsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`${ManageItemsService.prototype.getCategories.name} should fetch categories successfully`, () => {

    const mockCategories: Category[] = [
      {  
        catId: 'cat-food',
        categoryName: 'Alimentação'
      }, 
      {  
        catId: 'cat-health',
        categoryName: 'Saúde e higiene'
      },
      {  
        catId: 'cat-sup',
        categoryName: 'Suplementos'
      },
      {  
        catId: 'cat-beauty',
        categoryName: 'Beleza e estética'
      }
    ];
    
    service.getCategories().subscribe(categories => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpTestingController.expectOne(apiURL + '/categories');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCategories);
  });

  it(`${ManageItemsService.prototype.setChosenCategory.name} and 
      ${ManageItemsService.prototype.getChosenCategory.name} 
      should set categories successfully`, () => {
    const chosenCategory = 'cat-food';
    service.setChosenCategory(chosenCategory);
    expect(service.getChosenCategory()).toEqual(chosenCategory);
  });

  
});
