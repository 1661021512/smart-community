import {IdBirthdayPipe} from './id-birthday.pipe';

describe('IdBirthdayPipe', () => {
  it('create an instance', () => {
    const pipe = new IdBirthdayPipe();
    expect(pipe).toBeTruthy();
    const idNumber = '13022319981003123X';
    const birthday = new Date(pipe.transform(idNumber));
    expect(birthday.getMonth()).toBe(9);
    expect(birthday.getFullYear()).toBe(1998);
    expect(birthday.getDate()).toBe(3);
  });
});
