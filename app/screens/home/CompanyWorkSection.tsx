import { useState } from "react";
import { motion } from "framer-motion";

import { PROCESS_STEPS } from "~/constants";
import PaddingSection from "~/components/global/PaddingSection";

const CompanyWorkSection = () => {
  return (
    <>
      <div className="flex gap-4">
        <div className="flex-1 bg-neutral-900 aspect-5/4" />
        <div className="flex-1 bg-neutral-900 aspect-5/4" />
      </div>

      <PaddingSection size="md" />

      {/* 회사 작업 과정 */}
      <div className=" text-neutral-900">
        <div className="text-7xl">우리가 일하는 방식:</div>
        <div className="pt-20" />
        <div className="flex flex-col items-end">
          {PROCESS_STEPS.map((item) => (
            <ProcessItem item={item} key={item.title} />
          ))}
        </div>
      </div>
    </>
  );
};

const ProcessItem = ({ item }: { item: (typeof PROCESS_STEPS)[0] }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="w-[70%] border-t border-neutral-300">
      <div className="pt-8" />
      <div
        className="flex items-center font-normal cursor-pointer"
        onClick={() => setActive((prev) => !prev)}
      >
        <div className="w-1/12 text-xl">{item.title}</div>
        <div className="flex-1 text-3xl">{item.text}</div>
        <motion.div className="relative" animate={active ? "minus" : "plus"}>
          <motion.div
            variants={{ plus: { rotate: 90 }, minus: { rotate: 0 } }}
            className="absolute h-[2px] w-5 bg-neutral-800 right-0"
          />
          <motion.div className="absolute h-[2px] w-5 bg-neutral-800 right-0" />
        </motion.div>
      </div>

      <motion.div
        className="overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pt-8" />
        <div className="flex">
          <div className="w-1/12" />
          <div className="font-light">{item.description}</div>
        </div>
      </motion.div>

      <div className="pt-10" />
    </div>
  );
};

export default CompanyWorkSection;
