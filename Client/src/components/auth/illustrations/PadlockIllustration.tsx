import React from "react";

const PadlockIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-64 flex items-end justify-center mt-4">
      {/* Podium */}
      <div className="absolute bottom-0 w-56 h-8">
        <div
          className="w-full h-full rounded-[50%] bg-gradient-to-r from-[#2A1D12]/80 via-[#4D2E16]/80 to-[#2A1D12]/80"
          style={{ boxShadow: "0 4px 20px rgba(185, 138, 67, 0.15)" }}
        />
      </div>
      <div className="absolute bottom-1 w-48 h-6">
        <div className="w-full h-full rounded-[50%] bg-gradient-to-r from-[#4D2E16]/50 via-[#8A5A2B]/50 to-[#4D2E16]/50" />
      </div>

      {/* Lock body */}
      <div className="relative z-10 mb-4">
        <div
          className="w-24 h-28 rounded-2xl bg-gradient-to-br from-[#D2A55B] to-[#8A5A2B]"
          style={{ boxShadow: "0 8px 30px rgba(185, 138, 67, 0.3)" }}
        >
          {/* Shackle */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-14">
            <div className="w-full h-full rounded-t-full border-[5px] border-[#D8B06A]/80 border-b-0" />
          </div>
          {/* Keyhole */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2">
            <div className="w-5 h-5 rounded-full bg-[#8A5A2B]/60" />
            <div className="w-2.5 h-4 bg-[#8A5A2B]/60 mx-auto -mt-1 rounded-b-sm" />
          </div>
        </div>
      </div>

      {/* Shield accent */}
      <div className="absolute bottom-6 right-[20%] z-20">
        <div
          className="w-14 h-16 bg-gradient-to-br from-[#D2A55B]/70 to-[#8A5A2B]/70 rounded-t-2xl rounded-b-lg opacity-70"
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
          className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F2C878] to-[#D2A55B]"
          style={{ boxShadow: "0 2px 10px rgba(185, 138, 67, 0.2)" }}
        />
      </div>

      {/* Decorative cube */}
      <div className="absolute top-20 left-6 z-0">
        <div className="w-5 h-5 rounded-sm bg-[#D2A55B]/40 rotate-45" />
      </div>
    </div>
  );
};

export default PadlockIllustration;