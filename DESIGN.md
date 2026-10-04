---
name: WEB.EKB
description: Ural workshop. Malachite door, copper key, constructivist poster type.
colors:
  malachite-950: "oklch(0.17 0.03 168)"
  malachite-900: "oklch(0.22 0.045 167)"
  malachite-800: "oklch(0.29 0.06 166)"
  malachite-700: "oklch(0.37 0.08 165)"
  malachite-500: "oklch(0.56 0.12 163)"
  mineral: "oklch(0.966 0.009 160)"
  ink: "oklch(0.21 0.035 168)"
  ink-soft: "oklch(0.42 0.03 168)"
  copper: "oklch(0.72 0.13 55)"
  copper-light: "oklch(0.84 0.08 62)"
  copper-deep: "oklch(0.52 0.12 45)"
  on-dark: "oklch(0.965 0.01 160)"
  on-dark-soft: "oklch(0.83 0.03 160)"
  danger: "oklch(0.52 0.19 28)"
typography:
  display:
    fontFamily: "'Sofia Sans Extra Condensed', 'Arial Narrow', sans-serif"
    fontSize: "clamp(3.75rem, 1.6rem + 6.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "'Sofia Sans Extra Condensed', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.625rem, 1.4rem + 4.4vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.88
  title:
    fontFamily: "'Sofia Sans Extra Condensed', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.875rem, 1.1rem + 2.7vw, 3.375rem)"
    fontWeight: 800
    lineHeight: 0.95
  body:
    fontFamily: "'Sofia Sans', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Sofia Sans Extra Condensed', 'Arial Narrow', sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.045em"
rounded:
  edge: "2px"
  image: "3px"
  ring: "50%"
spacing:
  gutter: "clamp(1rem, 4vw, 4rem)"
  section: "clamp(4.5rem, 10vw, 9rem)"
  header: "4.5rem"
  container: "80rem"
components:
  button-primary:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.edge}"
    padding: "0.95rem 1.6rem 0.9rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.copper-light}"
    textColor: "{colors.ink}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    typography: "{typography.label}"
    rounded: "{rounded.edge}"
    padding: "0.95rem 1.6rem 0.9rem"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    typography: "{typography.label}"
    rounded: "{rounded.edge}"
    padding: "0.65rem 1rem 0.6rem"
    height: "2.75rem"
  chip-selected:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.ink}"
  input:
    backgroundColor: "oklch(0.995 0.003 160)"
    textColor: "{colors.ink}"
    rounded: "{rounded.edge}"
    padding: "0.75rem 0.9rem"
    height: "3.1rem"
  form-panel:
    backgroundColor: "{colors.mineral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.edge}"
    padding: "clamp(1.5rem, 3vw, 2.5rem)"
---

# Design System: WEB.EKB

## Overview

**Creative North Star: "The Ural Workshop"**

A turnkey website studio from Yekaterinburg, told through the objects of its region: polished banded malachite, rose copper, and the heavy condensed lettering of the city's constructivist posters. The site is built like a workshop door. It opens with a malachite slab split by a seam, a copper key set into the lock; scrolling turns the key and swings the leaves open onto a wall of real work. Everything after the door is a well-kept ledger: a price list with dotted leaders, a fourteen-day work schedule, two signed reviews, a form that actually arrives.

The page alternates three grounds for pacing: stone (malachite renders under a deep tint) for the opening and the close, near-black green for the work, and pale mineral white for reading. Copper is reserved for what you act on and for the few numbers that matter. Display type is always uppercase, condensed and tight; text type is a plain humanist sans at comfortable reading size. There is no neon, no glass and no generic agency mockup.

**Key Characteristics:**
- Real material, not imitation: malachite and copper exist only as rendered images.
- Constructivist poster type: Sofia Sans Extra Condensed 800, uppercase, at most 6rem.
- One action color: copper on ink, never copper text on stone at body size.
- Ledger structures over cards: price list rows, a 14-column day grid, ruled quotes.
- One authored motion: the key turn and door swing, tied to scroll; everything else is still or nearly still.

## Colors

A committed palette: malachite carries most of the surface, copper carries action, mineral white carries reading.

