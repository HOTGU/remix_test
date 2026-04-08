import { useInView } from "framer-motion";
import { useRef } from "react";

export const useSectionInView = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    margin: "-20% 0px -20% 0px",
  });

  return { ref, isInView };
};
