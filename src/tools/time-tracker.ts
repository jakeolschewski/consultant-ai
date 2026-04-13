/**
 * Time Tracker Tool
 * Log time entries and generate time reports.
 * Persists data to ~/.consultant-ai/timesheet.json
 */

import { z } from "zod";
import { promises as fs } from "fs";
import { join } from "path";
import { homedir } from "os";
import {
  h1,
  h2,
  bold,
  table,
  sections,
  hr,
  currency,
} from "../utils/markdown.js";
import {
  formatLongDate,
  formatISODate,
  formatShortDate,
  formatDecimalHours,
  startOfWeek,
  endOfWeek,
} from "../utils/date.js";

export interface TimeEntry {
  id: string;
  date: string; // ISO date string
  client: string;
  project: string;
  description: string;
  minutes: number;
  hourlyRate?: number;
  billable: boolean;
  tags?: string[];
  createdAt: string;
}

export interface Timesheet {
  entries: TimeEntry[];
  version: string;
}

export const timeTrackerSchema = z.object({
  action: z.enum(["log", "report"]),
  // For "log" action
  client: z.string().optional(),
  project: z.string().optional(),
  description: z.string().optional(),
  minutes: z.number().int().positive().optional(),
  hours: z.number().positive().optional(),
  hourlyRate: z.number().positive().optional(),
  billable: z.boolean().optional().default(true),
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
  // For "report" action
  reportType: z
    .enum(["weekly", "monthly", "by-client", "all-time", "custom"])
    .optional()
    .default("weekly"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  filterClient: z.string().optional(),
  filterProject: z.string().optional(),
});

export type TimeTrackerInput = z.infer<typeof timeTrackerSchema>;

const TIMESHEET_DIR = join(homedir(), ".consultant-ai");
const TIMESHEET_PATH = join(TIMESHEET_DIR, "timesheet.json");

async function ensureTimesheetDir(): Promise<void> {
  await fs.mkdir(TIMESHEET_DIR, { recursive: true });
}

async function loadTimesheet(): Promise<Timesheet> {
  try {
    const data = await fs.readFile(TIMESHEET_PATH, "utf-8");
    return JSON.parse(data) as Timesheet;
  } catch {
    return { entries: [], version: "1.0.0" };
  }
}

async function saveTimesheet(sheet: Timesheet): Promise<void> {
  await ensureTimesheetDir();
  await fs.writeFile(TIMESHEET_PATH, JSON.stringify(sheet, null, 2), "utf-8");
}

function generateId(): string {
  return `te_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

function filterEntries(
  entries: TimeEntry[],
  options: {
    startDate?: Date;
    endDate?: Date;
    client?: string;
    project?: string;
  }
): TimeEntry[] {
  return entries.filter((entry) => {
    const entryDate = new Date(entry.date);
    if (options.startDate && entryDate < options.startDate) {
      return false;
    }
    if (options.endDate && entryDate > options.endDate) {
      return false;
    }
    if (
      options.client &&
      !entry.client.toLowerCase().includes(options.client.toLowerCase())
    ) {
      return false;
    }
    if (
      options.project &&
      !entry.project.toLowerCase().includes(options.project.toLowerCase())
    ) {
      return false;
    }
    return true;
  });
}

function buildReport(
  entries: TimeEntry[],
  title: string,
  periodLabel: string
): string {
  if (entries.length === 0) {
    return sections(
      h1(title),
      `${bold("Period:")} ${periodLabel}\n`,
      "\n",
      "_No time entries found for this period._\n"
    );
  }

  const totalMinutes = entries.reduce((sum, e) => sum + e.minutes, 0);
  const billableMinutes = entries
    .filter((e) => e.billable)
    .reduce((sum, e) => sum + e.minutes, 0);
  const totalHours = totalMinutes / 60;
  const billableHours = billableMinutes / 60;

  // Group by client
  const byClient = new Map<string, TimeEntry[]>();
  for (const entry of entries) {
    const existing = byClient.get(entry.client) || [];
    existing.push(entry);
    byClient.set(entry.client, existing);
  }

  const totalBillableAmount = entries
    .filter((e) => e.billable && e.hourlyRate)
    .reduce((sum, e) => sum + (e.minutes / 60) * (e.hourlyRate || 0), 0);

  const summaryRows: string[][] = [];
  byClient.forEach((clientEntries, clientName) => {
    const clientMinutes = clientEntries.reduce((s, e) => s + e.minutes, 0);
    const clientBillable = clientEntries
      .filter((e) => e.billable)
      .reduce((s, e) => s + e.minutes, 0);
    const clientAmount = clientEntries
      .filter((e) => e.billable && e.hourlyRate)
      .reduce((s, e) => s + (e.minutes / 60) * (e.hourlyRate || 0), 0);

    summaryRows.push([
      clientName,
      `${formatDecimalHours(clientMinutes)}h`,
      `${formatDecimalHours(clientBillable)}h`,
      clientAmount > 0 ? currency(clientAmount) : "—",
    ]);
  });

  const entryRows = [...entries]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((entry) => [
      formatShortDate(new Date(entry.date)),
      entry.client,
      entry.project,
      entry.description.length > 50
        ? entry.description.substring(0, 47) + "..."
        : entry.description,
      `${formatDecimalHours(entry.minutes)}h`,
      entry.billable ? "✓" : "—",
      entry.hourlyRate
        ? currency((entry.minutes / 60) * entry.hourlyRate)
        : "—",
    ]);

  return sections(
    h1(title),
    `${bold("Period:")} ${periodLabel}  \n${bold("Generated:")} ${formatLongDate()}\n`,
    "\n",
    hr(),
    "\n",
    h2("Summary"),
    table(
      ["Metric", "Value"],
      [
        [bold("Total Hours"), `${totalHours.toFixed(2)}h`],
        [bold("Billable Hours"), `${billableHours.toFixed(2)}h`],
        [bold("Non-Billable Hours"), `${(totalHours - billableHours).toFixed(2)}h`],
        [
          bold("Billable %"),
          `${totalMinutes > 0 ? Math.round((billableMinutes / totalMinutes) * 100) : 0}%`,
        ],
        [
          bold("Total Billable Amount"),
          totalBillableAmount > 0 ? currency(totalBillableAmount) : "N/A (rates not set)",
        ],
        [bold("Total Entries"), String(entries.length)],
      ]
    ),
    "\n",
    h2("By Client"),
    table(
      ["Client", "Total Hours", "Billable Hours", "Amount"],
      summaryRows
    ),
    "\n",
    h2("Time Entries"),
    table(
      ["Date", "Client", "Project", "Description", "Hours", "Billable", "Amount"],
      entryRows
    ),
    "\n",
    hr(),
    `\n*Time data stored at: \`${TIMESHEET_PATH}\`*\n*Generated by consultant-ai · thewedgemethodai.com*\n`
  );
}

