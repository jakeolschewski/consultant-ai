/**
 * Knowledge Base Resource
 * Consulting best practices and frameworks exposed as MCP resources.
 */

export interface KnowledgeBaseEntry {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
  content: string;
}

export const KNOWLEDGE_BASE: KnowledgeBaseEntry[] = [
  {
    uri: "consultant-ai://knowledge/pricing-guide",
    name: "Consulting Pricing Guide",
    description:
      "Comprehensive guide to pricing consulting services, including value-based pricing, rate calculations, and packaging strategies.",
    mimeType: "text/markdown",
    content: `# Consulting Pricing Guide

## The Pricing Mindset Shift

Most consultants price based on hours. The best consultants price based on value. 

**Hour-based thinking:** "I charge $150/hr × 40 hours = $6,000"
**Value-based thinking:** "If I help this company reduce churn by 10%, that's $200K/year in recovered revenue. $15,000 is a 13x ROI."

The moment you start pricing based on value to the client, your rates double.

---

## Rate Calculation Baseline

### The 3x Rule

If you were employed as a full-time employee in this role, your consulting rate should be approximately **3x your hourly equivalent salary**:

- Covers non-billable time (business development, admin, vacation, learning)
- Covers self-employment taxes and benefits
- Prices in risk premium and expertise premium

**Example:** If you'd earn $120K/yr as an employee = $57.69/hr equivalent → Consulting rate: $150–$175/hr

### Market Rate Ranges (2025)

| Specialization | Junior | Mid | Senior | Principal |
|----------------|--------|-----|--------|-----------|
| Strategy | $150 | $250 | $400 | $600+ |
| Technology | $125 | $200 | $350 | $500+ |
| Marketing | $100 | $175 | $300 | $450+ |
| Operations | $125 | $200 | $325 | $475+ |
| Finance/CFO | $150 | $250 | $400 | $600+ |
| HR/People | $100 | $175 | $275 | $400+ |

*Rates vary significantly by geography, industry, and client size.*

---

## Pricing Models

### 1. Time & Materials (T&M)
- **Best for:** Ambiguous scope, ongoing work, small engagements
- **Pros:** Simple, client sees effort, flexible
- **Cons:** Client focuses on hours not value, caps your earning potential
- **Tip:** Always use T&M with a not-to-exceed cap

### 2. Fixed-Fee / Project-Based
- **Best for:** Well-defined scope, deliverable-based work
- **Pros:** Predictable for client, rewards your efficiency
- **Cons:** Scope creep risk, requires tight SOW
- **Tip:** Add 20% buffer to your estimate for unknowns

### 3. Retainer
- **Best for:** Ongoing advisory, fractional roles, recurring support
- **Pros:** Recurring revenue, relationship depth, planning predictability
- **Cons:** Requires strong client relationship to set up
- **Tip:** Offer retainers after a successful project engagement

### 4. Value-Based / Outcome-Based
- **Best for:** High-impact, measurable outcomes (revenue, cost reduction)
- **Pros:** Aligns incentives, uncaps earning potential
- **Cons:** Requires measurable baseline, harder to set up
- **Tip:** Use hybrid: base fee + success bonus

### 5. Good / Better / Best (Value Ladder)
Present 3 tiers to anchor on the middle. Example:
- **Good ($5K):** Strategy assessment + recommendations report
- **Better ($12K):** Assessment + 90-day implementation roadmap + 4 hours advisory  
- **Best ($25K):** Full implementation support through first milestone

---

## Packaging for Maximum Revenue

### The Anchor Effect
Always lead with your premium offer. The price of your core offer feels more reasonable after the client has mentally processed a higher number.

### The Access Model
Sell different levels of access, not just different amounts of work:
- **Done-for-you** (highest value, highest price)
- **Done-with-you** (collaborative, mid-price)
- **Self-service / templates** (low price, scalable)

---

## Negotiation Principles

1. **Never negotiate against yourself.** Give your price and stop talking.
2. **Silence is not agreement.** When they pause after your price, stay quiet.
3. **Trade, don't discount.** "I can reduce the price if we reduce the scope."
4. **Anchor high.** Your first number sets the negotiation floor.
5. **The budget question.** Asking "what budget do you have in mind?" is not pushy — it's efficient.
`,
  },
  {
    uri: "consultant-ai://knowledge/consulting-best-practices",
    name: "Consulting Best Practices",
    description:
      "Core principles and practices of effective independent consulting, from client management to deliverable quality.",
    mimeType: "text/markdown",
    content: `# Consulting Best Practices

## The Fundamentals

### 1. Diagnose Before Prescribing
Never propose a solution until you deeply understand the problem. The presenting problem is rarely the real problem.

**Common mistake:** Client says "we need a new CRM." Real problem: "our sales team doesn't follow up consistently."

**Rule:** Spend at least 30% of every engagement on diagnosis.

### 2. Start with the End in Mind
Define success before you start. What specific, measurable outcome will exist at the end of this engagement that doesn't exist now?

If you can't define it specifically, you can't scope it, price it, or deliver it.

### 3. Communicate More Than You Think You Need To
Client anxiety peaks when they don't know what you're doing. Silence feels like nothing is happening.

**Cadence minimum:**
- Weekly written status update (even 5 bullets)
- Bi-weekly check-in call
- Immediate heads-up for anything that might surprise them

---

## Client Management

### The 3 Things Clients Actually Want
1. **Competence** — Confidence that you know what you're doing
2. **Reliability** — Follow through on what you say, when you say it
3. **Care** — Feeling like their success genuinely matters to you

Most consultants oversell competence and underdeliver on reliability and care.

### Managing Expectations
- **Under-promise, over-deliver** is a cliché because it works
- State explicitly what's in and out of scope in writing before starting
- When scope changes, document it and discuss implications before proceeding
- Bad news travels faster by phone than email

### Red Flag Clients
Watch for these early in the relationship:
- Resistant to signing formal agreements
- Disputes basic terms or asks for excessive discounts upfront
- Doesn't have a clear decision-maker
- Dismisses your advice before you've fully presented it
- Has "fired" multiple consultants before

---

## Delivering Excellent Work

### The Pyramid Principle (Barbara Minto)
Structure every important communication:
1. **Governing thought** — the single sentence that summarizes everything
2. **Key arguments** — the 3 points that prove the governing thought
3. **Supporting evidence** — facts, data, analysis under each argument

Never bury the recommendation at the end. Start with the answer.

### Documentation Standards
Every deliverable should have:
- A clear title and date
- An executive summary (the "so what" in 3 sentences)
- The body content
- Appendices for supporting detail
- Clear next steps or recommendations

### Feedback Cycles
- Provide a draft 48 hours before final deadline
- Build in 2 revision rounds in scope
- Define "final" explicitly — what does acceptance look like?

---

## Business Development

### The Best Marketing Is Your Work
Referrals from happy clients generate more revenue per hour invested than any other channel. Make your clients want to tell people about you.

### The Follow-Up System
80% of sales happen after the 5th follow-up. Most consultants give up after 2.
- Follow up at 3 days, 7 days, 14 days, 30 days
- Each follow-up should provide value (insight, article, resource) — not just "checking in"

### Positioning
You can't be everything to everyone. The more specific your niche, the higher your fees:
- "I'm a business consultant" → $150/hr
- "I help SaaS companies reduce churn" → $350/hr
- "I'm the person who reduced Acme's churn from 8% to 2.5%" → $600/hr

---

## Financial Management

### The Cash Flow Trap
Consulting cash flow is irregular. Protect yourself:
- Keep 6 months of operating expenses in reserves
- Invoice immediately upon milestone completion
- Use 50% upfront deposits on all projects
- Never start work without a signed agreement and deposit

### The Utilization Reality
A 100% utilization rate is unsustainable. Aim for 60–75% billable time.
The other 25–40% is: business development, admin, learning, vacation.

**Healthy revenue formula:**
Available hours/year (2,080) × target utilization (65%) × hourly rate = target revenue
Example: 2,080 × 65% × $200 = $270,400/yr
`,
  },
  {
    uri: "consultant-ai://knowledge/wedge-framework-guide",
    name: "WEDGE Framework Guide",
    description:
      "Complete guide to the WEDGE prompt methodology for getting consistently excellent outputs from AI tools.",
    mimeType: "text/markdown",
    content: `# The WEDGE Framework for AI Prompting

## What is WEDGE?

WEDGE is a 5-part prompt structure that helps consultants write AI prompts that produce consistently professional, high-quality outputs. Most consultants use AI like a search engine — they get mediocre results. WEDGE prompts get expert-level results.

**W** — Who: Establish the AI's role and expertise  
**E** — Establish context: Give the AI your specific situation  
**D** — Define deliverable: Tell the AI exactly what to produce  
**G** — Guide constraints: Set quality standards, format, and rules  
**E** — Evaluate: Tell the AI how to self-check before responding  

---

## The Five Components

### W — Who
Define the persona or expertise the AI should embody. Be specific about domain, experience, and communication style.

**Weak:** "You are an expert consultant."
**Strong:** "You are a management consultant with 15 years of experience in healthcare operations. You have led 30+ cost optimization engagements and understand the political dynamics of hospital systems. You communicate in direct, plain English — no jargon."

### E — Establish Context
Give the AI your specific situation. The more specific, the better the output.

**Weak:** "I need help with a client proposal."
**Strong:** "I am preparing a proposal for a 200-person SaaS company that has seen their customer churn increase from 4% to 9% over the past 2 quarters. The decision-maker is the CFO, who is skeptical of consultants. My estimated project scope is 8 weeks at $35,000."

### D — Define Deliverable
Tell the AI exactly what you want it to produce — format, length, structure.

**Weak:** "Write me a proposal."
**Strong:** "Write a 3-paragraph executive summary that: (1) opens with their churn problem and its financial impact, (2) presents my recommended approach in one sentence, (3) closes with a clear statement of the investment and timeline."

### G — Guide Constraints
Set quality standards, rules, and formatting requirements. This prevents the AI from producing generic output.

**Examples:**
- "Use second person (you/your). No consulting jargon. Maximum 200 words."
- "No bullet lists — write in flowing paragraphs. Executive reading level."
- "Every recommendation must be actionable in the next 30 days."
- "Quantify every claim. No vague phrases like 'significant improvement'."

### E — Evaluate
Tell the AI to check its own work before responding. This dramatically improves quality.

**Examples:**
- "Before responding, ask: Would a skeptical CFO find this credible? If not, revise."
- "After drafting, check: Does every sentence earn its place? Remove any fluff."
- "Self-check: Is the recommendation specific enough to implement immediately? If not, add specificity."

---

## WEDGE in Practice

### Before WEDGE:
> "Write a follow-up email after my sales meeting."

Result: Generic, could have been written by anyone, won't get a response.

### After WEDGE:
> **W:** You are a B2B sales coach who helps consultants write follow-up emails that feel personal and move deals forward.
> 
> **E:** I just met with Sarah Chen, VP of Marketing at a 300-person fintech company. She expressed interest in a brand positioning project but mentioned they're in budget planning for Q2. Her biggest concern was that past consultants had been "too theoretical."
> 
> **D:** Write a follow-up email (under 150 words) that references our conversation, addresses her "too theoretical" concern directly with a concrete example, and proposes a specific low-commitment next step.
> 
> **G:** Warm but professional tone. No "I hope this email finds you well." Open with a reference to something specific she said. End with one clear question.
> 
> **E:** Read the draft and ask: Does this feel like it was written specifically for Sarah, or could it have been sent to anyone? If it sounds generic, rewrite.

Result: A personalized, response-worthy email.

---

## WEDGE Quick Reference Card

| Component | Question to Answer |
|-----------|-------------------|
| **W**ho | What expert role should the AI play? |
| **E**stablish | What's my specific situation and context? |
| **D**efine | What exactly should the AI produce? (format, length, structure) |
| **G**uide | What rules and constraints define quality? |
| **E**valuate | How should the AI verify quality before responding? |

---

*The WEDGE Framework is developed by WEDGE Method LLC · thewedgemethodai.com*
`,
  },
];

/**
 * Get a knowledge base entry by URI.
 */
export function getKnowledgeEntry(uri: string): KnowledgeBaseEntry | undefined {
  return KNOWLEDGE_BASE.find((k) => k.uri === uri);
}

/**
 * Get all knowledge base URIs.
 */
export function getKnowledgeURIs(): string[] {
  return KNOWLEDGE_BASE.map((k) => k.uri);
}
