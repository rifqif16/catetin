import { describe, expect, test } from 'bun:test';
import {
  addMonths,
  daysInMonth,
  formatLocalDate,
  getPeriod,
  getPeriodRange,
  InvalidDateError,
  InvalidPeriodError,
} from '../src';

describe('getPeriodRange (BR-18)', () => {
  test('startDay 1 equals the calendar month', () => {
    expect(getPeriodRange(2026, 11, 1)).toEqual({
      key: '2026-11',
      year: 2026,
      month: 11,
      start: '2026-11-01',
      end: '2026-11-30',
    });
  });

  test('startDay 25: "November 2026" is 25 Oct - 24 Nov', () => {
    const p = getPeriodRange(2026, 11, 25);
    expect([p.key, p.start, p.end]).toEqual(['2026-11', '2026-10-25', '2026-11-24']);
  });

  test('startDay 15 crosses the year boundary', () => {
    const p = getPeriodRange(2027, 1, 15);
    expect([p.start, p.end]).toEqual(['2026-12-15', '2027-01-14']);
  });

  test('startDay 28 in February (non-leap and leap)', () => {
    expect(getPeriodRange(2027, 3, 28)).toMatchObject({
      start: '2027-02-28',
      end: '2027-03-27',
    });
    expect(getPeriodRange(2028, 3, 28)).toMatchObject({
      start: '2028-02-28',
      end: '2028-03-27',
    });
  });

  test('startDay 1 February in leap year ends on the 29th', () => {
    expect(getPeriodRange(2028, 2, 1).end).toBe('2028-02-29');
    expect(getPeriodRange(2027, 2, 1).end).toBe('2027-02-28');
  });

  test.each([0, 29, 31, 1.5, -1, Number.NaN])('rejects startDay %p', (startDay) => {
    expect(() => getPeriodRange(2026, 11, startDay)).toThrow(InvalidPeriodError);
  });

  test.each([0, 13, 1.5])('rejects month %p', (month) => {
    expect(() => getPeriodRange(2026, month, 1)).toThrow(InvalidPeriodError);
  });
});

describe('getPeriod (BR-18, BR-19)', () => {
  test.each([
    ['2026-11-20', 1, '2026-11'],
    ['2026-11-20', 25, '2026-11'],
    ['2026-11-24', 25, '2026-11'],
    ['2026-11-25', 25, '2026-12'],
    ['2026-12-26', 25, '2027-01'],
    ['2026-12-31', 1, '2026-12'],
    ['2027-01-01', 1, '2027-01'],
    ['2028-02-29', 15, '2028-03'],
    ['2028-02-29', 28, '2028-03'],
    ['2027-02-27', 28, '2027-02'],
  ])('%p with startDay %p -> %p', (date, startDay, key) => {
    expect(getPeriod(date, startDay).key).toBe(key);
  });

  test.each(['2026-02-30', '2026-13-01', '20261120', '', 'kemarin'])('rejects date %p', (date) => {
    expect(() => getPeriod(date, 1)).toThrow(InvalidDateError);
  });

  test('rejects invalid startDay', () => {
    expect(() => getPeriod('2026-11-20', 29)).toThrow(InvalidPeriodError);
  });

  // Exhaustive check: every day of 2027-2028 lands in exactly one contiguous period.
  test('every date is inside its own period for every startDay', () => {
    for (let startDay = 1; startDay <= 28; startDay++) {
      let previousEnd: string | null = null;
      for (let y = 2027; y <= 2028; y++) {
        for (let m = 1; m <= 12; m++) {
          for (let d = 1; d <= daysInMonth(y, m); d++) {
            const date = formatLocalDate({ year: y, month: m, day: d });
            const p = getPeriod(date, startDay);
            expect(date >= p.start && date <= p.end).toBe(true);
            if (date === p.start && previousEnd !== null) {
              expect(addDays(previousEnd, 1)).toBe(p.start);
            }
            previousEnd = p.end;
          }
        }
      }
    }
  });
});

describe('calendar helpers', () => {
  test('addMonths wraps years in both directions', () => {
    expect(addMonths(2026, 12, 1)).toEqual({ year: 2027, month: 1 });
    expect(addMonths(2027, 1, -1)).toEqual({ year: 2026, month: 12 });
    expect(addMonths(2026, 11, -23)).toEqual({ year: 2024, month: 12 });
  });
});

function addDays(date: string, days: number): string {
  const t = new Date(`${date}T00:00:00Z`);
  t.setUTCDate(t.getUTCDate() + days);
  return t.toISOString().slice(0, 10);
}
