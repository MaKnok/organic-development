import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NewUserComponent } from './new-user.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { confirmPasswordValidator } from './confirm-password.validator';

describe('Confirm password validator', () => {
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
            userPassword: new FormControl(''),
            userPasswordConfirm: new FormControl(''),
        });
    });

    it('should return null when passwords match', () => {
        formGroup.get('userPassword')?.setValue('password#123');
        formGroup.get('userPasswordConfirm')?.setValue('password#123');
    
        const result = confirmPasswordValidator(formGroup);
        expect(result).toBeNull();
    });
    
    it('should return validation error when passwords do not match', () => {
        formGroup.get('userPassword')?.setValue('password#123');
        formGroup.get('userPasswordConfirm')?.setValue('password#321');
    
        const result = confirmPasswordValidator(formGroup);
        expect(result).toEqual({ passwordEqualConfirmPass: true });
    });
    
})