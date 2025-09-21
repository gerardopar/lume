import React from "react";

const CardActionItemLoader: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div className={className}>
    <span className="loading loading-ring loading-sm" />
  </div>
);

export default CardActionItemLoader;
