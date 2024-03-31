import { BrlPipe } from './brl.pipe';

describe('BrlPipe', () => {

  let pipe: BrlPipe;

  beforeEach(() => {
    pipe = new BrlPipe();
  });


  it('create an instance', () => {
    const pipe = new BrlPipe();
    expect(pipe).toBeTruthy();
  });

  it(`${BrlPipe.prototype.transform.name} should format the value correctly`, () => {
    const value = 1000;
    const expectedFormattedValue = '10,00'; 

    const result = pipe.transform(value);

    expect(result).toEqual(expectedFormattedValue);
  });

  it(`${BrlPipe.prototype.transform.name} should handle negative values correctly`, () => {
    const value = -500;
    const expectedFormattedValue = '-5,00';

    const result = pipe.transform(value);

    expect(result).toEqual(expectedFormattedValue);
  });
});
