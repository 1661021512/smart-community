import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContentComponent} from './content.component';
import {ContentModule} from './content.module';
import {ApiTestingModule} from '../../../projects/lib/src/api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentModule, ApiTestingModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
