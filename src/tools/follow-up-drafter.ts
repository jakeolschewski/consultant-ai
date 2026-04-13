/**
 * Follow-Up Drafter Tool
 * Generates a professional post-meeting follow-up email based on meeting notes
 * and action items.
 */

import { z } from "zod";
import { sections, h2, h3, ul, hr, bold } from "../utils/markdown.js";
import { formatLongDate } from "../utils/date.js";

const actionItemSchema = z.object({
  description: z.string().min(1, "Action item description is required"),
  owner: z.enum(["consultant", "client", "both"]).optional().default("consultant"),
  dueDate: z.string().optional(),
});

export const followUpDrafterSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email().optional(),
  clientCompany: z.string().optional(),
  consultantName: z.string().min(1, "Consultant name is required"),
  meetingType: z.string().optional().default("meeting"),
  meetingDate: z.string().optional(),
  keyTopics: z.array(z.string()).min(1, "At least one key topic is required"),
  decisions: z.array(z.string()).optional(),
  actionItems: z.array(actionItemSchema).min(1, "At least one action item is required"),
  nextMeeting: z.string().optional(),
  additionalNotes: z.string().optional(),
  tone: z
    .enum(["formal", "professional", "friendly"])
    .optional()
    .default("professional"),
});

export type FollowUpDrafterInput = z.infer<typeof followUpDrafterSchema>;

const openingsByTone: Record<string, string[]> = {
  formal: [
    "I appreciate you taking the time to meet with me today.",
    "Thank you for your time and thoughtful engagement during today's discussion.",
    "I am grateful for the opportunity to connect with you today.",
  ],
  professional: [
    "Thank you for a productive conversation today.",
    "It was great connecting with you today.",
    "Thanks for making time — it was a valuable conversation.",
  ],
  friendly: [
    "Really enjoyed chatting with you today!",
    "Thanks so much for connecting today — great conversation.",
    "It was wonderful catching up and digging into all of this with you!",
  ],
};

const closingsByTone: Record<string, string> = {
  formal:
    "Please do not hesitate to contact me should you have any questions or require clarification on any of the above.",
  professional:
    "Looking forward to moving this forward — don't hesitate to reach out if anything comes up in the meantime.",
  friendly:
    "Excited about what we're building together — feel free to ping me anytime!",
};

export function generateFollowUp(input: FollowUpDrafterInput): string {
  const meetingDate = input.meetingDate
    ? new Date(input.meetingDate)
    : new Date();
  const displayDate = formatLongDate(meetingDate);
  const openings = openingsByTone[input.tone];
  const opening = openings[Math.floor(Math.random() * openings.length)];
  const closing = closingsByTone[input.tone];

  const consultantItems = input.actionItems.filter(
    (a) => a.owner === "consultant" || a.owner === "both"
  );
  const clientItems = input.actionItems.filter(
    (a) => a.owner === "client" || a.owner === "both"
  );

  const formatActionItem = (item: (typeof input.actionItems)[0]): string => {
    const due = item.dueDate ? ` _(due ${item.dueDate})_` : "";
    return `- [ ] ${item.description}${due}`;
  };

  const subjectLine = `Re: ${input.meetingType.charAt(0).toUpperCase() + input.meetingType.slice(1)} recap + next steps | ${input.clientCompany || input.clientName}`;

  const decisions = input.decisions?.length
    ? input.decisions
    : [];

  return sections(
    h2("Email Draft"),
    "\n",
    `${bold("To:")} ${input.clientEmail || input.clientName}  \n${bold("Subject:")} ${subjectLine}\n`,
    "\n",
    "---\n",
    "\n",
    `Hi ${input.clientName.split(" ")[0]},\n`,
    "\n",
    `${opening} I wanted to send a quick recap of our ${input.meetingType} on ${displayDate} while everything is fresh.\n`,
    "\n",
    `${bold("What we covered:")}\n`,
    ul(input.keyTopics),
    "\n",
    decisions.length > 0
      ? `${bold("Key decisions made:")}\n${ul(decisions)}\n\n`
      : "",
    `${bold("Action items:")}\n`,
    consultantItems.length > 0
      ? `\n_On my end:_\n${consultantItems.map(formatActionItem).join("\n")}\n`
      : "",
    clientItems.length > 0
      ? `\n_On your end:_\n${clientItems.map(formatActionItem).join("\n")}\n`
      : "",
    "\n",
    input.nextMeeting
      ? `${bold("Next meeting:")} ${input.nextMeeting}\n\n`
      : `${bold("Next step:")} I'll follow up by [date] to [specific action]. In the meantime, feel free to reach out with any questions.\n\n`,
    input.additionalNotes ? `${input.additionalNotes}\n\n` : "",
    `${closing}\n`,
    "\n",
    `Best,  \n${input.consultantName}\n`,
    "\n",
    "---\n",
    "\n",
    h2("Meeting Notes Summary"),
    `${bold("Date:")} ${displayDate}  \n${bold("Attendees:")} ${input.clientName}${input.clientCompany ? ` (${input.clientCompany})` : ""}, ${input.consultantName}\n`,
    "\n",
    h3("Topics Discussed"),
    ul(input.keyTopics),
    "\n",
    decisions.length > 0
      ? `${h3("Decisions Made")}\n${ul(decisions)}\n\n`
      : "",
    h3("All Action Items"),
    table(
      ["Action Item", "Owner", "Due Date", "Status"],
      input.actionItems.map((item) => [
        item.description,
        item.owner === "both"
          ? "Both parties"
          : item.owner === "consultant"
          ? input.consultantName
          : input.clientName,
        item.dueDate || "TBD",
        "⬜ Open",
      ])
    ),
    "\n",
    input.additionalNotes
      ? `${h3("Additional Notes")}\n${input.additionalNotes}\n\n`
      : "",
    hr(),
    `\n*Generated by consultant-ai · thewedgemethodai.com*\n`
  );
}

function table(headers: string[], rows: string[][]): string {
  const headerRow = `| ${headers.join(" | ")} |`;
  const separator = `| ${headers.map(() => "---").join(" | ")} |`;
  const dataRows = rows.map((row) => `| ${row.join(" | ")} |`);
  return [headerRow, separator, ...dataRows].join("\n") + "\n";
}
