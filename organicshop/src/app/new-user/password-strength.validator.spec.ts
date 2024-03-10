import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NewUserComponent } from './new-user.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { passwordStrenghtValidator } from './password-strength.validator';

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
            userPassword: new FormControl(''),
        });
    });

    it('should return null when password length is 8 or more and pass the password regex criteria', () => {
        formGroup.get('userPassword')?.setValue('password#123');

        const result = passwordStrenghtValidator(formGroup);
        expect(result).toBeNull();
    });
    
    it('should return validation error when password length is under 8', () => {
        formGroup.get('userPassword')?.setValue('p#123');
    
        const result = passwordStrenghtValidator(formGroup);
        expect(result).toEqual({ passwordIsWeak: true });
    });

    it('should return validation error when password does not pass the password regex criteria', () => {
        formGroup.get('userPassword')?.setValue('password123');
    
        const result = passwordStrenghtValidator(formGroup);
        expect(result).toEqual({ passwordIsWeak: true });
    });
    
})




