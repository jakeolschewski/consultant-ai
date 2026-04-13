/**
 * Proposal Generator Tool
 * Generates a complete, professional consulting proposal in Markdown.
 */

import { z } from "zod";
import {
  h1,
  h2,
  h3,
  bold,
  hr,
  ul,
  ol,
  table,
  sections,
  currency,
  definitionList,
} from "../utils/markdown.js";
import { formatLongDate, addWeeks } from "../utils/date.js";

export const proposalGeneratorSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  clientCompany: z.string().optional(),
  projectTitle: z.string().min(1, "Project title is required"),
  projectScope: z
    .string()
    .min(10, "Project scope must be at least 10 characters"),
  deliverables: z
    .array(z.string())
    .min(1, "At least one deliverable is required"),
  budgetMin: z.number().positive("Budget minimum must be positive"),
  budgetMax: z.number().positive("Budget maximum must be positive"),
  timelineWeeks: z
    .number()
    .int()
    .positive("Timeline must be a positive number of weeks"),
  consultantName: z.string().min(1, "Consultant name is required"),
  consultantCompany: z.string().optional(),
  consultantEmail: z.string().email("Must be a valid email").optional(),
  methodology: z.string().optional(),
  assumptions: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  paymentTerms: z
    .enum(["50/50", "monthly", "milestone", "net-30", "upfront"])
    .optional()
    .default("50/50"),
});

export type ProposalGeneratorInput = z.infer<typeof proposalGeneratorSchema>;

