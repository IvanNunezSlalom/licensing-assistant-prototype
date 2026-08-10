# Functional Requirements – AI‑Enabled Grants Management & Licensing Assistant (Phase 1)

---

## Scope Tiers

Every requirement in this document is tagged with one of three tiers:

| Tag | Meaning |
|---|---|
| `[PROTOTYPE]` | Required in the 24-hour mocked prototype. All data is fake. No auth, no real APIs, single staff user. |
| `[PHASE 1]` | Required in the real Phase 1 system (post-prototype). Real auth, real APIs, real AI. |
| `[FUTURE]` | Out of scope for Phase 1; captured here for design continuity. |

The [implementation-plan.md](implementation-plan.md) governs the prototype build. The [project-brief.md](project-brief.md) and [design-brief.md](design-brief.md) govern the full Phase 1 system.

> **Prototype constraint:** The 24-hour prototype uses a single staff user with no authentication and no live integrations. All assistant behavior is driven by `mockRules.ts`. Anything marked `[PHASE 1]` or `[FUTURE]` is out of scope for the prototype but must be designed for portability.

---

## 1. Intake and Data Entry

### FR‑1.1 Manual Intake Sources `[PROTOTYPE]` `[PHASE 1]`

- The system shall allow staff to **create a new intake record** by manually entering data from:
  - Paper forms.
  - Email attachments (e.g., PDFs, scanned documents).
- The system shall provide a data entry form that captures all **core intake fields** required for:
  - Child care licensing applications.
  - Adult day care licensing applications.

> **Prototype:** Field sets are placeholder arrays (`CHILDCARE_REQUIRED_FIELDS`, `ADULTDAY_REQUIRED_FIELDS`) in `mockRules.ts`. Exact field definitions are TBD and must be configurable; do not hardcode them.

---

## 2. Classification and Routing

### FR‑2.1 License Type Classification (Assistive Only) `[PROTOTYPE]` `[PHASE 1]`

- The system shall analyze intake data entered by staff and **suggest a license type classification**:
  - Child care licensing, or
  - Adult day care licensing.
- The system shall present the suggestion to staff and **require staff confirmation or correction** before saving the classification.
- The assistant shall never make a final classification without staff confirmation.

### FR‑2.2 Explanation of Classification `[PROTOTYPE]` `[PHASE 1]`

- For each suggested classification, the system shall provide a **plain-language explanation**, indicating:
  - Key fields or phrases that drove the suggestion
    (e.g., "Classified as child care because the application mentions 'family child care' and 'children ages 0–5.'").

### FR‑2.3 Routing Suggestion `[PROTOTYPE]` `[PHASE 1]`

- Based on the confirmed license type and intake data, the system shall **suggest a routing destination**, including:
  - Program (child care vs adult day care).
  - Region / county / tribe (routing logic defined in `mockRules.ts` for prototype; configurable rules engine for Phase 1).
- The system shall present the routing suggestion to staff and **require staff confirmation or correction** before finalizing.

### FR‑2.4 Routing Explanation `[PROTOTYPE]` `[PHASE 1]`

- For each suggested routing destination, the system shall provide a brief **routing explanation**
  (e.g., "Routed to County X because the provider address is in County X.").

---

## 3. Completeness and Consistency Checks

### FR‑3.1 Required Field Checks `[PROTOTYPE]` `[PHASE 1]`

- The system shall maintain a **configurable list of required fields** for:
  - Child care licensing (`CHILDCARE_REQUIRED_FIELDS`).
  - Adult day care licensing (`ADULTDAY_REQUIRED_FIELDS`).
- When staff attempt to save or advance an intake, the system shall:
  - Check for missing required fields based on the confirmed license type.
  - **Flag any missing required fields** with clear, accessible error messages.

### FR‑3.2 Required Document Checks `[PROTOTYPE]` `[PHASE 1]`

- The system shall maintain a **configurable list of required documents** for:
  - Child care licensing (`CHILDCARE_REQUIRED_DOCS`).
  - Adult day care licensing (`ADULTDAY_REQUIRED_DOCS`).
- The system shall:
  - Indicate which required documents have been received or attached.
  - **Flag any missing required documents** for the confirmed license type.