### Primary
- **Rose Copper** (oklch(0.72 0.13 55)): primary buttons, active filter chips, day bars in the schedule, list markers, the ring in the wordmark. Text on it is always Ink.
- **Pale Copper** (oklch(0.84 0.08 62)): hover state of copper buttons, focus ring on dark grounds, day labels on dark.
- **Burnt Copper** (oklch(0.52 0.12 45)): prices and proof numbers on mineral white (5.3:1), hover color of text links on light grounds.

### Secondary
- **Malachite Night** (oklch(0.17 0.03 168)): works wall, portfolio page, footer, solid header.
- **Malachite Deep** (oklch(0.22 0.045 167)): schedule section, contact section base under the stone render.
- **Malachite Stone** (oklch(0.37 0.08 165)): ring avatars, focus ring on light grounds.
- **Malachite Vein** (oklch(0.56 0.12 163)): field focus halo, scrollbar thumb.

### Neutral
- **Mineral White** (oklch(0.966 0.009 160)): reading ground for the price list, reviews, form panel and legal page. Tinted toward malachite, never warm.
- **Ink** (oklch(0.21 0.035 168)): text on light grounds and on copper (15.9:1 on Mineral White, 6.8:1 on Rose Copper).
- **Ink Soft** (oklch(0.42 0.03 168)): secondary text on Mineral White (7.6:1).
- **On Dark** (oklch(0.965 0.01 160)) and **On Dark Soft** (oklch(0.83 0.03 160)): text on malachite grounds (15.5:1 and 10.2:1 on Malachite Deep).

### Named Rules
**The Copper Means Action Rule.** Copper fills only what can be pressed, plus the offer line, prices, proof numbers and schedule bars. It never decorates.

**The Real Stone Rule.** Malachite and copper appear as rendered images (`img/malachite-*.webp`, `img/key-*.webp`, `img/obj-*.webp`). They are never imitated with CSS gradients, bevels, glows or textures.

**The Tint Before Text Rule.** Text never sits on raw malachite. The stone is tinted to at least 85% Malachite Night under the text column, so body text keeps 4.5:1 against the brightest band.

## Typography

**Display Font:** Sofia Sans Extra Condensed (with Arial Narrow fallback), self-hosted variable woff2.
**Body Font:** Sofia Sans (with system-ui fallback), self-hosted variable woff2.

**Character:** Two widths of one superfamily: the condensed face is the poster, the normal width is the reading voice. Both Cyrillic files carry a custom ₽ composed from Р and a bar, because the family has no ruble sign.

### Hierarchy
- **Display** (800, clamp(3.75rem, 1.6rem + 6.6vw, 6rem), 0.86, uppercase): the hero headline only; its last line drops to 0.6em in copper.
- **Headline** (800, clamp(2.625rem, 1.4rem + 4.4vw, 5rem), 0.88, uppercase): section titles.
- **Title** (800, clamp(1.875rem, 1.1rem + 2.7vw, 3.375rem), 0.95, uppercase): price list names and prices; schedule step titles use the same face at 1.5 to 1.875rem.
- **Body** (400, 1.0625rem, 1.6): all running text, measure up to 44rem; lead paragraphs 1.125 to 1.25rem.
- **Label** (700, 1.0625 to 1.1875rem, 0.045em tracking, uppercase, condensed face): buttons, filter chips, day labels, the scroll cue.

### Named Rules
**The Poster Ceiling Rule.** Display type never exceeds 6rem and never goes below -0.005em tracking. Scale comes from width and weight, not from size.

**The Ledger Numerals Rule.** Prices and day numbers use lining tabular numerals so columns align.

## Layout

A single 80rem container with a fluid gutter (clamp(1rem, 4vw, 4rem)) and generous section padding (clamp(4.5rem, 10vw, 9rem)). The opening is a full-viewport stage: on desktop a vertical seam at 62% splits the door into two leaves; on phones (720px and below) the seam turns horizontal at 71% and the leaves open like a hatch. Section heads use a two-column grid (title left, lead right) that collapses to one column at 860px. The price list is a two-column row (object, then text) with the price pushed right by a dotted leader; at 640px the price drops under the name and the leader disappears. The schedule uses a 14-column day grid aligned with its scale row; at 800px each step gets its own mini 14-cell track. The portfolio is a three-column masonry (CSS columns, 21rem minimum).

