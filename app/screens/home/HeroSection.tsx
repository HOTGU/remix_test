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
  // 랜덤 시작 위치
  const [startIndex] = useState(() =>
    Math.floor(Math.random() * images.length),
  );

  // 현재 슬라이드 index
  const [index, setIndex] = useState(0);

  // 배열 회전
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
    <div className="w-full h-[60vh] md:h-[80vh] lg:h-screen relative overflow-hidden">
      <div className="absolute bottom-0 right-0 z-10">
        <div className="flex flex-col items-end font-bold text-white p-2 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
          <span className="text-sm sm:text-lg md:text-xl lg:text-3xl">
            감각적인 제조, 위브먼트
          </span>

          <h2 className=" font-racing text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
            WEAVEMENT
          </h2>
        </div>
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
              alt={`위브먼트 대표사진 ${i}`}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroSection;
