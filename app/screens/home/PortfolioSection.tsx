// PortfolioSection.tsx
import { Link } from "react-router";
import ReverseUnderlineText from "~/components/framer/ReverseUnderlineText";
import Container from "~/components/global/Container";
import PaddingSection from "~/components/global/PaddingSection";

const PortfolioSection = () => {
  return (
    <section>
      <Container>
        {/* SEO용 H2 태그 */}
        <h2 className="sr-only">
          FRP 조형물, 캐릭터 모형, 인형탈, 에어 조형물 주요 포트폴리오
        </h2>
        <div className="flex flex-col gap-40">
          <div className="w-full aspect-video mx-auto bg-red-200" />
          <div className="flex">
            <div className="flex-1 aspect-4/3 bg-yellow-300" />
            <div className="flex-1 aspect-4/3 bg-blue-300" />
          </div>
        </div>

        <PaddingSection size="md" />

        <div className="flex items-center justify-center">
          <Link to="/portfolio" aria-label="포트폴리오 더보기 페이지로 이동">
            <ReverseUnderlineText
              size="sm"
              color="white"
              label="포트폴리오 더 보기"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default PortfolioSection;
