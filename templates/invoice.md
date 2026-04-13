# INVOICE

**Invoice #:** {{INVOICE_NUMBER}}
**Invoice Date:** {{INVOICE_DATE}}
**Due Date:** {{DUE_DATE}}
**Project:** {{PROJECT_NAME}}

---

| Billed To | From |
|-----------|------|
| {{CLIENT_NAME}} | {{CONSULTANT_NAME}} |
| {{CLIENT_COMPANY}} | {{CONSULTANT_COMPANY}} |
| {{CLIENT_EMAIL}} | {{CONSULTANT_EMAIL}} |
| {{CLIENT_ADDRESS}} | {{CONSULTANT_ADDRESS}} |

---

## Services

| Description | Qty / Unit | Rate | Amount |
|-------------|-----------|------|--------|
| {{SERVICE_1_DESC}} | {{SERVICE_1_QTY}} hours | {{RATE_1}}/hr | {{AMOUNT_1}} |
| {{SERVICE_2_DESC}} | {{SERVICE_2_QTY}} hours | {{RATE_2}}/hr | {{AMOUNT_2}} |
| | | **Subtotal** | {{SUBTOTAL}} |
| | | **Tax ({{TAX_RATE}}%)** | {{TAX_AMOUNT}} |
| | | **TOTAL DUE** | **{{TOTAL}}** |

---

## Amount Due: {{TOTAL}}

Payment due by **{{DUE_DATE}}** (Net {{PAYMENT_TERMS_DAYS}}).

### Payment Details

{{PAYMENT_INSTRUCTIONS}}

*Please reference invoice # {{INVOICE_NUMBER}} with your payment.*

---

### Late Payment Policy

Invoices unpaid after {{PAYMENT_TERMS_DAYS}} days are subject to a 1.5% monthly service charge.

---

**Thank you for your business!**

*Generated with consultant-ai · thewedgemethodai.com*
