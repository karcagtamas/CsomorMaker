import { CreateLetterPipe } from './create-letter.pipe';

describe('CreateLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new CreateLetterPipe();
    expect(pipe).toBeTruthy();
  });

  it('return with first letter from the word', () => {
    const pipe = new CreateLetterPipe();
    const state = 'Tamas';
    const value = pipe.transform(state);
    expect(value).toEqual(state[0]);
  });

  it('return with uppercase letter', () => {
    const pipe = new CreateLetterPipe();
    const state = 'tAMas';
    const value = pipe.transform(state);
    expect(value).toEqual(state[0].toUpperCase());
  });

  it('return with default value when the input is empty (M)', () => {
    const pipe = new CreateLetterPipe();
    const state = '';
    const value = pipe.transform(state);
    expect(value).toEqual('M');
  });
});