export async function handleTimeTracker(input: TimeTrackerInput): Promise<string> {
  if (input.action === "log") {
    // Validate required fields for logging
    if (!input.client) {
      throw new Error("Client is required for logging time");
    }
    if (!input.project) {
      throw new Error("Project is required for logging time");
    }
    if (!input.description) {
      throw new Error("Description is required for logging time");
    }

    const minutes =
      input.minutes ||
      (input.hours ? Math.round(input.hours * 60) : undefined);
    if (!minutes) {
      throw new Error("Either minutes or hours is required for logging time");
    }

    const sheet = await loadTimesheet();
    const entry: TimeEntry = {
      id: generateId(),
      date: input.date || formatISODate(),
      client: input.client,
      project: input.project,
      description: input.description,
      minutes,
      hourlyRate: input.hourlyRate,
      billable: input.billable,
      tags: input.tags,
      createdAt: new Date().toISOString(),
    };

    sheet.entries.push(entry);
    await saveTimesheet(sheet);

    const hoursDisplay = `${formatDecimalHours(minutes)}h (${minutes} min)`;
    const rateDisplay = input.hourlyRate
      ? ` @ ${currency(input.hourlyRate)}/hr = ${currency((minutes / 60) * input.hourlyRate)}`
      : "";

    return sections(
      "✅ **Time entry logged successfully**\n",
      "\n",
      table(
        ["Field", "Value"],
        [
          [bold("ID"), entry.id],
          [bold("Date"), formatLongDate(new Date(entry.date))],
          [bold("Client"), entry.client],
          [bold("Project"), entry.project],
          [bold("Description"), entry.description],
          [bold("Time"), hoursDisplay + rateDisplay],
          [bold("Billable"), entry.billable ? "Yes" : "No"],
          ...(entry.tags?.length ? [[bold("Tags"), entry.tags.join(", ")]] : []),
        ]
      ),
      "\n",
      `_Entry saved to \`${TIMESHEET_PATH}\`_\n`
    );
  }

  // Report action
  const sheet = await loadTimesheet();
  let startDate: Date | undefined;
  let endDate: Date | undefined;
  let periodLabel = "";

  const today = new Date();

  switch (input.reportType) {
    case "weekly": {
      startDate = startOfWeek(today);
      endDate = endOfWeek(today);
      periodLabel = `Week of ${formatLongDate(startDate)} – ${formatLongDate(endDate)}`;
      break;
    }
    case "monthly": {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      periodLabel = today.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      break;
    }
    case "by-client": {
      periodLabel = input.filterClient
        ? `Client: ${input.filterClient}`
        : "All Clients";
      break;
    }
    case "custom": {
      if (input.startDate) {
        startDate = new Date(input.startDate);
      }
      if (input.endDate) {
        endDate = new Date(input.endDate);
      }
      periodLabel = [
        startDate ? formatLongDate(startDate) : "Beginning",
        "–",
        endDate ? formatLongDate(endDate) : "Present",
      ].join(" ");
      break;
    }
    case "all-time":
    default: {
      periodLabel = "All Time";
      break;
    }
  }

  const filtered = filterEntries(sheet.entries, {
    startDate,
    endDate,
    client: input.filterClient,
    project: input.filterProject,
  });

  return buildReport(
    filtered,
    `Time Report: ${periodLabel}`,
    periodLabel
  );
}
