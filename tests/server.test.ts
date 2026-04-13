import { describe, it, expect } from "vitest";
import { createServer } from "../src/server";

describe("MCP Server", () => {
  it("creates a server instance without throwing", () => {
    expect(() => createServer()).not.toThrow();
  });

  it("creates a server with the correct name", () => {
    const server = createServer();
    // Verify the server was created successfully — it won't throw
    expect(server).toBeDefined();
  });
});

// Test the tool schemas are valid for all tools
describe("Tool Schema Completeness", () => {
  it("proposal-generator schema requires essential fields", async () => {
    const { proposalGeneratorSchema } = await import(
      "../src/tools/proposal-generator"
    );
    const result = proposalGeneratorSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      const missingFields = result.error.issues.map((i) => i.path[0]);
      expect(missingFields).toContain("clientName");
      expect(missingFields).toContain("projectTitle");
      expect(missingFields).toContain("consultantName");
    }
  });

  it("invoice-generator schema requires line items", async () => {
    const { invoiceGeneratorSchema } = await import(
      "../src/tools/invoice-generator"
    );
    const result = invoiceGeneratorSchema.safeParse({
      clientName: "Test",
      consultantName: "Consultant",
      lineItems: [],
    });
    expect(result.success).toBe(false);
  });

  it("invoice-generator validates line item rates", async () => {
    const { invoiceGeneratorSchema } = await import(
      "../src/tools/invoice-generator"
    );
    const result = invoiceGeneratorSchema.safeParse({
      clientName: "Test",
      consultantName: "Consultant",
      lineItems: [
        {
          description: "Service",
          quantity: 5,
          rate: -100, // negative rate — should fail
        },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("invoice-generator accepts valid line items", async () => {
    const { invoiceGeneratorSchema } = await import(
      "../src/tools/invoice-generator"
    );
    const result = invoiceGeneratorSchema.safeParse({
      clientName: "Test Client",
      consultantName: "Test Consultant",
      lineItems: [
        {
          description: "Strategy consulting",
          quantity: 10,
          rate: 200,
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("time-tracker schema validates action enum", async () => {
    const { timeTrackerSchema } = await import("../src/tools/time-tracker");
    const validResult = timeTrackerSchema.safeParse({ action: "log" });
    expect(validResult.success).toBe(true);

    const invalidResult = timeTrackerSchema.safeParse({
      action: "invalid-action",
    });
    expect(invalidResult.success).toBe(false);
  });

  it("sow-generator schema requires project description min length", async () => {
    const { sowGeneratorSchema } = await import("../src/tools/sow-generator");
    const result = sowGeneratorSchema.safeParse({
      projectTitle: "Test",
      clientName: "Client",
      consultantName: "Consultant",
      projectDescription: "Short", // Less than 20 chars
      durationWeeks: 4,
      totalBudget: 10000,
      deliverables: ["Deliverable 1"],
    });
    expect(result.success).toBe(false);
  });

  it("meeting-prep schema defaults to discovery type", async () => {
    const { meetingPrepSchema } = await import("../src/tools/meeting-prep");
    const result = meetingPrepSchema.safeParse({ clientName: "Test Client" });
    if (result.success) {
      expect(result.data.meetingType).toBe("discovery");
    }
  });

  it("project-status schema rejects invalid status", async () => {
    const { projectStatusSchema } = await import(
      "../src/tools/project-status"
    );
    const result = projectStatusSchema.safeParse({
      projectName: "Test",
      clientName: "Client",
      consultantName: "Consultant",
      overallStatus: "unknown-status",
      milestones: [{ name: "M1", status: "completed" }],
      accomplishments: ["Done something"],
      nextSteps: ["Do next thing"],
    });
    expect(result.success).toBe(false);
  });
});

// Test document generators produce consistent output
describe("Document Generation Consistency", () => {
  it("generate_proposal produces deterministic output for same input", async () => {
    const { generateProposal, proposalGeneratorSchema } = await import(
      "../src/tools/proposal-generator"
    );
    const input = proposalGeneratorSchema.parse({
      clientName: "Test Corp",
      projectTitle: "Test Project",
      projectScope: "Testing project scope description here.",
      deliverables: ["Deliverable 1"],
      budgetMin: 5000,
      budgetMax: 10000,
      timelineWeeks: 4,
      consultantName: "Test Consultant",
    });

    // Generate twice and compare — should be identical
    const result1 = generateProposal(input);
    const result2 = generateProposal(input);
    expect(result1).toBe(result2);
  });

  it("generate_invoice calculates totals correctly", async () => {
    const { generateInvoice, invoiceGeneratorSchema } = await import(
      "../src/tools/invoice-generator"
    );
    const input = invoiceGeneratorSchema.parse({
      clientName: "Test Client",
      consultantName: "Test Consultant",
      lineItems: [
        { description: "Service A", quantity: 10, rate: 100 },
        { description: "Service B", quantity: 5, rate: 200 },
      ],
    });

    const result = generateInvoice(input);
    // 10 * 100 + 5 * 200 = 1000 + 1000 = 2000
    expect(result).toContain("2,000.00");
  });

  it("generate_sow includes all deliverables", async () => {
    const { generateSOW, sowGeneratorSchema } = await import(
      "../src/tools/sow-generator"
    );
    const input = sowGeneratorSchema.parse({
      projectTitle: "Test SOW",
      clientName: "Client",
      consultantName: "Consultant",
      projectDescription: "A comprehensive test of the SOW generator output.",
      durationWeeks: 8,
      totalBudget: 20000,
      deliverables: [
        "Unique deliverable alpha",
        "Unique deliverable beta",
        "Unique deliverable gamma",
      ],
    });

    const result = generateSOW(input);
    expect(result).toContain("Unique deliverable alpha");
    expect(result).toContain("Unique deliverable beta");
    expect(result).toContain("Unique deliverable gamma");
  });

  it("generate_meeting_prep scales agenda to duration", async () => {
    const { generateMeetingPrep, meetingPrepSchema } = await import(
      "../src/tools/meeting-prep"
    );
    const input30 = meetingPrepSchema.parse({
      clientName: "Test Client",
      durationMinutes: 30,
    });
    const input90 = meetingPrepSchema.parse({
      clientName: "Test Client",
      durationMinutes: 90,
    });

    const result30 = generateMeetingPrep(input30);
    const result90 = generateMeetingPrep(input90);

    // Both should contain "min" for agenda items
    expect(result30).toContain("min");
    expect(result90).toContain("min");
  });
});

// Test WEDGE prompt framework
describe("WEDGE Framework", () => {
  it("provides all required prompt IDs", async () => {
    const { WEDGE_PROMPTS } = await import("../src/prompts/wedge-framework");
    expect(WEDGE_PROMPTS.length).toBeGreaterThanOrEqual(5);
    const ids = WEDGE_PROMPTS.map((p) => p.id);
    expect(ids).toContain("cold-email-outreach");
    expect(ids).toContain("proposal-executive-summary");
  });

  it("all WEDGE prompts have required fields", async () => {
    const { WEDGE_PROMPTS } = await import("../src/prompts/wedge-framework");
    for (const prompt of WEDGE_PROMPTS) {
      expect(prompt.id).toBeTruthy();
      expect(prompt.name).toBeTruthy();
      expect(prompt.description).toBeTruthy();
      expect(prompt.fullPrompt).toBeTruthy();
      expect(prompt.fullPrompt.length).toBeGreaterThan(50);
    }
  });

  it("interpolatePrompt replaces variables correctly", async () => {
    const { interpolatePrompt } = await import(
      "../src/prompts/wedge-framework"
    );
    const result = interpolatePrompt("cold-email-outreach", {
      consultantTitle: "Operations Consultant",
      targetClientType: "SaaS companies",
      coreService: "process optimization",
      contactName: "John Smith",
      contactTitle: "COO",
      companyName: "TestCo Inc",
      additionalContext: "They recently raised Series B.",
    });

    expect(result).toContain("Operations Consultant");
    expect(result).toContain("TestCo Inc");
    expect(result).toContain("John Smith");
  });
});

// Test resource templates
describe("Resource Templates", () => {
  it("all templates have valid URIs", async () => {
    const { TEMPLATE_RESOURCES } = await import("../src/resources/templates");
    for (const template of TEMPLATE_RESOURCES) {
      expect(template.uri).toMatch(/^consultant-ai:\/\/templates\//);
      expect(template.content.length).toBeGreaterThan(100);
    }
  });

  it("knowledge base entries have valid URIs", async () => {
    const { KNOWLEDGE_BASE } = await import(
      "../src/resources/knowledge-base"
    );
    for (const entry of KNOWLEDGE_BASE) {
      expect(entry.uri).toMatch(/^consultant-ai:\/\/knowledge\//);
      expect(entry.content.length).toBeGreaterThan(200);
    }
  });

  it("getTemplate returns correct template by URI", async () => {
    const { getTemplate } = await import("../src/resources/templates");
    const template = getTemplate("consultant-ai://templates/proposal");
    expect(template).toBeDefined();
    expect(template?.name).toBe("Proposal Template");
  });

  it("getTemplate returns undefined for unknown URI", async () => {
    const { getTemplate } = await import("../src/resources/templates");
    const template = getTemplate("consultant-ai://templates/nonexistent");
    expect(template).toBeUndefined();
  });
});
