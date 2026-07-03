import React from "react";
import type { LucideIcon } from "lucide-react";

interface RightAuthCardProps {
  icon?: LucideIcon;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}

const RightAuthCard: React.FC<RightAuthCardProps> = ({
  icon: Icon,
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="relative w-full max-w-md">
      {/* Decorative blurred blobs */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 auth-blob-purple rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -left-10 w-40 h-40 auth-blob-pink rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative auth-card-surface p-6 sm:p-7">
        {Icon && (
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center">
              <Icon size={24} className="text-gray-600" />
            </div>
          </div>
        )}

        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <div className="mt-2 text-sm text-gray-500">{subtitle}</div>
          )}
        </div>

        {children}
      </div>
    </div>
  );
};

export default RightAuthCard;