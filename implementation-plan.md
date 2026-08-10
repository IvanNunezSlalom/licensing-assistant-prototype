markdown
# Implementation Plan – AI‑Enabled Grants Management & Licensing Assistant Prototype  
_Phase 1 – 24‑Hour Fast Forward Prototype_

This document describes a **rapid implementation plan** for a Phase 1 prototype of the AI‑Enabled Grants Management & Licensing Assistant. Claude should use this as a reference when generating code, components, and mock data.

---

## 0. Tech Choices for the Prototype

**Goal:** Build a working prototype in **24 hours or less**, suitable for preview on **Vercel**, with all data mocked.

- **Editor & Dev Environment:** Visual Studio Code.
- **Deployment:** Vercel (connected to a Git repo).
- **Front end:** Vite + React (or similar React setup) for fast iteration and easy deployment.
- **Design system (Phase 1):**
  - Do **not** use SLDS 2 in this initial prototype.
  - Use a **simple custom theme** based on Minnesota brand colors (MINNESOTA BLUE, MINNESOTA GREEN, accent colors).
  - Keep CSS minimal and focused on layout, readability, and WCAG 2.1 AA contrast.
- **Data & AI:**
  - All data is **mock/fake**.
  - Assistant behavior is **mocked via local rules** (`mockRules.ts`), not real model calls.
  - Claude will suggest mock data structures and rule logic.

Later, when flows are validated, the UI may be re‑implemented in **SLDS 2 Starter Kit** using `@lwc/engine-dom` + Vite and embedded into Salesforce. That is **out of scope** for this 24‑hour prototype.

---

## 1. Prototype Scope

The prototype should demonstrate one **end‑to‑end slice** of functionality:

1. Staff manually enters intake data for a **child care** or **adult day care** application.
2. The assistant:
   - Suggests a **license type** (child care vs adult day care).
   - Suggests **routing** (program + county/region).
   - Explains why it chose that classification/routing.
3. The system runs **completeness checks**:
   - Shows required fields and required documents (using placeholder lists).
   - Flags missing items and suggests next actions.
4. Staff can ask **natural language questions** in a chat panel and receive canned responses.
5. The system shows a **simple log** of recent assistant interactions.

No authentication, roles, or real integrations are required in the prototype; assume a **single staff user**.

---

## 2. Project Setup

### Step 2.1 – Create Repo and Vite + React App

1. Create a new repo, e.g., `mn-licensing-assistant-prototype`.
2. Initialize a Vite + React project:

   ```bash
   npm create vite@latest mn-licensing-assistant -- --template react-ts
   cd mn-licensing-assistant
   npm install
   ```

3. Set up the basic structure:

   ```text
   src/
     components/
       Layout.tsx
       IntakeForm.tsx
       AssistantPanel.tsx
       CompletenessPanel.tsx
       StaffChatPanel.tsx
       LogPanel.tsx
     data/
       mockIntakes.ts
       mockRules.ts
       mockCannedResponses.ts
       mockLogs.ts
     styles/
       theme.css
     App.tsx
     main.tsx
   ```

4. Prepare for Vercel deployment (later): ensure `npm run build` and `dist` output are correct.

Claude should be prepared to:

- Generate initial React components and `theme.css`.
- Provide code that compiles under Vite’s default React template.

---

## 3. Apply Minnesota Brand Basics

### Step 3.1 – Define Theme Variables

In `src/styles/theme.css`, define brand color variables:

```css
:root {
  --mn-blue: #003865;
  --mn-green: #78BE21;
  --accent-teal: #008EAA;
  --accent-green: #0D5257;
  --accent-orange: #8D3F2B;
  --accent-purple: #5D295F;
  --accent-bluegray: #A4BCC2;
  --accent-cream: #F5E1A4;
  --accent-skyblue: #9BCBEB;
  --accent-gold: #FFC845;
}
```

Implement:

