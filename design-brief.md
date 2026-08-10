# Design Brief: AI‑Enabled Grants Management & Licensing Assistant  
_Intake and Triage – State of Minnesota Context_

---

## 1. Purpose of this Design Brief

This document is for Claude (and other AI/UX collaborators) to understand:

- The **project goals and scope** for the AI‑Enabled Grants Management & Licensing Assistant.
- The **audiences and use cases** we’re designing for.
- The **constraints** imposed by:
  - The **State of Minnesota Brand Guidelines**.
  - The **State of Minnesota Accessibility Standard** (WCAG 2.1 AA + Section 508).
- The **technical context** (Apigee, custom APIs, future Salesforce case management).
- The **expectations for artifacts and behavior** during design and prototyping.

This is not a user‑facing document; it is a **design and implementation guide**.

---

## 2. Project Overview

### 2.1 Project Name

**AI‑Enabled Grants Management & Licensing Assistant (Intake and Triage)**

### 2.2 Problem to Solve

Providers (e.g., child care providers, adult day care providers, and other licensed organizations) must navigate multiple **licensing, certification, and subsidy** processes that:

- Vary by **county and tribe**.
- Are often **siloed, duplicative, and hard to understand**.
- Frequently rely on **paper and email** for intake and communication.
- Require submitting similar information multiple times.
- Generate significant **manual intake, triage, and reconciliation work** for staff.

There is also **anticipated legislation** to consolidate and standardize these processes. The state already has **integration layers** (Apigee and custom APIs), but they are not yet used to deliver a unified provider experience. An **online portal** is the ideal future state, but many providers still operate through paper/email today.

### 2.3 Proposed Solution (High Level)

Phase 1 will focus on a pilot for **two license types**:

- **Child care licensing** (Department of Children, Youth, and Families – DCYF).
- **Adult day care licensing**.

Design and pilot an **AI‑enabled assistant** that:

- Supports **intake and triage** for these two license types.
- Helps **staff**:
  - Understand what process applies.
  - Classify and route incoming requests (including those arriving via paper/email).
  - Check for completeness and consistency.
- Is delivered in Phase 1 as a **simple new web tool** used by internal staff for testing and pilot.
- Is designed so it can ultimately be **embedded into a Salesforce‑driven case management system** or other enterprise platforms.
- Sits on top of existing systems via **Apigee and custom APIs**.
- Is designed from the outset to comply with:
  - **State of Minnesota Brand Guidelines**.
  - **State of Minnesota Accessibility Standard (WCAG 2.1 AA + Section 508)**.
- Establishes a **reusable pattern** that can later extend to other licensed program areas and to a future provider‑facing portal.

---

## 3. Goals and Success Criteria

### 3.1 Core Goals

1. **Create a unified experience for providers**  
   Reduce fragmentation across licensing, certification, and subsidy processes. Make it easier for providers to understand what they need to do, in what order, and for which programs.

2. **Provide easily accessible, usable information for all stakeholders**  
   Offer clear, consistent information to providers, licensing staff, program managers, and leadership. Ensure licensing, certification, and subsidy data can be made available to the general public where appropriate.

3. **Enhance process efficiency and eliminate duplication of roles and work**  
   Streamline areas of overlap between processes. Reduce repetitive intake tasks and manual triage for staff.

4. **Centralize functions, when feasible**  
   Where processes can be consolidated, support a more centralized intake and triage model. Use the assistant as a **common front door** for provider‑related requests.

5. **Improve data alignment, integrity, and consistency**  
   Align data across licensing, certification, and subsidy systems. Reduce discrepancies and improve trust in provider and program data.

### 3.2 What Defines Success

**Efficiency**

- Areas of overlap between processes are **streamlined**.
- Staff spend **less time** on repetitive intake and triage tasks.
- **Fewer misrouted or duplicate cases**.

**Accessibility & Transparency**

- Licensing, certification, and subsidy data are more **accessible to the public** (where appropriate).
- Providers and stakeholders can **easily find accurate information** about status, requirements, and next steps.

**Qualitative Outcomes**

- Improved **provider morale** (less confusion, clearer guidance).  
- Improved **staff morale** (less manual sorting, more higher‑value work).  
- Strengthened **reputation** for a modern, coherent, and accessible provider experience.

