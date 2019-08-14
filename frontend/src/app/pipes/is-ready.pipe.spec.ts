import { IsReadyPipe } from './is-ready.pipe';

describe('IsReadyPipe', () => {
  it('create an instance', () => {
    const pipe = new IsReadyPipe();
    expect(pipe).toBeTruthy();
  });

  it('return with "Naprakész" word if the input is true', () => {
    const pipe = new IsReadyPipe();
    const state = true;
    const value = pipe.transform(state);
    expect(value).toEqual('Naprakész');
    expect(value).not.toEqual('Generálásra vár');
  });

  it('return with "Generálásra vár" word if the input is false', () => {
    const pipe = new IsReadyPipe();
    const state = false;
    const value = pipe.transform(state);
    expect(value).toEqual('Generálásra vár');
    expect(value).not.toEqual('Naprakész');
  });
});