> **Prototype:** Document presence is represented as boolean flags in mock intake data. No real file upload.

### FR‑3.3 Next‑Step Suggestions `[PROTOTYPE]` `[PHASE 1]`

- When required fields or documents are missing, the system shall **suggest specific next actions** to staff, such as:
  - "Request background study form."
  - "Request floor plan."
  - "Request proof of insurance."
- Exact action text shall be configurable (not hardcoded).

### FR‑3.4 Preventing Premature "Ready for Review" `[PROTOTYPE]` `[PHASE 1]`

- The system shall **prevent staff from marking an application as "Ready for review"** if:
  - Any required fields are missing, or
  - Any required documents are missing.
- The system shall display a **list of blocking items** that must be resolved before the status can advance.

### FR‑3.5 Duplicate Detection `[PROTOTYPE]` `[PHASE 1]`

- The system shall compare the current intake's provider name and address against existing provider records and **flag potential duplicates**.
- When a potential duplicate is detected, the system shall:
  - Present a **plain-language warning** (e.g., "This may be a duplicate of Sunrise Child Care at 123 Main St, Hennepin County.").
  - Require staff to review before saving.

> **Prototype:** Comparison runs against `mockIntakes.ts` (static array of fake providers). No API call.
>
> **Phase 1:** Comparison queries existing provider records via Apigee APIs. Also checks for recent applications for the same provider and license type.

---

## 4. Staff Assistance and Policy Guidance

### FR‑4.1 Staff Questions `[PROTOTYPE]` `[PHASE 1]`

- The system shall allow staff to type **natural language questions** related to child care and adult day care licensing, such as:
  - "What are the requirements for a new family child care license?"
  - "What documents do I need for an adult day care renewal?"
  - "How do I handle a change of address for an existing provider?"

> **Prototype:** Questions are matched against a keyword lookup in `mockCannedResponses.ts`. No real LLM is called. Unrecognized questions return a standard fallback response.
>
> **Phase 1:** Questions are answered by a real LLM with RAG over policy and process documentation.

### FR‑4.2 Policy Summaries with Source References `[PROTOTYPE]` `[PHASE 1]`

- For supported topics, the system shall:
  - Provide a **plain-language summary** of relevant policy or procedure.
  - Include a **reference to the authoritative source** (e.g., policy manual section, statute, or official guidance document).
- Responses shall be clearly marked as summaries, not authoritative guidance.

> **Prototype:** Source references are mock strings defined alongside each canned response in `mockCannedResponses.ts` (e.g., "Child Care Licensing Policy Manual, Section 3.2").

### FR‑4.3 Prohibited Responses `[PROTOTYPE]` `[PHASE 1]`

- The system shall **not** provide:
  - Legal advice.
  - Final eligibility determinations or licensing decisions.
- When asked for either, the system shall respond with a **standard disclaimer** and direct staff to the appropriate human channel (supervisor, legal team, policy unit).

> **Prototype:** Questions containing trigger keywords (e.g., "legal," "eligible," "eligibility," "decision") return a hardcoded disclaimer string defined in `mockCannedResponses.ts`.

---

## 5. Logging, Audit, and Oversight

### FR‑5.1 Interaction Logging `[PROTOTYPE]` `[PHASE 1]`

For each assistant interaction, the system shall log at minimum:

- **Timestamp** of the interaction.
- **Staff input summary** (intake context, question asked, or action taken).
- **Assistant output**, including:
  - Suggested license type classification.
  - Suggested routing destination.
  - Suggested next steps or actions.
- **Staff response** to each suggestion:
  - Accepted or overridden.
  - Edits made to classification, routing, or next steps.

> **Prototype:** Logs are stored in React component state (`App.tsx`) for the current session only. No persistence between sessions.
>
> **Phase 1:** Logs are persisted server-side, associated with the authenticated user and intake record.

### FR‑5.2 Log Access by Role `[PHASE 1]`

- The system shall restrict access to interaction logs based on role:
  - **Intake Staff** — can view their own interaction history only.
  - **Supervisor / Team Lead** — can view logs for staff within their designated scope.
  - **Product Owner / Program Manager** — can view all logs across the pilot scope.
  - **System Administrator** — can access logs for troubleshooting, within privacy constraints.

