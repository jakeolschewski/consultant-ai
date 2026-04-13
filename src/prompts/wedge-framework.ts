/**
 * WEDGE Framework — Prompt methodology for consultant AI prompts.
 *
 * WEDGE = Who, Establish context, Define deliverable, Guide constraints, Evaluate
 *
 * This framework helps consultants write AI prompts that produce
 * consistently professional, high-quality outputs.
 */

export interface WEDGEPrompt {
  id: string;
  name: string;
  description: string;
  category: string;
  who: string;
  establishContext: string;
  defineDeliverable: string;
  guideConstraints: string;
  evaluate: string;
  fullPrompt: string;
  variables: string[];
}

/**
 * Build a WEDGE-structured prompt from its components.
 */
export function buildWEDGEPrompt(components: {
  who: string;
  establishContext: string;
  defineDeliverable: string;
  guideConstraints: string;
  evaluate: string;
}): string {
  return `${components.who}

${components.establishContext}

${components.defineDeliverable}

${components.guideConstraints}

${components.evaluate}`;
}

/**
 * Pre-built WEDGE prompts for common consulting scenarios.
 */
export const WEDGE_PROMPTS: WEDGEPrompt[] = [
  {
    id: "cold-email-outreach",
    name: "Cold Email Outreach",
    description:
      "Write a personalized cold outreach email to a prospective consulting client.",
    category: "business-development",
    who: "You are an expert business development consultant and copywriter who specializes in B2B outreach. You write emails that feel personal, not salesy, and focus on opening a conversation rather than making a pitch.",
    establishContext:
      "I am a {{consultantTitle}} who helps {{targetClientType}} with {{coreService}}. I am reaching out to {{contactName}}, the {{contactTitle}} at {{companyName}}. {{additionalContext}}",
    defineDeliverable:
      "Write a short, personalized cold email (under 150 words) that opens with a genuine observation about their business, connects it to a pain point I solve, and ends with a low-commitment call to action (a 15-minute call, not a sales meeting).",
    guideConstraints:
      "Requirements: (1) Do not start with 'I hope this email finds you well' or any generic opener. (2) Reference something specific about their company. (3) One clear value proposition — no feature lists. (4) Subject line must be under 7 words and curiosity-driven. (5) The CTA should be one simple question.",
    evaluate:
      "Before finalizing, check: Does this feel like it was written for them specifically? Would a busy executive read past the first sentence? Is the CTA frictionless? Revise if any answer is no.",
    fullPrompt: "",
    variables: [
      "consultantTitle",
      "targetClientType",
      "coreService",
      "contactName",
      "contactTitle",
      "companyName",
      "additionalContext",
    ],
  },
  {
    id: "proposal-executive-summary",
    name: "Proposal Executive Summary",
    description:
      "Write a compelling executive summary for a consulting proposal.",
    category: "proposals",
    who: "You are a senior management consultant with 20 years of experience writing proposals that win. You understand that executives skim — so every word must earn its place.",
    establishContext:
      "I am preparing a proposal for {{clientCompany}} to help them with {{projectDescription}}. The key business problem they are experiencing is {{businessProblem}}. Their desired outcome is {{desiredOutcome}}. The project would be {{timelineWeeks}} weeks and {{budget}}.",
    defineDeliverable:
      "Write a 150–200 word executive summary for this proposal. It should: (1) open by reflecting back their pain/challenge, (2) present the transformation we will deliver, (3) briefly describe our approach, (4) state the investment and timeline, (5) close with a compelling call to action.",
    guideConstraints:
      "Use confident, direct language. No hedge words like 'might', 'could potentially', 'hope to'. Write in second person ('your team', 'your business'). Quantify impact wherever possible. Avoid consulting jargon.",
    evaluate:
      "Read it aloud. Does it sound like a confident expert, or a vendor trying too hard? Would the CEO immediately understand what they are getting and why it matters? Tighten ruthlessly.",
    fullPrompt: "",
    variables: [
      "clientCompany",
      "projectDescription",
      "businessProblem",
      "desiredOutcome",
      "timelineWeeks",
      "budget",
    ],
  },
  {
    id: "discovery-call-insights",
    name: "Discovery Call Synthesis",
    description:
      "Synthesize raw notes from a discovery call into structured insights.",
    category: "client-research",
    who: "You are a seasoned management consultant skilled at listening for what clients say and — more importantly — what they do not say. You identify patterns, unstated needs, and opportunity signals in messy notes.",
    establishContext:
      "I just completed a discovery call with {{contactName}} at {{companyName}}. Here are my raw notes: {{rawNotes}}",
    defineDeliverable:
      "Synthesize these notes into: (1) The real business problem (often different from what they say it is), (2) Key decision criteria, (3) Buying signals and hesitations, (4) Stakeholder dynamics, (5) Recommended approach and positioning, (6) Three specific follow-up questions to ask.",
    guideConstraints:
      "Be direct about what you observe, including potentially uncomfortable truths (e.g., 'they do not have budget authority' or 'the real problem is leadership alignment, not the technical issue they described'). Use bullet points. No more than 400 words total.",
    evaluate:
      "Would a senior partner read this and immediately know how to position and move the deal forward? If not, revise for clarity and actionability.",
    fullPrompt: "",
    variables: ["contactName", "companyName", "rawNotes"],
  },
  {
    id: "linkedin-post",
    name: "LinkedIn Thought Leadership Post",
    description:
      "Write a high-engagement LinkedIn post that builds credibility and attracts clients.",
    category: "marketing",
    who: "You are a LinkedIn content strategist who helps independent consultants build an audience of their ideal clients. You know that the best-performing posts feel like conversations, not broadcasts.",
    establishContext:
      "I am a {{consultantType}} who helps {{targetAudience}} with {{coreChallenge}}. I want to share a post about {{topic}}. Key insight or story: {{keyInsight}}",
    defineDeliverable:
      "Write a LinkedIn post (200–300 words) that: (1) opens with a pattern-interrupt first line (no 'I am excited to share...'), (2) tells a short story or shares a counterintuitive insight, (3) delivers clear, actionable value, (4) ends with a question or gentle CTA that invites comments.",
    guideConstraints:
      "Use short paragraphs (1–2 sentences max). No buzzwords or corporate speak. Write for a 7th grade reading level. No emojis unless one enhances the point. The post must make my audience feel understood, not lectured.",
    evaluate:
      "Does the first line make you want to read the second? Does this build credibility without being braggy? Would someone screenshot and save this? If not, rewrite.",
    fullPrompt: "",
    variables: [
      "consultantType",
      "targetAudience",
      "coreChallenge",
      "topic",
      "keyInsight",
    ],
  },
  {
    id: "project-debrief",
    name: "Project Debrief & Case Study",
    description:
      "Transform a completed project into a compelling case study for marketing and pitches.",
    category: "marketing",
    who: "You are a marketing consultant and storyteller who helps consulting firms turn client work into compelling proof of capability. You write case studies that read like good journalism — specific, human, and results-focused.",
    establishContext:
      "I just completed a consulting engagement. Here are the details: Client type: {{clientType}}. Challenge: {{challenge}}. What I did: {{approach}}. Results: {{results}}. Duration: {{duration}}.",
    defineDeliverable:
      "Write a 250-word case study formatted as: (1) SITUATION (the problem, 2–3 sentences), (2) APPROACH (what we did, 3–4 sentences), (3) RESULTS (quantified outcomes, 2–3 bullets), (4) CLIENT QUOTE (a plausible testimonial they could approve). Anonymize the client unless I specify otherwise.",
    guideConstraints:
      "Every result must be quantified (%, $, days, etc.) or describe a specific qualitative outcome. Avoid vague phrases like 'significant improvement'. Write in past tense. Keep sentences punchy — no sentence over 25 words.",
    evaluate:
      "Would a prospective client in the same industry read this and think 'I need this person'? Are the results believable AND impressive? Is every sentence necessary? Tighten as needed.",
    fullPrompt: "",
    variables: [
      "clientType",
      "challenge",
      "approach",
      "results",
      "duration",
    ],
  },
  {
    id: "pricing-recommendation",
    name: "Project Pricing Recommendation",
    description:
      "Get a structured recommendation for how to price a consulting engagement.",
    category: "pricing",
    who: "You are a pricing strategist for professional services firms. You understand the psychology of value-based pricing and help consultants charge what they are worth — and land more deals as a result.",
    establishContext:
      "I am pricing a consulting engagement with the following details: Client size: {{clientSize}}. Project type: {{projectType}}. Estimated hours: {{estimatedHours}}. My hourly rate: {{hourlyRate}}. Industry: {{industry}}. Expected business impact for the client: {{businessImpact}}.",
    defineDeliverable:
      "Give me: (1) Three pricing options (Good/Better/Best — value ladder framing), (2) Rationale for each tier, (3) Which tier to lead with and why, (4) How to present this to the client without it feeling like a used car upsell.",
    guideConstraints:
      "Always anchor on client value, not my hours. The Best tier should be 2–3x the Good tier. Include a specific framing script for presenting the options. Be direct about which option maximizes both win rate and revenue.",
    evaluate:
      "Would a confident, experienced consultant be comfortable presenting these numbers? Are the tiers sufficiently differentiated? Does the framing make price a secondary concern after value? Revise if needed.",
    fullPrompt: "",
    variables: [
      "clientSize",
      "projectType",
      "estimatedHours",
      "hourlyRate",
      "industry",
      "businessImpact",
    ],
  },
  {
    id: "objection-handling",
    name: "Objection Handling Script",
    description:
      "Generate confident, empathetic responses to common sales objections.",
    category: "sales",
    who: "You are a sales coach for independent consultants. You help them respond to objections with empathy and confidence, without being pushy. You believe the best objection handling starts with genuine curiosity.",
    establishContext:
      "I am a {{consultantType}} in a {{meetingType}} with {{clientDescription}}. They just said: '{{objection}}'.",
    defineDeliverable:
      "Give me: (1) An immediate empathetic response that acknowledges the objection, (2) A clarifying question to understand the real concern, (3) A reframe that addresses the underlying need, (4) A transition that moves toward the next step.",
    guideConstraints:
      "Never argue. Never immediately 'handle' the objection with a counter-pitch. The goal is to understand and solve, not overcome. Keep each response under 50 words. Natural, conversational language only.",
    evaluate:
      "Would this response make the prospect feel heard? Does it open up the conversation rather than close it down? Would I be comfortable saying this out loud? Adjust tone if needed.",
    fullPrompt: "",
    variables: [
      "consultantType",
      "meetingType",
      "clientDescription",
      "objection",
    ],
  },
  {
    id: "sow-scope-definition",
    name: "SOW Scope Definition",
    description:
      "Define a tight, clear project scope to prevent scope creep and protect the engagement.",
    category: "contracts",
    who: "You are a consulting operations expert who helps independent consultants protect their time and profitability by writing airtight scope definitions. You have seen every form of scope creep and know how to prevent it.",
    establishContext:
      "I am scoping a {{projectType}} engagement for {{clientDescription}}. The client wants to achieve: {{clientGoals}}. The project will take approximately {{duration}} and costs {{budget}}.",
    defineDeliverable:
      "Write a scope definition section for my SOW including: (1) 3–5 clear IN-scope items with specific deliverables, (2) 3–5 clear OUT-of-scope items that pre-empt common creep scenarios, (3) A change management clause (1–2 sentences) that defines how additional work is handled.",
    guideConstraints:
      "Be ruthlessly specific. Vague scope = expensive disputes. Use 'includes' and 'excludes' language. Each item should be verifiable — if you cannot point to it and say 'done or not done', it is too vague.",
    evaluate:
      "If a disagreement arose, could you point to this document and have a clear answer? Does every deliverable have a definition of done? Is every out-of-scope item something that has actually come up before in similar engagements?",
    fullPrompt: "",
    variables: [
      "projectType",
      "clientDescription",
      "clientGoals",
      "duration",
      "budget",
    ],
  },
];

