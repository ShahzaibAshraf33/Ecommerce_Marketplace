import React from "react";

const ShoppingBagsIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-64 flex items-end justify-center mt-4">
      {/* Podium / Platform */}
      <div className="absolute bottom-0 w-56 h-8">
        <div
          className="w-full h-full rounded-[50%] bg-gradient-to-r from-[#2A1D12]/80 via-[#4D2E16]/80 to-[#2A1D12]/80"
          style={{ boxShadow: "0 4px 20px rgba(185, 138, 67, 0.15)" }}
        />
      </div>
      <div className="absolute bottom-1 w-48 h-6">
        <div className="w-full h-full rounded-[50%] bg-gradient-to-r from-[#4D2E16]/50 via-[#8A5A2B]/50 to-[#4D2E16]/50" />
      </div>

      {/* Main bag */}
      <div className="relative z-10 mb-4">
        <div
          className="w-28 h-36 rounded-t-2xl rounded-b-lg bg-gradient-to-br from-[#D8B06A] to-[#8A5A2B]"
          style={{ boxShadow: "0 8px 30px rgba(185, 138, 67, 0.3)" }}
        >
          {/* Handle */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-8">
            <div className="w-full h-full rounded-t-full border-[3px] border-[#F2C878]/80 border-b-0" />
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
          className="w-16 h-22 rounded-t-xl rounded-b-md bg-gradient-to-br from-[#D2A55B] to-[#8A5A2B] opacity-60"
          style={{ width: "64px", height: "80px" }}
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-5">
            <div className="w-full h-full rounded-t-full border-2 border-[#F2C878]/60 border-b-0" />
          </div>
        </div>
      </div>

      {/* Decorative sphere */}
      <div className="absolute top-8 right-4 z-20">
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F2C878] to-[#D2A55B]"
          style={{ boxShadow: "0 2px 10px rgba(185, 138, 67, 0.2)" }}
        />
      </div>

      {/* Decorative cube */}
      <div className="absolute top-16 left-4 z-0">
        <div className="w-5 h-5 rounded-sm bg-[#D2A55B]/40 rotate-45" />
      </div>
    </div>
  );
};

export default ShoppingBagsIllustration;