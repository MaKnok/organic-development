import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NewUserComponent } from './new-user.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { userPasswordEqualValidator } from './user-password-equal.validator';

describe('Password strength validator', () => {
    let component: NewUserComponent;
    let fixture: ComponentFixture<NewUserComponent>;
    let formGroup: FormGroup;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule,ReactiveFormsModule,RouterTestingModule,HttpClientTestingModule],
            declarations: [NewUserComponent],
        }).compileComponents();
    
        fixture = TestBed.createComponent(NewUserComponent);
        component = fixture.componentInstance;
        formGroup = new FormGroup({
            userName: new FormControl(''),
            userPassword: new FormControl(''),
        });
    });

    it('should return null when password is different from username', () => {
        formGroup.get('userName')?.setValue('User Name');
        formGroup.get('userPassword')?.setValue('password#123');

        const result = userPasswordEqualValidator(formGroup);
        expect(result).toBeNull();
    });
    
    it('should return validation error when password matches username', () => {
        formGroup.get('userName')?.setValue('UserName#123');
        formGroup.get('userPassword')?.setValue('UserName#123');
    
        const result = userPasswordEqualValidator(formGroup);
        expect(result).toEqual({ passwordEqualUser: true });
    });
    
})




