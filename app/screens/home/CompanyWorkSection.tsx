import { useState } from "react";
import { motion } from "framer-motion";

import { PROCESS_STEPS } from "~/constants";
import Container from "~/components/global/Container";

const CompanyWorkSection = () => {
  return (
    <section>
      <Container>
        {/* SEO용 H2 태그 */}
        <h2 className="sr-only">
          FRP·에어 조형물 및 인형탈 디자인 기획부터 제작 완료까지의 프로세스
        </h2>
        <div className="text-current" aria-hidden="true">
          <p className="text-7xl">아이디어 하나면 충분합니다.</p>
          <div className="pt-20" />
          <div className="flex flex-col items-end">
            {PROCESS_STEPS.map((item) => (
              <ProcessItem item={item} key={item.title} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

const ProcessItem = ({ item }: { item: (typeof PROCESS_STEPS)[0] }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="w-[70%] border-t border-neutral-300">
      <div className="pt-8" />
      {/* div 클릭 대신 accessibility(접근성)를 위해 button으로 변경 */}
      <button
        type="button"
        className="w-full flex items-center font-normal cursor-pointer text-left"
        onClick={() => setActive((prev) => !prev)}
      >
        <h3 className="w-1/12 text-xl">{item.title}</h3>
        <p className="flex-1 text-3xl">{item.text}</p>
        <motion.div className="relative" animate={active ? "minus" : "plus"}>
          <motion.div
            variants={{ plus: { rotate: 90 }, minus: { rotate: 0 } }}
            className="absolute h-[2px] w-5 bg-neutral-800 right-0"
          />
          <motion.div className="absolute h-[2px] w-5 bg-neutral-800 right-0" />
        </motion.div>
      </button>

      <motion.div
        className="overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pt-8" />
        <div className="flex">
          <div className="w-1/12" />
          <p className="font-light">{item.description}</p>
        </div>
      </motion.div>

      <div className="pt-10" />
    </div>
  );
};

export default CompanyWorkSection;
