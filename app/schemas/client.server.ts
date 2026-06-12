import { ObjectId } from "mongodb";
import { z } from "zod";

export const ClientSchema = z.object({
  _id: z.instanceof(ObjectId).default(() => new ObjectId()),

  name: z.string().min(1, "성함은 필수입니다"),

  phone: z.string().min(1, "번호는 필수입니다"),

  email: z.email("올바른 이메일 형식이 아닙니다"),

  position: z.string().optional(),
});

export type Client = z.infer<typeof ClientSchema>;
