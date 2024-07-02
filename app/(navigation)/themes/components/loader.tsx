import { RaycastLogoNegIcon } from "@raycast/icons";

export function Loader() {
  return (
    <div data-loader className="flex items-center justify-center bg-neutral-900 text-white">
      <div className="flex flex-col items-center gap-[68px]">
        <RaycastLogoNegIcon className="w-24 h-24" />

        <div className="w-[193px] h-[4px] rounded-full bg-white/20 overflow-hidden">
          <div data-loader-progress className="w-full h-full rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
}
