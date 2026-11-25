# PROGRESS — Catetin

Mode: MVP · Tahap aktif: 1 (MVP web) · Terakhir diperbarui: 2026-11-20

## Status phase

| Phase | Isi                                                                                                                  | Fitur PRD            | Status            | Data source |
| ----- | -------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------- | ----------- |
| P1a   | Monorepo (Bun + Turborepo + Biome + TS strict) + `packages/core`: uang (BR-1..3) dan periode (BR-17..19) + unit test | Fondasi              | Menunggu validasi | -           |
| P1b   | `packages/i18n` (formatMoney/formatDate), `packages/ui-tokens`, shell web Next.js dengan dashboard mock              | Fondasi, F1.8 (mock) | Belum mulai       | mock        |
| P2    | API + database + login nyata (email/password, OTP, Google)                                                           | F1.1                 | Belum mulai       | api         |
| P3    | Onboarding: persetujuan, nama, dompet, tanggal periode, kategori bawaan                                              | F1.2, F1.4, F1.5     | Belum mulai       | api         |
| P4    | Transaksi manual: form, daftar, cari/filter, edit, hapus + urungkan, Sampah                                          | F1.6                 | Belum mulai       | api         |
| P5    | Parser rules di `packages/core` + fixture + layar Catat (input chat)                                                 | F1.3 (rules)         | Belum mulai       | api         |
| P6    | Parser AI (`/v1/parse`) + `parse_hints`                                                                              | F1.3 (AI)            | Belum mulai       | api         |
| P7    | Transfer antar dompet + sesuaikan saldo                                                                              | F1.7                 | Belum mulai       | api         |
| P8    | Dashboard nyata (ganti mock P1b)                                                                                     | F1.8                 | Belum mulai       | api         |
| P9    | Laporan dan grafik                                                                                                   | F1.9                 | Belum mulai       | api         |
| P10   | Budget + peringatan                                                                                                  | F1.10                | Belum mulai       | api         |
| P11   | Pengaturan + Keamanan + Privasi                                                                                      | F1.11                | Belum mulai       | api         |
| P12   | Worker + ekspor data + hapus akun                                                                                    | F1.12                | Belum mulai       | api         |
| P13   | PWA + polish + checklist rilis beta web                                                                              | F1.13, PRD 19.4      | Belum mulai       | api         |

Status yang dipakai: Belum mulai · Sedang berjalan · Menunggu validasi · Selesai · Blocked

## Phase berikutnya

P1b (setelah P1a lulus validasi)

## Catatan dan keputusan

- P1 dipecah menjadi P1a dan P1b karena lebih dari 12 file.
- Versi dikunci: bun 1.4.5, turbo 2.11.13, typescript 7.0.2, @biomejs/biome 2.6.8, zod 4.6.7, @types/bun 1.4.5.
- Lint/format memakai Biome (PRD 5.4). File Markdown tidak diformat Biome.
- Aturan bisnis ada di `packages/core/src/rules/` (PRD 6).
- `parseMoney` menerima string bilangan bulat bertanda (saldo bisa negatif, BR-11); nominal transaksi divalidasi terpisah dengan `AmountStringSchema` (BR-2).
- Workspace memakai `exports` ke file `.ts` langsung (tanpa build step) untuk `packages/core`.

## Masih memakai mock

- (kosong)
