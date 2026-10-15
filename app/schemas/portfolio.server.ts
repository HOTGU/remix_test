import { z } from "zod";
import { ObjectId } from "mongodb";

// 📸 이미지 갤러리 내장 타입 스키마 (url + caption)
export const PortfolioImageSchema = z.object({
  url: z.string(),
  caption: z.string().optional(),
});

// 📁 포트폴리오 전체 스키마
export const PortfolioSchema = z.object({
  _id: z.union([z.instanceof(ObjectId), z.string()]),

  // 🔍 URL 라우팅용 (Optional)
  slug: z.string().nullable().optional(),

  // 📝 기본 정보
  title: z.string().min(1),
  subtitle: z.string().nullable().optional(),
  thumb: z.string(),
  blurThumb: z.string(),

  // 📸 갤러리 이미지 (객체 배열로 변경됨)
  images: z.array(PortfolioImageSchema).default([]),

  // 🛠️ 제작 스펙
  material: z.array(z.string()).default([]),
  category: z.array(z.string()).default([]),
  size: z.string().nullable().optional(),
  clientCompany: z.string().nullable().optional(),
  projectDate: z.string().nullable().optional(),
  location: z.string().nullable().optional(),

  // 📖 스토리텔링
  description: z.string(),
  challenge: z.string().nullable().optional(),
  solution: z.string().nullable().optional(),

  // ⚙️ 전시 옵션 및 메타데이터
  isRep: z.boolean().default(false),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  metaKeywords: z.array(z.string()).default([]),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
});

export type PortfolioImage = z.infer<typeof PortfolioImageSchema>;
export type Portfolio = z.infer<typeof PortfolioSchema>;
