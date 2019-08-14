import { HoursPipe } from './hours.pipe';

describe('HoursPipe', () => {
  it('create an instance', () => {
    const pipe = new HoursPipe();
    expect(pipe).toBeTruthy();
  });

  it('contains "óra" word', () => {
    const pipe = new HoursPipe();
    const state = 12;
    const value = pipe.transform(state.toString());
    expect(value).toContain('óra');
  });

  it('contains the given number', () => {
    const pipe = new HoursPipe();
    const state = 12;
    const value = pipe.transform(state.toString());
    expect(value).toContain(state);
  });

  it('give back good value', () => {
    const pipe = new HoursPipe();
    const state = 12;
    const value = pipe.transform(state.toString());
    expect(value).toContain(state + ' óra');
  });
});
