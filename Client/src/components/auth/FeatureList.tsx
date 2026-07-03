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
    bgColor: "bg-[#EDE9FE]",
    fgColor: "text-[#7C3AED]",
  },
  {
    icon: Tag,
    title: "Best Deals",
    description: "Get access to exclusive offers and member-only discounts.",
    bgColor: "bg-[#DBEAFE]",
    fgColor: "text-[#2563EB]",
  },
  {
    icon: Heart,
    title: "Wishlist",
    description: "Save your favorite items and shop anytime you want.",
    bgColor: "bg-[#FCE7F3]",
    fgColor: "text-[#DB2777]",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Enjoy fast and reliable delivery at your doorstep.",
    bgColor: "bg-[#FFEDD5]",
    fgColor: "text-[#F97316]",
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
            <h4 className="text-sm font-bold text-gray-900">
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