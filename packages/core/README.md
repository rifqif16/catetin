# @catetin/core

## Purpose

Pure domain logic shared by API, web, desktop, and mobile. No database, HTTP, or ORM. Only dependency: `zod` (PRD 5.2).

## Features

- BR-1 to BR-3: money as `bigint`, wire format as numeric string.
- BR-13: `local_date` helpers.
- BR-17 to BR-19: monthly period calculation (the only allowed way to compute periods).

## Structure

src/
index.ts public exports
rules/
money.ts Money type, parseMoney, serializeMoney, amount schemas
calendar.ts LocalDate parsing/formatting, daysInMonth, addMonths
period.ts getPeriod, getPeriodRange, period schemas
test/
money.test.ts
period.test.ts

## Dependencies

- `zod` 4.6.7

## Public API

| Export                                                                             | Description                                                  |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `Money`                                                                            | `bigint`, whole Rupiah                                       |
| `MIN_AMOUNT`, `MAX_AMOUNT`                                                         | BR-2 bounds (1 to 1,000,000,000,000,000)                     |
| `parseMoney(s)`                                                                    | Signed integer string to `Money`; throws `InvalidMoneyError` |
| `serializeMoney(m)`                                                                | `Money` to JSON string                                       |
| `isValidAmount(m)`                                                                 | BR-2 check                                                   |
| `AmountStringSchema` / `AmountSchema`                                              | Zod for wire amounts; string or `bigint` output              |
| `LocalDateSchema`, `parseLocalDate`, `formatLocalDate`, `daysInMonth`, `addMonths` | Calendar helpers; `InvalidDateError`                         |
| `PeriodStartDaySchema`, `PeriodKeySchema`, `toPeriodKey`                           | BR-17 / period key `YYYY-MM`                                 |
| `getPeriodRange(year, month, startDay)`                                            | BR-18 period labelled by its end month                       |
| `getPeriod(localDate, startDay)`                                                   | Period containing a date; `InvalidPeriodError`               |

## Data

N/A (no tables).

## Constraints

- Never use `number` for money.
- Periods are computed from `local_date` (BR-14), never from `occurred_at`.
- Must run unchanged on Bun, browsers, and React Native.

## Testing

bun run --filter @catetin/core test
Target: coverage at least 90% (PRD 19.1).
