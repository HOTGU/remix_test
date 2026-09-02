import Container from "~/components/global/Container";

const CompanyProfileSection = () => {
  return (
    <Container>
      <div className="flex justify-between text-white font-pretendard">
        <div className="w-1/2 pr-32">
          <div className="text-5xl mb-10 leading-tight">
            위브먼트는 조형을 넘어,
            <br />
            경험을 만듭니다.
          </div>
          <div className="text-xl whitespace-pre-wrap break-keep font-thin space-y-6">
            <p>
              빠르게 변화하는 시장과 고객의 요구에 맞춰 새로운 소재와 제작방식을
              고민하고 더 나은 조형 형태를 제안합니다.
            </p>
            <p>
              2023년부터 매년 2배의 성장을 이어오며 다양한 브랜드와 기업의
              프로젝트를 함께해왔습니다.
            </p>
            <p>
              높은 재구매율은 위브먼트가 쌓아온 신뢰를 보여주는 가장 확실한
              증거입니다.
            </p>
          </div>
        </div>
        <div className="w-1/2 space-y-10">
          <StatsCard
            title="프로젝트 문의"
            value="2520+"
            subtitle="2023년부터 매 해 2배 성장"
          />
          <StatsCard
            title="프로젝트 클라이언트"
            value="207+"
            subtitle="공공기관 및 주요 기업과 협업"
          />
        </div>
      </div>
    </Container>
  );
};

const StatsCard = ({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) => (
  <div className="w-full aspect-679/320 rounded bg-neutral-900 p-10 flex flex-col justify-between">
    <div className="flex items-center gap-4">
      <div className=" text-3xl font-bold">{title}</div>
    </div>
    <div className="flex justify-between">
      <div className=" text-5xl text-neutral-400">{value}</div>
      <div className=" text-xl font-light font-ibm text-neutral-400 self-end">
        {subtitle}
      </div>
    </div>
  </div>
);

export default CompanyProfileSection;
