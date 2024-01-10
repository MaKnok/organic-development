import { FormGroup,  AbstractControl, ValidationErrors, ValidatorFn  } from '@angular/forms';

export function ageValidator(minimumAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
          console.log(control.value);
          return null; // Handle empty value as required validation in the form group
        }
    
        const today = new Date();
        const birthdate = new Date(control.value);
    
        const age = today.getFullYear() - birthdate.getFullYear();
    
        if (birthdate > today) {
          return { futureDate: true }; // Handle future birthdates
        }
    
        if (age < minimumAge) {
          return { tooYoung: true }; // Handle ages less than the required age
        }
    
        return null;
    };
}