### FR‑5.3 Analytics and Reporting `[PHASE 1]`

- The system shall provide basic **analytics dashboards** for authorized users (Product Owner, Supervisor), including at minimum:
  - Number of intakes processed with assistant support (by time period).
  - Distribution of suggested classifications (child care vs adult day care).
  - Suggestion acceptance rate (accepted vs overridden).
  - Count of flagged missing required fields and documents.
  - Count of flagged potential duplicates.
- Authorized users shall be able to filter logs by date range, staff member, or suggestion type.
- The system shall support **CSV export** of filtered log data, subject to privacy and security constraints.

---

## 6. Roles and Access Control

> **Prototype scope note:** FR-6 is **not included in the 24-hour prototype**. The prototype runs as a single, unauthenticated staff user. These requirements define the real Phase 1 system. Design component boundaries and data structures so auth context can be layered in later.

### FR‑6.1 User Authentication `[PHASE 1]`

- The system shall require **user authentication** for all access.
- Where feasible, the system shall integrate with the State's **standard identity provider** (SSO/IDP used for staff applications).
- Unauthenticated users shall not access any part of the application.

### FR‑6.2 Role Definitions `[PHASE 1]`

The system shall support, at minimum, the following roles:

1. **Intake Staff** — Licensing Intake Specialists, Provider Enrollment / Credentialing Specialists.
2. **Supervisor / Team Lead** — Unit supervisors responsible for intake and triage teams.
3. **Product Owner / Program Manager** — Program managers overseeing the pilot.
4. **System Administrator** — IT staff responsible for configuration and user management.

### FR‑6.3 Permissions by Role `[PHASE 1]`

**Intake Staff**
- Can: create and edit intake records; use assistant suggestions; accept or override suggestions; view own interaction history.
- Cannot: view system-wide analytics; change configuration of required fields, documents, or routing rules; view other staff's logs.

**Supervisor / Team Lead**
- Can: all Intake Staff actions; view intakes and logs for staff in their scope; access team analytics dashboards; audit triage decisions.
- Cannot: modify system-wide configuration unless explicitly granted.

**Product Owner / Program Manager**
- Can: view all intakes and logs across the pilot scope; access system-wide analytics; configure or request configuration of required fields, documents, and assistant behavior parameters.
- Cannot: modify low-level technical settings (API endpoints, auth configuration).

**System Administrator**
- Can: manage user accounts and role assignments; configure system-wide settings; deploy updates to required fields, routing rules, and policy source links; access logs for troubleshooting.

### FR‑6.4 Role‑Based Access Enforcement `[PHASE 1]`

- The system shall enforce **RBAC** so that users can only perform actions and view data permitted by their assigned role.
- Attempts to access unauthorized functions or records shall be prevented and logged.

### FR‑6.5 Least Privilege `[PHASE 1]`

- Each user shall be granted the minimum permissions necessary to perform their job functions.
- Administrative privileges shall be limited to System Administrators and, where appropriate, specific Product Owners.

### FR‑6.6 Audit of Access Control Changes `[PHASE 1]`

- The system shall log all changes to user roles and permissions, capturing:
  - The affected user.
  - The administrator who made the change.
  - Date, time, and nature of the change (e.g., "Intake Staff → Supervisor").

### FR‑6.7 Session Management `[PHASE 1]`

- The system shall automatically **expire sessions** after a configurable period of inactivity.
- Re-authentication shall be required after session expiry.
- Expired session tokens shall not be reusable.

---

## Open Questions

- [ ] **FR-4.1 scope:** Is a mocked chat/Q&A interface wanted in the prototype, or is FR-4 strictly Phase 1? If it's wanted in the prototype, a `StaffChatPanel` component needs to be added to the implementation plan.
- [ ] **FR-6.1 SSO/IDP:** What is the State's standard identity provider for staff applications? (Name or system needed to implement FR-6.1.)
- [ ] **FR-3.1 / FR-3.2 field lists:** Exact required fields and documents for child care and adult day care — who owns these lists and when will they be available?
- [ ] **FR-2.3 routing logic:** County/tribal routing rules — who defines these and in what format?
