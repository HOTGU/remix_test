import { useRef } from "react";
import { getDb } from "~/libs/db.server";
import { motion, useInView } from "framer-motion";

import ContactSection from "~/screens/home/ContactSection";
import SloganSection from "~/screens/home/SloganSection";
import CompanyProfileSection from "~/screens/home/CompanyProfileSection";
import PortfolioSection from "~/screens/home/PortfolioSection";
import CompanyWorkSection from "~/screens/home/CompanyWorkSection";
import PaddingSection from "~/components/global/PaddingSection";
import HeroSection from "~/screens/home/HeroSection";

import type { Route } from "./+types/home";
import type { Portfolio } from "~/schemas/portfolio.server";
import ClientFlowSection from "~/screens/home/ClientFlowSection";

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
      className="space-y-60"
    >
      <HeroSection />

      <SloganSection />

      <PortfolioSection />

      <CompanyProfileSection />

      <ClientFlowSection />

      <div ref={workRef} className="space-y-52">
        <CompanyWorkSection />
        <ContactSection />
      </div>
    </motion.main>
  );
}
