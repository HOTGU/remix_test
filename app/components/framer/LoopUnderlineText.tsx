import React from "react";

import { motion } from "framer-motion";

import { CornerDownRight } from "lucide-react";

type Props = {
  label: string;

  size?: "lg" | "md" | "sm";

  color?: "black" | "white";
};

const LoadingUnderlineText: React.FC<Props> = ({
  label,

  size = "md",

  color = "black",
}) => {
  const emojiSize = size === "lg" ? 30 : size === "md" ? 24 : 20;

  const fontSize =
    size === "lg" ? "text-4xl" : size === "md" ? "text-2xl" : "text-lg";

  const textColor = color === "white" ? "text-white" : "text-black";

  const lineColor = color === "white" ? "bg-white" : "bg-black";

  return (
    <div className="inline-block relative">
      <div
        className={`flex gap-2 items-center justify-center ${textColor} font-bold`}
      >
        <CornerDownRight size={emojiSize} />

        <div className={fontSize}>{label}</div>
      </div>

      {/* animated underline */}
      <div className="absolute -bottom-1 left-0 w-full overflow-hidden h-px">
        <motion.div
          className={`h-px w-full ${lineColor}`}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1,

            repeat: Infinity,

            ease: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingUnderlineText;
