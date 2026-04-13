# Setting Up consultant-ai with Cursor

This guide covers configuring consultant-ai as an MCP server in Cursor.

## Prerequisites

- Cursor installed ([cursor.com](https://cursor.com))
- Node.js 18 or higher

## Step 1: Open MCP Settings in Cursor

1. Open Cursor
2. Go to **Settings** (Cmd+, on macOS, Ctrl+, on Windows)
3. Search for "MCP" or navigate to **Extensions → Model Context Protocol**
4. Click **Edit MCP Configuration**

Alternatively, directly edit `~/.cursor/mcp.json`.

## Step 2: Add consultant-ai

### Using npx (recommended)

```json
{
  "mcpServers": {
    "consultant-ai": {
      "command": "npx",
      "args": ["-y", "consultant-ai"]
    }
  }
}
```

### Using Global Install

```bash
npm install -g consultant-ai
```

```json
{
  "mcpServers": {
    "consultant-ai": {
      "command": "consultant-ai"
    }
  }
}
```

### From Source

```json
{
  "mcpServers": {
    "consultant-ai": {
      "command": "node",
      "args": ["/path/to/consultant-ai/dist/index.js"]
    }
  }
}
```

## Step 3: Reload Cursor

Restart Cursor or reload the window (Cmd+Shift+P → "Reload Window").

## Step 4: Use in Chat

Open Cursor Chat (Cmd+L) and you'll have access to all consultant-ai tools.

**Example prompts:**

```
Generate a proposal for a 4-week SEO audit project with TechStartup Inc.
Budget: $8,000–$10,000. Deliverables: technical audit, keyword strategy,
90-day action plan. My name is Casey Jordan.
```

```
I just finished a discovery call with Acme Corp. Key topics: they're struggling
with sales process consistency across their 12-person team. Use draft_follow_up
to write a follow-up email. Action items: me sending a process audit template by
Friday, them sharing their current CRM workflow.
```

```
Track 3 hours logged for the Acme project today. Working on stakeholder
interview synthesis. Billable at $200/hr.
```

---

## Using consultant-ai in .cursorrules

Add tool usage hints to your `.cursorrules` file:

```
When I ask you to help with consulting work, use the consultant-ai MCP tools:
- Proposals → generate_proposal
- Client research → research_client
- Meeting prep → prepare_meeting
- Invoices → generate_invoice
- SOW → generate_sow
- Follow-ups → draft_follow_up
- Competitive analysis → analyze_competition
- Time tracking → track_time
- Status updates → generate_project_status
- Weekly reports → generate_weekly_report
```

---

## Troubleshooting

### Tools not appearing in chat

Check Cursor's output panel (View → Output → MCP) for error messages.

Common issues:
- Node.js not in PATH → Restart Cursor after installing Node.js
- JSON syntax error in config → Validate with [jsonlint.com](https://jsonlint.com)
- npx cache issue → Run `npx clear-npx-cache` and try again

### Testing the Connection

In Cursor Chat, ask:
> "List all available MCP tools you have access to."

You should see the 10 consultant-ai tools in the response.

---

*[GitHub](https://github.com/jakeolschewski/consultant-ai) · [WEDGE Method](https://thewedgemethodai.com)*
