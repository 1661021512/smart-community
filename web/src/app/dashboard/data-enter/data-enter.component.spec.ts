import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataEnterComponent} from './data-enter.component';
import {DataEnterModule} from './data-enter.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';

describe('DataEnterComponent', () => {
  let component: DataEnterComponent;
  let fixture: ComponentFixture<DataEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEnterModule,
        ApiTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
