import { useEffect, useState } from "react";
import { Link, useFetcher, useLoaderData } from "react-router";

import { getDb } from "~/libs/db.server";
import Container from "~/components/global/Container";
import PaddingSection from "~/components/global/PaddingSection";
import Select from "~/components/global/Select";
import type { Portfolio } from "~/schemas/portfolio.server";
import type { Route } from "./+types/portfolio";
import ProgressiveImage from "~/components/global/ProgressiveImage";

// 1. Portfolio 전용 SEO Meta 함수
export function meta({ location }: Route.MetaArgs) {
  const domain = "https://weavement.co.kr"; // 실제 도메인으로 변경하세요
  const title = "포트폴리오 | 위브먼트 조형물 제작 사례";
  const description =
    "FRP 조형물, 캐릭터 모형, 인형탈, 에어 상징물 등 위브먼트가 완성한 다양한 공간 조형물 프로젝트 사례를 확인해보세요.";

  return [
    { title },
    { name: "description", content: description },
    {
      name: "keywords",
      content:
        "조형물 포트폴리오, FRP조형물 사례, 캐릭터조형물 제작, 인형탈 제작사례, 에어조형물, 위브먼트",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: `${domain}${location.pathname}`,
    },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: `${domain}${location.pathname}` },
    { property: "og:locale", content: "ko_KR" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const db = await getDb();

  const url = new URL(request.url);
  const offset = Number(url.searchParams.get("offset") ?? "0");
  const limit = 10;

  const portfolios = await db
    .collection<Portfolio>("Portfolio")
    .find()
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .toArray();

  const total = await db.collection<Portfolio>("Portfolio").countDocuments();

  return { portfolios, total };
};

export default function PortfolioPage() {
  const { portfolios: initialPortfolios, total } =
    useLoaderData<typeof loader>();

  const fetcher = useFetcher();
  const [portfolios, setPortfolios] = useState(initialPortfolios);

  useEffect(() => {
    if (fetcher.data?.portfolios) {
      setPortfolios((prev) => [...prev, ...fetcher.data.portfolios]);
    }
  }, [fetcher.data]);

  const hasMore = portfolios.length < total;

  // 2. 포트폴리오 리스트 구조화 데이터 (JSON-LD ItemList)
  const portfolioListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "위브먼트 조형물 제작 포트폴리오",
    numberOfItems: portfolios.length,
    itemListElement: portfolios.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.title,
        image: item.thumb,
        genre: item.category,
      },
    })),
  };

  return (
    <main className="w-full h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioListJsonLd),
        }}
      />

      <Container>
        <PaddingSection size="xl" />

        {/* 3. SEO용 H1 헤딩 및 sr-only 보완 */}
        <header>
          <h1 className="text-9xl">Portfolio</h1>
          <p className="sr-only">
            위브먼트 FRP·캐릭터·인형탈·에어 조형물 맞춤 제작 포트폴리오 모음
          </p>
        </header>

        <section className="pt-24">
          <div className="flex justify-between">
            <div className="w-1/3">
              <Select
                label="소재별"
                options={[
                  { label: "FRP", value: "FRP" },
                  { label: "패브릭", value: "패브릭" },
                  { label: "에어", value: "에어" },
                  { label: "종이", value: "종이" },
                ]}
                className="pt-0"
                buttonClassName="font-medium text-xl"
              />

              <Select
                label="콘텐츠별"
                options={[
                  { label: "캐릭터", value: "캐릭터" },
                  { label: "인형탈", value: "인형탈" },
                  { label: "소품", value: "소품" },
                ]}
                className="pt-4"
                buttonClassName="font-medium text-xl"
              />
            </div>

            <div className="w-1/3 text-lg font-light flex flex-col gap-2">
              <p>
                창의적인 디자인과 정교한 제작 기술을 바탕으로 공간의 가치를
                높이는 조형물을 완성하며, 고객의 브랜드와 이야기를 담은 특별한
                조형물을 만들어갑니다.
              </p>
              <p>
                <Link
                  to="/contact"
                  aria-label="만들고 싶은 조형물 제작 문의하기"
                >
                  <span className="font-bold underline">
                    만들고 싶은 조형물
                  </span>
                </Link>
                이 있으신가요?
              </p>
            </div>
          </div>
        </section>
        <PaddingSection size="sm" />
      </Container>

      {/* 4. 포트폴리오 그리드 레이아웃 */}
      <section
        className="w-full min-h-screen"
        aria-label="조형물 제작 사례 갤러리"
      >
        <div className="flex flex-wrap">
          {portfolios.map((portfolio, i) => (
            <article
              className="group relative overflow-hidden w-1/2 aspect-video"
              key={i}
            >
              <div className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-105">
                <ProgressiveImage
                  src={portfolio.thumb}
                  blurSrc={portfolio.blurThumb}
                  /* 구글 이미지 검색 노출을 위한 상세 alt 설정 */
                  alt={`위브먼트 ${portfolio.category || "조형물"} 제작 사례 - ${portfolio.title}`}
                  /* 상단 4개 이미지(첫 화면)는 우선 로드 처리 */
                  isPriority={i < 4}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-500" />

              {/* Content */}
              <div className="absolute top-8 left-8 text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <h2 className="text-3xl font-semibold">{portfolio.title}</h2>
                <p className="mt-2 text-sm font-light opacity-70">
                  {portfolio.category}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {hasMore && (
        <div className="flex justify-center py-20">
          <button
            type="button"
            disabled={fetcher.state !== "idle"}
            onClick={() =>
              fetcher.load(`/portfolio?offset=${portfolios.length}`)
            }
            className="border w-50 h-16 hover:bg-white hover:text-black transition cursor-pointer"
            aria-label="포트폴리오 더 불러오기"
          >
            {fetcher.state === "loading" ? "불러오는 중..." : "더 보기"}
          </button>
        </div>
      )}
    </main>
  );
}
