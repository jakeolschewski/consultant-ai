/**
 * consultant-ai MCP Server
 * Registers all tools, prompts, and resources with the MCP protocol.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// Tools
import {
  proposalGeneratorSchema,
  generateProposal,
} from "./tools/proposal-generator.js";
import {
  clientResearchSchema,
  generateClientResearch,
} from "./tools/client-research.js";
import {
  meetingPrepSchema,
  generateMeetingPrep,
} from "./tools/meeting-prep.js";
import {
  invoiceGeneratorSchema,
  generateInvoice,
} from "./tools/invoice-generator.js";
import {
  sowGeneratorSchema,
  generateSOW,
} from "./tools/sow-generator.js";
import {
  followUpDrafterSchema,
  generateFollowUp,
} from "./tools/follow-up-drafter.js";
import {
  competitiveAnalysisSchema,
  generateCompetitiveAnalysis,
} from "./tools/competitive-analysis.js";
import {
  timeTrackerSchema,
  handleTimeTracker,
} from "./tools/time-tracker.js";
import {
  projectStatusSchema,
  generateProjectStatus,
} from "./tools/project-status.js";
import {
  weeklyReportSchema,
  generateWeeklyReport,
} from "./tools/weekly-report.js";

// Prompts
import {
  WEDGE_PROMPTS,
  getWEDGEPrompt,
  interpolatePrompt,
} from "./prompts/wedge-framework.js";
import {
  CONSULTING_PROMPTS,
  getConsultingPrompt,
  renderConsultingPrompt,
} from "./prompts/consulting-prompts.js";

// Resources
import {
  TEMPLATE_RESOURCES,
  getTemplate,
} from "./resources/templates.js";
import {
  KNOWLEDGE_BASE,
  getKnowledgeEntry,
} from "./resources/knowledge-base.js";

/**
 * Create and configure the consultant-ai MCP server.
 */
