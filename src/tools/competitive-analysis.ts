/**
 * Competitive Analysis Tool
 * Generates a competitive landscape analysis framework with positioning recommendations
 * for consultants to use when advising clients or positioning their own practice.
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
  callout,
} from "../utils/markdown.js";
import { formatLongDate } from "../utils/date.js";

const competitorSchema = z.object({
  name: z.string().min(1, "Competitor name is required"),
  strengths: z.array(z.string()).optional(),
  weaknesses: z.array(z.string()).optional(),
  pricePoint: z.enum(["budget", "mid-market", "premium", "enterprise"]).optional(),
  targetSegment: z.string().optional(),
});

export const competitiveAnalysisSchema = z.object({
  industry: z.string().min(1, "Industry or niche is required"),
  clientCompany: z.string().optional(),
  analysisFor: z.enum(["client-advisory", "own-practice"]).optional().default("client-advisory"),
  competitors: z.array(competitorSchema).optional(),
  yourStrengths: z.array(z.string()).optional(),
  targetSegment: z.string().optional(),
  geographicFocus: z.string().optional(),
  additionalContext: z.string().optional(),
});

export type CompetitiveAnalysisInput = z.infer<typeof competitiveAnalysisSchema>;

export function generateCompetitiveAnalysis(input: CompetitiveAnalysisInput): string {
  const today = formatLongDate();
  const isClientAdvisory = input.analysisFor === "client-advisory";
  const subject = isClientAdvisory
    ? input.clientCompany || "your client"
    : "your consulting practice";

  const geoContext = input.geographicFocus
    ? ` in ${input.geographicFocus}`
    : "";

  const defaultCompetitors = [
    {
      name: "Market Leader / Incumbent",
      strengths: ["Brand recognition", "Large customer base", "Deep resources"],
      weaknesses: ["Slow to innovate", "Expensive", "Impersonal service"],
      pricePoint: "premium" as const,
      targetSegment: "Enterprise",
    },
    {
      name: "Low-Cost Challenger",
      strengths: ["Aggressive pricing", "Fast onboarding", "Modern UX"],
      weaknesses: ["Limited features", "Poor support", "High churn"],
      pricePoint: "budget" as const,
      targetSegment: "SMB / Startups",
    },
    {
      name: "Niche Specialist",
      strengths: ["Deep domain expertise", "Loyal community", "High trust"],
      weaknesses: ["Limited scale", "Narrow focus", "Slow growth"],
      pricePoint: "mid-market" as const,
      targetSegment: "Specific vertical",
    },
  ];

  const competitors = input.competitors?.length
    ? input.competitors
    : defaultCompetitors;

  const yourStrengths = input.yourStrengths?.length
    ? input.yourStrengths
    : [
        "Specialized expertise in [specific area]",
        "Personalized attention and direct access",
        "Faster delivery and decision-making",
        "Results-based pricing or performance alignment",
        "Deep network and ecosystem relationships",
      ];

  const competitorTableRows = competitors.map((c) => [
    c.name,
    c.targetSegment || "_[Segment]_",
    c.pricePoint
      ? c.pricePoint.charAt(0).toUpperCase() + c.pricePoint.slice(1)
      : "_[Price]_",
    c.strengths?.join(", ") || "_[Research needed]_",
    c.weaknesses?.join(", ") || "_[Research needed]_",
  ]);

  const strategicFrameworks = [
    {
      name: "Blue Ocean Strategy",
      description:
        "Create uncontested market space by targeting non-customers or under-served segments. Avoid competing directly in existing \"red ocean\" spaces.",
      application: `In ${input.industry}, this could mean targeting [niche within the industry] that incumbents overlook or undervalue.`,
    },
    {
      name: "Jobs-to-Be-Done (JTBD)",
      description:
        "Understand the specific outcome customers are \"hiring\" a product or service to accomplish. Win by solving that job better than alternatives.",
      application: `The core job customers in ${input.industry} are hiring for is likely: [outcome — not feature].`,
    },
    {
      name: "Competitive Moats",
      description:
        "Identify durable advantages that are hard to replicate: network effects, switching costs, proprietary data, brand, or cost structure.",
      application: `For ${subject}, the strongest potential moat is likely: [network effects / brand trust / unique methodology / data].`,
    },
  ];

  const positioningOptions = [
    {
      position: "Category Leader",
      tagline: "The [adjective] solution for [segment]",
      suitable: "When you have scale and brand recognition",
    },
    {
      position: "Challenger / Disruptor",
      tagline: "[Incumbent] does it the old way. We do it the right way.",
      suitable: "When going up against a slow, expensive incumbent",
    },
    {
      position: "Specialist / Expert",
      tagline: "The only [solution] built specifically for [niche]",
      suitable: "When deep domain expertise is a meaningful differentiator",
    },
    {
      position: "Premium / White-Glove",
      tagline: "The best [solution] money can buy",
      suitable: "When targeting high-value clients who pay for quality",
    },
    {
      position: "Community-Led / Values-Driven",
      tagline: "Built by [type of people] for [type of people]",
      suitable: "When authentic community and mission are core to the brand",
    },
  ];

  return sections(
    h1(`Competitive Analysis: ${input.industry}`),
    `${bold("Prepared:")} ${today} | ${bold("Analysis For:")} ${subject}${geoContext}\n`,
    "\n",
    hr(),
    "\n",
    h2("Executive Summary"),
    `The ${input.industry} landscape${geoContext} is characterized by [market dynamics]. ${subject} occupies a [current position] and has opportunities to strengthen its competitive position by focusing on [key opportunity areas].\n`,
    "\n",
    input.additionalContext ? `${bold("Context:")} ${input.additionalContext}\n\n` : "",
    h2("Market Overview"),
    table(
      ["Dimension", "Assessment"],
      [
        [bold("Market Size"), "_[TAM / SAM / SOM — research required]_"],
        [bold("Growth Rate"), "_[YoY growth % — research industry reports]_"],
        [bold("Maturity Stage"), "_[Emerging / Growth / Mature / Declining]_"],
        [bold("Key Trends"), "_[3–5 macro trends shaping this market]_"],
        [bold("Regulatory Environment"), "_[Key regulations or compliance factors]_"],
        [bold("Technology Disruption"), "_[AI, automation, platform shifts, etc.]_"],
      ]
    ),
    "\n",
    h2("Competitive Landscape"),
    table(
      ["Competitor", "Segment", "Price Point", "Key Strengths", "Key Weaknesses"],
      competitorTableRows
    ),
    "\n",
    h2("Competitor Deep Dives"),
    competitors
      .map(
        (c) => `${h3(c.name)}\n${bold("Target Segment:")} ${c.targetSegment || "_[Research]_"}  \n${bold("Price Point:")} ${c.pricePoint || "_[Research]_"}  \n\n${c.strengths?.length ? `${bold("Strengths:")}\n${ul(c.strengths)}\n` : ""}${c.weaknesses?.length ? `${bold("Weaknesses:")}\n${ul(c.weaknesses)}\n` : ""}${bold("Opportunity to exploit:")} _[Where does their weakness create an opening for ${subject}?]_\n`
      )
      .join("\n"),
    "\n",
    h2(`${isClientAdvisory ? "Client" : "Your"} Competitive Strengths`),
    ul(yourStrengths),
    "\n",
    h2("Positioning Strategy"),
    `Based on the competitive landscape, consider the following positioning options:\n`,
    "\n",
    table(
      ["Position", "Tagline Direction", "Best When"],
      positioningOptions.map((p) => [bold(p.position), p.tagline, p.suitable])
    ),
    "\n",
    callout(
      "Positioning Recommendation",
      `For ${subject} in ${input.industry}, the most defensible position is likely **[chosen position]** because [rationale]. The key message to own is: "_[core message in 10 words or less]_"`
    ),
    "\n",
    h2("Strategic Frameworks"),
    strategicFrameworks
      .map(
        (f) =>
          `${h3(f.name)}\n${f.description}\n\n${bold("Application for " + subject + ":")} ${f.application}\n`
      )
      .join("\n"),
    "\n",
    h2("SWOT Analysis"),
    table(
      ["", "Helpful", "Harmful"],
      [
        [bold("Internal"), `${bold("Strengths")}: ${yourStrengths.slice(0, 2).join(", ")}`, `${bold("Weaknesses")}: _[What are the honest weaknesses?]_`],
        [bold("External"), `${bold("Opportunities")}: _[Market gaps, trends to capitalize on]_`, `${bold("Threats")}: _[Competitive moves, market shifts]_`],
      ]
    ),
    "\n",
    h2("Recommended Actions"),
    ol([
      `**Audit your messaging** — Does current positioning clearly differentiate from the top 2 competitors?`,
      `**Identify the underserved niche** — Which segment do competitors serve poorly? Double down there first.`,
      `**Win on a specific battleground** — Pick 1–2 dimensions (speed, expertise, price, service) to win decisively.`,
      `**Build switching costs** — Create integrations, proprietary methodology, or community that makes leaving expensive.`,
      `**Monitor quarterly** — Competitive positioning shifts. Schedule a 90-day competitive review.`,
    ]),
    "\n",
    h2("Research Sources to Complete This Analysis"),
    ul([
      `**G2, Capterra, or Trustpilot:** Customer reviews reveal real pain points with competitors`,
      `**LinkedIn:** Company size, growth signals, job listings = strategy signals`,
      `**Crunchbase / PitchBook:** Funding, acquisitions, investor activity`,
      `**Industry reports:** Gartner Magic Quadrant, Forrester Wave, IBISWorld`,
      `**SEMrush / Ahrefs:** Competitor keyword strategy and content gaps`,
      `**Job listings:** What roles are they hiring? = strategic priorities`,
    ]),
    "\n",
    hr(),
    `\n*Generated by consultant-ai · thewedgemethodai.com*\n`
  );
}
