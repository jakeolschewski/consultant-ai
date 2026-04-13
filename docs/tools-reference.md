# Tools Reference

Complete documentation for all 10 consultant-ai MCP tools.

---

## generate_proposal

Generate a complete consulting proposal in Markdown format.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `clientName` | string | ✓ | Client's full name |
| `clientCompany` | string | | Client's company name |
| `projectTitle` | string | ✓ | Title of the engagement |
| `projectScope` | string | ✓ | Description of what the project will cover (min 10 chars) |
| `deliverables` | string[] | ✓ | Array of specific deliverables (at least 1) |
| `budgetMin` | number | ✓ | Minimum budget in USD |
| `budgetMax` | number | ✓ | Maximum budget in USD |
| `timelineWeeks` | number | ✓ | Project duration in weeks |
| `consultantName` | string | ✓ | Your full name |
| `consultantCompany` | string | | Your firm name |
| `consultantEmail` | string | | Your email address |
| `methodology` | string | | Custom methodology description |
| `assumptions` | string[] | | Project assumptions |
| `exclusions` | string[] | | Explicit exclusions from scope |
| `paymentTerms` | enum | | Payment structure: `50/50`, `monthly`, `milestone`, `net-30`, `upfront` (default: `50/50`) |

### Example

```json
{
  "clientName": "Sarah Chen",
  "clientCompany": "Acme Corp",
  "projectTitle": "Digital Transformation Strategy",
  "projectScope": "Assess current digital maturity, identify gaps, and develop a 12-month transformation roadmap.",
  "deliverables": [
    "Digital maturity assessment report",
    "Gap analysis with prioritized recommendations",
    "12-month transformation roadmap",
    "Executive presentation"
  ],
  "budgetMin": 18000,
  "budgetMax": 22000,
  "timelineWeeks": 8,
  "consultantName": "Alex Rivera",
  "consultantEmail": "alex@stratconsult.com",
  "paymentTerms": "50/50"
}
```

---

## research_client

Generate a structured pre-meeting client research brief.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `companyName` | string | ✓ | Company to research |
| `companyDomain` | string | | Company website domain |
| `industry` | string | | Company's industry |
| `meetingPurpose` | enum | | `sales`, `discovery`, `pitch`, `renewal`, `general` (default: `discovery`) |
| `knownContext` | string | | Any context you already know |
| `contactName` | string | | Primary contact's name |
| `contactTitle` | string | | Primary contact's title |

---

## prepare_meeting

Generate a meeting preparation kit with agenda, questions, and follow-up template.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `clientName` | string | ✓ | Client's name |
| `clientCompany` | string | | Client's company |
| `meetingType` | enum | | `discovery`, `review`, `pitch`, `kickoff`, `check-in`, `retrospective`, `proposal-presentation`, `onboarding` (default: `discovery`) |
| `meetingDate` | string | | Date of meeting |
| `durationMinutes` | number | | Meeting duration (default: 60) |
| `attendees` | string[] | | List of attendees |
| `context` | string | | Context or background for meeting |
| `goals` | string[] | | Your specific goals for this meeting |

---

## generate_invoice

Generate a professional invoice in Markdown.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `clientName` | string | ✓ | Client's name |
| `clientCompany` | string | | Client company |
| `clientEmail` | string | | Client email |
| `clientAddress` | string | | Client address |
| `consultantName` | string | ✓ | Your name |
| `consultantCompany` | string | | Your firm |
| `consultantEmail` | string | | Your email |
| `lineItems` | object[] | ✓ | Array of line items (see below) |
| `taxRate` | number | | Tax rate as percentage (default: 0) |
| `discount` | number | | Discount amount in dollars (default: 0) |
| `paymentTermsDays` | number | | Days until due (default: 30) |
| `invoiceNumber` | string | | Custom invoice number (auto-generated if omitted) |
| `projectName` | string | | Project reference |
| `memo` | string | | Notes or memo |
| `bankDetails` | string | | Payment instructions |

#### Line Item Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | ✓ | Service description |
| `quantity` | number | ✓ | Hours, days, or units |
| `unit` | string | | Unit label (default: "hours") |
| `rate` | number | ✓ | Rate per unit in USD |

---

## generate_sow

