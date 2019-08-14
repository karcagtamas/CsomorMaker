import { ExistsPipe } from './exists.pipe';

describe('ExistsPipe', () => {
  it('create an instance', () => {
    const pipe = new ExistsPipe();
    expect(pipe).toBeTruthy();
  });

  it('exists return with itself', () => {
    const pipe = new ExistsPipe();
    const state = '12';
    const value = pipe.transform(state);
    expect(value).toEqual(state);
  });

  it('is not exist return with "-" (null or undefined)', () => {
    const pipe = new ExistsPipe();
    let state = null;
    let value = pipe.transform(state);
    expect(value).toEqual('-');

    state = undefined;
    value = pipe.transform(state);
    expect(value).toEqual('-');
  });
});
