// ClientFlowSection.tsx
import PaddingSection from "~/components/global/PaddingSection";

const items = Array.from({ length: 20 }, (_, i) => i + 1);

const logos = [
  { src: "/imgs/logo/경희대학교.webp" },
  { src: "/imgs/logo/농심.webp" },
  { src: "/imgs/logo/랄프로렌.webp" },
  { src: "/imgs/logo/롯데리아.webp", width: 70 },
  { src: "/imgs/logo/러쉬.webp" },
  { src: "/imgs/logo/롯데.webp" },
  { src: "/imgs/logo/신세계.webp" },
  { src: "/imgs/logo/연세대학교.webp", width: 70 },
  { src: "/imgs/logo/한양대학교.webp" },
  { src: "/imgs/logo/현대모비스.webp", width: 110 },
  { src: "/imgs/logo/cj.webp", width: 70 },
  { src: "/imgs/logo/disney.webp", width: 100 },
  { src: "/imgs/logo/ebs.webp" },
  { src: "/imgs/logo/im금융그룹.webp", width: 160 },
  { src: "/imgs/logo/lg.webp", width: 80 },
  { src: "/imgs/logo/sbs.webp" },
];

const logo2s = [
  { src: "/imgs/logo2/거제시.webp" },
  { src: "/imgs/logo2/건강보험심사평가원.webp", width: 170 },
  { src: "/imgs/logo2/고양국제박람회재단.webp", width: 160 },
  { src: "/imgs/logo2/광주시.webp", width: 120 },
  { src: "/imgs/logo2/국립민속박물관.webp" },
  { src: "/imgs/logo2/국립중앙박물관.webp" },
  { src: "/imgs/logo2/국민체육진흥공단.webp" },
  { src: "/imgs/logo2/김천시.webp" },
  { src: "/imgs/logo2/남양주.webp", width: 90 },
  { src: "/imgs/logo2/상주박물관.webp", width: 160 },
  { src: "/imgs/logo2/서울소방재난본부.webp", width: 160 },
  { src: "/imgs/logo2/양산시.webp" },
  { src: "/imgs/logo2/울룽군.webp" },
  { src: "/imgs/logo2/원주시.webp" },
  { src: "/imgs/logo2/평택시.webp" },
  { src: "/imgs/logo2/한국환경공단.webp" },
];

const ClientFlowSection = () => {
  return (
    <section>
      {/* SEO용 H2 태그 */}
      <h2 className="sr-only">브랜드 맞춤형 캐릭터 조형물 클라이언트 사례</h2>

      <div className="flex mt-12" aria-hidden="true">
        <div className="w-1/2"></div>
        <p className="w-1/2 text-5xl font-extralight space-y-2">
          <div>내일의 브랜드를 오늘의 조형으로</div>
          <div>만들어 드립니다</div>
        </p>
      </div>
      <PaddingSection size="md" />
      <div className="overflow-hidden w-full space-y-6">
        <ul className="flex w-max animate-marquee gap-4">
          {[...logos, ...logos].map((item, index) => (
            <li
              key={index}
              className="w-56 h-32 shrink-0 flex items-center justify-center text-4xl font-bold bg-neutral-100 text-white"
            >
              <img
                src={item.src}
                width={item.width ? item.width : 130}
                className="bg-neutral-100"
              />
            </li>
          ))}
        </ul>
        <ul className="flex w-max animate-marquee [animation-direction:reverse] gap-4">
          {[...logo2s, ...logo2s].map((item, index) => (
            <li
              key={index}
              className="w-56 h-32 shrink-0 flex items-center justify-center text-4xl font-bold bg-neutral-100 text-white"
            >
              <img
                src={item.src}
                width={item.width ? item.width : 130}
                className="bg-neutral-100"
              />
            </li>
          ))}
        </ul>
      </div>
      <PaddingSection size="lg" />
    </section>
  );
};

export default ClientFlowSection;
