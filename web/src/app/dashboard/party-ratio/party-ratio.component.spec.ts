import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PartyRatioComponent} from './party-ratio.component';
import {PartyRatioModule} from './party-ratio.module';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';

describe('dashboard -> PartyRatioComponent', () => {
  let component: PartyRatioComponent;
  let fixture: ComponentFixture<PartyRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyRatioModule,
        ApiTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
