import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

import Container from "~/components/global/Container";
import { Link } from "react-router";
import PaddingSection from "~/components/global/PaddingSection";
import ReverseUnderlineText from "~/components/framer/ReverseUnderlineText";

export const PROCESS_STEPS = [
  {
    title: "01",
    text: "프로젝트 의뢰",
    description:
      " 고객의 요구사항을 파악하고, 프로젝트의 목표와 범위를 정의합니다.",
  },
  {
    title: "02",
    text: "기획 및 디자인",
    description:
      " 고객의 요구사항을 바탕으로 프로젝트의 기획과 디자인을 진행합니다.",
  },
  {
    title: "03",
    text: "제작",
    description: "제작 과정에서 고객과의 소통을 통해 디자인을 구현합니다.",
  },
  {
    title: "04",
    text: "운송 및 설치",
    description: "제작된 조형물을 고객의 요구에 맞게 운송하고 설치합니다.",
  },
];

const HomeClient = () => {
  const whiteSection = useRef(null);
  const primarySection = useRef(null);

  const isInWhiteSection = useInView(whiteSection, {
    margin: "-20% 0px -20% 0px",
  });
  const isInPrimarySection = useInView(primarySection, {
    margin: "-20% 0px -20% 0px",
  });

  return (
    <motion.div
      animate={{
        backgroundColor: isInWhiteSection
          ? "white"
          : isInPrimarySection
            ? "#ffe395"
            : "black",
      }}
      transition={{ duration: 0.5 }}
      className="transition duration-1000"
    >
      <Container>
        <PaddingSection />

        {/* 회사 슬로건 */}
        <div className="flex justify-between text-white font-pretendard">
          <p className="w-1/4 leading-7.5 whitespace-pre-line break-keep">
            위브먼트에게는 조형물의 크기도 목적도 소재도 제한이 없습니다 예산과
            일정 목적에 알맞은 예술적인 결과를 만들어갑니다
          </p>
          <p className="w-2/3 text-7xl leading-25 whitespace-pre-wrap break-keep">
            우리는 고객들에게 대단한 경험을 하게 해줄 수 있다. <br />
            (우리는 투자합니다)
          </p>
        </div>

        <PaddingSection />

        {/* 회사 포트폴리오 섹션 */}
        <div className=" flex flex-col gap-40">
          <div className="w-[80%] aspect-video mx-auto bg-red-200" />
          <div className="flex justify-between h-[150vh]">
            <div className="self-end w-2/5 aspect-580/720 bg-yellow-300" />
            <div className="self-start w-2/5 aspect-580/720 bg-blue-300" />
          </div>
        </div>

        <PaddingSection size="md" />

        {/* 포트폴리오 더보기 버튼 */}
        <div className="flex items-center justify-center">
          <Link to="/portfolio">
            <ReverseUnderlineText
              size="sm"
              color="white"
              label="포트폴리오 더 보기"
            />
          </Link>
        </div>

        <PaddingSection />

        {/* 회사 소개 */}
        <div className="flex justify-between text-white font-pretendard">
          <div className="w-1/2 pr-40">
            <div className="text-6xl mb-10 leading-tight">
              감각적인 제조를
              <br />
              위한 최고의 선택
            </div>
            <div className="text-xl whitespace-pre-wrap break-keep">
              우리는 클라이언트들과 협력하고 원하는 바를 정확히 파악하기 위해
              끊임없이 소통하며 아이디어를 한단계 더 발전시킵니다
            </div>
          </div>
          <div className="w-1/2 space-y-10">
            <StatsCard
              title="프로젝트 문의"
              value="2520+"
              subtitle="2023년부터 매 해 2배 성장"
            />
            <StatsCard
              title="프로젝트 클라이언트"
              value="207+"
              subtitle="공공기관 및 주요 기업과 협업"
            />
          </div>
        </div>

        <PaddingSection />

        {/* white background section */}
        <div ref={whiteSection}>
          {/* 회사 클라이언트 */}
          <div className="flex gap-4">
            <div className="flex-1 bg-neutral-900 aspect-5/4" />
            <div className="flex-1 bg-neutral-900 aspect-5/4" />
          </div>

          <PaddingSection size="md" />

          {/* 회사 작업 과정 */}
          <div className=" text-neutral-900">
            <div className="text-7xl">우리가 일하는 방식:</div>
            <div className="pt-20" />
            <div className="flex flex-col items-end">
              {PROCESS_STEPS.map((item) => (
                <ProcessItem item={item} key={item.title} />
              ))}
            </div>
          </div>
        </div>

        {/* primary background section */}
        <div ref={primarySection}>
          <PaddingSection />
          <PaddingSection size="md" />

          {/* <PortfolioGrid portfolios={portfolios} /> */}

          <div className="flex flex-col justify-center items-center gap-20 text-neutral-900">
            <div className="text-6xl">우리가 어떻게 도와드릴까요?</div>

            <Link to="/contact">
              <ReverseUnderlineText
                size="lg"
                color="black"
                label="문의하러 가기"
              />
            </Link>

            <PaddingSection />
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default HomeClient;

// const PortfolioGrid = ({ portfolios }: { portfolios: Portfolio[] }) => (
//   <div className="flex gap-4 items-center pb-40">
//     {portfolios.map((portfolio) => (
//       <div key={portfolio.id} className="w-full aspect-[4/3] relative">
//         <Image
//           src={portfolio.thumb}
//           fill
//           alt={`${portfolio.title} 사진`}
//           className="object-cover"
//         />
//       </div>
//     ))}
//   </div>
// );

const ProcessItem = ({ item }: { item: (typeof PROCESS_STEPS)[0] }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="w-[70%] border-t border-neutral-300">
      <div className="pt-8" />
      <div
        className="flex items-center font-normal cursor-pointer"
        onClick={() => setActive((prev) => !prev)}
      >
        <div className="w-1/12 text-xl">{item.title}</div>
        <div className="flex-1 text-3xl">{item.text}</div>
        <motion.div className="relative" animate={active ? "minus" : "plus"}>
          <motion.div
            variants={{ plus: { rotate: 90 }, minus: { rotate: 0 } }}
            className="absolute h-[2px] w-5 bg-neutral-800 right-0"
          />
          <motion.div className="absolute h-[2px] w-5 bg-neutral-800 right-0" />
        </motion.div>
      </div>

      <motion.div
        className="overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pt-8" />
        <div className="flex">
          <div className="w-1/12" />
          <div className="font-light">{item.description}</div>
        </div>
      </motion.div>

      <div className="pt-10" />
    </div>
  );
};

const StatsCard = ({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) => (
  <div className="w-full aspect-[679/320] rounded bg-neutral-900 p-10 flex flex-col justify-between">
    <div className="flex items-center gap-4">
      <div className=" text-3xl font-bold">{title}</div>
    </div>
    <div className="flex justify-between">
      <div className=" text-5xl text-neutral-400">{value}</div>
      <div className=" text-xl font-light font-ibm text-neutral-400 self-end">
        {subtitle}
      </div>
    </div>
  </div>
);
