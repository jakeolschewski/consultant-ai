# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

We take security issues seriously. If you discover a security vulnerability in consultant-ai, please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

### How to Report

Send a report to: **hello@thewedgemethodai.com**

Include in your report:
- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested remediation (optional)

### Response Timeline

- **Acknowledgement:** Within 48 hours
- **Initial assessment:** Within 5 business days
- **Resolution target:** Within 30 days for critical issues

We will keep you informed of progress throughout the process.

### After Disclosure

Once a fix is available, we will:
1. Release a patched version
2. Credit you in the changelog (unless you prefer anonymity)
3. Publish a security advisory on GitHub

## Security Considerations

### Data Storage

consultant-ai stores time tracking data locally at `~/.consultant-ai/timesheet.json`. This file may contain sensitive business information (client names, project details, billing rates). Users should ensure this directory has appropriate filesystem permissions.

### MCP Protocol

consultant-ai communicates via stdio transport, which is local to the machine. No data is transmitted to external servers by default. The server does not make outbound network requests.

### Dependencies

We monitor dependencies for known vulnerabilities using automated tooling. Run `npm audit` to check the current state of dependencies.

### No Telemetry

consultant-ai does not collect, transmit, or store any telemetry, usage data, or personally identifiable information. All processing happens locally on your machine.

## Security Best Practices for Users

1. Run `npm audit` after installing to check for known vulnerabilities
2. Keep consultant-ai updated to the latest version
3. Review the permissions of `~/.consultant-ai/` to ensure only your user account has access
4. Do not store API keys or secrets in the tool inputs — they will be written to generated documents

---

*For general questions, use [GitHub Discussions](https://github.com/jakeolschewski/consultant-ai/discussions).*
