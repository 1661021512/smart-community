import { TestBed } from '@angular/core/testing';
import {ApiTestingModule} from '../api/api.testing.module';
import { SkillService } from './skill.service';

describe('SkillService', () => {
  let service: SkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule
      ]
    });
    service = TestBed.inject(SkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
