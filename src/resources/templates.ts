/**
 * Resource Templates
 * MCP resources that expose consulting document templates to AI clients.
 */

export interface TemplateResource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
  content: string;
}

export const TEMPLATE_RESOURCES: TemplateResource[] = [
  {
    uri: "consultant-ai://templates/proposal",
    name: "Proposal Template",
    description:
      "Professional consulting proposal template with all standard sections. Use placeholders in {{double_braces}}.",
    mimeType: "text/markdown",
    content: `# Consulting Proposal: {{PROJECT_TITLE}}

**Prepared for:** {{CLIENT_NAME}}, {{CLIENT_COMPANY}}
**Prepared by:** {{CONSULTANT_NAME}}, {{CONSULTANT_COMPANY}}
**Date:** {{DATE}}
**Valid Until:** {{EXPIRATION_DATE}}

---

## Executive Summary

[Open with the client's challenge. State the transformation you will deliver. Briefly describe your approach. State the investment and timeline. Close with a CTA.]

---

## Project Overview

### Scope of Work

{{PROJECT_SCOPE}}

### Key Deliverables

1. {{DELIVERABLE_1}}
2. {{DELIVERABLE_2}}
3. {{DELIVERABLE_3}}

---

## Methodology

[Describe your approach in 3–5 phases. Be specific enough to sound credible, general enough to stay flexible.]

---

## Timeline

| Phase | Duration | Target Date |
|-------|----------|-------------|
| Discovery & Kick-Off | Week 1 | {{START_DATE}} |
| Research & Analysis | Weeks 2–3 | {{PHASE_2_DATE}} |
| Development | Weeks 4–5 | {{PHASE_3_DATE}} |
| Delivery & Review | Week 6 | {{END_DATE}} |

---

## Investment

The total investment for this engagement is **{{BUDGET_RANGE}}**.

### Payment Schedule

- **50%** ({{DEPOSIT_AMOUNT}}) due upon signed agreement
- **50%** ({{FINAL_AMOUNT}}) due upon project completion

---

## Assumptions & Dependencies

- {{ASSUMPTION_1}}
- {{ASSUMPTION_2}}
- Client will provide timely access to required stakeholders and data

---

## Exclusions

The following items are **not** included in this proposal:

- {{EXCLUSION_1}}
- Implementation beyond defined deliverables
- Ongoing support post-completion (available under retainer)

---

## Terms & Acceptance

This proposal is valid until **{{EXPIRATION_DATE}}**.

| Party | Signature | Printed Name | Date |
|-------|-----------|--------------|------|
| Client | _________________ | {{CLIENT_NAME}} | _______ |
| Consultant | _________________ | {{CONSULTANT_NAME}} | _______ |
`,
  },
  {
    uri: "consultant-ai://templates/sow",
    name: "Statement of Work Template",
    description: "Professional SOW template suitable for consulting engagements of any size.",
    mimeType: "text/markdown",
    content: `# Statement of Work: {{PROJECT_TITLE}}

| Field | Details |
|-------|---------|
| **SOW Date** | {{DATE}} |
| **Project Start** | {{START_DATE}} |
| **Project End** | {{END_DATE}} |
| **Client** | {{CLIENT_COMPANY}} |
| **Consultant** | {{CONSULTANT_COMPANY}} |
| **Engagement Fee** | {{TOTAL_BUDGET}} |

---

## 1. Project Overview

{{PROJECT_DESCRIPTION}}

---

## 2. Deliverables

1. {{DELIVERABLE_1}}
2. {{DELIVERABLE_2}}
3. {{DELIVERABLE_3}}

Each deliverable is subject to **2 revision rounds**. Additional revisions available at {{HOURLY_RATE}}/hr.

---

## 3. Milestones & Schedule

| Milestone | Target Date | Payment |
|-----------|-------------|---------|
| Project Kick-Off | {{KICKOFF_DATE}} | 50% ({{DEPOSIT}}) |
| Mid-Point Review | {{MIDPOINT_DATE}} | — |
| Final Delivery | {{END_DATE}} | 50% ({{FINAL_PAYMENT}}) |

---

## 4. Out of Scope

- {{OUT_OF_SCOPE_1}}
- {{OUT_OF_SCOPE_2}}
- Implementation beyond defined deliverables
- Ongoing maintenance post-completion

Changes to scope require a written Change Order signed by both parties.

---

## 5. Success Criteria

- All deliverables submitted and accepted by Client
- Client confirms deliverables meet objectives outlined in Section 1
- Final payment received per payment terms

---

## 6. Fees & Payment

Total engagement fee: **{{TOTAL_BUDGET}}**. Per milestone schedule above. Invoices unpaid after 30 days subject to 1.5% monthly service charge.

---

## 7. Client Responsibilities

- Provide timely access to stakeholders, data, and systems
- Designate a primary point of contact
- Provide feedback within 5 business days of deliverable submission

---

## 8. Intellectual Property

Upon receipt of full payment, all work product listed as deliverables becomes sole property of {{CLIENT_COMPANY}}.

---

## 9. Confidentiality

Both parties agree to maintain confidentiality of non-public information for 2 years post-engagement.

---

## 10. Termination

Either party may terminate with 14 days written notice. Deposit is non-refundable after project start.

---

## Signatures

| | Client | Consultant |
|---|--------|------------|
| **Signature** | _____________________ | _____________________ |
| **Name** | {{CLIENT_SIGNATORY}} | {{CONSULTANT_SIGNATORY}} |
| **Title** | {{CLIENT_TITLE}} | {{CONSULTANT_TITLE}} |
| **Date** | ___________________ | ___________________ |
`,
  },
  {
    uri: "consultant-ai://templates/invoice",
    name: "Invoice Template",
    description: "Professional invoice template for consulting services.",
    mimeType: "text/markdown",
    content: `# INVOICE

**Invoice #:** {{INVOICE_NUMBER}}
**Invoice Date:** {{INVOICE_DATE}}
**Due Date:** {{DUE_DATE}}
**Project:** {{PROJECT_NAME}}

---

| Billed To | From |
|-----------|------|
| {{CLIENT_NAME}} | {{CONSULTANT_NAME}} |
| {{CLIENT_COMPANY}} | {{CONSULTANT_COMPANY}} |
| {{CLIENT_EMAIL}} | {{CONSULTANT_EMAIL}} |
| {{CLIENT_ADDRESS}} | {{CONSULTANT_ADDRESS}} |

---

## Services

| Description | Qty / Unit | Rate | Amount |
|-------------|-----------|------|--------|
| {{SERVICE_1_DESC}} | {{SERVICE_1_QTY}} hours | {{SERVICE_1_RATE}}/hr | {{SERVICE_1_TOTAL}} |
| {{SERVICE_2_DESC}} | {{SERVICE_2_QTY}} hours | {{SERVICE_2_RATE}}/hr | {{SERVICE_2_TOTAL}} |
| | | **Subtotal** | {{SUBTOTAL}} |
| | | **Tax ({{TAX_RATE}}%)** | {{TAX_AMOUNT}} |
| | | **TOTAL DUE** | **{{TOTAL}}** |

---

## Amount Due: {{TOTAL}}

Payment due by **{{DUE_DATE}}** (Net {{PAYMENT_TERMS}}).

### Payment Details

{{PAYMENT_DETAILS}}

*Please reference invoice number {{INVOICE_NUMBER}} with your payment.*

---

*Thank you for your business!*
`,
  },
  {
    uri: "consultant-ai://templates/meeting-notes",
    name: "Meeting Notes Template",
    description: "Structured meeting notes template for professional engagements.",
    mimeType: "text/markdown",
    content: `# Meeting Notes: {{MEETING_TITLE}}

**Date:** {{DATE}}
**Time:** {{TIME}}
**Duration:** {{DURATION}}
**Location/Platform:** {{LOCATION}}

## Attendees

| Name | Company | Role |
|------|---------|------|
| {{ATTENDEE_1}} | {{COMPANY_1}} | {{ROLE_1}} |
| {{ATTENDEE_2}} | {{COMPANY_2}} | {{ROLE_2}} |

---

## Agenda

1. {{AGENDA_ITEM_1}}
2. {{AGENDA_ITEM_2}}
3. {{AGENDA_ITEM_3}}

---

## Discussion Notes

### {{TOPIC_1}}

{{NOTES_1}}

### {{TOPIC_2}}

{{NOTES_2}}

---

## Key Decisions

- [ ] {{DECISION_1}}
- [ ] {{DECISION_2}}

---

## Action Items

| Action Item | Owner | Due Date | Status |
|-------------|-------|----------|--------|
| {{ACTION_1}} | {{OWNER_1}} | {{DUE_1}} | ⬜ Open |
| {{ACTION_2}} | {{OWNER_2}} | {{DUE_2}} | ⬜ Open |

---

## Next Meeting

**Date:** {{NEXT_DATE}}
**Purpose:** {{NEXT_PURPOSE}}

---

*Notes prepared by {{PREPARER}} · {{DATE}}*
`,
  },
  {
    uri: "consultant-ai://templates/weekly-report",
    name: "Weekly Report Template",
    description: "Weekly status report template for ongoing consulting engagements.",
    mimeType: "text/markdown",
    content: `# Weekly Report: {{CONSULTANT_NAME}}

**Week of:** {{WEEK_START}} – {{WEEK_END}}
**Report Date:** {{DATE}}

---

## At a Glance

| Metric | Value |
|--------|-------|
| Total Hours | {{TOTAL_HOURS}}h |
| Billable Hours | {{BILLABLE_HOURS}}h |
| Utilization | {{UTILIZATION}}% |
| Active Clients | {{ACTIVE_CLIENTS}} |

---

## Client Updates

### {{CLIENT_1}} — {{PROJECT_1}} 🟢

**Hours:** {{HOURS_1}}h

**Accomplishments:**
- {{ACCOMPLISHMENT_1_1}}
- {{ACCOMPLISHMENT_1_2}}

**Next Steps:**
- {{NEXT_1_1}}

---

### {{CLIENT_2}} — {{PROJECT_2}} 🟢

**Hours:** {{HOURS_2}}h

**Accomplishments:**
- {{ACCOMPLISHMENT_2_1}}

**Next Steps:**
- {{NEXT_2_1}}

---

## Wins This Week 🏆

- {{WIN_1}}
- {{WIN_2}}

---

## Next Week Priorities

1. {{PRIORITY_1}}
2. {{PRIORITY_2}}
3. {{PRIORITY_3}}

---

## Business Development

- {{BD_1}}
- {{BD_2}}

---

*Weekly report · consultant-ai · thewedgemethodai.com*
`,
  },
  {
    uri: "consultant-ai://templates/project-status",
    name: "Project Status Update Template",
    description: "Client-facing project status update template.",
    mimeType: "text/markdown",
    content: `# Project Status Update: {{PROJECT_NAME}}

| Field | Value |
|-------|-------|
| **Client** | {{CLIENT_NAME}} |
| **Prepared By** | {{CONSULTANT_NAME}} |
| **Date** | {{DATE}} |
| **Period** | {{REPORTING_PERIOD}} |
| **Status** | 🟢 On Track |

---

## Executive Summary

{{EXECUTIVE_SUMMARY}}

---

## Milestone Status

| Milestone | Status | Due Date | Progress |
|-----------|--------|----------|----------|
| {{MILESTONE_1}} | ✅ Completed | {{DATE_1}} | 100% |
| {{MILESTONE_2}} | 🔄 In Progress | {{DATE_2}} | {{PERCENT_2}}% |
| {{MILESTONE_3}} | ⬜ Upcoming | {{DATE_3}} | 0% |

---

## Accomplishments This Period

- {{ACCOMPLISHMENT_1}}
- {{ACCOMPLISHMENT_2}}
- {{ACCOMPLISHMENT_3}}

---

## Next Steps

- {{NEXT_1}}
- {{NEXT_2}}
- {{NEXT_3}}

---

## Decisions Required

- [ ] {{DECISION_1}}

---

Questions? Reply to this update or book time: [calendar link]
`,
  },
];

/**
 * Get a template resource by URI.
 */
export function getTemplate(uri: string): TemplateResource | undefined {
  return TEMPLATE_RESOURCES.find((t) => t.uri === uri);
}

/**
 * Get all template resource URIs.
 */
export function getTemplateURIs(): string[] {
  return TEMPLATE_RESOURCES.map((t) => t.uri);
}