- A simple **header bar** using `--mn-blue`.
- Primary buttons using `--mn-blue` or `--mn-green` with accessible text color.
- Neutral backgrounds (white or light gray) with dark text for contrast.

Claude should:

- Suggest basic CSS classes for header, main layout, panels, and buttons.
- Ensure color contrast is WCAG 2.1 AA compliant where possible.

---

## 4. Layout Shell

### Step 4.1 – Layout Component

Create `Layout.tsx`:

- Use semantic HTML:
  - `<header>` for the top bar.
  - `<main>` for content.
- Include a **“Skip to main content”** link at the top for accessibility.
- Layout:
  - Desktop: two‑column layout (`display: grid` or `flex`).
    - Left column: `IntakeForm`.
    - Right column: `AssistantPanel`, `CompletenessPanel`, `StaffChatPanel`, `LogPanel`.
  - Mobile: stack components vertically.

Claude should:

- Generate `Layout.tsx` with ARIA landmarks and skip navigation.
- Wire `Layout` to render child components.

---

## 5. Intake Form with Mock Data

### Step 5.1 – IntakeForm Component

Create `IntakeForm.tsx`:

Fields (minimal set for Phase 1 prototype):

- Provider Name (text)
- Provider Address:
  - Street
  - City
  - County (select with a few example counties)
- Application Type (e.g., new vs renewal – even if not used yet)
- Program Description (textarea) – used by assistant to infer license type

Include:

- A **“Run Assistant”** button that triggers assistant logic.

Use controlled React components with state lifted to `App.tsx` or `Layout.tsx`.

Claude should:

- Generate the form component with proper labels, IDs, and `onChange` handlers.
- Ensure all inputs are keyboard‑accessible and screen‑reader friendly.

---

## 6. Assistant Logic (Mocked)

### Step 6.1 – Mock Rules

Create `mockRules.ts` with simple heuristics:

Example:

```ts
export function suggestLicenseType(intake: IntakeData): 'childCare' | 'adultDayCare' {
  const desc = intake.programDescription.toLowerCase();
  if (desc.includes('child') || desc.includes('children') || desc.includes('child care')) {
    return 'childCare';
  }
  if (desc.includes('adult day') || desc.includes('senior') || desc.includes('older adults')) {
    return 'adultDayCare';
  }
  // default heuristic
  return 'childCare';
}

export function suggestRouting(intake: IntakeData, licenseType: 'childCare' | 'adultDayCare') {
  return {
    program: licenseType === 'childCare' ? 'Child Care Licensing' : 'Adult Day Care Licensing',
    county: intake.county || 'Unknown County',
    explanation: `Routed based on county ${intake.county || 'Unknown'} and license type ${licenseType}.`,
  };
}
```

Claude should:

- Propose `IntakeData` type and additional rule functions as needed.

### Step 6.2 – AssistantPanel Component

Create `AssistantPanel.tsx`:

- Inputs:
  - Current intake data.
- Behavior on “Run Assistant”:
  - Call `suggestLicenseType` and `suggestRouting`.
  - Display:
    - Suggested license type.
    - Suggested routing (program + county).
    - Explanation text (“why”).
  - Provide controls:
    - Accept / override license type (e.g., toggle or dropdown).
    - Accept / override routing.

Claude should:

- Implement the state logic to store:
  - Confirmed license type.
  - Confirmed routing.
- Wire the “Run Assistant” button from `IntakeForm` to `AssistantPanel`.

### Step 6.3 – StaffChatPanel Component and Mock Canned Responses

Create `mockCannedResponses.ts` with a keyword-matched lookup table:

