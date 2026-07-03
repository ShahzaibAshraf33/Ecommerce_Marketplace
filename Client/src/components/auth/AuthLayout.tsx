import React from "react";
import TrustStrip from "./TrustStrip";

interface AuthLayoutProps {
  leftPanel: React.ReactNode;
  rightCard: React.ReactNode;
  bottomPanel?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  leftPanel,
  rightCard,
  bottomPanel,
}) => {
  return (
    <div className="auth-page-shell flex min-h-screen flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-4 lg:gap-6 lg:items-start lg:pt-[30px]">
            <div className="order-1 lg:pr-6 lg:pt-[30px]">{leftPanel}</div>

            <div className="order-2 flex justify-center lg:justify-start lg:pt-[30px]">
              {rightCard}
            </div>
          </div>

          {bottomPanel && (
            <div className="mt-3 flex justify-center lg:justify-end">
              <div className="w-full max-w-md">{bottomPanel}</div>
            </div>
          )}

          <TrustStrip />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;