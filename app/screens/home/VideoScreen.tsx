import HiddenUpText from "~/components/framer/HiddenUpText";
import Container from "~/components/global/Container";

const MainScreen = () => {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] lg:h-screen relative overflow-hidden">
      <div className="absolute bottom-0 left-0 z-10">
        <Container>
          <div className="flex flex-col gap-4 font-ibm py-8 font-[400]">
            <HiddenUpText
              children={"감각적인 제조"}
              delay={0.5}
              className="text-8xl font-pretendard"
            />
            <HiddenUpText
              children={"WEAVEMENT"}
              delay={0.5}
              className="text-8xl font-racing"
            />
          </div>
        </Container>
      </div>
      <div className="w-screen aspect-video h-[60vh] md:h-[80vh] lg:h-screen relative">
        <video autoPlay loop muted playsInline className="w-full h-auto">
          <source src="/videos/메인페이지영상.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default MainScreen;
