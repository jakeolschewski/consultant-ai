/**
 * Example: Generate a weekly activity report
 *
 * This example demonstrates generating both an internal weekly report
 * and a client-facing status update.
 *
 * Run with:
 *   npx tsx examples/weekly-report.ts
 */

import { generateWeeklyReport } from "../src/tools/weekly-report.js";
import { generateProjectStatus } from "../src/tools/project-status.js";
import { handleTimeTracker } from "../src/tools/time-tracker.js";

// Internal weekly report
const weeklyReport = generateWeeklyReport({
  consultantName: "Jordan Blake",
  weekOf: "2025-06-02",
  clientActivities: [
    {
      clientName: "Acme Corp",
      projectName: "Operations Overhaul",
      hoursSpent: 14.5,
      status: "on-track",
      accomplishments: [
        "Completed process mapping for order fulfillment workflow",
        "Conducted 4 stakeholder interviews across ops, sales, and support",
        "Identified 3 high-priority bottlenecks with estimated time savings",
      ],
      nextSteps: [
        "Draft bottleneck analysis report (due Thursday)",
        "Schedule executive presentation for week of June 16",
      ],
    },
    {
      clientName: "NovaTech Industries",
      projectName: "Go-to-Market Strategy",
      hoursSpent: 8,
      status: "at-risk",
      accomplishments: [
        "Completed competitive landscape research for 8 direct competitors",
        "Defined 3 potential ICP segments with sizing estimates",
      ],
      nextSteps: [
        "ICP validation interviews — need client to schedule by Friday",
        "Positioning workshop — pending stakeholder availability",
      ],
    },
  ],
  wins: [
    "Acme Corp stakeholder interviews were extremely productive — strong alignment on problem definition",
    "NovaTech expanded scope to include channel strategy (Change Order sent)",
  ],
  challenges: [
    "NovaTech scheduling delays threatening week 5 milestone — escalated to project sponsor",
  ],
  businessDevelopment: [
    "Follow-up call with Pinnacle Health — sent proposal, awaiting decision",
    "Referral intro from Acme Corp to their sister company (meeting scheduled 6/10)",
    "Published LinkedIn post on process mapping — 340 likes, 12 comments",
  ],
  adminAndOps: [
    "Invoiced Acme Corp for milestone 1 ($11,000)",
    "Updated SOW for NovaTech scope expansion",
    "Renewed professional liability insurance",
  ],
  nextWeekPriorities: [
    "Deliver Acme Corp bottleneck analysis report",
    "Run NovaTech ICP validation interviews (if scheduling resolves)",
    "Follow up with Pinnacle Health on proposal decision",
  ],
  totalHours: 45,
  billableHours: 38,
  revenue: 11000,
  learnings: [
    "Stakeholder interviews: starting with 'walk me through your day' is more productive than jumping straight to problem discovery",
  ],
  audience: "internal",
});

console.log("=== INTERNAL WEEKLY REPORT ===\n");
console.log(weeklyReport);

console.log("\n\n=== CLIENT-FACING STATUS UPDATE ===\n");

// Client-facing project status
const statusUpdate = generateProjectStatus({
  projectName: "Operations Overhaul",
  clientName: "Sarah Chen",
  clientCompany: "Acme Corp",
  consultantName: "Jordan Blake",
  overallStatus: "on-track",
  reportingPeriod: "Week of June 2–6, 2025",
  executiveSummary:
    "The project is on track for the week 8 delivery. This week we completed stakeholder interviews and identified three high-priority operational bottlenecks. The bottleneck analysis report will be delivered Thursday of next week as planned.",
  milestones: [
    {
      name: "Project Kick-Off",
      status: "completed",
      dueDate: "May 12, 2025",
      completionPercent: 100,
      notes: "Completed on schedule",
    },
    {
      name: "Process Discovery & Interviews",
      status: "completed",
      dueDate: "June 6, 2025",
      completionPercent: 100,
      notes: "All 4 stakeholder interviews complete",
    },
    {
      name: "Bottleneck Analysis Report",
      status: "in-progress",
      dueDate: "June 12, 2025",
      completionPercent: 40,
      notes: "On track for Thursday delivery",
    },
    {
      name: "Recommendations & Roadmap",
      status: "upcoming",
      dueDate: "June 26, 2025",
      completionPercent: 0,
    },
    {
      name: "Executive Presentation",
      status: "upcoming",
      dueDate: "July 3, 2025",
      completionPercent: 0,
    },
  ],
  accomplishments: [
    "Completed all 4 cross-functional stakeholder interviews",
    "Mapped current-state order fulfillment workflow end-to-end",
    "Identified 3 high-priority bottlenecks: order routing, approval delays, inventory sync",
  ],
  nextSteps: [
    "Deliver bottleneck analysis report with time-savings estimates (June 12)",
    "Quantify cost of identified bottlenecks for executive presentation",
    "Schedule recommendations walkthrough (week of June 16)",
  ],
  hoursLogged: 22.5,
  hoursTotal: 80,
  budgetSpent: 9000,
  budgetTotal: 32000,
});

console.log(statusUpdate);

// Example: View time report
console.log("\n\n=== TIME REPORT (CURRENT WEEK) ===\n");
handleTimeTracker({
  action: "report",
  reportType: "all-time",
}).then(console.log);
