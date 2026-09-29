# Weather Dashboard — Design Tokens

**Concept:** "Sky & Instrument" — the UI reads like a precision weather gauge panel, not a generic card dashboard. Gradients mirror real sky conditions; stats use monospace readouts like instrument dials.

**Why this isn't generic:** Condition-driven sky gradients with an 800ms cross-fade signature transition tie every search to a distinct atmospheric mood — functional aesthetics, not decorative cream-and-terracotta.

## Color Tokens

| Token | Hex | Role |
|---|---|---|
| `--sky-day` | `#4A90D9` | Clear-day gradient top |
| `--sky-dusk` | `#2B3A67` | Dusk / deep-sky gradient bottom |
| `--cloud-white` | `#F5F7FA` | Card surfaces, hero panel fill |
| `--ink` | `#1C2430` | Primary text |
| `--accent-sun` | `#F5A623` | Highlights, active states, warnings |
| `--rain-blue` | `#6FA8DC` | Rain-condition accent |

### Condition → Gradient mapping

- **Sunny** — warm gold-to-sky (`#F5A623` → `#4A90D9`)
- **Partly Cloudy** — soft blue-grey (`#8BA4C4` → `#4A90D9`)
- **Cloudy** — muted grey-blue (`#6B7B8D` → `#3D4F63`)
- **Rain** — cool blue-grey (`#5B7FA3` → `#2B3A67`)
- **Windy** — airy teal-grey (`#5A9EA8` → `#3D5A6B`)

## Typography

- **Display:** [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display) — city name, hero temperature
- **Body:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) — labels, instructions, error copy
- **Instrument:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — humidity, wind, timestamps

## Layout

```
┌─────────────────────────────────────────┐
│  search bar (centered, pill-shaped)      │
├─────────────────────────────────────────┤
│   BIG TEMP        condition icon/anim    │
│   city, country     humidity | wind      │
│                      last updated        │
├─────────────────────────────────────────┤
│  [Mon] [Tue] [Wed] [Thu] [Fri]  ← scroll │
└─────────────────────────────────────────┘
```

## Signature Element

**Live gradient cross-fade (~800ms ease)** — the full-page background smoothly transitions when a new city's condition loads, making each search feel like stepping into a different sky.
