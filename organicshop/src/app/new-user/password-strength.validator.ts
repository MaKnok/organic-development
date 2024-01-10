import { FormGroup } from '@angular/forms';

export function passwordStrenghtValidator(formGroup: FormGroup) {
  const password = formGroup.get('userPassword')?.value ?? '';

  if (password.trim()) {
    // checks whether it exist in the form input

    const passwordRegex = /^(?=.*\d)(?=.*[\W_]).+$/;

    function validatePassword(password) {
      return passwordRegex.test(password);
    }

    const passwordTest = validatePassword(password);
    
    return password.length >= 8 && passwordTest 
      ? null
      : { passwordIsWeak: true };
  } else {
    return null;
  }
}