```ts
export type CannedResponse = {
  id: string;
  keywords: string[];
  question: string;       // representative question shown in UI suggestions
  answer: string;         // plain-language response
  sourceReference: string; // e.g. “Child Care Licensing Policy Manual, Section 3.2”
};

export const DISCLAIMER_RESPONSE: CannedResponse = {
  id: 'disclaimer',
  keywords: ['legal', 'eligible', 'eligibility', 'decision', 'approve', 'deny'],
  question: '',
  answer:
    'I can\'t provide legal advice or make eligibility determinations. ' +
    'Please consult your supervisor or the policy unit for guidance.',
  sourceReference: '',
};

export const FALLBACK_RESPONSE: CannedResponse = {
  id: 'fallback',
  keywords: [],
  question: '',
  answer:
    “I don't have a canned answer for that question yet. “ +
    'Please check the policy manual or contact your supervisor.',
  sourceReference: '',
};

export const cannedResponses: CannedResponse[] = [
  {
    id: 'childcare-new-requirements',
    keywords: ['requirements', 'new', 'family child care', 'child care license'],
    question: 'What are the requirements for a new family child care license?',
    answer:
      'A new family child care license requires a completed application, ' +
      'a background study for all household members, a home inspection, ' +
      'proof of first aid/CPR training, and a floor plan of the care space.',
    sourceReference: 'Child Care Licensing Policy Manual, Section 3.2',
  },
  {
    id: 'adultday-renewal-docs',
    keywords: ['documents', 'renewal', 'adult day care'],
    question: 'What documents do I need for an adult day care renewal?',
    answer:
      'Adult day care renewal requires a completed renewal application, ' +
      'updated proof of insurance, current background studies for all staff, ' +
      'and any updated floor plans if the physical space has changed.',
    sourceReference: 'Adult Day Care Licensing Guidelines, Section 5.1',
  },
  {
    id: 'change-of-address',
    keywords: ['change of address', 'address change', 'moved', 'new address'],
    question: 'How do I handle a change of address for an existing provider?',
    answer:
      'A change of address requires the provider to submit a change-of-address form, ' +
      'a new home or facility inspection at the new location, and updated floor plans. ' +
      'The license is suspended until the inspection is complete.',
    sourceReference: 'Child Care Licensing Policy Manual, Section 7.4',
  },
];

export function findCannedResponse(query: string): CannedResponse {
  const q = query.toLowerCase();
  if (DISCLAIMER_RESPONSE.keywords.some((kw) => q.includes(kw))) {
    return DISCLAIMER_RESPONSE;
  }
  const match = cannedResponses.find((r) => r.keywords.some((kw) => q.includes(kw)));
  return match ?? FALLBACK_RESPONSE;
}
```

Create `StaffChatPanel.tsx`:

- Renders a **text input** where staff can type a question.
- On submit (button click or Enter key):
  - Calls `findCannedResponse(query)`.
  - Appends the question and response to a local message list.
  - Clears the input.
- Displays the conversation as a list of message pairs:
  - Staff question (right-aligned or labeled “You”).
  - Assistant response (left-aligned or labeled “Assistant”), including the `sourceReference` if non-empty.
- Shows **3–4 suggested question chips** (pulled from `cannedResponses[].question`) above the input for discoverability.
- Each assistant response that contains a `sourceReference` displays it as a secondary line (e.g., “Source: Child Care Licensing Policy Manual, Section 3.2”).

Chat interactions shall also append a log entry (type `'chat'`) to the shared interaction log in `App.tsx`.

Claude should:

- Keep the chat state local to `StaffChatPanel` (message list, current input).
- Accept an `onLogEntry` prop to bubble chat interactions up to the shared log.
- Ensure the input and submit button are keyboard-accessible and labeled.

---

## 7. Completeness & Consistency Panel

### Step 7.1 – Placeholder Required Items

In `CompletenessPanel.tsx`, define placeholder arrays:

```ts
const CHILDCARE_REQUIRED_FIELDS = ['providerName', 'address', 'county'];
const CHILDCARE_REQUIRED_DOCS = ['Background study form', 'Floor plan'];

const ADULTDAY_REQUIRED_FIELDS = ['providerName', 'address', 'county'];
const ADULTDAY_REQUIRED_DOCS = ['Background study form', 'Proof of insurance'];
```

