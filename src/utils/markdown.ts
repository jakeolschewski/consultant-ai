/**
 * Markdown utility helpers for generating professional consulting documents.
 */

/** Render a level-1 heading */
export function h1(text: string): string {
  return `# ${text}\n`;
}

/** Render a level-2 heading */
export function h2(text: string): string {
  return `## ${text}\n`;
}

/** Render a level-3 heading */
export function h3(text: string): string {
  return `### ${text}\n`;
}

/** Render bold text */
export function bold(text: string): string {
  return `**${text}**`;
}

/** Render italic text */
export function italic(text: string): string {
  return `*${text}*`;
}

/** Render a horizontal rule */
export function hr(): string {
  return `\n---\n`;
}

/** Render an unordered list from an array of strings */
export function ul(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n") + "\n";
}

/** Render an ordered list from an array of strings */
export function ol(items: string[]): string {
  return items.map((item, i) => `${i + 1}. ${item}`).join("\n") + "\n";
}

/** Render a blockquote */
export function blockquote(text: string): string {
  return text
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n") + "\n";
}

/** Render inline code */
export function inlineCode(text: string): string {
  return "`" + text + "`";
}

/** Render a code block */
export function codeBlock(code: string, language = ""): string {
  return "```" + language + "\n" + code + "\n```\n";
}

/** Render a markdown table */
export function table(headers: string[], rows: string[][]): string {
  const headerRow = `| ${headers.join(" | ")} |`;
  const separator = `| ${headers.map(() => "---").join(" | ")} |`;
  const dataRows = rows.map((row) => `| ${row.join(" | ")} |`);
  return [headerRow, separator, ...dataRows].join("\n") + "\n";
}

/** Render a key-value definition list as bold key + value pairs */
export function definitionList(items: Record<string, string>): string {
  return Object.entries(items)
    .map(([key, value]) => `**${key}:** ${value}`)
    .join("  \n") + "\n";
}

/** Join multiple markdown sections with a blank line between each */
export function sections(...parts: string[]): string {
  return parts.filter(Boolean).join("\n");
}

/** Format a currency number as a string with $ and commas */
export function currency(amount: number, symbol = "$"): string {
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Wrap text in a notice/callout block */
export function callout(title: string, body: string): string {
  return `> **${title}**\n> \n> ${body.split("\n").join("\n> ")}\n`;
}
