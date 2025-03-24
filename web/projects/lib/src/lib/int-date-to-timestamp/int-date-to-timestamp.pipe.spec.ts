import { IntDateToTimestampPipe } from './int-date-to-timestamp.pipe';

describe('IntDateToTimestampPipe', () => {
  it('create an instance', () => {
    const pipe = new IntDateToTimestampPipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform(20120201)).toBe(1328025600000);
  });
});
