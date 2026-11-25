import { z } from 'zod';

export type LocalDate = string;

export interface DateParts {
  year: number;
  month: number;
  day: number;
}

export const LocalDateSchema = z.iso.date();

export class InvalidDateError extends Error {
  override readonly name = 'InvalidDateError';
  constructor(readonly input: string) {
    super('Invalid local date');
  }
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function parseLocalDate(input: LocalDate): DateParts {
  if (!LocalDateSchema.safeParse(input).success) {
    throw new InvalidDateError(input);
  }
  const [year, month, day] = input.split('-').map(Number) as [number, number, number];
  return { year, month, day };
}

export function formatLocalDate({ year, month, day }: DateParts): LocalDate {
  const y = String(year).padStart(4, '0');
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addMonths(
  year: number,
  month: number,
  delta: number,
): { year: number; month: number } {
  const index = year * 12 + (month - 1) + delta;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}
