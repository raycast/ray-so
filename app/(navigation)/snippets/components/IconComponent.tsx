import { Icons, IconName as RaycastIconName, StarsIcon } from "@raycast/icons";
import { SVGProps } from "react";
import { GitHubIcon } from "./Icons";

export type IconName = RaycastIconName | "github";

export function IconComponent(props: { icon: IconName } & SVGProps<SVGSVGElement>) {
  if (props.icon === "github") {
    return <GitHubIcon {...props} />;
  }
  if (Icons[props.icon]) {
    const Icon = Icons[props.icon];
    return <Icon {...props} />;
  }
  return null;
}
