import { z } from "zod";

export const InvoiceSchema = z.object({
  title: z.string(),
  invoice: z.string(),

  date: z.string(),
  due: z.string(),

  currency: z.enum(["USD", "EUR", "GBP"]).array(),
  rate: z.string(),

  from: z.object({
    name: z.string(),
    postal: z.string(),
    city: z.string(),
    country: z.string(),
    address: z.string(),
  }),

  to: z.object({
    name: z.string(),
    postal: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    country: z.string().optional(),
  }),

  items: z
    .object({
      description: z.string(),
      quantity: z.string(),
    })
    .array(),
});

export const OutputSchema = InvoiceSchema.extend({
  date: z.coerce.date(),
  due: z.coerce.date(),

  currency: InvoiceSchema.shape.currency.transform((v) => v[0]!),
  rate: z.coerce.number(),

  items: z
    .object({
      description: z.string(),
      quantity: z.coerce.number(),
    })
    .array(),
});

export const InputSchema = InvoiceSchema.omit({
  items: true,
  title: true,
}).extend({
  title: z.string().optional(),
  prompt: z.string(),
});