export function createServer(): Server {
  const server = new Server(
    {
      name: "consultant-ai",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
        prompts: {},
        resources: {},
      },
    }
  );

  // ─── TOOLS ───────────────────────────────────────────────────────────────

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: "generate_proposal",
        description:
          "Generate a complete, professional consulting proposal in Markdown. Use this when a consultant needs to create a formal proposal document for a prospective client, including scope, deliverables, timeline, investment, and acceptance terms.",
        inputSchema: zodToJsonSchema(proposalGeneratorSchema),
      },
      {
        name: "research_client",
        description:
          "Generate a structured pre-meeting client research brief. Use this before a discovery call, pitch, or review meeting to prepare research questions, identify potential pain points, build talking points, and pre-plan objection responses.",
        inputSchema: zodToJsonSchema(clientResearchSchema),
      },
      {
        name: "prepare_meeting",
        description:
          "Generate a complete meeting preparation kit including agenda, key questions to ask, objection handling, facilitation tips, and a post-meeting follow-up template. Use this before any client meeting: discovery, pitch, review, kickoff, check-in, or retrospective.",
        inputSchema: zodToJsonSchema(meetingPrepSchema),
      },
      {
        name: "generate_invoice",
        description:
          "Generate a professional invoice in Markdown format. Use this to create formatted invoices with line items, rates, subtotals, tax, and payment instructions. Suitable for hourly, project, or retainer billing.",
        inputSchema: zodToJsonSchema(invoiceGeneratorSchema),
      },
      {
        name: "generate_sow",
        description:
          "Generate a complete Statement of Work (SOW) for a consulting engagement. Use this to create a legally-structured SOW with project overview, deliverables, milestones, payment schedule, scope boundaries, IP terms, and signature blocks.",
        inputSchema: zodToJsonSchema(sowGeneratorSchema),
      },
      {
        name: "draft_follow_up",
        description:
          "Generate a professional post-meeting follow-up email with meeting recap and action items. Use this after any client meeting to send a prompt, professional summary with clear next steps. Also produces structured meeting notes.",
        inputSchema: zodToJsonSchema(followUpDrafterSchema),
      },
      {
        name: "analyze_competition",
        description:
          "Generate a competitive landscape analysis with positioning recommendations. Use this to analyze the competitive environment for a client's industry or for positioning your own consulting practice. Includes SWOT, strategic frameworks, and recommended actions.",
        inputSchema: zodToJsonSchema(competitiveAnalysisSchema),
      },
      {
        name: "track_time",
        description:
          "Log time entries and generate time reports for consulting work. Use 'log' action to record time spent on client work (persisted to ~/.consultant-ai/timesheet.json). Use 'report' action to generate weekly, monthly, by-client, or all-time reports.",
        inputSchema: zodToJsonSchema(timeTrackerSchema),
      },
      {
        name: "generate_project_status",
        description:
          "Generate a professional project status update for a consulting engagement. Use this to create a formatted status report showing milestone progress, accomplishments, next steps, risks, and resource utilization. Suitable for sending to clients.",
        inputSchema: zodToJsonSchema(projectStatusSchema),
      },
      {
        name: "generate_weekly_report",
        description:
          "Compile a professional weekly activity report for a consulting practice. Use this to create weekly summaries showing client activity, time allocation, wins, challenges, business development, and next-week priorities. Supports internal and client-facing formats.",
        inputSchema: zodToJsonSchema(weeklyReportSchema),
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      let result: string;

      switch (name) {
        case "generate_proposal": {
          const input = proposalGeneratorSchema.parse(args);
          result = generateProposal(input);
          break;
        }
        case "research_client": {
          const input = clientResearchSchema.parse(args);
          result = generateClientResearch(input);
          break;
        }
        case "prepare_meeting": {
          const input = meetingPrepSchema.parse(args);
          result = generateMeetingPrep(input);
          break;
        }
        case "generate_invoice": {
          const input = invoiceGeneratorSchema.parse(args);
          result = generateInvoice(input);
          break;
        }
        case "generate_sow": {
          const input = sowGeneratorSchema.parse(args);
          result = generateSOW(input);
          break;
        }
        case "draft_follow_up": {
          const input = followUpDrafterSchema.parse(args);
          result = generateFollowUp(input);
          break;
        }
        case "analyze_competition": {
          const input = competitiveAnalysisSchema.parse(args);
          result = generateCompetitiveAnalysis(input);
          break;
        }
        case "track_time": {
          const input = timeTrackerSchema.parse(args);
          result = await handleTimeTracker(input);
          break;
        }
        case "generate_project_status": {
          const input = projectStatusSchema.parse(args);
          result = generateProjectStatus(input);
          break;
        }
        case "generate_weekly_report": {
          const input = weeklyReportSchema.parse(args);
          result = generateWeeklyReport(input);
          break;
        }
        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${name}`
          );
      }

      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Invalid parameters: ${err.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", ")}`
        );
      }
      if (err instanceof McpError) {
        throw err;
      }
      throw new McpError(
        ErrorCode.InternalError,
        `Tool execution failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  });

  // ─── PROMPTS ─────────────────────────────────────────────────────────────

  server.setRequestHandler(ListPromptsRequestSchema, async () => ({
    prompts: [
      // WEDGE prompts
      ...WEDGE_PROMPTS.map((p) => ({
        name: `wedge_${p.id}`,
        description: `[WEDGE Framework] ${p.description}`,
        arguments: p.variables.map((v) => ({
          name: v,
          description: `Variable: ${v}`,
          required: false,
        })),
      })),
      // Consulting prompts
      ...CONSULTING_PROMPTS.map((p) => ({
        name: `consulting_${p.id}`,
        description: p.description,
        arguments: p.arguments,
      })),
    ],
  }));

  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: promptArgs = {} } = request.params;

    if (name.startsWith("wedge_")) {
      const promptId = name.replace("wedge_", "");
      const wedgePrompt = getWEDGEPrompt(promptId);
      if (!wedgePrompt) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `WEDGE prompt '${promptId}' not found`
        );
      }

      const hasAllVars = wedgePrompt.variables.every(
        (v) => promptArgs[v] !== undefined
      );

      const promptText = hasAllVars
        ? interpolatePrompt(promptId, promptArgs as Record<string, string>)
        : wedgePrompt.fullPrompt;

      return {
        description: wedgePrompt.description,
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: promptText,
            },
          },
        ],
      };
    }

    if (name.startsWith("consulting_")) {
      const promptId = name.replace("consulting_", "");
      const consultingPrompt = getConsultingPrompt(promptId);
      if (!consultingPrompt) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Consulting prompt '${promptId}' not found`
        );
      }

      const renderedPrompt = renderConsultingPrompt(
        promptId,
        promptArgs as Record<string, string>
      );

      return {
        description: consultingPrompt.description,
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: renderedPrompt,
            },
          },
        ],
      };
    }

    throw new McpError(
      ErrorCode.InvalidRequest,
      `Prompt '${name}' not found`
    );
  });

  // ─── RESOURCES ───────────────────────────────────────────────────────────

  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: [
      // Templates
      ...TEMPLATE_RESOURCES.map((t) => ({
        uri: t.uri,
        name: t.name,
        description: t.description,
        mimeType: t.mimeType,
      })),
      // Knowledge base
      ...KNOWLEDGE_BASE.map((k) => ({
        uri: k.uri,
        name: k.name,
        description: k.description,
        mimeType: k.mimeType,
      })),
    ],
  }));

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    // Check templates
    const template = getTemplate(uri);
    if (template) {
      return {
        contents: [
          {
            uri: template.uri,
            mimeType: template.mimeType,
            text: template.content,
          },
        ],
      };
    }

    // Check knowledge base
    const knowledge = getKnowledgeEntry(uri);
    if (knowledge) {
      return {
        contents: [
          {
            uri: knowledge.uri,
            mimeType: knowledge.mimeType,
            text: knowledge.content,
          },
        ],
      };
    }

    throw new McpError(
      ErrorCode.InvalidRequest,
      `Resource '${uri}' not found`
    );
  });

  return server;
}

