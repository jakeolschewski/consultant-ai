# Getting Started with consultant-ai

consultant-ai is an open-source MCP (Model Context Protocol) server that gives consultants and small businesses AI-powered business operations tools. It connects to any MCP-compatible AI client — Claude Desktop, Cursor, ChatGPT, and more.

## What You Get

10 production-ready MCP tools:

| Tool | What it Does |
|------|-------------|
| `generate_proposal` | Full consulting proposal with scope, timeline, investment, signature block |
| `research_client` | Pre-meeting research brief with talking points and objection handling |
| `prepare_meeting` | Meeting agenda, key questions, watch-outs, and follow-up template |
| `generate_invoice` | Professional invoice with line items, tax, payment instructions |
| `generate_sow` | Statement of Work with milestones, IP terms, change management |
| `draft_follow_up` | Post-meeting email with action items and meeting notes |
| `analyze_competition` | Competitive landscape, SWOT, and positioning recommendations |
| `track_time` | Log time entries and generate reports (persisted locally) |
| `generate_project_status` | Client-ready status update with milestone tracker |
| `generate_weekly_report` | Weekly activity report for internal or client-facing use |

Plus: WEDGE framework prompt templates and consulting document resources.

## Quick Install

### Option 1: npx (zero-install)

```bash
npx consultant-ai
```

### Option 2: Global Install

```bash
npm install -g consultant-ai
consultant-ai
```

### Option 3: From Source

```bash
git clone https://github.com/jakeolschewski/consultant-ai
cd consultant-ai
npm install
npm run build
npm start
```

## Requirements

- Node.js 18 or higher
- An MCP-compatible AI client (Claude Desktop, Cursor, etc.)

---

## Setting Up with Claude Desktop

1. Open your Claude Desktop configuration file:
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the consultant-ai server:

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

3. Restart Claude Desktop.

4. You should now see the consultant-ai tools available in Claude. Try: *"Generate a proposal for a 6-week digital strategy engagement with Acme Corp."*

For the full Claude Desktop setup guide, see [claude-desktop-setup.md](./claude-desktop-setup.md).

---

## Setting Up with Cursor

See [cursor-setup.md](./cursor-setup.md) for the Cursor-specific installation guide.

---

## Your First Tool Call

Once installed, try asking your AI client:

**Generate a proposal:**
> "Use the generate_proposal tool to create a proposal for a 6-week brand strategy project with Acme Corp. Budget is $15K–$20K. Deliverables: brand audit, positioning framework, messaging guide. My name is Jane Smith."

**Research a client:**
> "Use research_client to prepare a research brief for a discovery meeting with Shopify. Meeting type is discovery. Include relevant pain points and talking points."

**Track time:**
> "Use track_time to log 2.5 hours on the Acme Corp strategy project today. Description: stakeholder interviews. Billable at $200/hr."

---

## Configuration

consultant-ai stores time tracking data at `~/.consultant-ai/timesheet.json`. No other configuration is required.

---

## Next Steps

- [Tools Reference](./tools-reference.md) — Full documentation for all 10 tools
- [Claude Desktop Setup](./claude-desktop-setup.md) — Detailed Claude Desktop configuration
- [Cursor Setup](./cursor-setup.md) — Cursor-specific setup

---

## About the WEDGE Framework

consultant-ai includes the WEDGE prompt framework — a methodology for writing AI prompts that produce expert-level consulting outputs. WEDGE stands for:

- **W**ho — Define the AI's role and expertise
- **E**stablish context — Give your specific situation
- **D**efine deliverable — State exactly what to produce
- **G**uide constraints — Set quality rules and format
- **E**valuate — Tell the AI how to self-check

Access WEDGE prompts through your AI client's prompt library, or read the [WEDGE Framework Guide](../src/resources/knowledge-base.ts) resource.

---

*consultant-ai is built by [WEDGE Method LLC](https://thewedgemethodai.com). MIT License.*
