import React from "react";
import type { LucideIcon } from "lucide-react";

interface InfoBannerProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const QuestionEnvelopeIllustration: React.FC = () => (
  <div className="relative w-24 h-20">
    {/* Envelope */}
    <div className="absolute bottom-0 right-0 w-16 h-12 bg-gradient-to-br from-[#2A1D12] to-[#4D2E16] rounded-lg border border-[#B98A43]/40 flex items-center justify-center">
      <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#D2A55B]/70 -mt-6" />
    </div>
    {/* Question mark */}
    <div className="absolute top-0 right-6 w-8 h-8 bg-[#1A120D] rounded-full flex items-center justify-center border border-[#B98A43]/40">
      <span className="text-sm font-bold text-[#F2C878]">?</span>
    </div>
    {/* Paper plane */}
    <svg
      className="absolute bottom-2 right-16 text-[#D2A55B]/70"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
    {/* Dotted trail */}
    <svg
      className="absolute bottom-8 right-14 text-gray-300"
      width="30"
      height="20"
      viewBox="0 0 30 20"
      fill="none"
    >
      <path
        d="M2 18 C 10 2, 20 2, 28 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
    </svg>
  </div>
);

const InfoBanner: React.FC<InfoBannerProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl p-5 mt-4 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 rounded-full bg-[#1A120D] flex items-center justify-center shrink-0">
            <Icon size={18} className="text-[#D8B06A]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">{title}</h4>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-sm">
              {description}
            </p>
          </div>
        </div>
        <QuestionEnvelopeIllustration />
      </div>
    </div>
  );
};

export default InfoBanner;