// Populate the fullPrompt field for each prompt
for (const prompt of WEDGE_PROMPTS) {
  prompt.fullPrompt = buildWEDGEPrompt({
    who: prompt.who,
    establishContext: prompt.establishContext,
    defineDeliverable: prompt.defineDeliverable,
    guideConstraints: prompt.guideConstraints,
    evaluate: prompt.evaluate,
  });
}

/**
 * Get a WEDGE prompt by ID.
 */
export function getWEDGEPrompt(id: string): WEDGEPrompt | undefined {
  return WEDGE_PROMPTS.find((p) => p.id === id);
}

/**
 * Get all WEDGE prompts in a category.
 */
export function getWEDGEPromptsByCategory(category: string): WEDGEPrompt[] {
  return WEDGE_PROMPTS.filter((p) => p.category === category);
}

/**
 * Get all unique categories.
 */
export function getWEDGECategories(): string[] {
  return [...new Set(WEDGE_PROMPTS.map((p) => p.category))];
}

/**
 * Interpolate variables in a WEDGE prompt template.
 */
export function interpolatePrompt(
  promptId: string,
  variables: Record<string, string>
): string {
  const prompt = getWEDGEPrompt(promptId);
  if (!prompt) {
    throw new Error(`WEDGE prompt '${promptId}' not found`);
  }

  let result = prompt.fullPrompt;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  return result;
}
