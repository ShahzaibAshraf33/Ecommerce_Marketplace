import React from "react";

const EnvelopeIllustration: React.FC = () => {
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

      {/* Envelope */}
      <div className="relative z-10 mb-4">
        <div
          className="w-32 h-22 rounded-xl bg-gradient-to-br from-violet-300 to-indigo-400 relative"
          style={{
            width: "128px",
            height: "88px",
            boxShadow: "0 8px 30px rgba(99, 102, 241, 0.3)",
          }}
        >
          {/* Flap */}
          <div
            className="absolute -top-4 left-0 w-full h-12 bg-gradient-to-br from-violet-400 to-indigo-500 rounded-t-xl"
            style={{ clipPath: "polygon(0% 100%, 50% 20%, 100% 100%)" }}
          />
          {/* Checkmark badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center shadow-lg z-20">
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
          className="w-12 h-14 bg-gradient-to-br from-blue-200 to-violet-300 opacity-50"
          style={{ clipPath: "polygon(50% 0%, 100% 20%, 100% 70%, 50% 100%, 0% 70%, 0% 20%)" }}
        />
      </div>

      {/* Decorative sphere */}
      <div className="absolute top-8 right-4 z-20">
        <div
          className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-200 to-violet-300"
          style={{ boxShadow: "0 2px 10px rgba(139, 92, 246, 0.2)" }}
        />
      </div>

      {/* Decorative cube */}
      <div className="absolute top-20 left-2 z-0">
        <div className="w-4 h-4 rounded-sm bg-violet-200/40 rotate-45" />
      </div>
    </div>
  );
};

export default EnvelopeIllustration;