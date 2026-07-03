import React from "react";

interface DividerProps {
  text: string;
}

const Divider: React.FC<DividerProps> = ({ text }) => {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-400 whitespace-nowrap">{text}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
};

export default Divider;