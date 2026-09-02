import Container from "~/components/global/Container";

const SloganSection = () => {
  return (
    <Container>
      <div className="flex justify-between items-start">
        <p className="w-1/5 leading-6 pt-4 font-light whitespace-pre-line break-keep ">
          감각적인 제조, <br />
          새로운 공간과 경험을 만듭니다.
        </p>
        <p className="w-2/3 text-6xl leading-20 whitespace-pre-wrap break-keep">
          예술적 감각에 전문 기술을 더해 <br />
          조형 산업의 새로운 길을 제시하고, <br />
          트렌드를 선호합니다.
        </p>
      </div>
    </Container>
  );
};

export default SloganSection;
