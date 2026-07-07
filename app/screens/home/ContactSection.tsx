import { Link, useRouteLoaderData } from "react-router";

import ReverseUnderlineText from "~/components/framer/ReverseUnderlineText";
import PaddingSection from "~/components/global/PaddingSection";

import type { Portfolio } from "~/schemas/portfolio.server";

const ContactSection = () => {
  const data = useRouteLoaderData("routes/home");

  const portfolios = data.portfolios;

  return (
    <>
      {/* <PortfolioGrid portfolios={portfolios} /> */}

      <div className="flex flex-col justify-center items-center gap-20 text-neutral-900 bg-amber-200 h-screen">
        <div className="text-6xl">우리가 어떻게 도와드릴까요?</div>
        <Link to="/contact">
          <ReverseUnderlineText size="lg" color="black" label="문의하러 가기" />
        </Link>
      </div>
    </>
  );
};

// const PortfolioGrid = ({ portfolios }: { portfolios: Portfolio[] }) => {
//   return (
//     <div className="flex gap-4 items-center pb-40">
//       {portfolios.map((portfolio) => (
//         <div key={`${portfolio._id}`} className="w-full aspect-4/3 relative">
//           <img
//             src={portfolio.thumb}
//             alt={`${portfolio.title} 사진`}
//             className="object-cover"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

export default ContactSection;
