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
        backgroundImage: "linear-gradient(90deg, #F3D8A0 0%, #D8B06A 45%, #B8863B 100%)",
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;