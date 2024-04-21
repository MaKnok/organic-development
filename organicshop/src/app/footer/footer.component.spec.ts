import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply login-footer class when route is /login', () => {
    spyOnProperty(router, 'url').and.returnValue('/login');
    fixture.detectChanges();

    const footerDiv = fixture.debugElement.query(By.css('.fixed-bottom'));
    expect(footerDiv.nativeElement.classList.contains('login-footer')).toBeTrue();
    expect(footerDiv.nativeElement.classList.contains('bg-white')).toBeFalse();
  });

  it('should apply bg-white class when route is not /login', () => {
    spyOnProperty(router, 'url').and.returnValue('/home');
    fixture.detectChanges();

    const footerDiv = fixture.debugElement.query(By.css('.fixed-bottom'));
    expect(footerDiv.nativeElement.classList.contains('login-footer')).toBeFalse();
    expect(footerDiv.nativeElement.classList.contains('bg-white')).toBeTrue();
  });

  it('Should display brand and creator on the footer', () => {
    const expectedText = 'Organic Shop by M.Knok®';
    const pElement = fixture.debugElement.query(By.css('footer p'));
    const pText = pElement.nativeElement.textContent.trim();

    expect(pText).toContain(expectedText);

  })
});
