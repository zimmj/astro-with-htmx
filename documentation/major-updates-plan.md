# Major Package Updates Plan

## Overview

These updates involve breaking changes and should be done **in order**, one at a time, verifying the dev server and build after each step.

| Package | Current | Target | Risk |
|---|---|---|---|
| `@astrojs/netlify` | 7.x | 8.x | Low |
| `@astrojs/node` | 10.x | 11.x | Low |
| `eslint-plugin-astro` | 1.x | 3.x | Low |
| `typescript` | 5.x | 7.x | Medium |
| `tailwindcss` | 3.x | 4.x | High |
| `astro` | 6.x | 7.x | High — do last |

---

## ~~Step 1 — `@astrojs/netlify` 7 → 8~~ ✅ Done (7.0.13 → 8.2.1)

No code changes required. `astro.config.mjs` unchanged.

---

## ~~Step 2 — `@astrojs/node` 10 → 11~~ ✅ Done (10.1.4 → 11.1.2)

No code changes required. Adapter is not active (Netlify is primary).

---

## ~~Step 3 — `eslint-plugin-astro` 1 → 3~~ ✅ Done (1.7.0 → 3.1.0)

No rule renames needed. `eslintPluginAstro.configs.recommended` spread still works.

Two pre-existing type errors were fixed while verifying `pnpm type-check`:
- `src/components/ui/Input.astro` — typed `type` prop as `astroHTML.JSX.HTMLInputTypeAttribute` instead of `string`
- `src/pages/index.astro` — typed `handleEscape` parameter as `KeyboardEvent`

**Note on pnpm v11 store migration:** The project was installed with pnpm v10 store; pnpm v11 (now active globally) uses a new store path. On first install after the upgrade, run:
```bash
CI=true pnpm install --config.minimumReleaseAge=false
```
pnpm v11 enforces a 24h `minimumReleaseAge` supply-chain policy by default; the flag disables it for the initial lockfile migration.

---

## ~~Step 4 — `typescript` 5 → 6~~ ✅ Done (5.9.3 → 6.0.3)

**Note:** `typescript@latest` resolved to 7.0.2, but TypeScript 7's new Go-based native compiler does not expose the programmatic API that `astro check` relies on — `pnpm type-check` fails immediately. TypeScript 6.0.3 is the highest version fully compatible with `@astrojs/check` and `@typescript-eslint`. No type errors surfaced; zero code changes required. Will upgrade to TS 7 once Astro's language server supports it (tracked at https://github.com/withastro/roadmap/discussions/1321).

**Side effect:** TypeScript 6 is stricter about side-effect CSS imports — added `declare module '*.css';` to `src/env.d.ts`.

---

## ~~Step 5 — `tailwindcss` 3 → 4~~ ✅ Done (3.4.19 → 4.3.3)

**Note:** Only one class rename was needed in the entire codebase (`shadow-sm` → `shadow-xs` in `src/components/TodoItem.astro`). A type-only conflict in `astro.config.mjs` was suppressed with `@ts-expect-error` — `@tailwindcss/vite` 4.3.x resolves against Vite 8 types but Astro 6 uses Vite 7; runtime is unaffected. Will resolve when Step 6 (Astro 7) brings Vite 8.

~~**This is the most disruptive change.** Tailwind v4 is a complete rewrite with a CSS-first config approach.~~

### Breaking changes that affect this project

**Config file is gone.** The `tailwind.config.mjs` file is replaced by a CSS `@import "tailwindcss"` directive. Our current `tailwind.config.mjs` content is minimal (empty theme extend, no plugins), so the migration is straightforward.

**`@astrojs/tailwind` integration is removed.** Tailwind v4 uses Vite's PostCSS pipeline directly — the Astro integration wrapper is no longer needed and will error.

**Utility class renames (partial list):**
- `shadow-sm` → `shadow-xs`, `shadow` → `shadow-sm`
- `rounded` → `rounded-sm`, `rounded-md` stays
- `overflow-ellipsis` → `text-ellipsis`
- `decoration-slice` → `box-decoration-slice`
- `bg-opacity-*` → use `bg-black/50` syntax instead

**Steps:**
1. Remove `@astrojs/tailwind`:
   ```bash
   pnpm remove @astrojs/tailwind
   ```
2. Install Tailwind v4 and its Vite plugin:
   ```bash
   pnpm add tailwindcss@latest @tailwindcss/vite
   ```
3. Remove `tailwind.config.mjs`
4. Create `src/styles/global.css` (or update existing if present):
   ```css
   @import "tailwindcss";
   ```
5. Update `astro.config.mjs` — remove `tailwind()` integration, add the Vite plugin:
   ```js
   import { defineConfig } from 'astro/config';
   import netlify from '@astrojs/netlify';
   import tailwindcss from '@tailwindcss/vite';

   export default defineConfig({
     adapter: netlify(),
     output: 'server',
     vite: {
       plugins: [tailwindcss()],
     },
   });
   ```
6. Import the CSS file in `src/layouts/BaseLayout.astro`:
   ```astro
   ---
   import '../styles/global.css';
   ---
   ```
7. Run `pnpm dev` and do a visual pass — check for broken spacing, shadows, or rounded corners from renamed utilities
8. Use the official migration tool as a reference:
   ```bash
   pnpx @tailwindcss/upgrade
   ```

---

## ~~Step 6 — `astro` 6 → 7~~ ✅ Done (6.4.8 → 7.2.2)

**`experimental_AstroContainer` is NOT yet stable in 7.2.2.** Despite the upgrade guide suggesting the rename, `astro/container` still only exports `experimental_AstroContainer` — keeping the existing alias import in `signin.ts` and `skills.ts` unchanged.

**`@ts-expect-error` in `astro.config.mjs` removed.** Astro 7 ships Vite 8, so the `@tailwindcss/vite` type conflict is resolved.

**`output: 'server'` unchanged.** Netlify adapter 8.x declares `serverOutput: 'stable'` — no config change needed.

Zero code changes beyond removing the suppression comment. `pnpm type-check`, `pnpm build`, and `pnpm dev` all pass.

---

## Verification Checklist (after all steps)

- [x] `pnpm dev` starts without errors
- [x] `pnpm build` completes successfully
- [x] `pnpm type-check` passes
- [ ] `pnpm lint` passes
- [ ] Landing page (`/`) renders correctly with styles
- [ ] Sign in / register / sign out flows work
- [ ] Dashboard page loads after auth
- [ ] HTMX form submissions return correct HTML fragments
- [ ] Dark mode classes render correctly
