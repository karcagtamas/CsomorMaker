import { PersonCountPipe } from './person-count.pipe';

describe('PersonCountPipe', () => {
  it('create an instance', () => {
    const pipe = new PersonCountPipe();
    expect(pipe).toBeTruthy();
  });

  it('contains "fő" word', () => {
    const pipe = new PersonCountPipe();
    const state = 12;
    const value = pipe.transform(state);
    expect(value).toContain('fő');
  });

  it('contains the input number', () => {
    const pipe = new PersonCountPipe();
    const state = 12;
    const value = pipe.transform(state);
    expect(value).toContain(state);
  });

  it('give back good value', () => {
    const pipe = new PersonCountPipe();
    const state = 12;
    const value = pipe.transform(state);
    expect(value).toContain(state + ' fő');
  });
});
