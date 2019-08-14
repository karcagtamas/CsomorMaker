import { ConvertToHourPipe } from './convert-to-hour.pipe';

describe('ConvertToHourPipe', () => {
  it('create an instance', () => {
    const pipe = new ConvertToHourPipe();
    expect(pipe).toBeTruthy();
  });

  it('contains word "óra"', () => {
    const pipe = new ConvertToHourPipe();
    const value = pipe.transform(12);
    expect(value).toContain('óra');
  });

  it('has good format', () => {
    const pipe = new ConvertToHourPipe();
    const state = 12;
    const value = pipe.transform(state);
    expect(value).toEqual(`${state} óra - ${state + 1} óra`);
  });

  it('two number is not equal', () => {
    const pipe = new ConvertToHourPipe();
    const state = 12;
    const value = pipe.transform(state);
    expect(value).not.toEqual(`${state} óra - ${state} óra`);
  });

  it('first number bigger than the seconda one', () => {
    const pipe = new ConvertToHourPipe();
    const state = 12;
    const value = pipe.transform(state);
    expect(value).not.toEqual(`${state + 1} óra - ${state - 1} óra`);
  });
});
