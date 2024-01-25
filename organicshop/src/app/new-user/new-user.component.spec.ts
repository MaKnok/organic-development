import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserComponent } from './new-user.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUserService } from './new-user.service';
import { UserExistsService } from './user-exists.service';
import { ModalService } from '../tools/modal/modal.service';
import { HttpClientModule } from '@angular/common/http';

describe(NewUserComponent.name, () => {
  let component: NewUserComponent;
  let fixture: ComponentFixture<NewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserComponent ],
      providers: [ NewUserService ],
      imports: [ HttpClientModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#${NewUserComponent.prototype.registerNewUser.name} should submit form data when form is valid`, () => {
    const validatesNewUserForm = component.registerNewUser();
    expect(validatesNewUserForm).not.toBeFalse();
  });


  /*it('validates clear button works', () => {

  });

  it('validates go to login page button works', () => {

  });*/


});
