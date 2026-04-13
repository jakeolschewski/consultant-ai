import { describe, it, expect } from "vitest";
import {
  generateProposal,
  proposalGeneratorSchema,
} from "../../src/tools/proposal-generator";

const baseInput = {
  clientName: "Jane Doe",
  clientCompany: "Acme Corp",
  projectTitle: "Digital Transformation Strategy",
  projectScope:
    "Assessment of current digital maturity and development of a 12-month transformation roadmap.",
  deliverables: [
    "Digital maturity assessment",
    "Gap analysis",
    "Transformation roadmap",
  ],
  budgetMin: 10000,
  budgetMax: 15000,
  timelineWeeks: 6,
  consultantName: "John Consultant",
  consultantEmail: "john@example.com",
};

describe("proposalGeneratorSchema", () => {
  it("validates valid input successfully", () => {
    const result = proposalGeneratorSchema.safeParse(baseInput);
    expect(result.success).toBe(true);
  });

  it("rejects missing required fields", () => {
    const { clientName: _omitted, ...rest } = baseInput;
    const result = proposalGeneratorSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects empty clientName", () => {
    const result = proposalGeneratorSchema.safeParse({
      ...baseInput,
      clientName: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative budget", () => {
    const result = proposalGeneratorSchema.safeParse({
      ...baseInput,
      budgetMin: -5000,
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty deliverables array", () => {
    const result = proposalGeneratorSchema.safeParse({
      ...baseInput,
      deliverables: [],
    });
    expect(result.success).toBe(false);
  });

  it("applies default payment terms", () => {
    const result = proposalGeneratorSchema.safeParse(baseInput);
    if (result.success) {
      expect(result.data.paymentTerms).toBe("50/50");
    }
  });

  it("accepts all valid payment term options", () => {
    const validTerms = ["50/50", "monthly", "milestone", "net-30", "upfront"];
    for (const term of validTerms) {
      const result = proposalGeneratorSchema.safeParse({
        ...baseInput,
        paymentTerms: term,
      });
      expect(result.success).toBe(true);
    }
  });
});

describe("generateProposal", () => {
  it("returns a non-empty string", () => {
    const input = proposalGeneratorSchema.parse(baseInput);
    const result = generateProposal(input);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("includes the project title in output", () => {
    const input = proposalGeneratorSchema.parse(baseInput);
    const result = generateProposal(input);
    expect(result).toContain("Digital Transformation Strategy");
  });

  it("includes client name in output", () => {
    const input = proposalGeneratorSchema.parse(baseInput);
    const result = generateProposal(input);
    expect(result).toContain("Acme Corp");
  });

  it("includes consultant name in output", () => {
    const input = proposalGeneratorSchema.parse(baseInput);
    const result = generateProposal(input);
    expect(result).toContain("John Consultant");
  });

  it("includes all deliverables in output", () => {
    const input = proposalGeneratorSchema.parse(baseInput);
    const result = generateProposal(input);
    for (const deliverable of baseInput.deliverables) {
      expect(result).toContain(deliverable);
    }
  });

  it("includes budget range in output", () => {
    const input = proposalGeneratorSchema.parse(baseInput);
    const result = generateProposal(input);
    expect(result).toContain("10,000");
    expect(result).toContain("15,000");
  });

  it("contains required proposal sections", () => {
    const input = proposalGeneratorSchema.parse(baseInput);
    const result = generateProposal(input);
    expect(result).toContain("Executive Summary");
    expect(result).toContain("Deliverables");
    expect(result).toContain("Timeline");
    expect(result).toContain("Investment");
    expect(result).toContain("Terms & Acceptance");
  });

  it("generates different output for different payment terms", () => {
    const input50 = proposalGeneratorSchema.parse({
      ...baseInput,
      paymentTerms: "50/50",
    });
    const inputNet30 = proposalGeneratorSchema.parse({
      ...baseInput,
      paymentTerms: "net-30",
    });

    const result50 = generateProposal(input50);
    const resultNet30 = generateProposal(inputNet30);
    expect(result50).not.toBe(resultNet30);
  });

  it("includes project scope in output", () => {
    const input = proposalGeneratorSchema.parse(baseInput);
    const result = generateProposal(input);
    expect(result).toContain("Assessment of current digital maturity");
  });

  it("uses consultant company when provided", () => {
    const input = proposalGeneratorSchema.parse({
      ...baseInput,
      consultantCompany: "Strategy Partners LLC",
    });
    const result = generateProposal(input);
    expect(result).toContain("Strategy Partners LLC");
  });

  it("handles optional fields being absent", () => {
    const minimalInput = proposalGeneratorSchema.parse({
      clientName: "Bob Client",
      projectTitle: "Quick Project",
      projectScope: "Minimal scope for testing this generator tool.",
      deliverables: ["Report"],
      budgetMin: 5000,
      budgetMax: 8000,
      timelineWeeks: 4,
      consultantName: "Consultant Joe",
    });
    const result = generateProposal(minimalInput);
    expect(result).toBeTruthy();
    expect(result).toContain("Quick Project");
  });
});
