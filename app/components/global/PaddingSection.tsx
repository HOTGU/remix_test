import React from "react";

const PaddingSection = ({
  size = "lg",
}: {
  size?: "xl" | "lg" | "md" | "sm" | "2xl";
}) => {
  const spacing = {
    sm: "pt-20",
    md: "pt-40",
    lg: "pt-60",
    xl: "pt-70",
    "2xl": "pt-80",
  };

  return <div className={spacing[size]} />;
};

export default PaddingSection;
