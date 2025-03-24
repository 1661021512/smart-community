import { TestBed } from '@angular/core/testing';

import { TitleService } from './title.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TitleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: TitleService = TestBed.inject(TitleService);
    expect(service).toBeTruthy();
  });
});
