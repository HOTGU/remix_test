import Container from "~/components/global/Container";

const SloganSection = () => {
  return (
    <Container>
      <div className="flex justify-between items-start">
        <p className="w-1/5 leading-6 pt-4 font-light whitespace-pre-line break-keep ">
          위브먼트에게는 조형물의 크기도 목적도 소재도 제한이 없습니다 예산과
          일정 목적에 알맞은 예술적인 결과를 만들어갑니다
        </p>
        <p className="w-2/3 text-7xl leading-24 whitespace-pre-wrap break-keep">
          우리는 고객들에게 대단한 경험을 하게 해줄 수 있다. <br />
          (우리는 투자합니다)
        </p>
      </div>
    </Container>
  );
};

export default SloganSection;
