import { TrustHTMLPipe } from './trust-html.pipe';

fdescribe('TrustHTMLPipe', () => {
  it('create an instance', () => {
    const pipe = new TrustHTMLPipe();
    expect(pipe).toBeTruthy();
  });

  it('contains html row break element if it has row breaks', () => {
    const pipe = new TrustHTMLPipe();
    const state = 'asdasd fasd f\n asdasd \n';
    const value = pipe.transform(state);
    expect(value).toContain('<br />');
  });

  it('does not contains html row break element if it is not has row breaks', () => {
    const pipe = new TrustHTMLPipe();
    const state = 'asdasd fasd f asdasd';
    const value = pipe.transform(state);
    expect(value).not.toContain('<br />');
  });
});
