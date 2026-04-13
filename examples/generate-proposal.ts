/**
 * Example: Generate a consulting proposal
 *
 * This example demonstrates how to use the proposal-generator tool directly
 * in your TypeScript code (outside of MCP).
 *
 * Run with:
 *   npx tsx examples/generate-proposal.ts
 */

import { generateProposal } from "../src/tools/proposal-generator.js";

const proposal = generateProposal({
  clientName: "Sarah Chen",
  clientCompany: "Meridian Growth Co.",
  projectTitle: "Revenue Operations Transformation",
  projectScope:
    "Comprehensive assessment of current revenue operations including sales process, CRM utilization, lead management, and forecast accuracy. Development of a 90-day improvement roadmap with prioritized initiatives, KPI framework, and implementation playbook.",
  deliverables: [
    "Revenue operations maturity assessment (current state analysis)",
    "Gap analysis with benchmarked recommendations",
    "90-day transformation roadmap with prioritized initiatives",
    "CRM optimization guide and workflow templates",
    "KPI dashboard framework and reporting cadence",
    "Executive presentation of findings and recommendations",
  ],
  budgetMin: 22000,
  budgetMax: 28000,
  timelineWeeks: 8,
  consultantName: "Alex Rivera",
  consultantCompany: "Rivera Strategy Group",
  consultantEmail: "alex@riverastrategy.com",
  paymentTerms: "50/50",
  assumptions: [
    "Meridian Growth Co. will provide access to CRM data and sales team for interviews",
    "Key stakeholder availability will be confirmed within the first week",
    "Decision-making authority for recommendations resides with the VP of Sales",
  ],
  exclusions: [
    "CRM implementation or technical configuration",
    "Sales team training or coaching (available under separate engagement)",
    "Ongoing RevOps management post-project",
  ],
});

console.log(proposal);
