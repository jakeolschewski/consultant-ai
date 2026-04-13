/**
 * Example: Generate a client research brief
 *
 * This example shows how to generate a pre-meeting research brief
 * for an upcoming discovery call.
 *
 * Run with:
 *   npx tsx examples/client-research.ts
 */

import { generateClientResearch } from "../src/tools/client-research.js";

// Example 1: Discovery meeting with a tech company
const discoveryBrief = generateClientResearch({
  companyName: "Shopify",
  companyDomain: "shopify.com",
  industry: "E-commerce / SaaS",
  meetingPurpose: "discovery",
  contactName: "Marcus Johnson",
  contactTitle: "VP of Merchant Success",
  knownContext:
    "Shopify is expanding their merchant services division and exploring external support for enterprise merchant onboarding process optimization.",
});

console.log("=== CLIENT RESEARCH BRIEF ===\n");
console.log(discoveryBrief);

console.log("\n\n=== PITCH MEETING BRIEF ===\n");

// Example 2: Pitch meeting with a financial services firm
const pitchBrief = generateClientResearch({
  companyName: "Clearwater Capital",
  industry: "Financial Services",
  meetingPurpose: "pitch",
  contactName: "Elena Vasquez",
  contactTitle: "Chief Operating Officer",
});

console.log(pitchBrief);
