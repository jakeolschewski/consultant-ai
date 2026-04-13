/**
 * Meeting Prep Tool
 * Generates a complete meeting preparation kit: agenda, questions, objection handling,
 * and a ready-to-use follow-up template.
 */

import { z } from "zod";
import {
  h1,
  h2,
  ul,
  ol,
  table,
  sections,
  hr,
} from "../utils/markdown.js";
import { formatLongDate } from "../utils/date.js";

export const meetingPrepSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  clientCompany: z.string().optional(),
  meetingType: z
    .enum([
      "discovery",
      "review",
      "pitch",
      "kickoff",
      "check-in",
      "retrospective",
      "proposal-presentation",
      "onboarding",
    ])
    .default("discovery"),
  meetingDate: z.string().optional(),
  durationMinutes: z.number().int().positive().optional().default(60),
  attendees: z.array(z.string()).optional(),
  context: z.string().optional(),
  goals: z.array(z.string()).optional(),
});

export type MeetingPrepInput = z.infer<typeof meetingPrepSchema>;

const meetingTypeConfig: Record<
  string,
  {
    label: string;
    objective: string;
    agendaItems: Array<{ item: string; minutes: number }>;
    questions: string[];
    watchOuts: string[];
  }
> = {
  discovery: {
    label: "Discovery Meeting",
    objective:
      "Understand the client's current situation, challenges, and aspirations. Build rapport and qualify fit.",
    agendaItems: [
      { item: "Introductions & meeting context", minutes: 5 },
      { item: "Their current situation — business, team, priorities", minutes: 15 },
      { item: "Key challenges and pain points exploration", minutes: 15 },
      { item: "Desired outcomes and success metrics", minutes: 10 },
      { item: "Decision process, timeline, and stakeholders", minutes: 10 },
      { item: "Q&A and next steps", minutes: 5 },
    ],
    questions: [
      "What prompted you to explore this now — what's changed recently?",
      "Walk me through how your team is currently handling [challenge]. What's working, what isn't?",
      "If we could wave a magic wand, what would the ideal outcome look like in 6 months?",
      "Who else in the organization is most affected by this challenge?",
      "How will success be measured — what's the metric that matters most to leadership?",
      "Have you tried to solve this before? What happened?",
      "What's the biggest risk of doing nothing?",
      "What does your timeline look like, and is there a hard deadline driving it?",
      "Who else is involved in the decision to move forward with an outside partner?",
    ],
    watchOuts: [
      "If they struggle to articulate the problem, the need may not be urgent yet",
      "Multiple stakeholders without a clear owner = long sales cycle",
      "Vague success metrics = scope creep risk later",
      "\"We tried that before\" = learn what went wrong before proposing similar approach",
    ],
  },
  pitch: {
    label: "Proposal Presentation",
    objective:
      "Present your solution, demonstrate clear ROI, and advance to agreement.",
    agendaItems: [
      { item: "Recap of their situation and goals (confirm alignment)", minutes: 5 },
      { item: "Proposed approach and methodology", minutes: 15 },
      { item: "Deliverables, milestones, and timeline", minutes: 10 },
      { item: "Investment and payment structure", minutes: 10 },
      { item: "Q&A — address concerns and objections", minutes: 15 },
      { item: "Next steps and path to agreement", minutes: 5 },
    ],
    questions: [
      "Before I dive in — has anything changed since our last conversation?",
      "Is there anything I should make sure to cover for the decision-makers in the room?",
      "What matters most to you in choosing a partner for this engagement?",
      "On a scale of 1–10, how closely does this proposal address what you need?",
      "What questions do you need answered before you can move forward?",
      "Is there any reason we couldn't start within the next two weeks?",
    ],
    watchOuts: [
      "Don't present until you've confirmed all decision-makers are in the room",
      "Anchor on value/ROI before discussing price",
      "If they ask to \"think about it\", get a specific date for follow-up",
      "Price objections often signal unclear value — revisit outcomes, not features",
    ],
  },
  review: {
    label: "Project Review Meeting",
    objective: "Review progress against milestones, surface blockers, and maintain stakeholder alignment.",
    agendaItems: [
      { item: "Progress recap — what's been completed since last meeting", minutes: 10 },
      { item: "Walk-through of deliverables / work in progress", minutes: 20 },
      { item: "Blockers, risks, and decisions needed", minutes: 15 },
      { item: "Updated timeline and next milestone preview", minutes: 10 },
      { item: "Feedback, questions, and action items", minutes: 5 },
    ],
    questions: [
      "Do the deliverables presented match your expectations? Any adjustments needed?",
      "Are there any stakeholders who haven't seen this yet who should?",
      "Have there been any changes in priorities or constraints on your end?",
      "What's most important to make progress on before our next meeting?",
      "Any blockers on your side that I should know about?",
    ],
    watchOuts: [
      "Scope changes — document them formally before agreeing to anything",
      "Stakeholder fatigue — keep meetings focused and outcome-driven",
      "\"Let's circle back on that\" = get specific before the meeting ends",
    ],
  },
  kickoff: {
    label: "Project Kick-Off Meeting",
    objective:
      "Align on project goals, roles, communication norms, and set the tone for a high-quality engagement.",
    agendaItems: [
      { item: "Introductions — team members on both sides", minutes: 10 },
      { item: "Project goals and success metrics — confirm alignment", minutes: 15 },
      { item: "Roles, responsibilities, and decision-making authority", minutes: 10 },
      { item: "Communication norms: cadence, channels, escalation path", minutes: 10 },
      { item: "Immediate next steps and first milestone", minutes: 10 },
      { item: "Questions and open items", minutes: 5 },
    ],
    questions: [
      "Who is the primary day-to-day contact for this engagement?",
      "What's the best way to reach you if something urgent comes up?",
      "Are there any internal constraints (meetings, blackout dates, busy seasons) I should plan around?",
      "What would make this engagement a 10/10 in your eyes?",
      "What access, data, or introductions will I need in week one?",
    ],
    watchOuts: [
      "Ambiguous ownership = future conflict — get explicit role clarity",
      "Undocumented scope = revisit the SOW and get sign-off before starting",
      "Communication gaps — establish norms now to avoid issues at 4 weeks",
    ],
  },
  "check-in": {
    label: "Status Check-In",
    objective: "Brief alignment on progress, address any emerging issues, maintain relationship.",
    agendaItems: [
      { item: "Quick wins and progress update", minutes: 10 },
      { item: "Blockers or risks needing attention", minutes: 10 },
      { item: "Upcoming milestones and priorities", minutes: 10 },
      { item: "Open questions", minutes: 5 },
      { item: "Next steps", minutes: 5 },
    ],
    questions: [
      "Is anything blocking us from hitting next week's milestone?",
      "Has anything changed in your priorities that I should factor in?",
      "Any feedback from other stakeholders I should know about?",
      "On track for [upcoming milestone] — anything I can do to help?",
    ],
    watchOuts: [
      "Keep it tight — scope creep starts in informal conversations",
      "Document any new requests immediately",
    ],
  },
  retrospective: {
    label: "Project Retrospective",
    objective: "Honestly evaluate what went well, what could be improved, and capture insights for the next engagement.",
    agendaItems: [
      { item: "Outcomes review — did we hit the goals we set?", minutes: 15 },
      { item: "What went well (keep doing)", minutes: 10 },
      { item: "What could be improved (change for next time)", minutes: 15 },
      { item: "Lessons learned and key insights", minutes: 10 },
      { item: "Future opportunities and referrals", minutes: 10 },
    ],
    questions: [
      "Looking back, what are you most pleased with from this engagement?",
      "Is there anything we could have done differently that would have made a bigger impact?",
      "Did the project deliver the value you were expecting? Why or why not?",
      "Would you work with me again? If yes, what would the ideal next project look like?",
      "Do you know anyone else in your network who could benefit from this kind of support?",
    ],
    watchOuts: [
      "This is also a business development meeting — ask about referrals and future work",
      "Get a testimonial or case study permission while the experience is fresh",
      "Be genuinely open to critical feedback — it makes you a better consultant",
    ],
  },
  "proposal-presentation": {
    label: "Proposal Presentation",
    objective: "Present your solution, demonstrate clear ROI, and advance to agreement.",
    agendaItems: [
      { item: "Recap of their situation and goals", minutes: 5 },
      { item: "Proposed solution and approach", minutes: 15 },
      { item: "Deliverables and timeline", minutes: 10 },
      { item: "Investment overview", minutes: 10 },
      { item: "Q&A and objection handling", minutes: 15 },
      { item: "Next steps", minutes: 5 },
    ],
    questions: [
      "Before I dive in — has anything changed since we last spoke?",
      "What matters most to you in choosing a partner?",
      "What questions do you need answered before moving forward?",
    ],
    watchOuts: [
      "Confirm all decision makers are present before presenting",
      "Lead with value, not price",
    ],
  },
  onboarding: {
    label: "Client Onboarding Meeting",
    objective: "Welcome the client, set expectations, and ensure a smooth start to the engagement.",
    agendaItems: [
      { item: "Welcome and overview of the engagement", minutes: 10 },
      { item: "Review signed agreement and scope", minutes: 10 },
      { item: "Tools, access, and logistics setup", minutes: 15 },
      { item: "Communication preferences and meeting schedule", minutes: 10 },
      { item: "First week priorities", minutes: 10 },
      { item: "Q&A", minutes: 5 },
    ],
    questions: [
      "What's the best way to share files and collaborate with your team?",
      "Who should I copy on communications?",
      "Are there any upcoming events, launches, or deadlines I should know about?",
      "What does a successful first two weeks look like to you?",
    ],
    watchOuts: [
      "Get all access and permissions sorted in the first 48 hours",
      "Set clear expectations about communication response times",
    ],
  },
};

