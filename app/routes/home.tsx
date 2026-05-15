import VideoScreen from "~/screens/home/VideoScreen";
import BackgroundScrollMainSection from "~/screens/home/BackgroundScrollMainSection";
import { getDb } from "~/libs/db.server";

import type { Route } from "./+types/home";
import type { Portfolio } from "~/schemas/portfolio.server";

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
  return (
    <div>
      <VideoScreen />
      <BackgroundScrollMainSection />
    </div>
  );
}
