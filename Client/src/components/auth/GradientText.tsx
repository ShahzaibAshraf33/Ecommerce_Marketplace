import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg, #6D28D9, #A855F7)",
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;