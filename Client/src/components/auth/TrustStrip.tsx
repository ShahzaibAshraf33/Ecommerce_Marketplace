import React from "react";
import { Lock, Headphones, RotateCcw, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TrustItem {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
  fgColor: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: Lock,
    title: "100% Secure",
    description: "Your data is protected",
    bgColor: "bg-[#DCFCE7]",
    fgColor: "text-[#16A34A]",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're here to help",
    bgColor: "bg-[#EDE9FE]",
    fgColor: "text-[#7C3AED]",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free returns",
    bgColor: "bg-[#FFEDD5]",
    fgColor: "text-[#F97316]",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick & reliable",
    bgColor: "bg-[#DBEAFE]",
    fgColor: "text-[#2563EB]",
  },
];

const TrustStrip: React.FC = () => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl p-3 mt-3 shadow-sm border border-gray-100">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center shrink-0`}
            >
              <item.icon size={18} className={item.fgColor} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustStrip;