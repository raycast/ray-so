import { BrandGithubIcon, BrandXIcon } from "@raycast/icons";

const socialLinks = [
  {
    href: "https://github.com/sotan8",
    label: "GitHub",
    icon: BrandGithubIcon,
  },
  {
    href: "https://x.com/natemcgrady",
    label: "X",
    icon: BrandXIcon,
  },
];

export function SocialFooter({ referral = "ray-so" }: { referral?: string }) {
  return (
    <div className="pt-2 mt-auto">
      <div className="flex items-center gap-2 mt-2 justify-between">
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
