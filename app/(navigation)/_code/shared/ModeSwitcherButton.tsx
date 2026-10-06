"use client";

import { Button } from "@/components/button";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { getCodeWorkspaceHref } from "./navigation";

type ModeSwitcherButtonProps = {
  href: string;
  label: string;
};

export function ModeSwitcherButton({ href, label }: ModeSwitcherButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback(() => {
    const hash = typeof window === "undefined" ? "" : window.location.hash;
    router.push(getCodeWorkspaceHref(href, pathname, hash));
  }, [href, pathname, router]);

  return (
    <Button variant="transparent" className="hidden md:flex" onClick={handleClick}>
      {label}
    </Button>
  );
}
