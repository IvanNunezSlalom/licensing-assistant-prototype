
# Project Brief: AI Enabled Grants Management & Licensing Assistant (Intake and Triage)

## Executive Summary

This initiative will design and pilot an **AI enabled assistant** to support **intake and triage for provider licensing, certification, and subsidy processes**. The assistant will help staff and providers navigate complex, overlapping processes, classify and route incoming requests, and surface accurate, consistent information. The goal is to create a **unified provider experience**, improve **efficiency** by eliminating duplication of work, and **strengthen data alignment and integrity** across systems and programs.

---

## Background

Across the state, providers interact with multiple programs and processes for **licensing, certification, and subsidy**. These processes vary by **county and tribe**, and are often siloed, duplicative, and difficult to navigate. Providers may need to submit similar information multiple times, and staff spend significant effort on manual intake, triage, and reconciliation.

At the same time:

- There is **anticipated legislation** aimed at consolidating and standardizing processes.
- **Integration layers** are already in place, including **Apigee** and **custom APIs**, but they are not yet leveraged for a unified provider experience.
- Some providers are **hesitant about new technology initiatives**, making clarity, usability, and trust essential.

This project proposes an **AI enabled assistant** that sits on top of existing systems and integration capabilities to guide intake and triage, making the experience more unified, efficient, and transparent for both providers and staff.

---

## Core Goals / Outcomes

The initiative is driven by the following core goals:

1. **Create a unified experience for providers**  
   Reduce fragmentation across licensing, certification, and subsidy processes. Make it easier for providers to understand what they need to do, in what order, and for which programs.

2. **Provide easily accessible, usable information for all stakeholders**  
   Offer clear, consistent information to providers, licensing staff, program managers, and leadership. Ensure licensing, certification, and subsidy data can be made available to the general public where appropriate.

3. **Enhance process efficiency and eliminate duplication of roles and work**  
   Streamline areas of overlap between processes. Reduce repetitive intake tasks and manual triage for staff.

4. **Centralize functions, when feasible**  
   Where processes can be consolidated, support a more centralized intake and triage model. Use the assistant as a common front door for provider related requests.

5. **Improve data alignment, integrity, and consistency**  
   Align data across licensing, certification, and subsidy systems. Reduce discrepancies and improve trust in provider and program data.

---

## What Defines Success

Success will be measured by:

- **Efficiency**
  - Areas of overlap between processes are **streamlined**.
  - Staff spend less time on repetitive intake and triage tasks.
  - Fewer misrouted or duplicate cases.

- **Accessibility and transparency**
  - Licensing, certification, and subsidy data are made more **accessible to the general public** (where appropriate).
  - Providers and stakeholders can easily find accurate information about status, requirements, and next steps.

Additional qualitative outcomes:

- Improved **provider morale** (less confusion, clearer guidance).  
- Improved **staff morale** (less manual sorting, more time for higher value work).  
- Strengthened **reputation** for delivering a modern, coherent provider experience.

---

## Core Challenges

The initiative must address several challenges:

- **Process variation**  
  Licensing and subsidy processes vary across counties and tribes, creating complexity and inconsistent experiences. Any unified assistant must respect local variations while promoting standardization where possible.

- **Anticipated legislation**  
  Upcoming legislation aims to consolidate processes. The assistant must be designed to **adapt to changing policy and process rules**, not just hard code today’s state.

- **Existing integration layers**  
  **Apigee** and **custom APIs** already provide integration capabilities. The assistant must fit into this existing architecture, leveraging these integrations rather than duplicating them.

- **Provider hesitancy about new technology**  
  Some providers are wary of new technology initiatives. The assistant must be **simple, trustworthy, and clearly optional at first**, with strong communication about benefits and safeguards.

---

## Primary Personas

1. **Licensed Provider / License Applicant (External)**  
   Providers such as child care centers, home based providers, and other licensed service organizations who must obtain and maintain licenses, certifications, and related subsidies. They often interact with multiple programs and jurisdictions, and struggle to understand which processes apply to them, what documents are required, and where they are in the process. Their experience today is fragmented, duplicative, and highly dependent on knowing “who to call.”

2. **Licensing Intake Specialist (Internal)**  
   Front line staff who receive and review incoming applications and requests from providers via portals, email, paper, and other channels. They classify requests, check for basic completeness, and route items to the appropriate team or system. They face high volume, inconsistent submissions, and complex rules that vary by county, tribe, and program, leading to misrouted cases, rework, and delays.

3. **Provider Enrollment / Credentialing Specialist (Internal)**  
   Staff responsible for creating and maintaining provider records, enrollments, and credentials across licensing, certification, and subsidy programs. They reconcile information from multiple systems and manual sources, and are frequently asked to verify whether provider data is current and correct. Their work is hampered by circular data flows, lack of a clear source of truth, and repeated manual data entry.

4. **Program Manager (Licensing/Subsidy) (Internal)**  
   Leaders who oversee licensing and subsidy program operations across regions or programs. They are accountable for performance, compliance, and readiness for anticipated legislative changes to consolidate processes. They need clear visibility into workload, bottlenecks, and data quality, but today must piece together information from disparate systems and reports, making it difficult to understand how efficiently providers are being served.

---

## Core Use Cases (Intake & Triage)

Initial use cases for the **AI Enabled Assistant** may include:

1. **Smart Intake Classification and Routing**
   - Classify incoming provider requests/applications (licensing, certification, subsidy).
   - Identify program, type, and urgency.
   - Route to the correct queue/team, using existing integration.

2. **Completeness and Consistency Checks**
   - Check whether required fields/documents are present.
   - Flag missing information or inconsistencies across licensing, certification, and subsidy data.
   - Suggest follow up actions for staff or providers.

3. **Guided Provider Experience**
   - Answer provider questions in plain language:
     - “What license do I need?”
     - “What steps are required?”
     - “What documents should I prepare?”
   - Provide a unified view of requirements across programs, while respecting local variations.

4. **Staff Assistance**
   - Help staff interpret policy and process rules.
   - Suggest next steps based on current status (“request X document,” “assign to Y team,” “close as duplicate”).

---

## Business Value

### Efficiency

- Reduced duplication of intake work and triage across overlapping processes.  
- Faster routing and resolution of provider requests.  
- Less manual reconciliation of provider data.

### Accessibility and Transparency

- Licensing, certification, and subsidy data made more visible and understandable to providers and the public.  
- Clearer, unified guidance reduces provider confusion and back and forth communication.

### Strategic Alignment

- Supports anticipated legislative consolidation by providing a flexible, policy aware intake layer.  
- Demonstrates practical use of AI in government services while respecting data governance and provider trust.  
- Establishes a pattern that can be extended to other provider facing processes and programs.

---

## Competitors

N/A

---

## Technologies to Consider

- **AI Components**
  - LLM based assistant for natural language understanding and guidance.
  - Rule based checks for deterministic completeness and eligibility.
  - Potential RAG (retrieval augmented generation) using policy and process documentation.

- **Integration**
  - Leverage existing **Apigee** and **custom APIs** to connect with back end systems.
  - Align with broader **Enterprise Data Platform** and API strategies as they mature.

- **User Experience**
  - Simple, guided interface for staff and/or providers.
  - Clear explanations, not opaque “AI decisions.”
  - Designed to build trust with hesitant providers.

---

## Additional Considerations

- Need to manage **process variation** carefully so the assistant doesn’t oversimplify or mislead.  
- Must ensure **data governance and privacy** (especially if exposing data to the public).  
- Must include **change management and training** so staff and providers understand how to use the assistant and its limits.
