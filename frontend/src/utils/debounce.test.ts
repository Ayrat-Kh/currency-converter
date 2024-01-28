import { describe, expect, it, vi } from 'vitest';

import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call in 1 sec', () => {
    const debFnMock = vi.fn((a: number, b: number) => a + b);

    const { debouncedFn } = debounce(debFnMock, 500);

    debouncedFn(1, 2);

    expect(debFnMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(499);

    debouncedFn(1, 2);

    expect(debFnMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(499);

    expect(debFnMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(debFnMock).toHaveBeenCalled();
  });

  it('should prevent cancelled', () => {
    const debFnMock = vi.fn();

    const { debouncedFn, cancel } = debounce(debFnMock, 500);

    debouncedFn();

    expect(debFnMock).not.toHaveBeenCalled();

    cancel();

    vi.advanceTimersByTime(5002);

    expect(debFnMock).not.toHaveBeenCalled();
  });
});
