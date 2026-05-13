import { Link } from "react-router";

import ReverseUnderlineText from "~/components/framer/ReverseUnderlineText";
import PaddingSection from "~/components/global/PaddingSection";

const PortpolioSection = () => {
  return (
    <>
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
    </>
  );
};

export default PortpolioSection;
