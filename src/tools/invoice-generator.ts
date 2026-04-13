/**
 * Invoice Generator Tool
 * Creates a professional invoice in Markdown format.
 */

import { z } from "zod";
import {
  h1,
  h2,
  h3,
  bold,
  table,
  sections,
  hr,
  currency,
} from "../utils/markdown.js";
import {
  formatLongDate,
  addDays,
  generateInvoiceNumber,
  formatISODate,
} from "../utils/date.js";

const lineItemSchema = z.object({
  description: z.string().min(1, "Line item description is required"),
  quantity: z.number().positive("Quantity must be positive"),
  unit: z.string().optional().default("hours"),
  rate: z.number().positive("Rate must be positive"),
});

export type LineItem = z.infer<typeof lineItemSchema>;

export const invoiceGeneratorSchema = z.object({
  invoiceNumber: z.string().optional(),
  clientName: z.string().min(1, "Client name is required"),
  clientCompany: z.string().optional(),
  clientEmail: z.string().email().optional(),
  clientAddress: z.string().optional(),
  consultantName: z.string().min(1, "Consultant name is required"),
  consultantCompany: z.string().optional(),
  consultantEmail: z.string().email().optional(),
  consultantAddress: z.string().optional(),
  lineItems: z.array(lineItemSchema).min(1, "At least one line item is required"),
  taxRate: z.number().min(0).max(100).optional().default(0),
  discount: z.number().min(0).optional().default(0),
  currency: z.string().optional().default("USD"),
  paymentTermsDays: z.number().int().positive().optional().default(30),
  bankDetails: z.string().optional(),
  memo: z.string().optional(),
  projectName: z.string().optional(),
  invoiceDate: z.string().optional(),
});

export type InvoiceGeneratorInput = z.infer<typeof invoiceGeneratorSchema>;

export function generateInvoice(input: InvoiceGeneratorInput): string {
  const today = input.invoiceDate
    ? new Date(input.invoiceDate)
    : new Date();
  const dueDate = addDays(today, input.paymentTermsDays);
  const invoiceNumber =
    input.invoiceNumber || generateInvoiceNumber("INV", today);
  const currencySymbol = input.currency === "GBP" ? "£" : input.currency === "EUR" ? "€" : "$";

  // Calculate totals
  const lineItemsWithTotals = input.lineItems.map((item) => ({
    ...item,
    total: item.quantity * item.rate,
  }));

  const subtotal = lineItemsWithTotals.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = input.discount || 0;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const taxAmount = (subtotalAfterDiscount * (input.taxRate || 0)) / 100;
  const total = subtotalAfterDiscount + taxAmount;

  const clientDisplay = [
    input.clientName,
    input.clientCompany,
    input.clientEmail,
    input.clientAddress,
  ]
    .filter(Boolean)
    .join("  \n");

  const consultantDisplay = [
    input.consultantName,
    input.consultantCompany,
    input.consultantEmail,
    input.consultantAddress,
  ]
    .filter(Boolean)
    .join("  \n");

  const lineItemRows = lineItemsWithTotals.map((item) => [
    item.description,
    `${item.quantity} ${item.unit}`,
    currency(item.rate, currencySymbol),
    currency(item.total, currencySymbol),
  ]);

  // Add subtotal, discount, tax, and total rows
  const summaryRows: string[][] = [];
  summaryRows.push(["", "", bold("Subtotal"), currency(subtotal, currencySymbol)]);
  if (discountAmount > 0) {
    summaryRows.push([
      "",
      "",
      bold("Discount"),
      `(${currency(discountAmount, currencySymbol)})`,
    ]);
  }
  if ((input.taxRate || 0) > 0) {
    summaryRows.push([
      "",
      "",
      bold(`Tax (${input.taxRate}%)`),
      currency(taxAmount, currencySymbol),
    ]);
  }
  summaryRows.push(["", "", bold("**TOTAL DUE**"), bold(currency(total, currencySymbol))]);

  return sections(
    h1("INVOICE"),
    "\n",
    `${bold("Invoice #:")} ${invoiceNumber}  \n${bold("Invoice Date:")} ${formatLongDate(today)}  \n${bold("Due Date:")} ${bold(formatLongDate(dueDate))}  \n${input.projectName ? `${bold("Project:")} ${input.projectName}  \n` : ""}`,
    "\n",
    hr(),
    "\n",
    // Billed To / From side by side (as table for markdown compatibility)
    table(
      ["Billed To", "From"],
      [[clientDisplay, consultantDisplay]]
    ),
    "\n",
    hr(),
    "\n",
    h2("Services"),
    table(
      ["Description", "Qty / Unit", "Rate", "Amount"],
      [...lineItemRows, ...summaryRows]
    ),
    "\n",
    hr(),
    "\n",
    h2(`Amount Due: ${currency(total, currencySymbol)}`),
    `Payment is due by ${bold(formatLongDate(dueDate))} (Net ${input.paymentTermsDays}).\n`,
    "\n",
    input.bankDetails
      ? `${h3("Payment Details")}\n${input.bankDetails}\n\n`
      : `${h3("Accepted Payment Methods")}\nACH bank transfer · Wire transfer · Check · Zelle\n\n_Please reference invoice number ${invoiceNumber} with your payment._\n\n`,
    input.memo
      ? `${h3("Notes")}\n${input.memo}\n\n`
      : "",
    h2("Late Payment Policy"),
    `Invoices unpaid after ${input.paymentTermsDays} days are subject to a 1.5% monthly service charge. If you have questions about this invoice, please contact ${input.consultantEmail || input.consultantName} immediately.\n`,
    "\n",
    hr(),
    "\n",
    `${bold("Thank you for your business!")}\n\n*Invoice generated ${formatISODate(today)} · consultant-ai · thewedgemethodai.com*\n`
  );
}
