import React from "react";

const FieldError = ({ error }: { error?: string }) => {
  if (!error) return null;

  return <div className="text-sm text-red-500 mt-1">{error}</div>;
};

export default FieldError;
