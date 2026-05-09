import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatTime, formatDate, formatDateTime, getRelativeTime, isSessionLive, isSessionPast, formatDuration } from '../utils/dateFormatter';

describe('formatTime', () => {
  it('formats morning time correctly', () => {
    const result = formatTime('2026-06-15T09:30:00');
    expect(result).toMatch(/9:30\s*AM/i);
  });

  it('formats afternoon time correctly', () => {
    const result = formatTime('2026-06-15T14:00:00');
    expect(result).toMatch(/2:00\s*PM/i);
  });
});

describe('formatDate', () => {
  it('formats date with weekday and month', () => {
    const result = formatDate('2026-06-15T09:30:00');
    expect(result).toContain('Jun');
    expect(result).toContain('15');
  });
});

describe('formatDateTime', () => {
  it('combines date and time', () => {
    const result = formatDateTime('2026-06-15T09:30:00');
    expect(result).toContain('Jun');
    expect(result).toContain('at');
  });
});

describe('getRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-15T10:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "just now" for current time', () => {
    expect(getRelativeTime('2026-06-15T10:00:00')).toBe('just now');
  });

  it('returns "X minutes ago" for past minutes', () => {
    expect(getRelativeTime('2026-06-15T09:55:00')).toBe('5 minutes ago');
  });

  it('returns "in X minutes" for future minutes', () => {
    expect(getRelativeTime('2026-06-15T10:30:00')).toBe('in 30 minutes');
  });

  it('returns "X hours ago" for past hours', () => {
    expect(getRelativeTime('2026-06-15T07:00:00')).toBe('3 hours ago');
  });

  it('handles singular forms', () => {
    expect(getRelativeTime('2026-06-15T09:59:00')).toBe('1 minute ago');
  });
});

describe('isSessionLive', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-15T10:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true for ongoing session', () => {
    expect(isSessionLive('2026-06-15T09:30:00', '2026-06-15T10:30:00')).toBe(true);
  });

  it('returns false for future session', () => {
    expect(isSessionLive('2026-06-15T11:00:00', '2026-06-15T12:00:00')).toBe(false);
  });

  it('returns false for past session', () => {
    expect(isSessionLive('2026-06-15T08:00:00', '2026-06-15T09:00:00')).toBe(false);
  });
});

describe('isSessionPast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-15T10:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true for past session', () => {
    expect(isSessionPast('2026-06-15T09:00:00')).toBe(true);
  });

  it('returns false for future session', () => {
    expect(isSessionPast('2026-06-15T12:00:00')).toBe(false);
  });
});

describe('formatDuration', () => {
  it('formats minutes only', () => {
    expect(formatDuration('2026-06-15T09:00:00', '2026-06-15T09:45:00')).toBe('45min');
  });

  it('formats hours only', () => {
    expect(formatDuration('2026-06-15T09:00:00', '2026-06-15T11:00:00')).toBe('2h');
  });

  it('formats hours and minutes', () => {
    expect(formatDuration('2026-06-15T09:00:00', '2026-06-15T10:30:00')).toBe('1h 30min');
  });
});
