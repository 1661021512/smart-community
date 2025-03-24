import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewComponent} from './view.component';
import {IonicModule} from '@ionic/angular';
import {ViewModule} from './view.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ApiTestingModule} from '../../../../../lib/src/api/api.testing.module';

describe('notice -> ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ViewModule,
        IonicModule.forRoot(),
        ApiTestingModule,
        RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });
});
