import { IsAdminPipe } from './is-admin.pipe';

describe('IsAdminPipe', () => {
  it('create an instance', () => {
    const pipe = new IsAdminPipe();
    expect(pipe).toBeTruthy();
  });

  it('return with "Admin" word if the input is true', () => {
    const pipe = new IsAdminPipe();
    const state = true;
    const value = pipe.transform(state);
    expect(value).toEqual('Admin');
    expect(value).not.toEqual('Nem Admin');
  });

  it('return with "Nem Admin" word if the input is false', () => {
    const pipe = new IsAdminPipe();
    const state = false;
    const value = pipe.transform(state);
    expect(value).toEqual('Nem Admin');
    expect(value).not.toEqual('Admin');
  });
});
