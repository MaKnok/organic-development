import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TopBarModule } from './top-bar/top-bar.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FooterModule } from './footer/footer.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ HttpClientModule, 
                 TopBarModule,
                 AppRoutingModule,
                 FooterModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'organic-shop'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('organic-shop');
  });

});
