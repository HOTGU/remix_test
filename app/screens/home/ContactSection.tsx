// ContactSection.tsx
import { Link } from "react-router";
import ReverseUnderlineText from "~/components/framer/ReverseUnderlineText";

const ContactSection = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-20 text-neutral-900 bg-amber-200 h-screen">
      {/* SEO용 H2 태그 */}
      <h2 className="sr-only">
        조형물 제작 견적 및 캐릭터·인형탈 맞춤 제작 프로젝트 문의
      </h2>
      <p className="text-6xl" aria-hidden="true">
        어떤 아이디어를 실현해 드릴까요?
      </p>
      <Link to="/contact" aria-label="프로젝트 문의하기 페이지로 이동">
        <ReverseUnderlineText size="lg" color="black" label="문의하기" />
      </Link>
    </section>
  );
};

export default ContactSection;
