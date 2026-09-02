// ClientFlowSection.tsx
import PaddingSection from "~/components/global/PaddingSection";

const items = Array.from({ length: 20 }, (_, i) => i + 1);

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
      <div className="overflow-hidden w-full">
        <ul className="flex w-max animate-marquee gap-4">
          {[...items, ...items].map((item, index) => (
            <li
              key={index}
              className="w-56 h-32 shrink-0 flex items-center justify-center text-4xl font-bold bg-zinc-900 text-white"
            >
              {String(item).padStart(2, "0")}
            </li>
          ))}
        </ul>
      </div>
      <PaddingSection size="lg" />
    </section>
  );
};

export default ClientFlowSection;
