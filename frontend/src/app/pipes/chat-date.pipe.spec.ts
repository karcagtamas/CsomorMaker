import { ChatDatePipe } from './chat-date.pipe';

describe('ChatDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ChatDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should contains "órája" if the past is less than 24 hours', () => {
    const pipe = new ChatDatePipe();
    const now = new Date();
    const date = now;
    date.setHours(date.getHours() - 2);

    const result = pipe.transform(date.toString());
    expect(result).toContain('órája');
  });

  it('should contains "órája" if the past is equal 23 hours', () => {
    const pipe = new ChatDatePipe();
    const now = new Date();
    const date = now;
    date.setDate(date.getDate() - 1);
    date.setHours(date.getHours() + 1);

    const result = pipe.transform(date.toString());
    expect(result).toContain('órája');
  });

  it('should contains "napja" if the past is equal 24 hours', () => {
    const pipe = new ChatDatePipe();
    const now = new Date();
    const date = now;
    date.setDate(date.getDate() - 1);

    const result = pipe.transform(date.toString());
    expect(result).toContain('napja');
  });

  it('should contains "napja" if the past is less than 31 days', () => {
    const pipe = new ChatDatePipe();
    const now = new Date();
    const date = now;
    date.setDate(date.getDate() - 4);

    const result = pipe.transform(date.toString());
    expect(result).toContain('napja');
  });

  it('should contains "hónapja" if the past is equal 31 days', () => {
    const pipe = new ChatDatePipe();
    const now = new Date();
    const date = now;
    date.setDate(date.getDate() - 31);

    const result = pipe.transform(date.toString());
    expect(result).toContain('hónapja');
  });

  it('should contains "hónapja" if the past is less than 12 months', () => {
    const pipe = new ChatDatePipe();
    const now = new Date();
    const date = now;
    date.setMonth(date.getMonth() - 2);

    const result = pipe.transform(date.toString());
    expect(result).toContain('hónapja');
  });

  it('should contains "éve" if the past is equal 12 months', () => {
    const pipe = new ChatDatePipe();
    const now = new Date();
    const date = now;
    date.setFullYear(date.getFullYear() - 1);

    const result = pipe.transform(date.toString());
    expect(result).toContain('éve');
  });

  it('should contains "éve" if the past is more than 1 years', () => {
    const pipe = new ChatDatePipe();
    const now = new Date();
    const date = now;
    date.setFullYear(date.getFullYear() - 3);

    const result = pipe.transform(date.toString());
    expect(result).toContain('éve');
  });
});
