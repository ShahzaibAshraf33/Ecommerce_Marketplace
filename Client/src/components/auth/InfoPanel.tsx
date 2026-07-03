import React from "react";
import type { LucideIcon } from "lucide-react";

interface InfoPanelProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const InfoPanel: React.FC<InfoPanelProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="auth-info-panel p-5 mt-4 flex items-start gap-4">
      <div className="auth-icon-badge w-10 h-10">
        <Icon size={18} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default InfoPanel;