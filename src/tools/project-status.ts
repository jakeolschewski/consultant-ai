/**
 * Project Status Tool
 * Generates a professional project status update for clients.
 */

import { z } from "zod";
import {
  h1,
  h2,
  h3,
  bold,
  ul,
  table,
  sections,
  hr,
} from "../utils/markdown.js";
import { formatLongDate } from "../utils/date.js";

const milestoneSchema = z.object({
  name: z.string().min(1),
  dueDate: z.string().optional(),
  status: z.enum(["completed", "in-progress", "upcoming", "at-risk", "blocked"]),
  completionPercent: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
});

const riskyItemSchema = z.object({
  risk: z.string().min(1),
  impact: z.enum(["low", "medium", "high", "critical"]),
  mitigation: z.string().optional(),
});

export const projectStatusSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientCompany: z.string().optional(),
  consultantName: z.string().min(1, "Consultant name is required"),
  reportingPeriod: z.string().optional(),
  overallStatus: z
    .enum(["on-track", "at-risk", "delayed", "completed", "on-hold"])
    .default("on-track"),
  executiveSummary: z.string().optional(),
  milestones: z
    .array(milestoneSchema)
    .min(1, "At least one milestone is required"),
  accomplishments: z.array(z.string()).min(1, "At least one accomplishment is required"),
  nextSteps: z.array(z.string()).min(1, "At least one next step is required"),
  blockers: z.array(z.string()).optional(),
  risks: z.array(riskyItemSchema).optional(),
  budgetSpent: z.number().min(0).optional(),
  budgetTotal: z.number().positive().optional(),
  hoursLogged: z.number().positive().optional(),
  hoursTotal: z.number().positive().optional(),
  decisions: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional(),
});

export type ProjectStatusInput = z.infer<typeof projectStatusSchema>;

const statusEmoji: Record<string, string> = {
  "on-track": "🟢",
  "at-risk": "🟡",
  delayed: "🔴",
  completed: "✅",
  "on-hold": "⏸️",
};

const milestoneStatusEmoji: Record<string, string> = {
  completed: "✅",
  "in-progress": "🔄",
  upcoming: "⬜",
  "at-risk": "🟡",
  blocked: "🔴",
};

const impactColor: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "**Critical**",
};

export function generateProjectStatus(input: ProjectStatusInput): string {
  const today = formatLongDate();
  const clientDisplay = input.clientCompany
    ? `${input.clientName} (${input.clientCompany})`
    : input.clientName;

  const statusLabel =
    input.overallStatus.charAt(0).toUpperCase() +
    input.overallStatus.slice(1).replace("-", " ");

  const overallStatusDisplay = `${statusEmoji[input.overallStatus]} ${bold(statusLabel)}`;

  const reportingPeriod =
    input.reportingPeriod || `Week of ${today}`;

  // Budget metrics
  let budgetSection = "";
  if (input.budgetTotal && input.budgetSpent !== undefined) {
    const budgetPercent = Math.round((input.budgetSpent / input.budgetTotal) * 100);
    const budgetBar = buildProgressBar(budgetPercent);
    budgetSection = `${h3("Budget")}\n${budgetBar} ${budgetPercent}% utilized  \n${bold("Spent:")} $${input.budgetSpent.toLocaleString()} / $${input.budgetTotal.toLocaleString()}\n\n`;
  }

  let hoursSection = "";
  if (input.hoursTotal && input.hoursLogged !== undefined) {
    const hoursPercent = Math.round((input.hoursLogged / input.hoursTotal) * 100);
    const hoursBar = buildProgressBar(hoursPercent);
    hoursSection = `${h3("Hours")}\n${hoursBar} ${hoursPercent}% utilized  \n${bold("Logged:")} ${input.hoursLogged}h / ${input.hoursTotal}h\n\n`;
  }

  const executiveSummary =
    input.executiveSummary ||
    `This status report covers ${reportingPeriod}. Overall, the project is ${statusLabel.toLowerCase()}. Key accomplishments this period include completing ${input.accomplishments.length > 0 ? input.accomplishments[0].toLowerCase() : "key milestones"}. The team is focused on ${input.nextSteps[0]?.toLowerCase() || "upcoming deliverables"} for the coming period.`;

  return sections(
    h1(`Project Status Update: ${input.projectName}`),
    "\n",
    table(
      ["Field", "Value"],
      [
        [bold("Client"), clientDisplay],
        [bold("Prepared By"), input.consultantName],
        [bold("Report Date"), today],
        [bold("Reporting Period"), reportingPeriod],
        [bold("Overall Status"), overallStatusDisplay],
      ]
    ),
    "\n",
    hr(),
    "\n",
    h2("Executive Summary"),
    `${executiveSummary}\n`,
    "\n",
    h2("Milestone Status"),
    table(
      ["Milestone", "Status", "Due Date", "Progress", "Notes"],
      input.milestones.map((m) => [
        m.name,
        `${milestoneStatusEmoji[m.status]} ${m.status.replace("-", " ")}`,
        m.dueDate || "—",
        m.completionPercent !== undefined ? `${m.completionPercent}%` : "—",
        m.notes || "—",
      ])
    ),
    "\n",
    h2("Accomplishments This Period"),
    ul(input.accomplishments),
    "\n",
    h2("Next Steps"),
    ul(input.nextSteps),
    "\n",
    input.blockers?.length
      ? `${h2("Blockers & Issues")}\n${ul(input.blockers)}\n\n`
      : "",
    input.risks?.length
      ? `${h2("Risks")}\n${table(
          ["Risk", "Impact", "Mitigation"],
          input.risks.map((r) => [
            r.risk,
            impactColor[r.impact],
            r.mitigation || "_[Define mitigation]_",
          ])
        )}\n\n`
      : "",
    budgetSection || hoursSection
      ? `${h2("Resource Utilization")}\n${budgetSection}${hoursSection}`
      : "",
    input.decisions?.length
      ? `${h2("Decisions Required")}\n${ul(input.decisions)}\n\n`
      : "",
    input.attachments?.length
      ? `${h2("Attachments")}\n${ul(input.attachments)}\n\n`
      : "",
    hr(),
    `\n${bold("Questions?")} Reply to this update or schedule time at [calendar link].\n\n*Generated by consultant-ai · thewedgemethodai.com*\n`
  );
}

function buildProgressBar(percent: number): string {
  const filled = Math.round(percent / 10);
  const empty = 10 - filled;
  return `[${"█".repeat(filled)}${"░".repeat(empty)}]`;
}
