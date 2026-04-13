import { describe, it, expect } from "vitest";
import {
  generateClientResearch,
  clientResearchSchema,
} from "../../src/tools/client-research";

const baseInput = {
  companyName: "Acme Corp",
  companyDomain: "acmecorp.com",
  industry: "Manufacturing",
  meetingPurpose: "discovery" as const,
  contactName: "Alice Smith",
  contactTitle: "VP of Operations",
};

describe("clientResearchSchema", () => {
  it("validates valid input", () => {
    const result = clientResearchSchema.safeParse(baseInput);
    expect(result.success).toBe(true);
  });

  it("requires companyName", () => {
    const { companyName: _omitted, ...rest } = baseInput;
    const result = clientResearchSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("accepts optional fields being absent", () => {
    const result = clientResearchSchema.safeParse({ companyName: "TestCo" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid meetingPurpose", () => {
    const result = clientResearchSchema.safeParse({
      companyName: "TestCo",
      meetingPurpose: "invalid-purpose",
    });
    expect(result.success).toBe(false);
  });

  it("defaults meetingPurpose to discovery", () => {
    const result = clientResearchSchema.safeParse({ companyName: "TestCo" });
    if (result.success) {
      expect(result.data.meetingPurpose).toBe("discovery");
    }
  });

  it("accepts all valid meeting purposes", () => {
    const purposes = ["sales", "discovery", "pitch", "renewal", "general"];
    for (const purpose of purposes) {
      const result = clientResearchSchema.safeParse({
        companyName: "TestCo",
        meetingPurpose: purpose,
      });
      expect(result.success).toBe(true);
    }
  });
});

describe("generateClientResearch", () => {
  it("returns a non-empty string", () => {
    const input = clientResearchSchema.parse(baseInput);
    const result = generateClientResearch(input);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(100);
  });

  it("includes company name in output", () => {
    const input = clientResearchSchema.parse(baseInput);
    const result = generateClientResearch(input);
    expect(result).toContain("Acme Corp");
  });

  it("includes contact name when provided", () => {
    const input = clientResearchSchema.parse(baseInput);
    const result = generateClientResearch(input);
    expect(result).toContain("Alice Smith");
  });

  it("includes contact title when provided", () => {
    const input = clientResearchSchema.parse(baseInput);
    const result = generateClientResearch(input);
    expect(result).toContain("VP of Operations");
  });

  it("includes industry context when provided", () => {
    const input = clientResearchSchema.parse(baseInput);
    const result = generateClientResearch(input);
    expect(result).toContain("Manufacturing");
  });

  it("includes company domain when provided", () => {
    const input = clientResearchSchema.parse(baseInput);
    const result = generateClientResearch(input);
    expect(result).toContain("acmecorp.com");
  });

  it("includes key research sections", () => {
    const input = clientResearchSchema.parse(baseInput);
    const result = generateClientResearch(input);
    expect(result).toContain("Company Overview");
    expect(result).toContain("Talking Points");
    expect(result).toContain("Pre-Meeting Checklist");
  });

  it("includes pain points section", () => {
    const input = clientResearchSchema.parse(baseInput);
    const result = generateClientResearch(input);
    expect(result).toContain("Pain Points");
  });

  it("includes objection handling section", () => {
    const input = clientResearchSchema.parse(baseInput);
    const result = generateClientResearch(input);
    expect(result).toContain("Objections");
  });

  it("includes known context when provided", () => {
    const input = clientResearchSchema.parse({
      ...baseInput,
      knownContext: "They are struggling with supply chain delays.",
    });
    const result = generateClientResearch(input);
    expect(result).toContain("supply chain delays");
  });

  it("generates output for minimal input", () => {
    const input = clientResearchSchema.parse({ companyName: "StartupXYZ" });
    const result = generateClientResearch(input);
    expect(result).toContain("StartupXYZ");
  });

  it("adjusts meeting type label correctly", () => {
    const pitchInput = clientResearchSchema.parse({
      companyName: "BigCo",
      meetingPurpose: "pitch",
    });
    const result = generateClientResearch(pitchInput);
    expect(result).toContain("Pitch");
  });
});
