/**
 * Weekly Report Tool
 * Compiles a professional weekly activity report for consulting practices.
 */

import { z } from "zod";
import {
  h1,
  h2,
  h3,
  bold,
  ul,
  ol,
  table,
  sections,
  hr,
  currency,
} from "../utils/markdown.js";
import {
  formatLongDate,
  startOfWeek,
  endOfWeek,
} from "../utils/date.js";

const clientActivitySchema = z.object({
  clientName: z.string().min(1),
  projectName: z.string().optional(),
  hoursSpent: z.number().positive().optional(),
  accomplishments: z.array(z.string()).min(1),
  nextSteps: z.array(z.string()).optional(),
  status: z
    .enum(["on-track", "at-risk", "delayed", "completed", "on-hold"])
    .optional()
    .default("on-track"),
});

export const weeklyReportSchema = z.object({
  consultantName: z.string().min(1, "Consultant name is required"),
  weekOf: z.string().optional(),
  clientActivities: z.array(clientActivitySchema).min(1, "At least one client activity is required"),
  businessDevelopment: z.array(z.string()).optional(),
  adminAndOps: z.array(z.string()).optional(),
  wins: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
  nextWeekPriorities: z.array(z.string()).min(1, "At least one priority for next week is required"),
  totalHours: z.number().positive().optional(),
  billableHours: z.number().positive().optional(),
  revenue: z.number().positive().optional(),
  learnings: z.array(z.string()).optional(),
  personalNotes: z.string().optional(),
  audience: z.enum(["internal", "client-facing", "team"]).optional().default("internal"),
});

export type WeeklyReportInput = z.infer<typeof weeklyReportSchema>;

const statusIcon: Record<string, string> = {
  "on-track": "🟢",
  "at-risk": "🟡",
  delayed: "🔴",
  completed: "✅",
  "on-hold": "⏸️",
};

export function generateWeeklyReport(input: WeeklyReportInput): string {
  const today = new Date();
  const weekStart = input.weekOf
    ? startOfWeek(new Date(input.weekOf))
    : startOfWeek(today);
  const weekEnd = endOfWeek(weekStart);

  const weekLabel = `${formatLongDate(weekStart)} – ${formatLongDate(weekEnd)}`;
  const isInternal = input.audience === "internal";

  // Calculate time summary
  const totalClientHours = input.clientActivities
    .filter((c) => c.hoursSpent)
    .reduce((sum, c) => sum + (c.hoursSpent || 0), 0);

  const totalHours = input.totalHours || totalClientHours;
  const billableHours = input.billableHours || totalClientHours;
  const utilization =
    totalHours > 0 ? Math.round((billableHours / totalHours) * 100) : 0;

  const reportTitle = input.audience === "client-facing"
    ? `Weekly Update: ${input.clientActivities[0]?.clientName}`
    : `Weekly Report: ${input.consultantName}`;

  // Build time summary section for internal reports
  const timeSummaryRows: string[][] = input.clientActivities
    .filter((c) => c.hoursSpent)
    .map((c) => [
      c.clientName,
      c.projectName || "General",
      `${c.hoursSpent?.toFixed(1)}h`,
      `${statusIcon[c.status]} ${c.status.replace("-", " ")}`,
    ]);

  const clientSections = input.clientActivities
    .map((activity) => {
      const statusDisplay = `${statusIcon[activity.status]} ${activity.status.replace("-", " ")}`;
      return sections(
        h3(
          `${activity.clientName}${activity.projectName ? ` — ${activity.projectName}` : ""} ${statusDisplay}`
        ),
        activity.hoursSpent
          ? `${bold("Hours this week:")} ${activity.hoursSpent.toFixed(1)}h\n\n`
          : "",
        `${bold("Accomplishments:")}\n${ul(activity.accomplishments)}\n`,
        activity.nextSteps?.length
          ? `${bold("Next steps:")}\n${ul(activity.nextSteps)}\n`
          : ""
      );
    })
    .join("\n");

  return sections(
    h1(reportTitle),
    `${bold("Week of:")} ${weekLabel}  \n${bold("Prepared by:")} ${input.consultantName}  \n${bold("Report Date:")} ${formatLongDate(today)}  \n${input.audience !== "internal" ? "" : `${bold("Audience:")} Internal\n`}`,
    "\n",
    hr(),
    "\n",
    isInternal
      ? `${h2("At a Glance")}\n${table(
          ["Metric", "Value"],
          [
            [bold("Total Hours"), `${totalHours.toFixed(1)}h`],
            [bold("Billable Hours"), `${billableHours.toFixed(1)}h`],
            [bold("Utilization"), `${utilization}%`],
            ...(input.revenue ? [[bold("Revenue / Invoiced"), currency(input.revenue)]] : []),
            [bold("Active Clients"), String(input.clientActivities.length)],
          ]
        )}\n\n${timeSummaryRows.length > 0 ? `${h3("Time by Client")}\n${table(["Client", "Project", "Hours", "Status"], timeSummaryRows)}\n\n` : ""}`
      : "",
    h2("Client Updates"),
    clientSections,
    "\n",
    input.wins?.length
      ? `${h2("Wins This Week 🏆")}\n${ul(input.wins)}\n\n`
      : "",
    input.challenges?.length
      ? `${h2("Challenges & Lessons")}\n${ul(input.challenges)}\n\n`
      : "",
    isInternal && input.businessDevelopment?.length
      ? `${h2("Business Development")}\n${ul(input.businessDevelopment)}\n\n`
      : "",
    isInternal && input.adminAndOps?.length
      ? `${h2("Admin & Operations")}\n${ul(input.adminAndOps)}\n\n`
      : "",
    h2("Next Week Priorities"),
    ol(input.nextWeekPriorities),
    "\n",
    isInternal && input.learnings?.length
      ? `${h2("Learnings & Growth")}\n${ul(input.learnings)}\n\n`
      : "",
    isInternal && input.personalNotes
      ? `${h2("Personal Notes")}\n${input.personalNotes}\n\n`
      : "",
    hr(),
    `\n*Weekly report for ${weekLabel} · consultant-ai · thewedgemethodai.com*\n`
  );
}
