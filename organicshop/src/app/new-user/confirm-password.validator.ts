import { FormGroup } from '@angular/forms';

export function confirmPasswordValidator(formGroup: FormGroup) {
  const password = formGroup.get('userPassword')?.value ?? '';
  const confirmPassword = formGroup.get('userPasswordConfirm')?.value ?? '';

  if (password.trim() + confirmPassword.trim()) {
    // checks whether both exist in the form input
    return password !== confirmPassword
      ? { passwordEqualConfirmPass: true }
      : null;
  } else {
    return null;
  }
}
