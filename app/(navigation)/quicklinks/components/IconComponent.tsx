import { Icons, IconName as RaycastIconName, StarsIcon } from "@raycast/icons";
import { SVGProps } from "react";

export type IconName = RaycastIconName;

export function IconComponent(props: { icon: IconName } & SVGProps<SVGSVGElement>) {
  if (Icons[props.icon]) {
    const Icon = Icons[props.icon];
    return <Icon {...props} />;
  }
  return <StarsIcon {...props} />;
}
