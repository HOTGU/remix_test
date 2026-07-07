import { Link } from "react-router";

import ReverseUnderlineText from "~/components/framer/ReverseUnderlineText";
import Container from "~/components/global/Container";
import PaddingSection from "~/components/global/PaddingSection";

const PortfolioSection = () => {
  return (
    <Container>
      <div className=" flex flex-col gap-40">
        <div className="w-full aspect-video mx-auto bg-red-200" />
        <div className="flex">
          <div className="flex-1 aspect-4/3 bg-yellow-300" />
          <div className="flex-1 aspect-4/3 bg-blue-300" />
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
    </Container>
  );
};

export default PortfolioSection;
