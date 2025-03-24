import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseComponent} from './house.component';

describe('HouseComponent', () => {
  let component: HouseComponent;
  let fixture: ComponentFixture<HouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouseComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('添加住房', () => {
    component.onAddHouse();
    fixture.detectChanges();
  });

  it('添加住房后点击确定', () => {
    // component.onAddHouseClick(new House({id: 123}));
    // getTestScheduler().flush();
  });

  it('移除住房', () => {
    // component.resident.houses.push(new House({
    //   name: randomString('房名'),
    //   unit: new Unit({name: randomString('单元名')}),
    //   village: new Village({
    //     name: randomString('小区名'),
    //     community: new Community({
    //       name: randomString('社区名')
    //     })
    //   })
    // }))
  });

});
