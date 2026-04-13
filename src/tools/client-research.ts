/**
 * Client Research Tool
 * Generates a structured pre-meeting research brief for a prospective client.
 * Returns a professional research template the AI should populate.
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
  callout,
} from "../utils/markdown.js";
import { formatLongDate } from "../utils/date.js";

export const clientResearchSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyDomain: z.string().optional(),
  industry: z.string().optional(),
  meetingPurpose: z
    .enum(["sales", "discovery", "pitch", "renewal", "general"])
    .optional()
    .default("discovery"),
  knownContext: z.string().optional(),
  contactName: z.string().optional(),
  contactTitle: z.string().optional(),
});

export type ClientResearchInput = z.infer<typeof clientResearchSchema>;

export function generateClientResearch(input: ClientResearchInput): string {
  const today = formatLongDate();
  const domainRef = input.companyDomain ? ` (${input.companyDomain})` : "";
  const industryRef = input.industry ? ` | Industry: ${input.industry}` : "";
  const purposeLabels: Record<string, string> = {
    sales: "Sales Outreach",
    discovery: "Discovery Meeting",
    pitch: "Proposal / Pitch",
    renewal: "Contract Renewal",
    general: "General Research",
  };

  const purposeLabel = purposeLabels[input.meetingPurpose];

  const talkingPoints = [
    `How is ${input.companyName} currently handling [relevant challenge in ${input.industry || "their industry"}]?`,
    `What does success look like for your team over the next 6–12 months?`,
    `Who else is involved in decisions like this?`,
    `Have you worked with external consultants before? What went well, what didn't?`,
    `What's the one thing that, if solved, would make the biggest difference right now?`,
  ];

  const potentialPainPoints = [
    `Scaling operations without proportional headcount increases`,
    `Difficulty measuring ROI on strategic initiatives`,
    `Misalignment between department priorities and company goals`,
    `Slow decision-making cycles due to unclear ownership`,
    `Technology debt or process inefficiencies holding back growth`,
    `Competing priorities making it difficult to focus on high-impact work`,
  ];

  const objections = [
    {
      objection: "We don't have the budget right now",
      response:
        "Understand the timeline — is this a Q-end constraint or a longer-term hold? Anchor to ROI: what is the cost of *not* solving this?",
    },
    {
      objection: "We're already working with another consultant",
      response:
        "Explore scope overlap. Position as complementary. Ask what outcomes they're hoping to achieve and whether there are gaps.",
    },
    {
      objection: "We're not ready to make a decision yet",
      response:
        "Agree to a specific follow-up date. Leave behind a value artifact (mini-assessment, framework, relevant case study).",
    },
    {
      objection: "We handle this internally",
      response:
        "Validate their team's capability, then ask about capacity: even strong teams benefit from outside perspective and bandwidth.",
    },
  ];

  return sections(
    h1(`Client Research Brief: ${input.companyName}`),
    "\n",
    `${bold("Prepared:")} ${today} | ${bold("Meeting Type:")} ${purposeLabel}${industryRef}\n`,
    input.contactName
      ? `${bold("Primary Contact:")} ${input.contactName}${input.contactTitle ? `, ${input.contactTitle}` : ""}\n`
      : "",
    "\n",
    hr(),
    "\n",
    h2("Company Overview"),
    `**${input.companyName}**${domainRef}\n`,
    "\n",
    table(
      ["Attribute", "Details"],
      [
        ["Industry", input.industry || "_[To be researched]_"],
        ["Company Size", "_[Employees / ARR / headcount — research LinkedIn, Crunchbase, website]_"],
        ["Founded", "_[Year — research website / LinkedIn]_"],
        ["Headquarters", "_[City, State/Country]_"],
        ["Business Model", "_[B2B / B2C / SaaS / Services / Product]_"],
        ["Key Products/Services", "_[Main offerings — research their website]_"],
        ["Funding Stage", "_[Bootstrapped / Series A / Public / etc.]_"],
        ["Website", input.companyDomain || "_[URL]_"],
      ]
    ),
    "\n",
    input.knownContext
      ? `${h3("Known Context")}\n${input.knownContext}\n\n`
      : "",
    h2("Recent News & Activity"),
    "_Research these sources and fill in before your meeting:_\n",
    "\n",
    ul([
      "**Press Releases / Blog:** Recent product launches, leadership changes, expansions",
      `**Google News:** Search "${input.companyName} 2024 OR 2025" for the latest headlines`,
      "**LinkedIn:** Recent company posts, job listings (hint at priorities), headcount changes",
      "**Crunchbase / PitchBook:** Funding rounds, acquisitions, investor news",
      "**Glassdoor:** Employee sentiment, recurring themes in reviews",
      "**Twitter/X:** Brand voice, customer complaints, thought leadership",
    ]),
    "\n",
    h3("Key Recent Developments"),
    "1. _[Development 1]_\n2. _[Development 2]_\n3. _[Development 3]_\n",
    "\n",
    h2("Key Stakeholders"),
    table(
      ["Name", "Title", "LinkedIn", "Relevant Notes"],
      [
        [
          input.contactName || "_[Contact 1]_",
          input.contactTitle || "_[Title]_",
          "_[URL]_",
          "_[Background, interests, tenure]_",
        ],
        ["_[Contact 2]_", "_[Title]_", "_[URL]_", "_[Background]_"],
        ["_[Economic Buyer]_", "_[Title]_", "_[URL]_", "_[Decision authority]_"],
        ["_[Champion]_", "_[Title]_", "_[URL]_", "_[Internal advocate]_"],
      ]
    ),
    "\n",
    h2("Potential Pain Points"),
    `_Based on company profile and ${input.industry || "typical industry"} patterns:_\n`,
    "\n",
    ul(potentialPainPoints),
    "\n",
    callout(
      "Research Tip",
      `Check ${input.companyName}'s job listings — open roles reveal strategic priorities. For example, 5 open "Data Analyst" roles suggests a push toward data maturity.`
    ),
    "\n",
    h2("Talking Points & Discovery Questions"),
    ul(talkingPoints),
    "\n",
    h2("Competitive Context"),
    `_${input.companyName}'s likely competitors and how your consulting differentiates:_\n`,
    "\n",
    table(
      ["Competitor", "Strengths", "Weaknesses", "Our Differentiation"],
      [
        ["_[Competitor 1]_", "_[Strength]_", "_[Weakness]_", "_[Your edge]_"],
        ["_[Competitor 2]_", "_[Strength]_", "_[Weakness]_", "_[Your edge]_"],
        ["_[Status quo]_", "Known, low friction", "Not solving the problem", "Results + accountability"],
      ]
    ),
    "\n",
    h2("Handling Likely Objections"),
    objections
      .map(
        (o) =>
          `**"${o.objection}"**\n> ${o.response}`
      )
      .join("\n\n"),
    "\n\n",
    h2("Pre-Meeting Checklist"),
    ul([
      "Review LinkedIn profiles of all attendees",
      "Read the last 3 blog posts or press releases from their site",
      `Search "${input.companyName} problems" and "${input.companyName} reviews" to find pain signals`,
      "Check if anyone has mutual connections you can reference",
      "Prepare 1 relevant case study or success story to share",
      "Know your ask: what's the specific next step you want to propose?",
      "Set a 5-minute pre-meeting intention: what's the one thing you need to learn?",
    ]),
    "\n",
    h2("Meeting Goal & Next Step"),
    `${bold("Primary Goal:")} _[What do you need to learn or accomplish?]_\n\n${bold("Desired Next Step:")} _[Schedule follow-up / send proposal / intro to team / etc.]_\n\n${bold("Leave-Behind:")} _[Document, framework, or resource to send post-meeting]_\n`,
    "\n",
    hr(),
    `\n*Generated by consultant-ai · thewedgemethodai.com*\n`
  );
}
