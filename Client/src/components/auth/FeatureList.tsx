import React from "react";
import { Shield, Tag, Heart, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
  fgColor: string;
}

const AUTH_FEATURES: Feature[] = [
  {
    icon: Shield,
    title: "Secure & Safe",
    description: "Your data is 100% secure with enterprise-grade protection.",
    bgColor: "bg-[#1A120D]",
    fgColor: "text-[#D2A55B]",
  },
  {
    icon: Tag,
    title: "Best Deals",
    description: "Get access to exclusive offers and member-only discounts.",
    bgColor: "bg-[#1A120D]",
    fgColor: "text-[#D8B06A]",
  },
  {
    icon: Heart,
    title: "Wishlist",
    description: "Save your favorite items and shop anytime you want.",
    bgColor: "bg-[#1A120D]",
    fgColor: "text-[#F2C878]",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Enjoy fast and reliable delivery at your doorstep.",
    bgColor: "bg-[#1A120D]",
    fgColor: "text-[#D2A55B]",
  },
];

const FeatureList: React.FC = () => {
  return (
    <div className="space-y-3 mt-4">
      {AUTH_FEATURES.map((feature) => (
        <div key={feature.title} className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-full ${feature.bgColor} flex items-center justify-center shrink-0`}
          >
            <feature.icon size={18} className={feature.fgColor} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#E7E2DA]">
              {feature.title}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;