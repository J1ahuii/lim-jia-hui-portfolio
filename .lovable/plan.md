## Goal
Turn `/others/photography` and `/others/working-experience` into dedicated standalone content pages with the requested layouts. Cards on `/others` stay as entry points only.

## Changes

### 1. Route rename — `/others/experience` → `/others/working-experience`
- Delete `src/routes/others.experience.tsx`.
- Create `src/routes/others.working-experience.tsx` with `createFileRoute("/others/working-experience")`.
- Update `portfolio.others[1].href` to `/others/working-experience` in `src/content/portfolio.ts`.
- `src/routeTree.gen.ts` is auto-regenerated.

### 2. `/others/photography` — rewrite
Replace current masonry layout with:
- No `<SiteLogo />`.
- `Back to Others` link (kept).
- Hero title: **Photography** (existing styling reused).
- **Section: Travel** — horizontal carousel:
  - Large center placeholder frame (aspect 4/3).
  - Partial previous frame peeking on the left, partial next frame on the right (scaled ~0.75, lower opacity).
  - `Previous` / `Next` arrow buttons below (lucide `ChevronLeft` / `ChevronRight`), wired to local `useState` index, wrap-around.
  - 4 placeholder slides (ImageIcon + "Placeholder" label, same crystal-card styling).
- **Section: Sky** — identical carousel component, separate state, 4 placeholders.
- Implement as one local `<PhotoCarousel>` component inside the route file (no new shared files, no new deps).
- Keep aurora/stars/sparkles background.
- Bottom dock stays (rendered by root layout — untouched).

### 3. `/others/working-experience` — rewrite
- No `<SiteLogo />`.
- `Back to Others` link.
- Hero title: **Working Experience**.
- Timeline of 2 placeholder entries. Each entry row (alternating side on `md+`, stacked on mobile):
  - **Left:** large tilted photo frame placeholder (`crystal-card`, `rotate-[-4deg]`, aspect 4/5, ImageIcon center).
  - Small floating accent frame overlapping bottom-right (absolute, `rotate-[6deg]`, ~40% size, ImageIcon).
  - **Right:** Company name (editorial italic, silver-foil), role title, period (aurora uppercase tracking), description paragraph.
- Use new placeholder data added to `portfolio.experience` (replace existing 3 entries with 2 placeholder entries: `{ company, role, period, description }`). Old `bullets`/`summary` no longer used by this page.
- Bottom dock stays.

### 4. `/others` (entry cards)
- No structural change — current cards already act as entry points and navigate via `Link to={item.href}`.
- Only update needed: href change comes from portfolio data update in step 1.
- Keep `<SiteLogo />` here (per earlier rule: logo allowed on Home, Projects overview, Others).

## Out of scope
- Dock, root layout, projects pages, wins/certs, design tokens.
- No new packages, no real images (placeholders only).

## Files touched
- `src/routes/others.experience.tsx` (delete)
- `src/routes/others.working-experience.tsx` (new)
- `src/routes/others.photography.tsx` (rewrite content)
- `src/content/portfolio.ts` (href + experience entries)
