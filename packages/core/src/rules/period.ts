import { z } from 'zod';
import {
  addMonths,
  daysInMonth,
  formatLocalDate,
  type LocalDate,
  parseLocalDate,
} from './calendar';

export const MIN_PERIOD_START_DAY = 1;
export const MAX_PERIOD_START_DAY = 28;
export const DEFAULT_PERIOD_START_DAY = 1;

export const PeriodStartDaySchema = z.int().min(MIN_PERIOD_START_DAY).max(MAX_PERIOD_START_DAY);

export const PeriodKeySchema = z.string().regex(/^[0-9]{4}-(0[1-9]|1[0-2])$/);
export type PeriodKey = string;

export interface Period {
  key: PeriodKey;
  year: number;
  month: number;
  start: LocalDate;
  end: LocalDate;
}

export class InvalidPeriodError extends Error {
  override readonly name = 'InvalidPeriodError';
}

function assertStartDay(startDay: number): void {
  if (!PeriodStartDaySchema.safeParse(startDay).success) {
    throw new InvalidPeriodError('Period start day must be an integer 1-28');
  }
}

export function toPeriodKey(year: number, month: number): PeriodKey {
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}`;
}

export function getPeriodRange(year: number, month: number, startDay: number): Period {
  assertStartDay(startDay);
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new InvalidPeriodError('Month must be an integer 1-12');
  }
  const key = toPeriodKey(year, month);
  if (startDay === 1) {
    const end = daysInMonth(year, month);
    return {
      key,
      year,
      month,
      start: formatLocalDate({ year, month, day: 1 }),
      end: formatLocalDate({ year, month, day: end }),
    };
  }
  const prev = addMonths(year, month, -1);
  return {
    key,
    year,
    month,
    start: formatLocalDate({ ...prev, day: startDay }),
    end: formatLocalDate({ year, month, day: startDay - 1 }),
  };
}

export function getPeriod(date: LocalDate, startDay: number): Period {
  assertStartDay(startDay);
  const { year, month, day } = parseLocalDate(date);
  const label = startDay > 1 && day >= startDay ? addMonths(year, month, 1) : { year, month };
  return getPeriodRange(label.year, label.month, startDay);
}
