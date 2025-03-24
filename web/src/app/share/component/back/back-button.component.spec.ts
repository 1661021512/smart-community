import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackButtonComponent} from './back-button.component';
import {BackModule} from './back.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('share -> component -> back -> BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