Generate a Statement of Work with full legal structure.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectTitle` | string | ✓ | Project title |
| `clientName` | string | ✓ | Client name |
| `clientCompany` | string | | Client company |
| `consultantName` | string | ✓ | Your name |
| `consultantCompany` | string | | Your firm |
| `projectDescription` | string | ✓ | Detailed project description (min 20 chars) |
| `durationWeeks` | number | ✓ | Project duration in weeks |
| `totalBudget` | number | ✓ | Total engagement fee |
| `deliverables` | string[] | ✓ | List of deliverables |
| `milestones` | object[] | | Custom milestones (auto-generated if omitted) |
| `outOfScope` | string[] | | Items explicitly excluded |
| `successCriteria` | string[] | | Project success criteria |
| `revisionRounds` | number | | Number of revision rounds (default: 2) |
| `governingLaw` | string | | Governing jurisdiction (default: "State of Delaware") |
| `includeNDA` | boolean | | Whether to include NDA clause (default: false) |

---

## draft_follow_up

Generate a professional post-meeting follow-up email and meeting notes.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `clientName` | string | ✓ | Client's name |
| `consultantName` | string | ✓ | Your name |
| `keyTopics` | string[] | ✓ | Key topics discussed |
| `actionItems` | object[] | ✓ | Action items (see below) |
| `clientEmail` | string | | Client email (for To: field) |
| `clientCompany` | string | | Client company |
| `meetingType` | string | | Type of meeting |
| `meetingDate` | string | | Date of meeting |
| `decisions` | string[] | | Decisions made |
| `nextMeeting` | string | | Next meeting info |
| `additionalNotes` | string | | Extra notes |
| `tone` | enum | | `formal`, `professional`, `friendly` (default: `professional`) |

#### Action Item Object

| Field | Type | Required |
|-------|------|----------|
| `description` | string | ✓ |
| `owner` | enum | | `consultant`, `client`, `both` (default: `consultant`) |
| `dueDate` | string | |

---

## analyze_competition

Generate a competitive landscape analysis with SWOT and positioning recommendations.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `industry` | string | ✓ | Industry or niche to analyze |
| `clientCompany` | string | | Company being analyzed |
| `analysisFor` | enum | | `client-advisory` or `own-practice` (default: `client-advisory`) |
| `competitors` | object[] | | Known competitors (auto-populated if omitted) |
| `yourStrengths` | string[] | | Competitive strengths |
| `targetSegment` | string | | Target customer segment |
| `geographicFocus` | string | | Geographic scope |
| `additionalContext` | string | | Additional context |

---

## track_time

Log time entries and generate time reports.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `action` | enum | ✓ | `log` or `report` |
| **For `log` action:** | | | |
| `client` | string | ✓ (log) | Client name |
| `project` | string | ✓ (log) | Project name |
| `description` | string | ✓ (log) | Description of work |
| `minutes` | number | | Minutes worked |
| `hours` | number | | Hours worked (alternative to minutes) |
| `hourlyRate` | number | | Billable rate for this entry |
| `billable` | boolean | | Whether billable (default: true) |
| `date` | string | | Date of work (default: today) |
| `tags` | string[] | | Optional tags |
| **For `report` action:** | | | |
| `reportType` | enum | | `weekly`, `monthly`, `by-client`, `all-time`, `custom` (default: `weekly`) |
| `startDate` | string | | Start date for custom reports |
| `endDate` | string | | End date for custom reports |
| `filterClient` | string | | Filter by client name |
| `filterProject` | string | | Filter by project |

### Storage

Time entries are persisted to `~/.consultant-ai/timesheet.json`.

---

## generate_project_status

Generate a client-ready project status update.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectName` | string | ✓ | Project name |
| `clientName` | string | ✓ | Client name |
| `consultantName` | string | ✓ | Your name |
| `milestones` | object[] | ✓ | Project milestones |
| `accomplishments` | string[] | ✓ | Accomplishments this period |
| `nextSteps` | string[] | ✓ | Next steps |
| `overallStatus` | enum | | `on-track`, `at-risk`, `delayed`, `completed`, `on-hold` (default: `on-track`) |
| `clientCompany` | string | | Client company |
| `reportingPeriod` | string | | Period this report covers |
| `executiveSummary` | string | | Custom exec summary |
| `blockers` | string[] | | Current blockers |
| `risks` | object[] | | Risk items |
| `budgetSpent` | number | | Budget spent to date |
| `budgetTotal` | number | | Total budget |
| `hoursLogged` | number | | Hours logged |
| `hoursTotal` | number | | Total hours in scope |
| `decisions` | string[] | | Decisions required |

#### Milestone Object

| Field | Type | Required |
|-------|------|----------|
| `name` | string | ✓ |
| `status` | enum | ✓ | `completed`, `in-progress`, `upcoming`, `at-risk`, `blocked` |
| `dueDate` | string | |
| `completionPercent` | number | |
| `notes` | string | |

---

## generate_weekly_report

Compile a weekly activity report for your consulting practice.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `consultantName` | string | ✓ | Your name |
| `clientActivities` | object[] | ✓ | Activities per client |
| `nextWeekPriorities` | string[] | ✓ | Priorities for next week |
| `weekOf` | string | | Date for the week (default: current week) |
| `businessDevelopment` | string[] | | BD activities |
| `adminAndOps` | string[] | | Admin activities |
| `wins` | string[] | | Wins this week |
| `challenges` | string[] | | Challenges faced |
| `totalHours` | number | | Total hours worked |
| `billableHours` | number | | Billable hours |
| `revenue` | number | | Revenue/invoiced this week |
| `learnings` | string[] | | Learnings or growth items |
| `personalNotes` | string | | Private notes |
| `audience` | enum | | `internal`, `client-facing`, `team` (default: `internal`) |

#### Client Activity Object

| Field | Type | Required |
|-------|------|----------|
| `clientName` | string | ✓ |
| `projectName` | string | |
| `hoursSpent` | number | |
| `accomplishments` | string[] | ✓ |
| `nextSteps` | string[] | |
| `status` | enum | | `on-track`, `at-risk`, `delayed`, `completed`, `on-hold` |

---

*Tools reference for consultant-ai v1.0.0 · [GitHub](https://github.com/jakeolschewski/consultant-ai)*
