import React from 'react';
import '@testing-library/jest-dom';
import { formatTimeUnit } from '../../src/utils/time-formater';
import * as Enums from '../../src/utils/enums';

describe('Time Formater', () => {
  test('formats hours correctly', () => {
    expect(formatTimeUnit(3600000.2999999999884, Enums.TimeUnit.Hours)).toBe(
      '01'
    );
    expect(formatTimeUnit(1800000.100000000006, Enums.TimeUnit.Hours)).toBe(
      '00'
    );
    expect(formatTimeUnit(0.2999999999884, Enums.TimeUnit.Hours)).toBe('00');
  });

  test('formats minutes correctly', () => {
    expect(formatTimeUnit(600000.2999999999884, Enums.TimeUnit.Minutes)).toBe(
      '10'
    );
    expect(formatTimeUnit(60000.100000000006, Enums.TimeUnit.Minutes)).toBe(
      '01'
    );
    expect(formatTimeUnit(0.2999999999884, Enums.TimeUnit.Minutes)).toBe('00');
  });

  test('formats seconds correctly', () => {
    expect(formatTimeUnit(1000.2999999999884, Enums.TimeUnit.Seconds)).toBe(
      '01'
    );
    expect(formatTimeUnit(59000.100000000006, Enums.TimeUnit.Seconds)).toBe(
      '59'
    );
    expect(formatTimeUnit(0.2999999999884, Enums.TimeUnit.Seconds)).toBe('00');
  });

  test('formats centiseconds correctly', () => {
    expect(formatTimeUnit(82.7000000000116, Enums.TimeUnit.Centiseconds)).toBe(
      '08'
    );
    expect(formatTimeUnit(3799.100000000006, Enums.TimeUnit.Centiseconds)).toBe(
      '79'
    );
    expect(formatTimeUnit(1.2999999999884, Enums.TimeUnit.Centiseconds)).toBe(
      '00'
    );
  });

  test('handles invalid time units correctly', () => {
    expect(() => formatTimeUnit(366100, 'InvalidTimeUnit')).toThrowError(
      "'InvalidTimeUnit' is not implemented."
    );
  });
});
