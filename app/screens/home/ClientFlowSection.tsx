// ClientFlowSection.tsx
import PaddingSection from "~/components/global/PaddingSection";

const logos = [
  { src: "/imgs/logo/nongshim.webp", alt: "농심" },
  { src: "/imgs/logo/lotte.webp", alt: "롯데" },
  { src: "/imgs/logo/yangsan.webp", alt: "양산시" },
  { src: "/imgs/logo/shinsegae.webp", alt: "신세계" },
  { src: "/imgs/logo/ralph-lauren.webp", alt: "랄프로렌" },
  { src: "/imgs/logo/ulleung.webp", alt: "울릉군" },
  { src: "/imgs/logo/lotteria.webp", width: 70, alt: "롯데리아" },
  { src: "/imgs/logo/lush.webp", alt: "러쉬" },
  { src: "/imgs/logo/keco.webp", alt: "한국환경공단" },
  { src: "/imgs/logo/sangju-museum.webp", width: 160, alt: "상주박물관" },
  { src: "/imgs/logo/khu.webp", alt: "경희대학교" },
  { src: "/imgs/logo/pyeongtaek.webp", alt: "평택시" },
  { src: "/imgs/logo/gimcheon.webp", alt: "김천시" },
  { src: "/imgs/logo/namyangju.webp", width: 90, alt: "남양주" },
  { src: "/imgs/logo/seoul-fire.webp", width: 160, alt: "서울소방재난본부" },
  { src: "/imgs/logo/wonju.webp", alt: "원주시" },
];

const logo2s = [
  { src: "/imgs/logo/cj.webp", width: 70, alt: "CJ" },
  { src: "/imgs/logo/nfm.webp", alt: "국립민속박물관" },
  { src: "/imgs/logo/disney.webp", width: 100, alt: "디즈니" },
  { src: "/imgs/logo/hira.webp", width: 170, alt: "건강보험심사평가원" },
  { src: "/imgs/logo/ebs.webp", alt: "EBS" },
  { src: "/imgs/logo/museum.webp", alt: "국립중앙박물관" },
  { src: "/imgs/logo/kspo.webp", alt: "국민체육진흥공단" },
  { src: "/imgs/logo/gwangju.webp", width: 120, alt: "광주시" },
  { src: "/imgs/logo/mobis.webp", width: 110, alt: "현대모비스" },
  { src: "/imgs/logo/geoje.webp", alt: "거제시" },
  { src: "/imgs/logo/goyang-expo.webp", width: 160, alt: "고양국제박람회재단" },
  { src: "/imgs/logo/yonsei.webp", width: 70, alt: "연세대학교" },
  { src: "/imgs/logo/hanyang.webp", alt: "한양대학교" },
  { src: "/imgs/logo/im-financial.webp", width: 160, alt: "iM금융그룹" },
  { src: "/imgs/logo/lg.webp", width: 80, alt: "LG" },
  { src: "/imgs/logo/sbs.webp", alt: "SBS" },
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
                alt={item.alt}
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
                alt={item.alt}
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
