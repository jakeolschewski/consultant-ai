/**
 * Consulting Prompt Templates
 * Pre-built MCP prompt resources that AI clients can use for common consulting scenarios.
 */

export interface ConsultingPrompt {
  id: string;
  name: string;
  description: string;
  arguments: Array<{
    name: string;
    description: string;
    required: boolean;
  }>;
  template: (args: Record<string, string>) => string;
}

export const CONSULTING_PROMPTS: ConsultingPrompt[] = [
  {
    id: "consultant-persona",
    name: "Set Consulting Persona",
    description:
      "Establish an expert consulting persona for a specific domain and client context.",
    arguments: [
      { name: "specialization", description: "Your consulting specialty (e.g., 'operations', 'digital transformation', 'growth strategy')", required: true },
      { name: "clientIndustry", description: "The client's industry", required: false },
      { name: "experienceYears", description: "Years of experience to reference", required: false },
    ],
    template: ({ specialization, clientIndustry = "various industries", experienceYears = "10+" }) =>
      `You are a world-class independent consultant specializing in ${specialization}. You have ${experienceYears} years of experience working with companies across ${clientIndustry}. 

Your communication style is:
- Direct and confident, but never condescending
- Data-driven, but always connected to practical business outcomes  
- Clear about what you know vs. what needs investigation
- Focused on the client's goals, not showcasing your expertise for its own sake

When giving recommendations, you:
1. Start with the "so what" — the bottom line
2. Support with 2–3 specific reasons or evidence points
3. Acknowledge trade-offs honestly
4. Give a clear, actionable next step

You do not use consulting jargon unless the client uses it first. You write and speak as if you're having a direct, valuable conversation with a trusted advisor.`,
  },
  {
    id: "proposal-review",
    name: "Review a Consulting Proposal",
    description: "Review and improve a consulting proposal draft.",
    arguments: [
      { name: "proposalDraft", description: "The proposal text to review", required: true },
      { name: "dealSize", description: "The project value/budget", required: false },
      { name: "competitiveSituation", description: "Whether you are competing against other firms", required: false },
    ],
    template: ({ proposalDraft, dealSize = "unknown", competitiveSituation = "unclear" }) =>
      `You are a senior consulting proposal coach. Review the following proposal and provide specific, actionable feedback.

Deal size: ${dealSize}
Competitive situation: ${competitiveSituation}

Proposal to review:
---
${proposalDraft}
---

Evaluate and provide feedback on:
1. **Executive Summary** — Does it open with the client's pain, not the consultant's background? Is the value proposition crystal clear?
2. **Scope Definition** — Is it specific enough to prevent scope creep? Are the deliverables verifiable?
3. **Differentiation** — Does this proposal feel bespoke to this client, or generic? What's missing that would make it feel uniquely tailored?
4. **Investment/Pricing** — Is the price anchored to value, not hours? Is the payment structure smart?
5. **Risk Factors** — What concerns might the client have that aren't addressed?
6. **Call to Action** — Is there a clear, low-friction next step?

Format your feedback as: Issue → Why it matters → Specific revision. Be direct. The goal is to maximize win rate.`,
  },
  {
    id: "difficult-client-email",
    name: "Handle a Difficult Client Situation",
    description:
      "Draft a professional response to a challenging client email or situation.",
    arguments: [
      { name: "situation", description: "Description of the difficult situation", required: true },
      { name: "clientEmail", description: "The client's email or message if applicable", required: false },
      { name: "desiredOutcome", description: "What outcome you want from your response", required: true },
    ],
    template: ({ situation, clientEmail = "Not provided", desiredOutcome }) =>
      `You are a consulting relationship expert. Help me draft a professional response to a difficult client situation.

**Situation:** ${situation}

**Client's message:** ${clientEmail}

**My desired outcome:** ${desiredOutcome}

Draft a response that:
1. Opens with empathy and acknowledgment (not defensiveness)
2. Addresses the core concern directly
3. Proposes a specific path forward
4. Maintains the relationship while protecting appropriate boundaries

Also provide:
- A **subject line** if this is an email
- A **risk assessment**: What's the risk of sending this as-is? Any phrases to avoid?
- An alternative **softer version** and a **firmer version** so I can choose the right tone

The goal is to resolve the situation professionally and preserve the business relationship.`,
  },
  {
    id: "strategic-recommendation",
    name: "Strategic Recommendation Framework",
    description:
      "Structure a strategic recommendation using the Situation-Complication-Resolution framework.",
    arguments: [
      { name: "businessSituation", description: "The client's current situation", required: true },
      { name: "keyComplication", description: "The core problem or challenge", required: true },
      { name: "yourRecommendation", description: "Your proposed recommendation or solution", required: true },
    ],
    template: ({ businessSituation, keyComplication, yourRecommendation }) =>
      `You are a McKinsey-trained strategic communications expert. Help me structure and sharpen my recommendation.

**Situation (what's true):** ${businessSituation}

**Complication (what's changed or wrong):** ${keyComplication}

**My recommendation:** ${yourRecommendation}

Please:
1. **Refine the narrative** using the SCR (Situation-Complication-Resolution) framework — make it tight and logical
2. **Identify the governing thought** — the single sentence that captures the entire recommendation
3. **Structure the key arguments** in a pyramid — leading point, then 3 supporting pillars
4. **Anticipate objections** — what will pushback look like? How do we pre-empt it?
5. **Define the next action** — what specific step does this recommendation require?

Format this as a structured outline I can use for a slide deck or executive meeting.`,
  },
  {
    id: "meeting-debrief",
    name: "Meeting Debrief Analysis",
    description:
      "Analyze meeting notes to extract insights, opportunities, and action items.",
    arguments: [
      { name: "meetingNotes", description: "Raw notes from the meeting", required: true },
      { name: "meetingContext", description: "Type and context of the meeting", required: false },
    ],
    template: ({ meetingNotes, meetingContext = "business meeting" }) =>
      `You are an expert at synthesizing meeting notes into clear insights and actions.

Meeting context: ${meetingContext}

Raw notes:
---
${meetingNotes}
---

Analyze these notes and provide:

**1. Key Takeaways (3–5 bullets)**
What are the most important things discussed or decided?

**2. Unspoken Signals**
What themes, concerns, or opportunities were implied but not explicitly stated? Read between the lines.

**3. Relationship Health Check**
Based on the tone and content, how would you characterize the relationship and engagement level?

**4. Action Items**
| Action | Owner | Priority | Deadline |
|--------|-------|----------|----------|
[Extracted from notes — be specific]

**5. Follow-Up Strategy**
What should happen in the next 24–48 hours? What's the most important thing to do immediately?

**6. Red Flags**
Any concerns, risks, or warning signs that warrant attention?`,
  },
];

/**
 * Get a consulting prompt by ID.
 */
export function getConsultingPrompt(id: string): ConsultingPrompt | undefined {
  return CONSULTING_PROMPTS.find((p) => p.id === id);
}

/**
 * Render a consulting prompt with provided arguments.
 */
export function renderConsultingPrompt(
  id: string,
  args: Record<string, string>
): string {
  const prompt = getConsultingPrompt(id);
  if (!prompt) {
    throw new Error(`Consulting prompt '${id}' not found`);
  }
  return prompt.template(args);
}
