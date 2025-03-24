import {HouseModel} from './house-model';
import {House} from '../entity/house';

describe('HouseModel', () => {
  it('should create an instance', () => {
    expect(new HouseModel({id: 123} as House)).toBeTruthy();
  });
});
