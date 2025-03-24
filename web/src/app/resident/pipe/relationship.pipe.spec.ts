import {RelationshipPipe} from './relationship.pipe';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {ApiTestingModule} from '../../../../projects/lib/src/api/api.testing.module';
import {RelationshipPipeModule} from './relationship-pipe.module';
import {randomNumber} from '@yunzhi/utils';
import {getTestScheduler} from 'jasmine-marbles';


@Component({
  template: '<h1 (click)="onClick()">点击重新生成关系{{data}}<br>{{data | relationship: 2 | async }}</h1>'
})
class TestComponent {
  data = 0;

  onClick() {
    this.data++;
  }
}


describe('RelationshipPipe', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        CommonModule,
        ApiTestingModule,
        RelationshipPipeModule
      ]
    })
      .compileComponents();
  });

  it('组件集成测试', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('create an instance', (done) => {
    const pipe = new RelationshipPipe(null);
    pipe.transform(0, undefined).subscribe(value => {
      expect(value).toEqual('-');
      done();
    });
  });

  it('null undefined 测试', (done) => {
    const pipe = new RelationshipPipe(null);
    pipe.transform(undefined, undefined).subscribe(value => {
      expect(value).toEqual('-');
      pipe.transform(undefined, 123).subscribe(value => {
        expect(value).toEqual('-');
        pipe.transform(123, undefined).subscribe(value => {
          expect(value).toEqual('-');
          pipe.transform(0, null).subscribe(value => {
            expect(value).toEqual('-');
            pipe.transform(null, 0).subscribe(value => {
              expect(value).toEqual('-');
              done();
            })
          });
        })
      })
    })
  });

  it('居民就是户主测试', (done) => {
    const pipe = new RelationshipPipe(null);
    const id = randomNumber();
    pipe.transform(id, id).subscribe(value => {
      expect(value).toEqual('户主');
      done();
    });
  });
});
