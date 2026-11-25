import { z } from 'zod';

export type Money = bigint;

export const MIN_AMOUNT: Money = 1n;
export const MAX_AMOUNT: Money = 1_000_000_000_000_000n;

const MONEY_STRING_PATTERN = /^-?(0|[1-9][0-9]{0,18})$/;
const AMOUNT_STRING_PATTERN = /^[1-9][0-9]{0,15}$/;

export class InvalidMoneyError extends Error {
  override readonly name = 'InvalidMoneyError';
  constructor(readonly input: string) {
    super('Invalid money string');
  }
}

export function parseMoney(input: string): Money {
  if (!MONEY_STRING_PATTERN.test(input) || input === '-0') {
    throw new InvalidMoneyError(input);
  }
  return BigInt(input);
}

export function serializeMoney(value: Money): string {
  return value.toString();
}

export function isValidAmount(value: Money): boolean {
  return value >= MIN_AMOUNT && value <= MAX_AMOUNT;
}

export const AmountStringSchema = z
  .string()
  .regex(AMOUNT_STRING_PATTERN)
  .refine((value) => AMOUNT_STRING_PATTERN.test(value) && BigInt(value) <= MAX_AMOUNT, {
    message: 'Amount exceeds maximum',
  });

export const AmountSchema = AmountStringSchema.transform((value): Money => BigInt(value));
