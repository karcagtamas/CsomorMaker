import { IsLockedPipe } from './is-locked.pipe';

describe('IsLockedPipe', () => {
  it('create an instance', () => {
    const pipe = new IsLockedPipe();
    expect(pipe).toBeTruthy();
  });

  it('return with "Zárolva" word if the input is true', () => {
    const pipe = new IsLockedPipe();
    const state = true;
    const value = pipe.transform(state);
    expect(value).toEqual('Zárolva');
    expect(value).not.toEqual('Nyitott');
  });

  it('return with "Nyitott" word if the input is false', () => {
    const pipe = new IsLockedPipe();
    const state = false;
    const value = pipe.transform(state);
    expect(value).toEqual('Nyitott');
    expect(value).not.toEqual('Zárolva');
  });
});
