/**
 * Date utility helpers for consulting documents.
 */

/** Format a Date to a human-readable long date: January 15, 2025 */
export function formatLongDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Format a Date to ISO short date: 2025-01-15 */
export function formatISODate(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

/** Format a Date to a short readable date: Jan 15, 2025 */
export function formatShortDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Add N days to a Date and return the new Date */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/** Add N weeks to a Date */
export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

/** Add N months to a Date */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/** Get the start of the current week (Monday) */
export function startOfWeek(date: Date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Get the end of the current week (Sunday) */
export function endOfWeek(date: Date = new Date()): Date {
  const start = startOfWeek(date);
  return addDays(start, 6);
}

/** Parse a date string or return current date if empty */
export function parseDate(dateStr?: string): Date {
  if (!dateStr) {
    return new Date();
  }
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return new Date();
  }
  return d;
}

/** Calculate the number of business days between two dates */
export function businessDaysBetween(start: Date, end: Date): number {
  let count = 0;
  const current = new Date(start);
  while (current <= end) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  return count;
}

/** Format duration in minutes to a readable string: 2h 30m */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) {
    return `${mins}m`;
  }
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
}

/** Format duration in decimal hours: 2.5 */
export function formatDecimalHours(minutes: number): string {
  return (minutes / 60).toFixed(2);
}

/** Generate an invoice number based on date and sequence */
export function generateInvoiceNumber(
  prefix = "INV",
  date: Date = new Date(),
  sequence = 1
): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const seq = String(sequence).padStart(3, "0");
  return `${prefix}-${year}${month}-${seq}`;
}

/** Current year as string */
export function currentYear(): string {
  return new Date().getFullYear().toString();
}
