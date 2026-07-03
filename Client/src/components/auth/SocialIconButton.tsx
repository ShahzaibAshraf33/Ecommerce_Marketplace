import React from "react";
import type { IconType } from "react-icons";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

type SocialIconProvider = "facebook" | "twitter" | "instagram" | "github";

interface SocialIconButtonProps {
  provider: SocialIconProvider;
  onClick?: () => void;
}

const SOCIAL_PROVIDERS: Record<
  SocialIconProvider,
  { icon: IconType; color: string; hoverBg: string }
> = {
  facebook: {
    icon: FaFacebookF,
    color: "text-blue-600",
    hoverBg: "hover:bg-blue-50",
  },
  twitter: {
    icon: FaTwitter,
    color: "text-sky-500",
    hoverBg: "hover:bg-sky-50",
  },
  instagram: {
    icon: FaInstagram,
    color: "text-pink-500",
    hoverBg: "hover:bg-pink-50",
  },
  github: {
    icon: FaGithub,
    color: "text-gray-800",
    hoverBg: "hover:bg-gray-100",
  },
};

const SocialIconButton: React.FC<SocialIconButtonProps> = ({
  provider,
  onClick,
}) => {
  const config = SOCIAL_PROVIDERS[provider];
  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-14 h-14 rounded-xl border border-gray-200 bg-white
        flex items-center justify-center
        ${config.color} ${config.hoverBg}
        hover:border-gray-300 hover:shadow-sm
        active:scale-95 transition-all duration-200
        cursor-pointer
      `}
      aria-label={`Sign in with ${provider}`}
    >
      <Icon size={22} />
    </button>
  );
};

export default SocialIconButton;