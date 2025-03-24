import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ResidentsComponent} from './residents.component';
import {ResidentsModule} from './residents.module';
import {House} from '../../../../../projects/lib/src/entity/house';

describe('building -> view2d -> ResidentsComponent', () => {
  let component: ResidentsComponent;
  let fixture: ComponentFixture<ResidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentsComponent);
    component = fixture.componentInstance;
    component.house = {
      residents: []
    } as House;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
