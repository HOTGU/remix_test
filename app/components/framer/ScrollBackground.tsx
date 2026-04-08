import { motion } from "framer-motion";

type SectionConfig = {
  ref: React.RefObject<HTMLDivElement | null>;
  isActive: boolean;
  color: string;
};

export const ScrollBackground = ({
  sections,
  defaultColor = "black",
  children,
}: {
  sections: SectionConfig[];
  defaultColor?: string;
  children: React.ReactNode;
}) => {
  const activeSection = sections.find((s) => s.isActive);

  return (
    <motion.div
      animate={{
        backgroundColor: activeSection?.color ?? defaultColor,
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
