import {IdSexPipe} from './id-sex.pipe';

describe('IdSexPipe', () => {
  it('create an instance', () => {
    const pipe = new IdSexPipe();
    expect(pipe).toBeTruthy();
    // 男性
    expect(pipe.transform('460202201709013934')).toBeTrue();
    // 女性
    expect(pipe.transform('460202201709018583')).toBeFalse();
  });
});
