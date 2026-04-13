# Setting Up consultant-ai with Claude Desktop

This guide walks you through configuring consultant-ai as an MCP server in Claude Desktop.

## Prerequisites

- Claude Desktop installed ([download here](https://claude.ai/download))
- Node.js 18 or higher installed

## Step 1: Find Your Config File

Claude Desktop reads MCP server configuration from a JSON file:

| Platform | Location |
|----------|----------|
| **macOS** | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| **Windows** | `%APPDATA%\Claude\claude_desktop_config.json` |
| **Linux** | `~/.config/Claude/claude_desktop_config.json` |

If the file doesn't exist, create it.

## Step 2: Add consultant-ai

Open the config file and add the `consultant-ai` entry to the `mcpServers` object:

### Using npx (recommended — no install required)

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

### Using a Global Install

If you've installed globally with `npm install -g consultant-ai`:

```json
{
  "mcpServers": {
    "consultant-ai": {
      "command": "consultant-ai"
    }
  }
}
```

### Running from Source

If you've cloned and built the repo:

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

## Step 3: Restart Claude Desktop

Fully quit and relaunch Claude Desktop. MCP servers are loaded at startup.

## Step 4: Verify the Connection

1. Start a new conversation in Claude Desktop
2. Click the tools icon (or type `/`) to see available tools
3. You should see the consultant-ai tools listed

Or just ask: *"What consultant-ai tools do you have available?"*

## Step 5: Try Your First Tool

**Generate a proposal:**
> "Use generate_proposal to create a consulting proposal for a 6-week operational efficiency engagement with MegaCorp Inc. Budget range $12,000–$18,000. Deliverables: process audit, recommendations report, implementation playbook. My name is Jordan Blake."

**Log time:**
> "Use track_time to log 2 hours on the MegaCorp project today. Description: process documentation review. Billable at $175/hr."

**Prep for a meeting:**
> "Use prepare_meeting to prep for a discovery call with Sarah Chen at MegaCorp tomorrow. Meeting is 60 minutes. Context: they want to reduce operational overhead."

---

## Troubleshooting

### Tools not appearing
- Make sure Claude Desktop was fully restarted (not just closed)
- Check the config file has valid JSON syntax (no trailing commas)
- Ensure Node.js 18+ is installed: `node --version`

### "command not found" error
If npx isn't found, specify the full path:
```json
{
  "mcpServers": {
    "consultant-ai": {
      "command": "/usr/local/bin/npx",
      "args": ["-y", "consultant-ai"]
    }
  }
}
```

Find your npx path with: `which npx`

### Permission errors
On macOS, you may need to grant Claude Desktop access to run scripts:
- System Settings → Privacy & Security → Developer Tools → add Claude

### Checking Server Logs

MCP server logs appear in Claude Desktop's log file:
- **macOS:** `~/Library/Logs/Claude/mcp-server-consultant-ai.log`
- **Windows:** `%APPDATA%\Claude\Logs\mcp-server-consultant-ai.log`

---

## Multiple MCP Servers

You can run multiple MCP servers simultaneously. Example config with other servers:

```json
{
  "mcpServers": {
    "consultant-ai": {
      "command": "npx",
      "args": ["-y", "consultant-ai"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/username/Documents"]
    }
  }
}
```

---

## Accessing Prompt Templates

consultant-ai includes prompt templates via the MCP Prompts protocol. In Claude Desktop, access them via the prompt library or ask:

> "Show me the available consultant-ai prompt templates."

---

*Need help? [Open an issue](https://github.com/jakeolschewski/consultant-ai/issues) · [WEDGE Method](https://thewedgemethodai.com)*
