# consultant-ai

**AI-powered MCP server for independent consultants and small businesses.**

[![CI](https://github.com/jakeolschewski/consultant-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/jakeolschewski/consultant-ai/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/consultant-ai.svg)](https://badge.fury.io/js/consultant-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/jakeolschewski/consultant-ai?style=flat-square)](https://github.com/jakeolschewski/consultant-ai/stargazers)
[![Forks](https://img.shields.io/github/forks/jakeolschewski/consultant-ai?style=flat-square)](https://github.com/jakeolschewski/consultant-ai/network/members)
[![Issues](https://img.shields.io/github/issues/jakeolschewski/consultant-ai?style=flat-square)](https://github.com/jakeolschewski/consultant-ai/issues)
[![Last Commit](https://img.shields.io/github/last-commit/jakeolschewski/consultant-ai?style=flat-square)](https://github.com/jakeolschewski/consultant-ai/commits/main)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue?style=flat-square)](https://modelcontextprotocol.io)
[![Built by WEDGE Method](https://img.shields.io/badge/Built%20by-WEDGE%20Method-6B3FA0?style=flat-square)](https://thewedgemethodai.com)

> **Built by Jake Olschewski** — AI automation consultant, creator of [WEDGE Method](https://thewedgemethodai.com), author of 332+ published AI articles.
>
> 🚀 **[Get the AI Readiness Audit ($997)](https://buy.stripe.com/6oUdR93ureV54mecfybEA0k)** — Find out exactly where AI can save your business money. Use code `LAUNCH20` for 20% off.

> Part of the **[WEDGE Method ecosystem](https://thewedgemethodai.com)** — AI strategy and implementation for modern businesses.

Connect to any MCP-compatible AI client — Claude Desktop, Cursor, ChatGPT — and get 10 production-ready consulting automation tools: proposals, invoices, SOWs, meeting prep, competitive analysis, time tracking, and more.

---

## Why consultant-ai?

- **MCP is the hottest protocol in AI right now.** Every major AI client supports it. consultant-ai is the first MCP server built specifically for consultants.
- **Solo consultants are the fastest-growing AI adopters.** This gives them enterprise-grade operations without enterprise overhead.
- **Built by consultants, for consultants.** Every tool is based on real consulting workflows, not generic templates.

---

## Quick Start

### One command (no install):

```bash
npx consultant-ai
```

### Claude Desktop setup:

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

Restart Claude Desktop. Done.

---

## Tools

| Tool | Description |
|------|-------------|
| `generate_proposal` | Full consulting proposal — scope, timeline, investment, signature block |
| `research_client` | Pre-meeting research brief with talking points and objection handling |
| `prepare_meeting` | Agenda, key questions, watch-outs, and follow-up template |
| `generate_invoice` | Professional invoice with line items, tax, and payment instructions |
| `generate_sow` | Statement of Work with milestones, IP terms, change management |
| `draft_follow_up` | Post-meeting email with action items and meeting notes |
| `analyze_competition` | Competitive landscape, SWOT, and positioning recommendations |
| `track_time` | Log time entries and generate reports (persisted locally) |
| `generate_project_status` | Client-ready status update with milestone progress tracker |
| `generate_weekly_report` | Weekly activity report for internal or client-facing use |

### Prompt Templates

8 pre-built WEDGE framework prompt templates:
- Cold email outreach
- Proposal executive summaries
- Discovery call synthesis
- LinkedIn thought leadership posts
- Project debriefs and case studies
- Pricing recommendations
- Objection handling scripts
- SOW scope definition

### Resource Templates

Access structured Markdown templates for proposals, SOWs, invoices, meeting notes, weekly reports, and project status updates — plus a consulting best practices knowledge base.

---

## Example Usage

Once installed in Claude Desktop, try:

**Generate a proposal:**
> "Use generate_proposal to create a proposal for a 6-week brand strategy project with Acme Corp. Budget $15K–$20K. Deliverables: brand audit, positioning framework, messaging guide. My name is Jordan Blake."

**Research a client before a meeting:**
> "Use research_client to prepare a research brief for a discovery meeting with Shopify. Meeting type: discovery. Contact: Marcus Johnson, VP of Merchant Success."

**Log time:**
> "Use track_time to log 2.5 hours on the Acme project today. Working on stakeholder interview synthesis. Billable at $200/hr."

**Weekly report:**
> "Use generate_weekly_report to create my weekly report. I worked 12 hours on Acme (completed process mapping, three stakeholder interviews). Next week priorities: deliver bottleneck report, schedule executive presentation."

---

## The WEDGE Framework

consultant-ai is built on the WEDGE prompt methodology — a 5-part structure for getting expert-level outputs from AI tools:

**W**ho — Define the AI's role  
**E**stablish context — Your specific situation  
**D**efine deliverable — Exactly what to produce  
**G**uide constraints — Quality rules and format  
**E**valuate — Self-check before responding  

All 8 prompt templates in consultant-ai use WEDGE. Access the full guide at `consultant-ai://knowledge/wedge-framework-guide` in your AI client, or visit [thewedgemethodai.com](https://thewedgemethodai.com).

---

## Architecture

```
src/
├── index.ts              # MCP server entry point (stdio transport)
├── server.ts             # Tool/prompt/resource registration
├── tools/                # 10 MCP tool implementations
│   ├── proposal-generator.ts
│   ├── client-research.ts
│   ├── meeting-prep.ts
│   ├── invoice-generator.ts
│   ├── sow-generator.ts
│   ├── follow-up-drafter.ts
│   ├── competitive-analysis.ts
│   ├── time-tracker.ts
│   ├── project-status.ts
│   └── weekly-report.ts
├── prompts/              # WEDGE framework + consulting prompts
├── resources/            # Document templates + knowledge base
└── utils/                # Markdown, date, validation helpers
```

- **Protocol:** Model Context Protocol (MCP) via stdio transport
- **Validation:** Zod on all tool inputs
- **Persistence:** Time tracking stored at `~/.consultant-ai/timesheet.json`
- **Output:** Well-formatted Markdown documents
- **Runtime:** Node.js 18+

---

## Documentation

- [Getting Started](./docs/getting-started.md)
- [Tools Reference](./docs/tools-reference.md)
- [Claude Desktop Setup](./docs/claude-desktop-setup.md)
- [Cursor Setup](./docs/cursor-setup.md)

---

## Development

```bash
git clone https://github.com/jakeolschewski/consultant-ai
cd consultant-ai
npm install
npm run dev      # Run in development mode
npm test         # Run tests
npm run build    # Build for production
npm run lint     # Lint
```

### Adding a Tool

1. Create `src/tools/your-tool.ts` with a Zod schema and generator function
2. Register it in `src/server.ts`
3. Add tests in `tests/tools/your-tool.test.ts`
4. Document in `docs/tools-reference.md`

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide.

---

## Roadmap

- [ ] `contract-renewal-planner` — Proactive renewal tracking and client health scoring
- [ ] `rate-calculator` — Value-based pricing calculator with market benchmarks
- [ ] `nda-generator` — Mutual NDA generation from a minimal input set
- [ ] `onboarding-kit` — New client onboarding package generator
- [ ] `case-study-writer` — Structured case study from project notes
- [ ] `retainer-proposal` — Retainer-specific proposal format
- [ ] MCP Resources: live calendar integration hooks
- [ ] WEDGE Autopilot SaaS (cloud-hosted, advanced features)

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

- [Open an issue](https://github.com/jakeolschewski/consultant-ai/issues)
- [Start a discussion](https://github.com/jakeolschewski/consultant-ai/discussions)
- [Submit a pull request](https://github.com/jakeolschewski/consultant-ai/pulls)

---

## Also by WEDGE Method

- **[awesome-solopreneur-ai](https://github.com/jakeolschewski/awesome-solopreneur-ai)** — 367+ curated AI tools for solopreneurs, freelancers, and one-person businesses
- [WedgeGuard](https://github.com/jakeolschewski/wedgeguard) — VS Code extension: lock code with Wedges, generate with local AI
- **[business-prompts](https://github.com/jakeolschewski/business-prompts)** — 94 production-ready AI prompts for every business function
- [WedgeGuard](https://github.com/jakeolschewski/wedgeguard) — VS Code extension: lock code with Wedges, generate with local AI
- **[WEDGE Autopilot](https://thewedgemethodai.com)** — The full AI consulting suite (SaaS)

---

## Support the Project

If consultant-ai saves you time, consider supporting development:

- ⭐ Star this repo
- [GitHub Sponsors](https://github.com/sponsors/jakeolschewski)
- [WEDGE Method](https://thewedgemethodai.com)

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=jakeolschewski/consultant-ai&type=Date)](https://star-history.com/#jakeolschewski/consultant-ai&Date)

---

## License

MIT © [WEDGE Method LLC](https://thewedgemethodai.com)

---

## 🤝 Support This Project

If consultant-ai helps your workflow, consider supporting its development:

- ⭐ **Star this repo** — it helps others discover it
- 💖 **[Sponsor on GitHub](https://github.com/sponsors/jakeolschewski)** — fund continued development
- 📧 **[Get the AI Consulting Discovery Toolkit ($39)](https://buy.stripe.com/bJeaEX5Cz8wH05YfrKbEA0l)** — 50+ prompts, frameworks, and templates for AI consultants

## 🔗 More from Jake

- 🌐 [WEDGE Method AI](https://thewedgemethodai.com) — SaaS platform for AI-powered business automation
- 📝 [332+ AI Articles on Dev.to](https://dev.to/wedgemethoddev) — tutorials, guides, and deep dives
- 🔍 [NovaForge AI Readiness Audit](https://buy.stripe.com/6oUdR93ureV54mecfybEA0k) — comprehensive business AI assessment ($997)
- 🛠️ [AI Consulting Discovery Toolkit](https://buy.stripe.com/bJeaEX5Cz8wH05YfrKbEA0l) — everything you need to start AI consulting ($39)

---
*Built with ❤️ by [Jake Olschewski](https://github.com/jakeolschewski) under WEDGE Method LLC*

---

*Built with [Model Context Protocol](https://modelcontextprotocol.io) · [WEDGE Method](https://thewedgemethodai.com)*
