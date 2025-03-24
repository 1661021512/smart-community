import {TestBed} from '@angular/core/testing';

import {DutyService} from './duty.service';
import {ApiTestingModule} from '../api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {Observable} from 'rxjs';

describe('PostService', () => {
  let service: DutyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(DutyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Observable', (done) => {
    const observable = new Observable(subscriber => {
      subscriber.next('123');
      subscriber.next('456');
      setTimeout(() => {
        subscriber.next('789');
        subscriber.complete();
        subscriber.next('7890');
        done();
      }, 2000);
    });

    observable.subscribe(value => console.log('next', value),
      error => console.error('error', error),
      () => console.log('complete'))
  });
});
