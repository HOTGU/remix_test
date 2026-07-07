import { useRef } from "react";
import { useInView, motion } from "framer-motion";

import Container from "~/components/global/Container";
import PaddingSection from "~/components/global/PaddingSection";

import SloganSection from "./SloganSection";
import PortpolioSection from "./PortfolioSection";
import CompanyProfileSection from "./CompanyProfileSection";
import CompanyWorkSection from "./CompanyWorkSection";

const HomeClient = () => {
  const whiteSection = useRef(null);

  const isInWhiteSection = useInView(whiteSection, {
    margin: "-20% 0px -20% 0px",
  });

  const backgroundColor = (() => {
    if (isInWhiteSection) return "white";
  })();

  return (
    <motion.div
      animate={{
        backgroundColor,
      }}
      transition={{ duration: 0.5 }}
      className="transition duration-1000"
    >
      <Container>
        <PaddingSection />

        {/* 회사 슬로건 */}
        <SloganSection />
        <PaddingSection />

        {/* 회사 포트폴리오 섹션 */}
        <PortpolioSection />
        <PaddingSection />

        {/* 회사 소개 */}
        <CompanyProfileSection />
        <PaddingSection />

        {/* white background section */}
        <div ref={whiteSection}>
          {/* 회사 작업 */}
          <CompanyWorkSection />
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
