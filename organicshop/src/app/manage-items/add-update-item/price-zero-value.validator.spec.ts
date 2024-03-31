import { priceZeroValueValidator } from './price-zero-value.validator';
import { FormControl, FormGroup } from '@angular/forms';

describe('PriceZeroValueValidator', () => {
    it('should return null if amount is not 0 or 0.0', () => {
      const formGroup = new FormGroup({
        itemPrice: new FormControl('10.0') // Sample amount
      });
  
      const result = priceZeroValueValidator(formGroup);
  
      expect(result).toBeNull();
    });
  
    it('should return null if amount is empty', () => {
      const formGroup = new FormGroup({
        itemPrice: new FormControl('')
      });
  
      const result = priceZeroValueValidator(formGroup);
  
      expect(result).toBeNull();
    });
  
    it('should return { priceZeroValue: true } if amount is 0', () => {
      const formGroup = new FormGroup({
        itemPrice: new FormControl('0')
      });
  
      const result = priceZeroValueValidator(formGroup);
  
      expect(result).toEqual({ priceZeroValue: true });
    });
  
    it('should return { priceZeroValue: true } if amount is 0.0', () => {
      const formGroup = new FormGroup({
        itemPrice: new FormControl('0,0')
      });
  
      const result = priceZeroValueValidator(formGroup);
  
      expect(result).toEqual({ priceZeroValue: true });
    });
});