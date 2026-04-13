# Contributing to consultant-ai

Thank you for your interest in contributing! consultant-ai is an open-source project built by and for independent consultants. Every contribution — from bug fixes to new tools — is welcomed.

## How to Contribute

### Reporting Bugs

Found a bug? [Open an issue](https://github.com/jakeolschewski/consultant-ai/issues/new?template=bug_report.md) with:

1. A clear title and description
2. Steps to reproduce
3. Expected vs. actual behavior
4. Your Node.js version and OS

### Requesting Features

Have an idea for a new tool or improvement? [Open a feature request](https://github.com/jakeolschewski/consultant-ai/issues/new?template=feature_request.md).

Good feature requests describe:
- The problem you're trying to solve
- Your proposed solution
- Why this would help other consultants

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-tool-name`
3. Make your changes (see Development Guide below)
4. Add tests for any new functionality
5. Run `npm test` — all tests must pass
6. Run `npm run lint` — no lint errors
7. Submit a pull request against `main`

---

## Development Guide

### Setup

```bash
git clone https://github.com/jakeolschewski/consultant-ai
cd consultant-ai
npm install
npm run build
npm run test
```

### Project Structure

```
src/
├── index.ts          # Entry point — MCP server startup
├── server.ts         # MCP server setup, tool/prompt/resource registration
├── tools/            # Individual tool implementations (one file per tool)
├── prompts/          # WEDGE framework + consulting prompt templates
├── resources/        # Document templates + knowledge base
└── utils/            # Shared utilities (markdown, date, validation)
```

### Adding a New Tool

1. **Create the tool file** in `src/tools/your-tool.ts`:

```typescript
import { z } from "zod";
import { h1, h2, sections } from "../utils/markdown.js";

// 1. Define the Zod schema
export const yourToolSchema = z.object({
  requiredField: z.string().min(1, "Field is required"),
  optionalField: z.string().optional(),
});

export type YourToolInput = z.infer<typeof yourToolSchema>;

// 2. Implement the function
export function yourTool(input: YourToolInput): string {
  return sections(
    h1("Your Tool Output"),
    `Content for ${input.requiredField}\n`,
  );
}
```

2. **Register the tool in `src/server.ts`**:
   - Import your schema and function
   - Add a tool entry to the `ListToolsRequestSchema` handler
   - Add a case to the `CallToolRequestSchema` switch

3. **Write tests** in `tests/tools/your-tool.test.ts`

4. **Add documentation** to `docs/tools-reference.md`

### Tool Design Principles

- **Every tool must use Zod for input validation** — no exceptions
- **Return well-formatted Markdown** that looks professional out of the box
- **Rich tool descriptions** — AI clients use these to know when to invoke the tool
- **Sensible defaults** — tools should work with minimal required input
- **Genuine utility** — every tool should produce genuinely useful output, not placeholder content

### Code Style

- TypeScript strict mode
- ESM modules (`import/export`)
- `.js` extensions on all imports (required for ESM)
- Prefer `const` over `let`, never `var`
- Meaningful variable names — no single-letter variables outside of loops

### Commit Messages

Use conventional commits:

```
feat: add contract-renewal-planner tool
fix: correct invoice tax calculation rounding
docs: update Claude Desktop setup guide
test: add sow-generator edge case tests
chore: bump @modelcontextprotocol/sdk to 1.13.0
```

---

## Testing

```bash
npm run test        # Watch mode
npm run test:run    # Single run (CI)
```

Tests are in `tests/` using [Vitest](https://vitest.dev/). Each tool should have:
- Schema validation tests (valid + invalid inputs)
- Output content tests (key fields appear in output)
- Edge case tests

---

## Getting Help

- [Open a Discussion](https://github.com/jakeolschewski/consultant-ai/discussions) for questions
- [Join the community](https://thewedgemethodai.com) at WEDGE Method

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold these standards.

---

Thank you for making consultant-ai better for everyone!
