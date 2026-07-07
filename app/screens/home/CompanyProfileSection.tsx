import Container from "~/components/global/Container";

const CompanyProfileSection = () => {
  return (
    <Container>
      <div className="flex justify-between text-white font-pretendard">
        <div className="w-1/2 pr-40">
          <div className="text-6xl mb-10 leading-tight">
            감각적인 제조를
            <br />
            위한 최고의 선택
          </div>
          <div className="text-xl whitespace-pre-wrap break-keep font-thin">
            우리는 클라이언트들과 협력하고 원하는 바를 정확히 파악하기 위해
            끊임없이 소통하며 아이디어를 한단계 더 발전시킵니다
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
