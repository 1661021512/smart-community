import { CircleModel } from './circle-model';

describe('CircleModel', () => {
  it('should create an instance', () => {
    expect(new CircleModel(1, 2, 50, [], 10)).toBeTruthy();
  });
});
