import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { AutofocusDirective } from './autofocus.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <input type="text" autofocus>
  `
})
class TestComponent {}

describe('AutofocusDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutofocusDirective, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    inputElement = fixture.debugElement.query(By.directive(AutofocusDirective));
  }));

  it('should focus on input element after view init', () => {
    const focusedElement = document.activeElement;

    expect(inputElement.nativeElement).toBe(focusedElement);
  });
});