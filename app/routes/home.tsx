import VideoScreen from "~/screens/home/VideoScreen";
import { getDb } from "~/libs/db.server";
import { motion, useInView } from "framer-motion";

import type { Route } from "./+types/home";
import type { Portfolio } from "~/schemas/portfolio.server";
import ContactSection from "~/screens/home/ContactSection";
import Container from "~/components/global/Container";
import SloganSection from "~/screens/home/SloganSection";
import CompanyProfileSection from "~/screens/home/CompanyProfileSection";
import PortfolioSection from "~/screens/home/PortfolioSection";
import CompanyWorkSection from "~/screens/home/CompanyWorkSection";
import { useRef } from "react";
import PaddingSection from "~/components/global/PaddingSection";
import HeroSection from "~/screens/home/HeroSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader = async () => {
  const db = await getDb();

  const portfolios = await db
    .collection<Portfolio>("Portfolio")
    .find()
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray();

  return { portfolios };
};

export default function Home() {
  const workRef = useRef(null);

  const isWorkVisible = useInView(workRef, {
    margin: "-20% 0px -20% 0px",
  });

  const items = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <motion.main
      animate={{
        backgroundColor: isWorkVisible ? "#fff" : "#000",
        color: isWorkVisible ? "#000" : "#fff",
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className="space-y-52"
    >
      <HeroSection />

      <SloganSection />

      <PortfolioSection />

      <CompanyProfileSection />

      <div>
        <div className="flex mt-12">
          <div className="w-1/2"></div>
          <div className="w-1/2 text-5xl font-extralight space-y-2 ">
            <div>내일의 브랜드를 오늘의 조형으로</div>
            <div>만들어 드립니다</div>
          </div>
        </div>
        <PaddingSection size="md" />
        <div className="overflow-hidden w-full">
          <div className="flex w-max animate-marquee gap-4">
            {[...items, ...items].map((item, index) => (
              <div
                key={index}
                className=" w-56 h-32 shrink-0 flex items-center justify-center
                text-4xl font-bold bg-zinc-900 text-white"
              >
                {String(item).padStart(2, "0")}
              </div>
            ))}
          </div>
        </div>
        <PaddingSection size="lg" />
      </div>

      <div ref={workRef} className="space-y-52">
        <CompanyWorkSection />
        <ContactSection />
      </div>
    </motion.main>
  );
}