---

## 4. Primary Personas

Design and content should prioritize these four personas, with initial focus on **child care** and **adult day care** contexts:

1. **Licensed Provider / License Applicant (External)**  
   Child care providers (e.g., centers, family child care homes) and adult day care providers who must obtain and maintain licenses, certifications, and related subsidies. They often interact with multiple programs and jurisdictions, and currently rely heavily on **paper and email** to submit forms and ask questions. They struggle to understand which processes apply to them, what documents are required, and where they are in the process. Their experience today is fragmented, duplicative, and highly dependent on knowing “who to call.”

2. **Licensing Intake Specialist (Internal)**  
   Front‑line staff reviewing incoming applications and requests from providers via portals (where they exist), email, paper, and other channels. They classify requests, check basic completeness, and route items to the appropriate team or system. They face high volume, inconsistent submissions, and rules that vary by county, tribe, and program, leading to misrouted cases, rework, and delays.

3. **Provider Enrollment / Credentialing Specialist (Internal)**  
   Staff responsible for creating and maintaining provider records, enrollments, and credentials across licensing, certification, and subsidy programs. They reconcile information from multiple systems and manual sources, and are frequently asked to verify whether provider data is current and correct. Their work is hampered by circular data flows, lack of a clear source of truth, and repeated manual data entry.

4. **Program Manager (Licensing/Subsidy) (Internal)**  
   Leaders who oversee child care and adult day care licensing and subsidy program operations across regions or programs. They are accountable for performance, compliance, and readiness for anticipated legislative changes to consolidate processes. They need clear visibility into workload, bottlenecks, and data quality, but today must piece together information from disparate systems and reports, making it difficult to understand how efficiently providers are being served.

---

## 5. Core Use Cases (Intake & Triage)

Initial design and prototyping for Phase 1 should focus on **child care** and **adult day care** licensing, with a **staff‑only** assistant delivered via a simple internal web tool:

1. **Smart Intake Classification and Routing**
   - Classify incoming provider requests/applications (child care licensing, adult day care licensing; later extensible to certification and subsidy).
   - Identify program, type, and urgency.
   - Route to the correct queue/team using existing integrations (Apigee, custom APIs), even when the original intake arrived via paper/email and was keyed in by staff.

2. **Completeness and Consistency Checks**
   - Check if required fields/documents are present for child care and adult day care licensing applications.
   - Flag missing or inconsistent data across systems.
   - Suggest follow‑up actions for staff (and define what would later be communicated to providers).

3. **Guided Provider Experience (defined now, surfaced later)**
   - In Phase 1, define the content and flows that will eventually support providers in an **online portal**, even though the assistant is **staff‑only**.
   - Use staff interactions and feedback to shape the future provider‑facing experience (questions, steps, documents).

4. **Staff Assistance**
   - Help staff interpret policy and process rules for child care and adult day care.
   - Suggest next steps based on current status (e.g., “request X document,” “assign to Y team,” “close as duplicate”).
   - Always operate in an **assistive** mode in Phase 1 (staff make final decisions), especially given the high‑risk, vulnerable populations served by these programs.

---

## 6. Constraints: Brand & Accessibility

### 6.1 Minnesota State Brand Guidelines – Visual Elements

The assistant’s UI must align with the State of Minnesota brand, including use of the official color palette. Visual design teams will own final implementation, but Claude should assume:

#### Primary Brand Colors

These colors should **dominate the design** (navigation, primary actions, key headers, etc.), subject to WCAG 2.1 AA contrast requirements.

- **MINNESOTA BLUE**
  - PMS: 2955 C  
  - CMYK: 100 • 60 • 10 • 53  
  - RGB: 0 • 56 • 101  
  - HEX: `#003865`

- **MINNESOTA GREEN**
  - PMS: 368 C  
  - CMYK: 65 • 0 • 100 • 0  
  - RGB: 120 • 190 • 33  
  - HEX: `#78BE21`

**Guidance:**

- Use MINNESOTA BLUE for:
  - Primary navigation backgrounds.
  - Key headings and primary action buttons (with accessible text color).
