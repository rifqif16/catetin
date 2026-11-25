import { describe, expect, test } from 'bun:test';
import {
  AmountSchema,
  AmountStringSchema,
  InvalidMoneyError,
  isValidAmount,
  MAX_AMOUNT,
  parseMoney,
  serializeMoney,
} from '../src';

describe('parseMoney (BR-3)', () => {
  test.each([
    ['28000', 28000n],
    ['0', 0n],
    ['-25000', -25000n],
    ['1000000000000000', MAX_AMOUNT],
    ['9223372036854775807', 9223372036854775807n],
  ])('parses %p', (input, expected) => {
    expect(parseMoney(input)).toBe(expected);
  });

  test.each([
    '',
    ' 1',
    '1 ',
    '01',
    '-0',
    '1.5',
    '28.000',
    '1e3',
    'abc',
    '+5',
    '12345678901234567890',
  ])('rejects %p', (input) => {
    expect(() => parseMoney(input)).toThrow(InvalidMoneyError);
  });

  test('round-trips the maximum amount without precision loss', () => {
    const wire = serializeMoney(MAX_AMOUNT);
    expect(wire).toBe('1000000000000000');
    expect(parseMoney(wire)).toBe(MAX_AMOUNT);
  });

  test('keeps precision beyond Number.MAX_SAFE_INTEGER', () => {
    expect(serializeMoney(parseMoney('9007199254740993'))).toBe('9007199254740993');
  });
});

describe('isValidAmount (BR-2)', () => {
  test.each([
    [1n, true],
    [MAX_AMOUNT, true],
    [0n, false],
    [-1n, false],
    [MAX_AMOUNT + 1n, false],
  ])('%p -> %p', (value, expected) => {
    expect(isValidAmount(value)).toBe(expected);
  });
});

describe('AmountStringSchema / AmountSchema', () => {
  test('accepts positive amounts up to the maximum', () => {
    expect(AmountStringSchema.safeParse('28000').success).toBe(true);
    expect(AmountStringSchema.safeParse('1000000000000000').success).toBe(true);
  });

  test.each(['0', '-1', '01', '28.000', '1000000000000001', '9999999999999999', ''])(
    'rejects %p',
    (input) => {
      expect(AmountStringSchema.safeParse(input).success).toBe(false);
    },
  );

  test('AmountSchema outputs bigint', () => {
    expect(AmountSchema.parse('28000')).toBe(28000n);
  });
});
