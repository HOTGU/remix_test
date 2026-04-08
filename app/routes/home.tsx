import VideoScreen from "~/screens/home/VideoScreen";
import type { Route } from "./+types/home";
import MainSection from "~/screens/home/MainSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <VideoScreen />
      <MainSection />
    </div>
  );
}
