// app/schemas/contact.server.ts

import { ObjectId } from "mongodb";
import { z } from "zod";

import { ClientSchema } from "./client.server";

export const ContactSchema = z.object({
  _id: z.instanceof(ObjectId).default(() => new ObjectId()),

  hasDesign: z.string().min(1, "디자인 여부를 선택해주세요"),

  cost: z.string().min(1, "예산을 선택해주세요"),

  schedule: z.string().min(1, "일정을 선택해주세요"),

  description: z.string().min(1, "설명을 입력해주세요"),

  images: z.array(z.string()).default([]),

  knowPlatform: z.string().min(1, "유입 경로를 선택해주세요"),

  contactPath: z.string().default("홈페이지"),

  clientCompany: z.string().min(1, "회사명은 필수입니다"),

  createdAt: z.date().default(() => new Date()),

  state: z.string().default("문의"),

  pm: z.string().default("미정"),

  meterial: z.array(z.string()).default([]),

  content: z.string().optional(),

  orderCompany: z.string().optional(),

  note: z.string().optional(),

  clients: z.array(ClientSchema).min(1),
});

export type Contact = z.infer<typeof ContactSchema>;
