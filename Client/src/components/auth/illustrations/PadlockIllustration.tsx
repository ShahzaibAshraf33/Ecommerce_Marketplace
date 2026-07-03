import React from "react";

const PadlockIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-64 flex items-end justify-center mt-4">
      {/* Podium */}
      <div className="absolute bottom-0 w-56 h-8">
        <div
          className="w-full h-full rounded-[50%] bg-gradient-to-r from-violet-200/80 via-purple-200/80 to-violet-200/80"
          style={{ boxShadow: "0 4px 20px rgba(139, 92, 246, 0.15)" }}
        />
      </div>
      <div className="absolute bottom-1 w-48 h-6">
        <div className="w-full h-full rounded-[50%] bg-gradient-to-r from-violet-300/50 via-purple-300/50 to-violet-300/50" />
      </div>

      {/* Lock body */}
      <div className="relative z-10 mb-4">
        <div
          className="w-24 h-28 rounded-2xl bg-gradient-to-br from-violet-300 to-indigo-400"
          style={{ boxShadow: "0 8px 30px rgba(99, 102, 241, 0.3)" }}
        >
          {/* Shackle */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-14">
            <div className="w-full h-full rounded-t-full border-[5px] border-violet-400/80 border-b-0" />
          </div>
          {/* Keyhole */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2">
            <div className="w-5 h-5 rounded-full bg-violet-500/50" />
            <div className="w-2.5 h-4 bg-violet-500/50 mx-auto -mt-1 rounded-b-sm" />
          </div>
        </div>
      </div>

      {/* Shield accent */}
      <div className="absolute bottom-6 right-[20%] z-20">
        <div
          className="w-14 h-16 bg-gradient-to-br from-blue-200 to-violet-300 rounded-t-2xl rounded-b-lg opacity-70"
          style={{ clipPath: "polygon(50% 0%, 100% 20%, 100% 70%, 50% 100%, 0% 70%, 0% 20%)" }}
        >
          <div className="flex items-center justify-center h-full">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative sphere */}
      <div className="absolute top-8 right-6 z-20">
        <div
          className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-200 to-violet-300"
          style={{ boxShadow: "0 2px 10px rgba(139, 92, 246, 0.2)" }}
        />
      </div>

      {/* Decorative cube */}
      <div className="absolute top-20 left-6 z-0">
        <div className="w-5 h-5 rounded-sm bg-violet-200/40 rotate-45" />
      </div>
    </div>
  );
};

export default PadlockIllustration;