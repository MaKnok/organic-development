import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ageValidator } from './age.validator'; 
import { NewUserComponent } from './new-user.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Age validator', () => {
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
        formGroup = component.newUserForm;
    });

    /**Age Validation**/

    it('should validate age', () => {
        const control = new FormControl('', ageValidator(18));
    
        control.setValue('2000-01-01'); // Assuming the user is born on Jan 1, 2000
        expect(control.valid).toBeTruthy();
    
        control.setValue('2010-01-01'); // Assuming the user is born on Jan 1, 2010
        expect(control.valid).toBeFalsy();
        expect(control.errors).toEqual({ tooYoung: true });
    });
    
})