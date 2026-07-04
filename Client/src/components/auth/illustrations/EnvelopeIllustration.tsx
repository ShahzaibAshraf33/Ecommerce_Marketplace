import React from "react";

const EnvelopeIllustration: React.FC = () => {
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

      {/* Envelope */}
      <div className="relative z-10 mb-4">
        <div
          className="w-32 h-22 rounded-xl bg-gradient-to-br from-[#D2A55B] to-[#8A5A2B] relative"
          style={{
            width: "128px",
            height: "88px",
            boxShadow: "0 8px 30px rgba(185, 138, 67, 0.3)",
          }}
        >
          {/* Flap */}
          <div
            className="absolute -top-4 left-0 w-full h-12 bg-gradient-to-br from-[#D8B06A] to-[#4D2E16] rounded-t-xl"
            style={{ clipPath: "polygon(0% 100%, 50% 20%, 100% 100%)" }}
          />
          {/* Checkmark badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#F2C878] to-[#8A5A2B] flex items-center justify-center shadow-lg z-20">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Shield accent */}
      <div className="absolute bottom-6 left-[20%] z-5">
        <div
          className="w-12 h-14 bg-gradient-to-br from-[#D2A55B]/70 to-[#8A5A2B]/70 opacity-50"
          style={{ clipPath: "polygon(50% 0%, 100% 20%, 100% 70%, 50% 100%, 0% 70%, 0% 20%)" }}
        />
      </div>

      {/* Decorative sphere */}
      <div className="absolute top-8 right-4 z-20">
        <div
          className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F2C878] to-[#D2A55B]"
          style={{ boxShadow: "0 2px 10px rgba(185, 138, 67, 0.2)" }}
        />
      </div>

      {/* Decorative cube */}
      <div className="absolute top-20 left-2 z-0">
        <div className="w-4 h-4 rounded-sm bg-[#D2A55B]/40 rotate-45" />
      </div>
    </div>
  );
};

export default EnvelopeIllustration;