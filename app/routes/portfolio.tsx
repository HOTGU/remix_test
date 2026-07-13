import { Link, useFetcher, useLoaderData } from "react-router";

import { getDb } from "~/libs/db.server";
import Container from "~/components/global/Container";
import PaddingSection from "~/components/global/PaddingSection";
import Select from "~/components/global/Select";
import type { Portfolio } from "~/schemas/portfolio.server";
import type { Route } from "../+types/root";
import { useEffect, useState } from "react";
import ProgressiveImage from "~/components/global/ProgressiveImage";

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

const portfolio = () => {
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

  return (
    <div className="w-full h-full">
      <Container>
        <PaddingSection size="xl" />
        <h1 className="text-9xl ">Portfolio</h1>
        <div className="pt-24">
          <div className="flex justify-between ">
            <div className="w-1/3">
              <Select
                label="소재별"
                options={[
                  { label: "FRP", value: "FRP" },
                  { label: "패브릭", value: "패브릭" },
                  { label: "에어", value: "에어" },
                  { label: "종이", value: "종이" },
                ]}
                className=" pt-0"
                buttonClassName="font-medium text-xl "
              />

              <Select
                label="콘텐츠별"
                options={[
                  { label: "캐릭터", value: "캐릭터" },
                  { label: "인형탈", value: "인형탈" },
                  { label: "소품", value: "소품" },
                ]}
                className=" pt-4"
                buttonClassName="font-medium text-xl "
              />
            </div>
            <div className="w-1/3 text-lg font-light flex flex-col gap-2">
              <div>
                창의적인 디자인과 정교한 제작 기술을 바탕으로 공간의 가치를
                높이는 조형물을 완성하며, 고객의 브랜드와 이야기를 담은 특별한
                조형물을 만들어갑니다.
              </div>
              <div>
                <Link to="/contact">
                  <span className="font-bold underline">
                    만들고 싶은 조형물
                  </span>
                </Link>
                이 있으신가요?
              </div>
            </div>
          </div>
        </div>
        <PaddingSection size="sm" />
      </Container>
      <div className="w-full min-h-screen">
        <div className="flex flex-wrap">
          {portfolios.map((portfolio, i) => (
            <div
              className=" group relative overflow-hidden w-1/2 aspect-video"
              key={i}
            >
              <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                <ProgressiveImage
                  src={portfolio.thumb}
                  blurSrc={portfolio.blurThumb}
                  alt={portfolio.title}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-500" />

              {/* Content */}
              <div className=" absolute top-8 left-8 text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <div className="text-3xl font-semibold">{portfolio.title}</div>

                <div className="mt-2 text-sm font-light opacity-70">
                  {portfolio.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {hasMore && (
        <div className="flex justify-center py-20">
          <button
            disabled={fetcher.state !== "idle"}
            onClick={() =>
              fetcher.load(`/portfolio?offset=${portfolios.length}`)
            }
            className="border w-50 h-16 hover:bg-white hover:text-black transition cursor-pointer"
          >
            {fetcher.state === "loading" ? "불러오는 중..." : "더 보기"}
          </button>
        </div>
      )}
    </div>
  );
};

export default portfolio;
