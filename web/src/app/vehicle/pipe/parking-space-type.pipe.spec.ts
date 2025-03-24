import { ParkingSpaceTypePipe } from './parking-space-type.pipe';
import {DomSanitizer} from '@angular/platform-browser';

describe('vehicle->pipe->ParkingSpaceTypePipe', () => {
  let domSanitizer: DomSanitizer
  it('create an instance', () => {
    const pipe = new ParkingSpaceTypePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
});