export function generateMeetingPrep(input: MeetingPrepInput): string {
  const config = meetingTypeConfig[input.meetingType];
  const clientDisplay = input.clientCompany
    ? `${input.clientName} (${input.clientCompany})`
    : input.clientName;
  const dateDisplay = input.meetingDate
    ? input.meetingDate
    : formatLongDate();
  const attendeesList = input.attendees?.length
    ? input.attendees
    : ["_[To be confirmed]_"];
  const goals = input.goals?.length
    ? input.goals
    : [
        `Achieve primary meeting objective: ${config.objective}`,
        "Build trust and demonstrate clear value",
        "Leave with a specific agreed next step",
      ];

  // Scale agenda to actual duration
  const totalConfigMinutes = config.agendaItems.reduce(
    (sum, a) => sum + a.minutes,
    0
  );
  const scale = input.durationMinutes / totalConfigMinutes;
  const scaledAgenda = config.agendaItems.map((item) => ({
    ...item,
    minutes: Math.round(item.minutes * scale),
  }));

  return sections(
    h1(`Meeting Prep: ${config.label}`),
    `**Client:** ${clientDisplay} | **Date:** ${dateDisplay} | **Duration:** ${input.durationMinutes} min\n`,
    "\n",
    h2("Meeting Objective"),
    `${config.objective}\n`,
    "\n",
    h2("Your Goals for This Meeting"),
    ol(goals),
    "\n",
    hr(),
    "\n",
    h2("Agenda"),
    table(
      ["#", "Agenda Item", "Time"],
      scaledAgenda.map((item, i) => [
        String(i + 1),
        item.item,
        `${item.minutes} min`,
      ])
    ),
    "\n",
    h2("Attendees"),
    ul(attendeesList),
    "\n",
    input.context
      ? `${h2("Context & Background")}\n${input.context}\n\n`
      : "",
    h2("Key Questions to Ask"),
    ol(config.questions),
    "\n",
    h2("Watch-Outs & Facilitation Tips"),
    ul(config.watchOuts),
    "\n",
    h2("Opening (First 60 Seconds)"),
    `> _"Thanks for making time today, [Name]. My goal for our ${input.durationMinutes} minutes is [primary goal]. I'd love to start by making sure I understand your situation accurately — so I'll be asking a lot of questions. Does that work for you?"_\n`,
    "\n",
    h2("Closing (Last 5 Minutes)"),
    ul([
      `Summarize what you heard: _"Based on what you've shared, it sounds like the core challenge is [X] and the outcome you're looking for is [Y]. Is that right?"_`,
      `Confirm interest: _"Given what we've discussed, does this feel like a good fit to move forward?"_`,
      `Propose next step: _"I'd like to [send a proposal / schedule a follow-up / introduce you to the team] — can we put [date] on the calendar now?"_`,
    ]),
    "\n",
    h2("Post-Meeting Follow-Up Template"),
    `_Send within 24 hours of the meeting:_\n`,
    "\n",
    "---\n",
    `**Subject:** Thank you — ${config.label} recap + next steps\n\n`,
    `Hi [Name],\n\nThank you for your time today. I found our conversation about [key topic] really valuable. Here's a quick recap of what we discussed:\n\n`,
    `**What we covered:**\n- [Key point 1]\n- [Key point 2]\n- [Key point 3]\n\n`,
    `**Action items:**\n- [ ] [Your action item with deadline]\n- [ ] [Their action item with deadline]\n\n`,
    `**Next step:** [Agreed next step — e.g., "I'll send a proposal by [date]" or "Let's connect again on [date]"]\n\n`,
    `Looking forward to working together. Let me know if you have any questions in the meantime.\n\nBest,\n[Your name]\n`,
    "---\n",
    "\n",
    hr(),
    `\n*Generated by consultant-ai · thewedgemethodai.com*\n`
  );
}
