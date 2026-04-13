/**
 * Validation utilities for MCP tool inputs.
 * Uses Zod schemas centrally. This module provides helper functions
 * for common validation patterns.
 */

import { z } from "zod";

/** Non-empty trimmed string with a human-readable field name for errors */
export function nonEmptyString(fieldName: string) {
  return z
    .string()
    .min(1, `${fieldName} is required`)
    .transform((s) => s.trim());
}

/** Optional string that trims whitespace */
export const optionalString = z
  .string()
  .optional()
  .transform((s) => s?.trim());

/** Positive number (e.g., hours, dollars) */
export function positiveNumber(fieldName: string) {
  return z
    .number()
    .positive(`${fieldName} must be a positive number`);
}

/** Non-negative number (allows zero) */
export function nonNegativeNumber(fieldName: string) {
  return z
    .number()
    .min(0, `${fieldName} must be 0 or greater`);
}

/** Integer in a range */
export function intInRange(fieldName: string, min: number, max: number) {
  return z
    .number()
    .int()
    .min(min, `${fieldName} must be at least ${min}`)
    .max(max, `${fieldName} must be at most ${max}`);
}

/** Validate and parse a URL string */
export const urlSchema = z
  .string()
  .url("Must be a valid URL")
  .optional();

/** Email schema */
export const emailSchema = z
  .string()
  .email("Must be a valid email address")
  .optional();

/** Common meeting types */
export const meetingTypeSchema = z.enum([
  "discovery",
  "review",
  "pitch",
  "kickoff",
  "check-in",
  "retrospective",
  "proposal-presentation",
  "onboarding",
]);
export type MeetingType = z.infer<typeof meetingTypeSchema>;

/** Common project status values */
export const projectStatusSchema = z.enum([
  "on-track",
  "at-risk",
  "delayed",
  "completed",
  "on-hold",
]);
export type ProjectStatus = z.infer<typeof projectStatusSchema>;

/** Time tracker action */
export const timeActionSchema = z.enum(["log", "report"]);
export type TimeAction = z.infer<typeof timeActionSchema>;

/** Validate an array has at least one item */
export function nonEmptyArray<T extends z.ZodTypeAny>(schema: T) {
  return z.array(schema).min(1, "Must provide at least one item");
}

/** Safe parse and throw with a human-readable error message */
export function validateInput<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Validation failed: ${issues}`);
  }
  return result.data;
}
