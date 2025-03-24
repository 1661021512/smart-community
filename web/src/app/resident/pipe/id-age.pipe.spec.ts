import { IdAgePipe } from './id-age.pipe';

describe('IdAgePipe', () => {
  it('create an instance', () => {
    const pipe = new IdAgePipe();
    expect(pipe).toBeTruthy();
    const idNumber = '13022319981003123X';
    let time = new Date();
    if(parseInt(idNumber.slice(10,12))>time.getMonth()+1)
    {
      expect(pipe.transform(idNumber)).toBe(time.getFullYear() -parseInt(idNumber.slice(6,10))-1);
    }
    else if(parseInt(idNumber.slice(10,12)) == time.getMonth()+1 && parseInt(idNumber.slice(12,14))>time.getDate())
    {
      expect(pipe.transform(idNumber)).toBe(time.getFullYear() -parseInt(idNumber.slice(6,10))-1);
    }
    else
    {
      expect(pipe.transform(idNumber)).toBe(time.getFullYear() -parseInt(idNumber.slice(6,10)));
    }

  });
});
