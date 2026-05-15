import { z } from "zod";
import { ObjectId } from "mongodb";

export const PortfolioSchema = z.object({
  _id: z.union([z.instanceof(ObjectId), z.string()]),

  images: z.array(z.string()),

  thumb: z.string(),

  blurThumb: z.string(),

  title: z.string().min(1),

  description: z.string(),

  isRep: z.boolean(),

  metaTitle: z.string(),

  metaDescription: z.string(),

  metaKeywords: z.array(z.string()),

  createdAt: z.coerce.date(),

  category: z.array(z.string()),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;