/**
 * Convert a Zod schema to a JSON Schema object for MCP tool definitions.
 * Simplified version that covers common patterns used in this project.
 */
function zodToJsonSchema(schema: z.ZodTypeAny): Record<string, unknown> {
  return zodTypeToJsonSchema(schema);
}

function zodTypeToJsonSchema(schema: z.ZodTypeAny): Record<string, unknown> {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape as Record<string, z.ZodTypeAny>;
    const properties: Record<string, unknown> = {};
    const required: string[] = [];

    for (const [key, value] of Object.entries(shape)) {
      properties[key] = zodTypeToJsonSchema(value as z.ZodTypeAny);

      // Check if required (not optional, not has default)
      if (
        !(value instanceof z.ZodOptional) &&
        !(value instanceof z.ZodDefault)
      ) {
        required.push(key);
      }
    }

    const result: Record<string, unknown> = {
      type: "object",
      properties,
    };
    if (required.length > 0) {
      result.required = required;
    }
    return result;
  }

  if (schema instanceof z.ZodString) {
    return { type: "string" };
  }

  if (schema instanceof z.ZodNumber) {
    return { type: "number" };
  }

  if (schema instanceof z.ZodBoolean) {
    return { type: "boolean" };
  }

  if (schema instanceof z.ZodArray) {
    return {
      type: "array",
      items: zodTypeToJsonSchema(schema.element),
    };
  }

  if (schema instanceof z.ZodEnum) {
    return {
      type: "string",
      enum: schema.options as string[],
    };
  }

  if (schema instanceof z.ZodOptional) {
    return zodTypeToJsonSchema(schema.unwrap());
  }

  if (schema instanceof z.ZodDefault) {
    return zodTypeToJsonSchema(schema.removeDefault());
  }

  if (schema instanceof z.ZodNullable) {
    const inner = zodTypeToJsonSchema(schema.unwrap());
    return { ...inner, nullable: true };
  }

  if (schema instanceof z.ZodUnion) {
    return {
      oneOf: (schema.options as z.ZodTypeAny[]).map(zodTypeToJsonSchema),
    };
  }

  // Fallback
  return {};
}
