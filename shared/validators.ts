import { z } from "zod";

export const EntitySchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  postal: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export const InvoiceSchema = z.object({
  title: z.string(),
  invoice: z.string(),

  date: z.string(),
  due: z.string(),

  currency: z.enum(["USD", "EUR", "GBP"]).array(),
  rate: z.string(),

  from: EntitySchema,
  to: EntitySchema,

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
  rate: z.string().transform((v) => {
    v = v.replace(/[^0-9.-]+/g, "");
    return parseFloat(v);
  }),

  items: z
    .object({
      description: z.string(),
      quantity: z.string().transform((v) => parseFloat(v)),
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