export function generateProposal(input: ProposalGeneratorInput): string {
  const today = new Date();
  const proposalDate = formatLongDate(today);
  const expirationDate = formatLongDate(addWeeks(today, 3));
  const projectStart = formatLongDate(addWeeks(today, 1));
  const projectEnd = formatLongDate(addWeeks(today, 1 + input.timelineWeeks));

  const clientDisplay = input.clientCompany
    ? `${input.clientName}, ${input.clientCompany}`
    : input.clientName;

  const consultantDisplay = input.consultantCompany
    ? `${input.consultantName}, ${input.consultantCompany}`
    : input.consultantName;

  const budgetMid = Math.round((input.budgetMin + input.budgetMax) / 2);

  const paymentSchedule: Record<string, string[]> = {
    "50/50": [
      `${currency(input.budgetMin / 2)} – ${currency(input.budgetMax / 2)} due upon signed agreement`,
      `${currency(input.budgetMin / 2)} – ${currency(input.budgetMax / 2)} due upon project completion`,
    ],
    monthly: [
      `Equal monthly installments of ${currency(budgetMid / (input.timelineWeeks / 4))} billed on the 1st of each month`,
      "Final payment due upon delivery of all deliverables",
    ],
    milestone: [
      "25% due upon signed agreement",
      "25% due at mid-project milestone",
      "25% due upon draft delivery",
      "25% due upon final delivery and acceptance",
    ],
    "net-30": [
      "100% invoiced upon completion",
      "Payment due within 30 days of invoice date",
      `Late payments subject to 1.5% monthly interest`,
    ],
    upfront: [
      `${currency(input.budgetMax)} due in full prior to project kick-off`,
      "Refundable within 5 business days if project has not commenced",
    ],
  };

  const methodology =
    input.methodology ||
    `This engagement will follow an iterative, collaborative methodology:
1. **Discovery** – In-depth review of your current situation, goals, and constraints
2. **Analysis** – Research, benchmarking, and gap identification
3. **Design** – Development of tailored recommendations and deliverables
4. **Delivery** – Presentation of findings and implementation support
5. **Follow-Up** – Post-engagement check-in to confirm successful adoption`;

  const assumptions = input.assumptions?.length
    ? input.assumptions
    : [
        `${input.clientCompany || input.clientName} will provide timely access to relevant stakeholders`,
        "Key decisions will be made within 3 business days of milestone presentations",
        "Feedback cycles will not exceed 5 business days per round",
        "Project scope is as defined in this proposal; changes may affect timeline and budget",
        "All required data, documentation, and systems access will be made available at project start",
      ];

  const exclusions = input.exclusions?.length
    ? input.exclusions
    : [
        "Implementation of recommendations beyond defined deliverables",
        "Ongoing support or maintenance after project completion (available under a separate retainer)",
        "Third-party software licenses or subscriptions",
        "Travel expenses (if applicable, will be billed at cost with prior approval)",
      ];

  return sections(
    h1(`Consulting Proposal: ${input.projectTitle}`),
    "\n",
    definitionList({
      Prepared_for: clientDisplay,
      Prepared_by: consultantDisplay,
      Date: proposalDate,
      "Valid Until": expirationDate,
    }),
    "\n",
    hr(),
    "\n",
    h2("Executive Summary"),
    `Thank you for the opportunity to submit this proposal. Based on our discussions regarding **${input.projectTitle}**, I have outlined a comprehensive approach to help ${input.clientCompany || input.clientName} achieve its objectives.\n`,
    `\nThis engagement is designed to deliver ${input.deliverables.length} key outcome${input.deliverables.length !== 1 ? "s" : ""} within ${input.timelineWeeks} week${input.timelineWeeks !== 1 ? "s" : ""}, at an investment of **${currency(input.budgetMin)} – ${currency(input.budgetMax)}**. My approach is collaborative, results-driven, and tailored specifically to your organization's needs.\n`,
    "\n",
    h2("Project Overview"),
    h3("Scope of Work"),
    `${input.projectScope}\n`,
    "\n",
    h3("Key Deliverables"),
    ol(input.deliverables),
    "\n",
    h2("Methodology"),
    `${methodology}\n`,
    "\n",
    h2("Timeline"),
    table(
      ["Phase", "Duration", "Target Date"],
      [
        ["Project Kick-Off", "1 week", projectStart],
        [
          "Discovery & Research",
          `${Math.max(1, Math.floor(input.timelineWeeks * 0.25))} week(s)`,
          formatLongDate(
            addWeeks(today, 1 + Math.floor(input.timelineWeeks * 0.25))
          ),
        ],
        [
          "Analysis & Development",
          `${Math.max(1, Math.floor(input.timelineWeeks * 0.4))} week(s)`,
          formatLongDate(
            addWeeks(
              today,
              1 +
                Math.floor(input.timelineWeeks * 0.25) +
                Math.floor(input.timelineWeeks * 0.4)
            )
          ),
        ],
        [
          "Delivery & Review",
          `${Math.max(1, Math.floor(input.timelineWeeks * 0.25))} week(s)`,
          formatLongDate(addWeeks(today, input.timelineWeeks)),
        ],
        ["Project Close", "Final week", projectEnd],
      ]
    ),
    "\n",
    h2("Investment"),
    `The total investment for this engagement is **${currency(input.budgetMin)} – ${currency(input.budgetMax)}**, reflecting the scope, complexity, and value delivered.\n`,
    "\n",
    h3("Payment Schedule"),
    ul(paymentSchedule[input.paymentTerms]),
    "\n",
    `> Payment methods accepted: ACH bank transfer, wire transfer, or check. A formal invoice will be issued for each payment milestone.\n`,
    "\n",
    h2("Assumptions & Dependencies"),
    ul(assumptions),
    "\n",
    h2("Exclusions"),
    `The following items are ${bold("not")} included in this proposal:\n`,
    ul(exclusions),
    "\n",
    h2("About"),
    `${consultantDisplay} brings deep expertise in ${input.projectTitle.toLowerCase()} and related disciplines. This engagement is backed by a commitment to quality, transparency, and measurable results.\n`,
    "\n",
    input.consultantEmail
      ? `For questions, please reach out at ${input.consultantEmail}.\n`
      : "",
    "\n",
    h2("Terms & Acceptance"),
    `This proposal is valid until **${expirationDate}**. Scope, timeline, and investment are subject to revision if the project start date is delayed beyond this period.\n`,
    "\n",
    "By signing below, both parties agree to the terms outlined in this proposal. A formal Statement of Work (SOW) will be issued upon acceptance.\n",
    "\n",
    table(
      ["Party", "Signature", "Printed Name", "Date"],
      [
        ["Client", "_________________", clientDisplay, "___________"],
        ["Consultant", "_________________", consultantDisplay, "___________"],
      ]
    ),
    "\n",
    hr(),
    `\n${italic(`Generated by consultant-ai · thewedgemethodai.com`)}\n`
  );
}

function italic(text: string): string {
  return `*${text}*`;
}
