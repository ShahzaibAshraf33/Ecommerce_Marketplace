import React from "react";

const ShoppingBagsIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-64 flex items-end justify-center mt-4">
      {/* Podium / Platform */}
      <div className="absolute bottom-0 w-56 h-8">
        <div
          className="w-full h-full rounded-[50%] bg-gradient-to-r from-violet-200/80 via-purple-200/80 to-violet-200/80"
          style={{ boxShadow: "0 4px 20px rgba(139, 92, 246, 0.15)" }}
        />
      </div>
      <div className="absolute bottom-1 w-48 h-6">
        <div className="w-full h-full rounded-[50%] bg-gradient-to-r from-violet-300/50 via-purple-300/50 to-violet-300/50" />
      </div>

      {/* Main bag */}
      <div className="relative z-10 mb-4">
        <div
          className="w-28 h-36 rounded-t-2xl rounded-b-lg bg-gradient-to-br from-violet-400 to-indigo-500"
          style={{ boxShadow: "0 8px 30px rgba(99, 102, 241, 0.3)" }}
        >
          {/* Handle */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-8">
            <div className="w-full h-full rounded-t-full border-[3px] border-violet-300/80 border-b-0" />
          </div>
          {/* Logo "M" */}
          <div className="absolute top-14 left-1/2 -translate-x-1/2">
            <span className="text-3xl font-black text-white/30 italic">m</span>
          </div>
        </div>
      </div>

      {/* Small bag left */}
      <div className="absolute bottom-3 left-[20%] z-5">
        <div
          className="w-16 h-22 rounded-t-xl rounded-b-md bg-gradient-to-br from-purple-300 to-violet-400 opacity-60"
          style={{ width: "64px", height: "80px" }}
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-5">
            <div className="w-full h-full rounded-t-full border-2 border-violet-200/60 border-b-0" />
          </div>
        </div>
      </div>

      {/* Decorative sphere */}
      <div className="absolute top-8 right-4 z-20">
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-200 to-violet-300"
          style={{ boxShadow: "0 2px 10px rgba(139, 92, 246, 0.2)" }}
        />
      </div>

      {/* Decorative cube */}
      <div className="absolute top-16 left-4 z-0">
        <div className="w-5 h-5 rounded-sm bg-violet-200/40 rotate-45" />
      </div>
    </div>
  );
};

export default ShoppingBagsIllustration;