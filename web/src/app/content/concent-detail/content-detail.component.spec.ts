import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContentDetailComponent} from './content-detail.component';
import {ContentDetailModule} from './content-detail.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('ContentComponent', () => {
  let component: ContentDetailComponent;
  let fixture: ComponentFixture<ContentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentDetailModule,
        RouterTestingModule,
        ApiTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDetailComponent);
    component = fixture.componentInstance;
    component.keyword = 'keyword';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
