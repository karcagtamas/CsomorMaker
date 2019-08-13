import { ChatDatePipe } from './chat-date.pipe';

fdescribe('ChatDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ChatDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should contains today', () => {
    const pipe = new ChatDatePipe();
    const now = new Date();
    let date = now;
    date.setMinutes(date.getMinutes() - 1);

    let result = pipe.transform(date.toString());
    expect(result).toContain('ma');

    date = now;
    date.setHours(date.getHours() + 12);
    result = pipe.transform(date.toString());
    expect(result).toContain('ma');
  });

  it('should not contains today on not today', () => {
    const pipe = new ChatDatePipe();
    const now = new Date();
    let date = now;
    date.setDate(date.getDate() + 2);
    let result = pipe.transform(date.toString());
    expect(result).not.toContain('ma');

    date = now;
    date.setFullYear(date.getFullYear() + 1);
    result = pipe.transform(date.toString());
    expect(result).not.toContain('ma');
  });
});
