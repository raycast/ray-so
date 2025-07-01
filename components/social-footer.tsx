import { BrandGithubIcon, BrandSlackIcon, BrandXIcon, BrandYoutubeIcon, RaycastLogoNegIcon } from "@raycast/icons";

const socialLinks = [
  {
    href: "https://github.com/raycast/ray-so",
    label: "GitHub",
    icon: BrandGithubIcon,
  },
  {
    href: "https://x.com/raycast",
    label: "X",
    icon: BrandXIcon,
  },
  {
    href: "https://raycast.com/community",
    label: "Slack Community",
    icon: BrandSlackIcon,
  },
  {
    href: "https://www.youtube.com/@raycastapp",
    label: "YouTube",
    icon: BrandYoutubeIcon,
  },
];

export function SocialFooter({ referral = "ray-so" }: { referral?: string }) {
  return (
    <div className="pt-2 mt-auto">
      <div className="flex items-center gap-2 mt-2 justify-between">
        <a
          href={`https://raycast.com/#ref=ray-so-${referral}`}
          className="flex items-center gap-1.5 text-gray-12 group"
        >
          <RaycastLogoNegIcon className="w-4 h-4 text-brand" />
          <span className="text-[13px] font-medium group-hover:underline">Made by Raycast</span>
        </a>
        <div className="flex gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-9 hover:text-gray-11 transition-colors"
            >
              <link.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
