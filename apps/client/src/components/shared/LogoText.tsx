import React from "react";

const LogoText: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <h1 className={`${className} text-3xl font-bold text-white tracking-wider`}>
      <span className="text-lume-green">L</span>UME
    </h1>
  );
};

export default LogoText;
