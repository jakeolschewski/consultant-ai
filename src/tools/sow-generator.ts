/**
 * Statement of Work (SOW) Generator Tool
 * Produces a professional, legally-structured SOW in Markdown.
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
import { formatLongDate, addWeeks } from "../utils/date.js";

const milestoneSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  deliverables: z.array(z.string()).min(1),
  dueWeek: z.number().int().positive(),
  paymentPercent: z.number().min(0).max(100).optional(),
});

export const sowGeneratorSchema = z.object({
  projectTitle: z.string().min(1, "Project title is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientCompany: z.string().optional(),
  clientSignatory: z.string().optional(),
  clientTitle: z.string().optional(),
  consultantName: z.string().min(1, "Consultant name is required"),
  consultantCompany: z.string().optional(),
  consultantSignatory: z.string().optional(),
  consultantTitle: z.string().optional(),
  projectDescription: z.string().min(20, "Project description must be at least 20 characters"),
  startDate: z.string().optional(),
  durationWeeks: z.number().int().positive("Duration must be a positive integer"),
  totalBudget: z.number().positive("Budget must be positive"),
  deliverables: z.array(z.string()).min(1, "At least one deliverable is required"),
  milestones: z.array(milestoneSchema).optional(),
  outOfScope: z.array(z.string()).optional(),
  successCriteria: z.array(z.string()).optional(),
  communicationCadence: z.string().optional(),
  revisionRounds: z.number().int().min(0).optional().default(2),
  governingLaw: z.string().optional().default("State of Delaware"),
  includeNDA: z.boolean().optional().default(false),
});

export type SOWGeneratorInput = z.infer<typeof sowGeneratorSchema>;

export function generateSOW(input: SOWGeneratorInput): string {
  const today = new Date();
  const startDate = input.startDate ? new Date(input.startDate) : addWeeks(today, 1);
  const endDate = addWeeks(startDate, input.durationWeeks);

  const clientDisplay = input.clientCompany
    ? `${input.clientCompany}`
    : input.clientName;
  const consultantDisplay = input.consultantCompany
    ? `${input.consultantCompany}`
    : input.consultantName;

  const outOfScope = input.outOfScope?.length
    ? input.outOfScope
    : [
        "Implementation work beyond the defined deliverables",
        "Ongoing maintenance or support after project completion",
        "Third-party software, licenses, or subscriptions",
        "Training or documentation beyond what is specified in deliverables",
      ];

  const successCriteria = input.successCriteria?.length
    ? input.successCriteria
    : [
        "All deliverables delivered on schedule and accepted by Client",
        "Client confirms that deliverables meet the objectives outlined in Section 1",
        "Final payment received within payment terms",
      ];

  const communicationCadence =
    input.communicationCadence ||
    `Weekly status meetings (30 minutes via video call) held every [day] at [time]. Meeting notes distributed within 24 hours. Slack/email response time: within 1 business day. Urgent matters: direct phone/text acceptable.`;

  const milestones =
    input.milestones?.length
      ? input.milestones
      : [
          {
            name: "Project Kick-Off",
            description: "Engagement officially begins. Access granted, tools configured, detailed project plan shared.",
            deliverables: ["Signed SOW", "Project plan", "Kick-off meeting completed"],
            dueWeek: 1,
            paymentPercent: 50,
          },
          {
            name: "Mid-Project Milestone",
            description: "Interim deliverables reviewed and approved by Client.",
            deliverables: input.deliverables.slice(0, Math.ceil(input.deliverables.length / 2)),
            dueWeek: Math.floor(input.durationWeeks / 2),
            paymentPercent: 0,
          },
          {
            name: "Final Delivery",
            description: "All remaining deliverables submitted and accepted.",
            deliverables: input.deliverables.slice(Math.ceil(input.deliverables.length / 2)),
            dueWeek: input.durationWeeks,
            paymentPercent: 50,
          },
        ];

  const milestoneRows = milestones.map((m) => [
    m.name,
    `Week ${m.dueWeek}`,
    formatLongDate(addWeeks(startDate, m.dueWeek - 1)),
    m.paymentPercent ? `${currency(input.totalBudget * m.paymentPercent / 100)} (${m.paymentPercent}%)` : "—",
  ]);

  return sections(
    h1(`Statement of Work\n${input.projectTitle}`),
    "\n",
    table(
      ["Field", "Details"],
      [
        [bold("SOW Date"), formatLongDate(today)],
        [bold("Project Start"), formatLongDate(startDate)],
        [bold("Project End"), formatLongDate(endDate)],
        [bold("Duration"), `${input.durationWeeks} weeks`],
        [bold("Client"), clientDisplay],
        [bold("Consultant / Firm"), consultantDisplay],
        [bold("Total Engagement Fee"), currency(input.totalBudget)],
      ]
    ),
    "\n",
    hr(),
    "\n",
    h2("1. Project Overview"),
    `${input.projectDescription}\n`,
    "\n",
    h2("2. Deliverables"),
    `The following deliverables will be produced under this Statement of Work:\n`,
    "\n",
    ol(input.deliverables),
    "\n",
    `Each deliverable is subject to a maximum of ${bold(`${input.revisionRounds} revision round${input.revisionRounds !== 1 ? "s" : ""}`)} based on Client feedback. Additional revision rounds may be requested at an additional fee.\n`,
    "\n",
    h2("3. Milestones & Schedule"),
    table(
      ["Milestone", "Target Week", "Target Date", "Payment"],
      milestoneRows
    ),
    "\n",
    milestones
      .map(
        (m) =>
          `${h3(`${m.name} (Week ${m.dueWeek})`)}\n${m.description}\n\n${bold("Deliverables:")}\n${ul(m.deliverables)}`
      )
      .join("\n"),
    "\n",
    h2("4. Out of Scope"),
    `The following items are ${bold("explicitly excluded")} from this Statement of Work:\n`,
    ul(outOfScope),
    "\nAny work outside this scope requires a written Change Order, signed by both parties.\n",
    "\n",
    h2("5. Success Criteria"),
    `This engagement will be considered successfully completed when:\n`,
    ul(successCriteria),
    "\n",
    h2("6. Fees & Payment"),
    `The total engagement fee is ${bold(currency(input.totalBudget))}. Fees are due per the milestone schedule in Section 3. Invoices unpaid after 30 days are subject to a 1.5% monthly service charge.\n`,
    "\n",
    h2("7. Communication & Collaboration"),
    `${communicationCadence}\n`,
    "\n",
    h2("8. Client Responsibilities"),
    ul([
      "Provide timely access to required stakeholders, systems, and documentation",
      "Designate a primary point of contact empowered to make decisions",
      "Provide feedback within 5 business days of each deliverable submission",
      "Notify Consultant promptly of any changes to project scope, timeline, or priorities",
      "Make payments according to the milestone schedule",
    ]),
    "\n",
    h2("9. Intellectual Property"),
    `Upon receipt of full payment, all work product created specifically for this engagement and listed as deliverables shall become the sole property of ${clientDisplay}. Consultant retains the right to reference this engagement in portfolio materials unless otherwise agreed in writing. Pre-existing tools, frameworks, and methodologies used by Consultant remain Consultant's property.\n`,
    "\n",
    h2("10. Confidentiality"),
    `Both parties agree to keep confidential any non-public information shared during this engagement. This obligation survives termination of this SOW for a period of two (2) years.\n`,
    "\n",
    input.includeNDA
      ? `${h3("Mutual NDA")}\nFor the avoidance of doubt, the parties agree to execute a separate Mutual Non-Disclosure Agreement as a condition of commencing work.\n\n`
      : "",
    h2("11. Termination"),
    `Either party may terminate this SOW with 14 days written notice. In the event of termination, Client shall pay for all work completed through the termination date, calculated on a pro-rata basis. If Client terminates without cause after project start, the deposit/first milestone payment is non-refundable.\n`,
    "\n",
    h2("12. Limitation of Liability"),
    `Consultant's total liability under this SOW shall not exceed the total fees paid. Neither party shall be liable for indirect, consequential, or incidental damages.\n`,
    "\n",
    h2("13. Governing Law"),
    `This Statement of Work shall be governed by the laws of the ${input.governingLaw}.\n`,
    "\n",
    h2("14. Entire Agreement"),
    `This SOW constitutes the entire agreement between the parties regarding the described services and supersedes any prior discussions or agreements. Modifications must be in writing and signed by both parties.\n`,
    "\n",
    hr(),
    "\n",
    h2("Signatures"),
    `By signing below, both parties agree to the terms of this Statement of Work.\n`,
    "\n",
    table(
      ["", "Client", "Consultant"],
      [
        [bold("Signature"), "_____________________", "_____________________"],
        [bold("Name"), input.clientSignatory || input.clientName, input.consultantSignatory || input.consultantName],
        [bold("Title"), input.clientTitle || "_[Title]_", input.consultantTitle || "_[Title]_"],
        [bold("Company"), clientDisplay, consultantDisplay],
        [bold("Date"), "___________________", "___________________"],
      ]
    ),
    "\n",
    hr(),
    `\n*Generated by consultant-ai · thewedgemethodai.com*\n`
  );
}
