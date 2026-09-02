import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProgressiveImage from "~/components/global/ProgressiveImage";

const images = [
  {
    src: "/imgs/main/메인페이지1.webp",
    blurSrc: "/imgs/main_blur/메인페이지1.webp",
  },
  {
    src: "/imgs/main/메인페이지2.webp",
    blurSrc: "/imgs/main_blur/메인페이지2.webp",
  },
  {
    src: "/imgs/main/메인페이지3.webp",
    blurSrc: "/imgs/main_blur/메인페이지3.webp",
  },
  {
    src: "/imgs/main/메인페이지4.webp",
    blurSrc: "/imgs/main_blur/메인페이지4.webp",
  },
  {
    src: "/imgs/main/메인페이지5.webp",
    blurSrc: "/imgs/main_blur/메인페이지5.webp",
  },
  {
    src: "/imgs/main/메인페이지6.webp",
    blurSrc: "/imgs/main_blur/메인페이지6.webp",
  },
  {
    src: "/imgs/main/메인페이지7.webp",
    blurSrc: "/imgs/main_blur/메인페이지7.webp",
  },
  {
    src: "/imgs/main/메인페이지8.webp",
    blurSrc: "/imgs/main_blur/메인페이지8.webp",
  },
];

const HeroSection = () => {
  const [startIndex] = useState(() =>
    Math.floor(Math.random() * images.length),
  );
  const [index, setIndex] = useState(0);

  const reorderedImages = useMemo(() => {
    return [...images.slice(startIndex), ...images.slice(0, startIndex)];
  }, [startIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reorderedImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [reorderedImages.length]);

  return (
    <section className="w-full h-[60vh] md:h-[80vh] lg:h-screen relative overflow-hidden">
      <div className="absolute bottom-0 right-0 z-10">
        <header className="flex flex-col items-end font-bold text-white p-2 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
          {/* 구글 크롤러용 핵심 H1 타이틀 */}
          <h1 className="sr-only">
            위브먼트 | FRP·캐릭터·에어 조형물 및 인형탈 제작 전문 기업
          </h1>
          <div aria-hidden="true" className="contents">
            <p className="text-sm sm:text-lg md:text-xl lg:text-3xl mt-1">
              감각적인 제조, 위브먼트
            </p>
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-racing">
              WEAVEMENT
            </span>
          </div>
        </header>
      </div>

      <motion.div
        animate={{ x: `-${index * 100}vw` }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="flex w-fit relative"
      >
        {reorderedImages.map((item, i) => (
          <div
            className="w-screen h-[60vh] md:h-[80vh] lg:h-screen relative"
            key={i}
          >
            <ProgressiveImage
              src={item.src}
              blurSrc={item.blurSrc}
              /* 검색엔진에 유리하도록 명확한 alt 서술 제공 */
              alt={`위브먼트(WEAVEMENT) 조형 제조 대표 프로젝트 ${i + 1}`}
              isPriority={i === 0}
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;
