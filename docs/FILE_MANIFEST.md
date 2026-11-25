# FILE_MANIFEST — Catetin

Terakhir diperbarui: 2026-11-20 (P1a)

## Struktur

catetin/
├── .gitignore
├── biome.json Lint + format (Biome)
├── package.json Root workspace, script turbo
├── turbo.json Task build, typecheck, test, dev
├── docs/
│ ├── FILE_MANIFEST.md Struktur repo (salinan Project Knowledge)
│ ├── PROGRESS.md Status phase (salinan Project Knowledge)
│ └── PRD.md PRD lengkap
└── packages/
├── config/
│ ├── package.json @catetin/config
│ └── tsconfig.base.json TS strict bersama
└── core/
├── README.md
├── package.json @catetin/core (dep: zod)
├── tsconfig.json
├── src/
│ ├── index.ts
│ └── rules/
│ ├── calendar.ts LocalDate helpers
│ ├── money.ts Money, parseMoney, AmountSchema (BR-1..3)
│ └── period.ts getPeriod, getPeriodRange (BR-17..19)
└── test/
├── money.test.ts
└── period.test.ts

## File per module

| Module            | File                                                                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `@catetin/config` | `packages/config/package.json`, `packages/config/tsconfig.base.json`                                                                          |
| `@catetin/core`   | `packages/core/{README.md,package.json,tsconfig.json}`, `src/index.ts`, `src/rules/{calendar,money,period}.ts`, `test/{money,period}.test.ts` |

## Perubahan phase terakhir

- Baru: `.gitignore`, `biome.json`, `package.json`, `turbo.json`, `docs/PROGRESS.md`, `docs/FILE_MANIFEST.md`
- Baru: `packages/config/*`
- Baru: `packages/core/*`
