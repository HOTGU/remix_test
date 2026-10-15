import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/portfolio.$slug";
import Container from "~/components/global/Container";
import PaddingSection from "~/components/global/PaddingSection";
import ProgressiveImage from "~/components/global/ProgressiveImage";
import { useState } from "react";
import { getDb, ObjectId } from "~/libs/db.server";
import { PortfolioSchema } from "~/schemas/portfolio.server";

// 1. Dynamic Meta & SEO
export function meta({ data }: Route.MetaArgs) {
  if (!data?.portfolio) {
    return [{ title: "포트폴리오를 찾을 수 없습니다 | 위브먼트" }];
  }

  const { portfolio } = data;
  const domain = "https://yourdomain.com"; // 실제 도메인 주소로 변경
  const canonicalUrl = `${domain}/portfolio/${portfolio.slug}`;

  return [
    { title: portfolio.metaTitle },
    { name: "description", content: portfolio.metaDescription },
    { name: "keywords", content: portfolio.category.join(", ") },
    { tagName: "link", rel: "canonical", href: canonicalUrl },

    // Open Graph
    { property: "og:type", content: "article" },
    { property: "og:title", content: portfolio.title },
    { property: "og:description", content: portfolio.description },
    { property: "og:image", content: `${domain}${portfolio.thumb}` },
    { property: "og:url", content: canonicalUrl },
    { property: "og:locale", content: "ko_KR" },
  ];
}

// 2. Loader Function (DB 연결시 db.collection.findOne({ slug }) 로 대체)
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const db = await getDb();
  // Next.js Prisma가 생성한 컬렉션 이름은 대문자 "Portfolio"입니다.
  const collection = db.collection("Portfolio");

  // 24자리 ObjectId 규격인지 체크
  const isObjectId = ObjectId.isValid(slug) && slug.length === 24;

  const rawPortfolio = await collection.findOne({
    $or: [...(isObjectId ? [{ _id: new ObjectId(slug) }] : []), { slug: slug }],
  });

  if (!rawPortfolio) {
    throw new Response("Not Found", { status: 404 });
  }

  // 🔍 Zod 스키마 검증
  const parseResult = PortfolioSchema.safeParse(rawPortfolio);

  if (!parseResult.success) {
    console.error(
      "❌ Portfolio Zod Validation Error:",
      parseResult.error.format(),
    );
    throw new Response("Data Validation Failed", { status: 500 });
  }

  const data = parseResult.data;

  // React Router Loader 직렬화(JSON)를 위해 ObjectId 및 Date를 문자열로 직렬화
  const portfolio = {
    ...data,
    _id: data._id.toString(),
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt?.toISOString(),
  };

  return { portfolio };
};

