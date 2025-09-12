import { animate } from "motion";
import { useEffect, useRef } from "react";

export const HeroBg: React.FC<{ poster: string }> = ({ poster }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      animate(
        ref.current,
        { scale: [1.1, 1] },
        { duration: 20, easing: "ease-in-out" }
      );
    }
  }, [poster]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${poster})`,
      }}
    />
  );
};

export default HeroBg;
