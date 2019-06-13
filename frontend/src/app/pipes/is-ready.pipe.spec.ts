import { IsReadyPipe } from './is-ready.pipe';

describe('IsReadyPipe', () => {
  it('create an instance', () => {
    const pipe = new IsReadyPipe();
    expect(pipe).toBeTruthy();
  });
});
