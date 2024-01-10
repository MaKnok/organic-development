import { FormGroup } from '@angular/forms';

export function priceZeroValueValidator(formGroup: FormGroup) {
  const amount = formGroup.get('itemPrice')?.value ?? '';
  const formattedAmount = amount.toString();

  console.log(formattedAmount);

  if (formattedAmount !== '') {
    return formattedAmount === '0,0' || formattedAmount === '0'
    ? { priceZeroValue: true }
    : null;
  }else {
    return null;
  }


}