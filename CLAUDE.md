# CLAUDE.md — AI‑Enabled Grants Management & Licensing Assistant

This file tells Claude how to behave in this project. Read it before generating any code, content, or designs.

---

## What This Project Is

A **24-hour rapid prototype** of an AI-enabled intake and triage assistant for Minnesota state licensing staff. It covers **child care** and **adult day care** licensing. All data is mocked. No real AI calls, no authentication, no live integrations.

The prototype is a stepping stone toward a future Salesforce-embedded tool that uses Apigee APIs. Design components and logic to be portable.

---

## Read These Documents First

Before starting any task, load the relevant document(s):

| Document | When to read it |
|---|---|
| [project-brief.md](project-brief.md) | Goals, personas, business value, high-level use cases |
| [design-brief.md](design-brief.md) | Brand colors, accessibility rules, UI constraints, what Claude should produce |
| [functional-requirements.md](functional-requirements.md) | Detailed feature requirements per use case _(draft pending — see open questions below)_ |
| [implementation-plan.md](implementation-plan.md) | Step-by-step build plan: setup, components, mock data, deployment |

---

## Personas (Summary)

Four personas drive all design and feature decisions. Details in [project-brief.md](project-brief.md).

1. **Licensed Provider / Applicant** — External; confused by fragmented processes; paper/email heavy today.
2. **Licensing Intake Specialist** — Internal; manually classifies and routes applications; high volume.
3. **Provider Enrollment / Credentialing Specialist** — Internal; reconciles data across systems.
4. **Program Manager** — Internal; needs visibility into workload and data quality.

Phase 1 serves **internal staff only** (personas 2–4). Provider-facing flows are defined now but surfaced later.

---

## Core Rules for Claude

### Always
- Treat all four personas and four use cases (classification, completeness, guided experience, staff assistance) as the north star.
- Keep the assistant **assistive only** — it suggests and flags, never decides. Staff override is always available.
- Log every assistant interaction (timestamp, input summary, suggestion, accepted/overridden).
- Write accessible HTML/JSX: semantic elements, associated labels, visible focus, keyboard-navigable.
- Use **WCAG 2.1 AA** contrast for all color combinations. Verify before proposing any color pairing.

### Never
- Make final eligibility or licensing decisions in code or content.
- Use hover-only interactions, icon-only buttons without labels, or color as the sole conveyor of meaning.
- Add real AI/LLM calls, authentication, or live API calls — this is a mocked prototype.
- Assume SLDS 2 or Salesforce in Phase 1 code. Design for portability; implement for React + Vite.
- Hardcode county/tribal process rules in a way that can't be updated — rules go in `mockRules.ts`.

---

## Tech Stack

- **Framework:** Vite + React (`--template react-ts`)
- **Language:** TypeScript throughout (`.tsx` / `.ts`)
- **Styling:** Custom CSS using Minnesota brand variables from `src/styles/theme.css`
- **Data:** All mock — `src/data/mockIntakes.ts`, `mockRules.ts`, `mockLogs.ts`
- **Deployment:** Vercel (build: `npm run build`, output: `dist`)

See [implementation-plan.md](implementation-plan.md) for the full file structure and build steps.

---

## Brand Colors (Quick Reference)

Full guidance in [design-brief.md](design-brief.md) § 6.1.

| Token | Hex | Use |
|---|---|---|
| `--mn-blue` | `#003865` | Primary nav, headings, primary buttons |
| `--mn-green` | `#78BE21` | Secondary accents, success states |
| `--accent-teal` | `#008EAA` | Charts, icons, highlights |
| `--accent-green` | `#0D5257` | Data viz series |
| `--accent-orange` | `#8D3F2B` | Data viz — **check contrast before using on text** |
| `--accent-purple` | `#5D295F` | Data viz series |
| `--accent-bluegray` | `#A4BCC2` | Background tints |
| `--accent-cream` | `#F5E1A4` | Background tints |
| `--accent-skyblue` | `#9BCBEB` | Additional data series |
| `--accent-gold` | `#FFC845` | Additional data series |

White text on `--mn-blue` (#003865) passes AA. Always verify other combinations.

---

## Accessibility Checklist (Non‑Negotiable)

Full requirements in [design-brief.md](design-brief.md) § 6.2.

- [ ] "Skip to main content" link at top of every page
- [ ] Logical H1 → H2 → H3 heading hierarchy
- [ ] All form fields have `<label htmlFor>` + matching `id`
- [ ] All buttons have visible text or `aria-label`
- [ ] All interactive elements reachable via Tab
- [ ] Visible focus indicators on all focusable elements
- [ ] No color-only meaning
- [ ] ARIA landmarks: `<header>`, `<main>`, `<nav>` where appropriate

---

## What "Done" Means for Phase 1

The prototype is complete when a staff user can:

1. Enter intake data for a child care or adult day care application.
2. Run the assistant and see a suggested license type + routing with explanation.
3. Accept or override the suggestion.
4. See completeness checks (required fields + documents) with missing-item warnings.
5. See a potential duplicate warning if provider name/address matches mock data.
6. Type a natural language question in the chat panel and receive a canned response with a source reference.
7. See suggested question chips in the chat panel for discoverability.
8. View a unified log of all assistant interactions (classification, routing, chat) in the current session.

---

## Open Questions (Answer Before Writing functional-requirements.md)

- [ ] **functional-requirements.md is empty.** Draft from other docs, or will you supply content?
- [ ] **Demo date/audience.** Who sees the prototype and when?
- [ ] **Figma file or component library?** Any existing design assets beyond the color values?
- [ ] **Directory name.** The folder has a trailing space — intentional?
- [ ] **County list.** How many counties should appear in the County dropdown for the prototype?
