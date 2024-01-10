import { FormGroup } from '@angular/forms';

export function userPasswordEqualValidator(formGroup: FormGroup) {
  const username = formGroup.get('userName')?.value ?? '';
  const password = formGroup.get('userPassword')?.value ?? '';

  if (username.trim() + password.trim()) {
    // checks whether both exist in the form input
    return username !== password ? null : { passwordEqualUser: true };
  } else {
    return null;
  }
}