- Use MINNESOTA GREEN for:
  - Secondary accents (e.g., success states, secondary buttons, highlights).
- Always verify **color contrast** (foreground vs background) meets **WCAG 2.1 AA**.

#### Accent Color Palette (High Contrast)

These colors are used **sparingly**, primarily for **charts, graphs, infographics, iconography**, and other data visualization elements when more variety is needed than the primary palette provides.

- **ACCENT TEAL**
  - PMS: 3135 C  
  - CMYK: 100 • 0 • 20 • 0  
  - RGB: 0 • 142 • 170  
  - HEX: `#008EAA`

- **ACCENT GREEN**
  - PMS: 7476 C  
  - CMYK: 89 • 22 • 34 • 65  
  - RGB: 13 • 82 • 87  
  - HEX: `#0D5257`

- **ACCENT ORANGE**
  - PMS: 7600 C  
  - CMYK: 0 • 78 • 83 • 55  
  - RGB: 141 • 63 • 43  
  - HEX: `#8D3F2B`

- **ACCENT PURPLE**
  - PMS: 261 C  
  - CMYK: 62 • 100 • 9 • 44  
  - RGB: 93 • 41 • 95  
  - HEX: `#5D295F`

**Guidance:**

- Use these accents for:
  - Distinguishing series in charts and graphs.
  - Iconography and small UI highlights.
- Use **text colors carefully** to ensure high contrast with these backgrounds.
- Do **not** allow accent colors to overpower the primary MINNESOTA BLUE/GREEN palette.

#### Extended Accent Color Palette

These colors provide **additional flexibility** for data visualization and graphic elements. They should be used **sparingly**, with primary brand colors still dominating.

- **EXTENDED ACCENT BLUE GRAY**
  - PMS: 7542 C  
  - CMYK: 24 • 4 • 8 • 13  
  - RGB: 164 • 188 • 194  
  - HEX: `#A4BCC2`

- **EXTENDED ACCENT CREAM**
  - PMS: 7401 C  
  - CMYK: 0 • 4 • 27 • 0  
  - RGB: 245 • 225 • 164  
  - HEX: `#F5E1A4`

- **EXTENDED ACCENT SKY BLUE**
  - PMS: 291 C  
  - CMYK: 38 • 4 • 0 • 0  
  - RGB: 155 • 203 • 235  
  - HEX: `#9BCBEB`

- **EXTENDED ACCENT GOLD**
  - PMS: 1225 C  
  - CMYK: 0 • 19 • 79 • 0  
  - RGB: 255 • 200 • 69  
  - HEX: `#FFC845`

**Guidance:**

- Primarily for:
  - Additional data series in complex charts.
  - Background tints in infographics or dashboard cards.
- Use sparingly and **always check contrast** for any text layered on top.
- Primary brand colors (MINNESOTA BLUE and GREEN) should remain visually dominant.

**Implication for Claude:**

- When suggesting color usage in UI concepts:
  - Use MINNESOTA BLUE and GREEN as **primary**.
  - Use accent and extended accent colors **only where needed** for differentiation in charts, status indicators, or subtle highlights.
  - Explicitly note where **contrast checks** are required (e.g., “ensure text on ACCENT ORANGE meets WCAG 2.1 AA”).

---

### 6.2 Accessibility Requirements (Non‑Negotiable)

The solution must comply with the **State of Minnesota Accessibility Standard**, which:

- Incorporates **WCAG 2.1 Level AA**.
- Is based on **Section 508 of the Rehabilitation Act**.
- Applies to **websites, documents, applications, and services**.

Key expectations:

- Design must support users who:
  - Cannot see or hear certain content.
  - Have difficulty reading or understanding text.
  - Cannot use a keyboard or mouse in typical ways.
- Content must be compatible with **common assistive technologies** (screen readers, screen magnifiers, alternative input devices, etc.).

**Specific design considerations Claude should respect:**

- **Structure & Navigation**
  - Clear, logical heading structure (H1–H2–H3).
  - **Skip navigation** capability (e.g., “Skip to main content”).
  - Consistent navigation patterns across screens.

- **Text & Content**
  - Plain language; avoid jargon where possible.
  - Support for **adjustable text size**.
  - Adequate **color contrast** (WCAG 2.1 AA), especially when using accent colors.
  - Avoid using color alone to convey meaning.

