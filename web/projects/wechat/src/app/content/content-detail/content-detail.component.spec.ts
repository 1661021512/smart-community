import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContentDetailComponent} from './content-detail.component';
import {ContentDetailModule} from './content-detail.module';
import {ApiTestingModule} from '../../../../../lib/src/api/api.testing.module';

describe('ContentDetailComponent', () => {
  let component: ContentDetailComponent;
  let fixture: ComponentFixture<ContentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentDetailModule,
        ApiTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDetailComponent);
    component = fixture.componentInstance;
    component.keyword = 'humanResourcesCompany';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