export default function PortfolioDetailPage() {
  const { portfolio } = useLoaderData<typeof loader>();
  const [activeImage, setActiveImage] = useState<{
    url: string;
    caption?: string;
  } | null>(null);

  // 3. 구글 스키마 (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: portfolio.title,
    description: portfolio.description,
    image: [portfolio.thumb, ...portfolio.images.map((img) => img.url)],
    dateCreated: portfolio.projectDate,
    genre: portfolio.category,
    keywords: portfolio.category.join(", "),
    material: portfolio.material.join(", "),
    creator: {
      "@type": "Organization",
      name: "위브먼트 (WEAVEMENT)",
      url: "https://yourdomain.com",
    },
    provider: {
      "@type": "Organization",
      name: portfolio.clientCompany,
    },
  };

  return (
    <main className="min-h-screen bg-black text-slate-100 font-sans antialiased selection:bg-white selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PaddingSection size="lg" />

      <Container>
        {/* 네비게이션 가이드 */}
        <div className="mb-8">
          <Link
            to="/portfolio"
            className="text-sm font-light text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            <span>←</span> 포트폴리오 목록으로 돌아가기
          </Link>
        </div>

        {/* 1. 헤더 섹션 */}
        <header className="space-y-6 border-b border-zinc-800 pb-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono uppercase bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-full">
              {portfolio.category}
            </span>
            <span className="text-xs font-mono text-zinc-500">
              {portfolio.projectDate}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            {portfolio.title}
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 font-extralight break-keep">
            {portfolio.subtitle}
          </p>
        </header>

        {/* 2. 메인 스펙 & 정보 요약 (그리드 레이아웃) */}
        <section className="py-16 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-zinc-800 text-sm">
          <div>
            <div className="text-zinc-500 font-mono text-xs uppercase mb-2">
              Client
            </div>
            <div className="text-lg font-medium text-zinc-200">
              {portfolio.clientCompany}
            </div>
          </div>

          <div>
            <div className="text-zinc-500 font-mono text-xs uppercase mb-2">
              Material
            </div>
            <div className="text-lg font-medium text-zinc-200 flex flex-wrap gap-1">
              {portfolio.material.join(", ")}
            </div>
          </div>

          <div>
            <div className="text-zinc-500 font-mono text-xs uppercase mb-2">
              Dimensions
            </div>
            <div className="text-lg font-medium text-zinc-200 font-mono">
              {portfolio.size}
            </div>
          </div>

          <div>
            <div className="text-zinc-500 font-mono text-xs uppercase mb-2">
              Location
            </div>
            <div className="text-lg font-medium text-zinc-200">
              {portfolio.location}
            </div>
          </div>
        </section>

        {/* 3. 대표 메인 비주얼 이미지 */}
        <section className="py-12">
          <div className="w-full aspect-[16/9] relative overflow-hidden rounded-sm bg-zinc-900 border border-zinc-800">
            <ProgressiveImage
              src={portfolio.thumb}
              blurSrc={portfolio.blurThumb}
              alt={`위브먼트 ${portfolio.title} 대표 완성 이미지`}
              isPriority={true}
            />
          </div>
        </section>

        {/* 4. 프로젝트 스토리 (Overview / Challenge & Solution) */}
        <section className="py-16 space-y-20 max-w-4xl border-b border-zinc-800">
          {/* 개요 */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              01. Overview
            </h2>
            <p className="text-xl md:text-2xl font-light text-zinc-300 leading-relaxed whitespace-pre-line break-keep">
              {portfolio.description}
            </p>
          </div>

          {/* 제작 난제 & 해결책 (전문성 강조) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
            <div className="space-y-4 bg-zinc-950 p-8 border border-zinc-900 rounded-sm">
              <h3 className="text-xs font-mono text-red-400 uppercase tracking-widest">
                Challenge
              </h3>
              <p className="text-base text-zinc-400 font-light leading-relaxed break-keep">
                {portfolio.challenge}
              </p>
            </div>

            <div className="space-y-4 bg-zinc-950 p-8 border border-zinc-900 rounded-sm">
              <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                Solution
              </h3>
              <p className="text-base text-zinc-400 font-light leading-relaxed break-keep">
                {portfolio.solution}
              </p>
            </div>
          </div>
        </section>

        {/* 5. 공정 갤러리 (제작 과정 및 현장 샷) */}
        <section className="py-20 space-y-8 border-b border-zinc-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                02. Fabrication Gallery
              </h2>
              <p className="text-2xl font-light text-white">
                제작 공정 및 현장 상세 ({portfolio.images.length})
              </p>
            </div>
            <p className="text-xs font-mono text-zinc-500">
              * 이미지를 클릭하면 크게 보실 수 있습니다.
            </p>
          </div>

          {/* 📸 3열 그리드 레이아웃 (모바일 2열 / 데스크탑 3열) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {portfolio.images.map((img, idx) => (
              <figure
                key={idx}
                onClick={() => setActiveImage(img)}
                className="group relative cursor-pointer overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-500 transition-colors duration-300 rounded-sm"
              >
                {/* 작은 너비의 이미지에 최적화된 4:3 아스펙트 비율 */}
                <div className="w-full aspect-[4/3] relative overflow-hidden">
                  <ProgressiveImage
                    src={img.url}
                    blurSrc={img.url}
                    alt={img.caption || `공정 이미지 ${idx + 1}`}
                  />

                  {/* 호버 시 나타나는 미세 오버레이 효과 */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-xs font-mono text-white bg-black/70 px-3 py-1.5 rounded-full border border-zinc-700">
                      🔍 확대보기
                    </span>
                  </div>
                </div>

                {img.caption && (
                  <figcaption className="p-3 text-xs font-mono text-zinc-400 bg-zinc-950 border-t border-zinc-900 truncate">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>

        {/* 🔍 이미지 클릭 시 열리는 라이트박스(Modal) */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center space-y-4"
              onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => setActiveImage(null)}
                className="absolute -top-10 right-0 text-zinc-400 hover:text-white font-mono text-sm px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-sm"
              >
                CLOSE ✕
              </button>

              {/* 원본/확대 이미지 */}
              <div className="relative w-full max-h-[80vh] overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950 flex items-center justify-center">
                <img
                  src={activeImage.url}
                  alt={activeImage.caption || "확대 이미지"}
                  className="max-h-[80vh] w-auto object-contain"
                />
              </div>

              {/* 이미지 캡션 */}
              {activeImage.caption && (
                <p className="text-sm font-mono text-zinc-300 text-center bg-zinc-900 px-4 py-2 border border-zinc-800 rounded-sm">
                  {activeImage.caption}
                </p>
              )}
            </div>
          </div>
        )}

        {/* 6. 태그 & 하단 CTA */}
        <section className="py-20 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-wrap gap-2">
            {portfolio.category.map((c, i) => (
              <span
                key={i}
                className="text-xs font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-sm border border-zinc-800"
              >
                #{c}
              </span>
            ))}
          </div>

          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 px-8 py-5 bg-white text-black font-medium hover:bg-zinc-200 transition duration-300"
          >
            <span>이와 유사한 조형물 견적 문의하기</span>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </section>
      </Container>

      <PaddingSection size="lg" />
    </main>
  );
}
