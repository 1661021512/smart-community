import { NationalityPipe } from './nationality.pipe';

describe('NationalityPipe', () => {
  it('create an instance', () => {
    const pipe = new NationalityPipe();
    expect(pipe).toBeTruthy();
    //传入1 传出 汉族
    expect(pipe.transform(1)).toBe('汉族');
    //传入不在1-56的数
    expect(pipe.transform(57)).toBe('-');
    //空值
    expect(pipe.transform(null)).toBe('-');
  });
});
