import React from "react";

const avatarColors = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-pink-500",
  "bg-amber-500",
];
const initials = ["JD", "SK", "AM", "RK"];

const SocialProofBar: React.FC = () => {
  return (
    <div className="flex items-center gap-3 mt-4 bg-gray-50/80 rounded-2xl p-3">
      <div className="flex -space-x-2">
        {avatarColors.map((color, i) => (
          <div
            key={i}
            className={`w-9 h-9 rounded-full ${color} border-2 border-white flex items-center justify-center`}
          >
            <span className="text-[10px] font-bold text-white">
              {initials[i]}
            </span>
          </div>
        ))}
      </div>
      <div>
        <p className="text-sm text-gray-700">
          Join{" "}
          <span className="font-bold text-gray-900">50K+</span> Happy Customers
        </p>
        <p className="text-xs text-gray-500">
          who trust Marketo for their shopping.
        </p>
      </div>
    </div>
  );
};

export default SocialProofBar;