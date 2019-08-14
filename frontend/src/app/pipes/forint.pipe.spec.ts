import { ForintPipe } from './forint.pipe';

describe('ForintPipe', () => {
  it('create an instance', () => {
    const pipe = new ForintPipe();
    expect(pipe).toBeTruthy();
  });

  it('contains "Ft" word', () => {
    const pipe = new ForintPipe();
    const value = pipe.transform(1222);
    expect(value).toContain('Ft');
  });

  it('keeps the number', () => {
    const pipe = new ForintPipe();
    const state = 1222;
    const value = pipe.transform(state);
    expect(value).toContain(state);
  });

  it('give back good value', () => {
    const pipe = new ForintPipe();
    const state = 1222;
    const value = pipe.transform(state);
    expect(value).toContain(`${state} Ft`);
  });
});
