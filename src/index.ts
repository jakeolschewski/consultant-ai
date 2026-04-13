#!/usr/bin/env node
/**
 * consultant-ai — MCP Server Entry Point
 *
 * An open-source MCP server for independent consultants and small businesses.
 * Connects to any MCP-compatible AI client (Claude Desktop, Cursor, ChatGPT, etc.)
 * and provides AI-powered consulting operations tools.
 *
 * Usage:
 *   npx consultant-ai                   # Run as MCP server (stdio transport)
 *   npm run dev                          # Development mode
 *
 * Install in Claude Desktop:
 *   Add to claude_desktop_config.json:
 *   {
 *     "mcpServers": {
 *       "consultant-ai": {
 *         "command": "npx",
 *         "args": ["-y", "consultant-ai"]
 *       }
 *     }
 *   }
 *
 * GitHub: https://github.com/jakeolschewski/consultant-ai
 * Website: https://thewedgemethodai.com
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

async function main(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();

  // Graceful shutdown
  process.on("SIGINT", async () => {
    await server.close();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await server.close();
    process.exit(0);
  });

  await server.connect(transport);

  // Log to stderr (stdout is reserved for MCP protocol messages)
  console.error("consultant-ai MCP server started ✓");
  console.error("Tools: generate_proposal, research_client, prepare_meeting,");
  console.error("       generate_invoice, generate_sow, draft_follow_up,");
  console.error("       analyze_competition, track_time, generate_project_status,");
  console.error("       generate_weekly_report");
  console.error("");
  console.error("Docs: https://github.com/jakeolschewski/consultant-ai");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
