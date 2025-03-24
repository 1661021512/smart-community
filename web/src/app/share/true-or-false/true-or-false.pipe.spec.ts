import { TrueOrFalsePipe } from './true-or-false.pipe';
import {DomSanitizer} from "@angular/platform-browser";

describe('TrueOrFalsePipe', () => {
  let domSanitizer: DomSanitizer;
  it('create an instance', () => {
    const pipe = new TrueOrFalsePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
});
