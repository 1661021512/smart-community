import { VehicleColorPipe } from './vehicle-color.pipe';

describe('vehicle->pipe->VehicleColorPipe', () => {
  it('create an instance', () => {
    const pipe = new VehicleColorPipe();
    expect(pipe).toBeTruthy();
  });
});
