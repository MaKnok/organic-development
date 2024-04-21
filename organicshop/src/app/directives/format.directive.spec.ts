import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormatDirective } from './format.directive';
import { DecimalPipe, CurrencyPipe, registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  template: `
    <input type="text" format>
  `
})
class TestComponent {}

describe('FormatDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async(() => {
    // Register locale data for "pt-BR"
    registerLocaleData(localePtBr);

    TestBed.configureTestingModule({
      declarations: [FormatDirective, TestComponent],
      imports: [HttpClientModule],
      providers: [DecimalPipe, CurrencyPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    inputElement = fixture.debugElement.query(By.directive(FormatDirective)).nativeElement;
  }));

  it('should create an instance', () => {
    expect(inputElement).toBeTruthy();
  });

  it('should format input value correctly', () => {
    const directive = fixture.debugElement.query(By.directive(FormatDirective)).injector.get(FormatDirective);
    const inputValue = '10000'; // Raw input value

    inputElement.value = inputValue;
    directive.format(inputValue); // Manually trigger the format method

    fixture.detectChanges();

    // Assert the formatted value
    expect(inputElement.value).toBe('100,00');
  });
});