- **Images & Media**
  - All meaningful images require **descriptive alt text**.
  - Any icons used must have accessible labels.

- **Forms & Inputs**
  - All form fields must have **programmatically associated labels**.
  - Clear error messages and instructions.
  - Keyboard accessible (no mouse‑only interactions).

- **Keyboard & Focus**
  - All interactive elements must be reachable and usable via keyboard.
  - Visible focus indicators.

- **ARIA & Semantics**
  - Use semantic HTML and ARIA roles appropriately (no over‑use).
  - Ensure screen reader users can understand structure and context.

- **Accessibility Issue Resolution**
  - There must be a clear path for users to report accessibility issues (e.g., contact email).
  - The agency must respond with needed information and work to fix issues.

**Implication for Claude:**  
When proposing flows, screens, or content:

- Assume they must be **fully navigable by keyboard** and **screen reader friendly**.
- Avoid patterns that inherently conflict with WCAG 2.1 AA (e.g., hover‑only interactions, unlabelled icons, low‑contrast text).
- Call out any design ideas that may require **extra accessibility review or exceptions**.

---

## 7. Technical & Architectural Context

- **Phase 1 surface**
  - A **simple new web tool** used by internal staff for testing and pilot.
  - Built to be accessible (WCAG 2.1 AA) and aligned with Minnesota’s brand and UX patterns.

- **Future state**
  - The assistant may ultimately be **embedded into a Salesforce‑driven case management system** or other enterprise platforms.
  - Design patterns (flows, content, interaction logic) should be portable to Salesforce UI and its component model.

- **Existing integration layers**
  - **Apigee** and **custom APIs** provide integration capabilities to back‑end systems.
  - The assistant should use these APIs rather than direct database access.

- **AI Components (conceptual)**
  - LLM‑based assistant for natural language understanding and guidance.
  - Rule‑based checks for deterministic completeness and eligibility.
  - Potential RAG (retrieval‑augmented generation) using policy and process documentation.

**Implication for Claude:**  
When suggesting technical patterns, assume:

- The assistant will **not directly connect to databases**; it will go through **APIs**.
- Any AI‑driven behavior must be **transparent and overrideable** by staff (assistive first, with careful consideration before automation).

---

## 8. Risks & Considerations

Given that child care and adult day care licensing involve **vulnerable populations** (children, older adults, people with disabilities):

- In Phase 1, the assistant must be **assistive only**:
  - It may **classify, suggest, and flag issues**, but **must not** make final eligibility or licensing decisions.
- Guidance must be:
  - **Policy‑anchored** (based on documented rules and procedures).
  - Transparent about uncertainty (“Here are options; please review”) rather than asserting questionable answers.
- All AI‑generated suggestions should:
  - Be **reviewable and overrideable** by staff.
  - Be logged for **auditability** and continuous improvement.

Additional considerations:

- **Process Variation**
  - County/tribal differences must be respected; the assistant cannot oversimplify to the point of being wrong.

- **Anticipated Legislation**
  - Design must be flexible to support future consolidated processes.

- **Provider Hesitancy**
  - The experience must build trust: clear explanations, no “black box” behavior.

- **Accessibility Risk**
  - Non‑compliance with WCAG 2.1 AA / Section 508 can create legal and financial risk.
  - If any proposed solution cannot fully meet the standard, the state may need to pursue a formal **exception process**.

---

## 9. What We Expect Claude to Produce

When asked for concepts, flows, or content, Claude should:

1. **Respect Personas and Use Cases**
   - Tie suggestions back to the four primary personas and the four core use cases.

2. **Embed Accessibility Considerations**
   - Call out how designs meet WCAG 2.1 AA.
   - Flag any patterns that might need extra accessibility review.

3. **Align with State Brand & Tone**
   - Use clear, neutral, government‑appropriate language.
   - Assume simple, consistent layouts and navigation.

4. **Support Iterative, Agentic Prototyping**
   - Provide artifacts that are easy to turn into low‑/mid‑fidelity prototypes (e.g., structured flows, content outlines, component descriptions).
   - Be explicit about assumptions and open questions.

---