### Step 7.2 – Completeness Checks

- Given intake data and confirmed license type:
  - Check for missing required fields.
  - Check for missing required documents (e.g., boolean flags in mock data).
- Display:
  - A list of required fields with indicators (✓ or !).
  - A list of required documents with indicators.
- If any required item is missing:
  - Show a warning: “This application cannot be marked Ready for review.”
  - Show **suggested next actions**, e.g.:
    - “Request background study form.”
    - “Request floor plan.”
    - “Request proof of insurance.”

### Step 7.3 – Consistency Checks (Mock)

Create `mockIntakes.ts` with a few fake existing providers:

```ts
export const existingProviders = [
  { name: 'Sunrise Child Care', address: '123 Main St', county: 'Hennepin' },
  { name: 'Evergreen Adult Day Care', address: '456 Oak Ave', county: 'Ramsey' },
];
```

- Compare current intake’s provider name + address against `existingProviders`.
- If similar:
  - Show a potential duplicate warning:
    - “This may be a duplicate of Sunrise Child Care at 123 Main St (Hennepin).”

Claude should:

- Implement logic to check completeness and potential duplicates.
- Render results using accessible lists and clear messaging.

---

## 8. Log Panel

### Step 8.1 – Interaction Logs

Create `LogPanel.tsx`:

- Define a type that covers both intake-assistant and chat interactions:

```ts
type InteractionLog = {
  id: string;
  timestamp: string;
  type: 'classification' | 'routing' | 'completeness' | 'chat';
  staffInputSummary: string;
  assistantSuggestionSummary: string;
  accepted: boolean | null; // null for chat entries (no accept/override concept)
};
```

- Each time “Run Assistant” is triggered, append entries for:
  - `type: 'classification'` — license type suggestion + whether accepted.
  - `type: 'routing'` — routing suggestion + whether accepted.
- Each time staff submits a chat question, append:
  - `type: 'chat'` — question as `staffInputSummary`, canned response id as `assistantSuggestionSummary`, `accepted: null`.

- Display logs as a simple table or list.

Claude should:

- Implement log state in a parent component (e.g., `App.tsx`) and pass it to `LogPanel`.
- Render the log with semantic HTML (`<table>` or `<ul>`).

---

## 9. Accessibility Pass

### Step 9.1 – Accessibility Checks

Ensure:

- All form fields have `<label>` elements associated via `htmlFor` and `id`.
- ARIA landmarks:
  - `<header>` for banner.
  - `<main>` for primary content.
- Keyboard navigation:
  - All interactive elements (buttons, inputs) are reachable via Tab.
- Visible focus:
  - Add CSS focus styles (e.g., outline) for focusable elements.
- Color contrast:
  - Text and buttons using Minnesota colors meet **WCAG 2.1 AA** where possible.

Claude should:

- Suggest ARIA attributes and label improvements.
- Suggest CSS tweaks for focus outlines and contrast if needed.

---

## 10. Deployment to Vercel

### Step 10.1 – Connect and Deploy

- Push the repo to GitHub (or another Git host).
- Connect the repo to Vercel.
- Configure:
  - Build command: `npm run build`.
  - Output directory: `dist` (Vite default).
- Verify:
  - The prototype builds and runs.
  - The main flows (intake → assistant → completeness → log) work end‑to‑end.

---

## 11. Future SLDS 2 / Salesforce Integration (Out of Scope for 24h)

For future phases (not part of this 24‑hour plan):

- Re‑implement UI using **SLDS 2 Starter Kit** with `@lwc/engine-dom` + Vite.
- Map React components to LWC equivalents:
  - Intake form.
  - Assistant panel.
  - Completeness panel.
  - Log panel.
- Embed the assistant into a **Salesforce‑driven case management system**.

Claude should **not** assume SLDS 2 or Salesforce in the initial prototype, but should design components and logic so they can be **ported later**.

---