## Elevation & Depth

Depth comes from material and tint, not from stacked cards. Shadows are few, neutral and offset: they sit under objects that physically float (the key, the form panel, buttons). There are no colored glows and no zero-offset halos.

### Shadow Vocabulary
- **Button lift** (`box-shadow: 0 10px 22px -12px oklch(0.1 0.02 168 / 0.55)`): copper buttons.
- **Panel drop** (`box-shadow: 0 40px 70px -30px oklch(0 0 0 / 0.75)`): the form panel over stone.
- **Work card** (`box-shadow: 0 14px 28px -14px oklch(0 0 0 / 0.8)`): images on the works wall.
- **Seam** (`inset -1px 0 0 copper-light at 45%, inset -28px 0 36px -26px black at 70%`): the inner edge of each door leaf.

## Shapes

Machined edges: buttons, inputs, chips and the form panel use a 2px radius, images 3px. The only round forms are the key's bow and its echoes: the ring avatars and the wordmark's period. Rules carry structure: a 3px Ink rule opens the price list, 1px rules separate rows, a 2px Ink rule with a short copper bar heads each review.

## Components

### Buttons
- **Shape:** machined edge (2px).
- **Primary:** Rose Copper fill, Ink label in the condensed face, uppercase, 0.045em tracking, minimum height 3.25rem, arrow icon on the right.
- **Hover / Focus:** fill shifts to Pale Copper, arrow slides 4px right; focus is a 3px ring in Pale Copper (dark grounds) or Malachite Stone (light grounds) at 3px offset.
- **Line:** transparent with an On Dark label and a 45% On Dark border; hover turns the border copper. Used on dark grounds next to the work.

### Text links
Bold, underlined in copper (2px, 0.35em offset). Labels name their destination ("Смотреть работы", "Обсудить магазин").

### Chips
- **Style:** condensed uppercase label, 1.5px border at 28% On Dark, transparent fill, count in a lighter weight.
- **State:** selected fills Rose Copper with Ink text and sets `aria-pressed="true"`.

### Inputs / Fields
- **Style:** near-white fill, 1.5px Ink border at 38%, 2px radius, 3.1rem minimum height, visible label above.
- **Focus:** border turns Malachite Stone with a 3px Malachite Vein halo.
- **Error:** Danger border and a sentence below the field that names the fix.

### Navigation
Plain links in the text face at 600 weight; hover and current page draw a 2px copper underline from the left. At 960px and below the links move into a full-screen `<dialog>` menu with condensed uppercase links at up to 3.5rem.

### Price list row (signature)
An object render on the left, then name, dotted leader and price on one baseline, a one-line audience description, a row of inclusions with copper square markers, and a link that preselects the site type in the form.

### Door opening (signature)
Two malachite leaves with a seam, the copper key set across it. A sticky stage 245svh tall maps scroll to `--turn` (the key rotates 74 degrees around its shaft) and then `--open` (the leaves swing 100 degrees toward the viewer while the work rows slide into place). With reduced motion or without JS it is a static door followed by the work in normal flow.

## Do's and Don'ts

### Do:
- **Do** use the rendered key, stone and object images for every material surface; generate new ones in the same copper and malachite set when a new object is needed.
- **Do** keep copper for actions and key numbers, with Ink text on copper.
- **Do** set headlines in Sofia Sans Extra Condensed 800 uppercase at 6rem or less.
- **Do** tint malachite to at least 85% under any text.
- **Do** prefer ledger structures (rows, rules, leaders, grids) over cards.

### Don't:
- **Don't** imitate malachite or copper with CSS gradients, bevels, glows or noise.
- **Don't** put a small uppercase label above section headings.
- **Don't** add colored glows, radial halos or decorative stripes on the dark grounds.
- **Don't** use a warm cream or beige ground; light grounds are Mineral White, tinted toward malachite.
- **Don't** add infinite marquees; the work wall moves only with the door.
