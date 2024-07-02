import { RaycastLogoNegIcon, RaycastLogoPosIcon } from "@raycast/icons";

export function RootFooter({ mode = "dark" }: { mode?: "dark" | "light" }) {
  return (
    <footer className="shrink-0 h-[40px] px-3 border-t border-[--text-100] flex items-center justify-between gap-2 z-10 bg-white/20 dark:bg-white/5">
      <div className="flex gap-3 items-center text-sm text-[--text-600]">
        {mode === "dark" ? <RaycastLogoNegIcon className="w-5 h-5" /> : <RaycastLogoPosIcon className="w-5 h-5" />}
        <div>Theme Explorer</div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex gap-3 items-center">
          <div className="text-xs text-[--text] font-semibold">Open Command</div>
          <div className="w-[24px] h-[24px] rounded-md flex items-center justify-center bg-[--text-100] text-[--text]">
            <svg
              width="12"
              height="9"
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3"
            >
              <path
                d="M3.13477 7.53906L0.564453 5L3.13477 2.46094V7.53906ZM2.32227 5.57812V4.42187H9.4082V5.57812H2.32227ZM8.28711 5.57812V0.5H9.43164V5.57812H8.28711Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div className="w-[2px] h-[12px] bg-[--text-100]" />
        <div className="flex gap-3 items-center">
          <div className="text-xs font-semibold text-[--text-600]">Actions</div>
          <div className="w-[24px] h-[24px] rounded-md flex items-center justify-center text-xs bg-[--text-100] text-[--text]">
            ⌘
          </div>
          <div className="w-[24px] h-[24px] rounded-md flex items-center justify-center text-xs bg-[--text-100] text-[--text] -ml-2">
            K
          </div>
        </div>
      </div>
    </footer>
  );
}
