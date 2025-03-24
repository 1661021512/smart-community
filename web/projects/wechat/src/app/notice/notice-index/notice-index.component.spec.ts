import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoticeIndexComponent} from './notice-index.component';
import {NoticeIndexModule} from './notice-index.module';
import {IonicModule} from '@ionic/angular';
import {ApiTestingModule} from '../../../../../lib/src/api/api.testing.module';
import {getTestScheduler} from 'jasmine-marbles';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('notice -> noticeIndexComponent', () => {
  let component: NoticeIndexComponent;
  let fixture: ComponentFixture<NoticeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoticeIndexModule,
        ApiTestingModule,
        RouterTestingModule,
        IonicModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  })
});
