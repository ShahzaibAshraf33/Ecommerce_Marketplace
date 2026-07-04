import React from "react";
import FeatureList from "./FeatureList";
import PremiumProductsCarousel from "./PremiumProductsCarousel";

interface LeftMarketingPanelProps {
  title: React.ReactNode;
  subtitle: string;
  illustration: React.ReactNode;
}

const LeftMarketingPanel: React.FC<LeftMarketingPanelProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight text-[#E7E2DA]">
        {title}
      </h1>
      <p className="mt-3 text-gray-500 text-sm leading-relaxed max-w-xs">
        {subtitle}
      </p>
      <FeatureList />
      <PremiumProductsCarousel />
    </div>
  );
};

export default LeftMarketingPanel;