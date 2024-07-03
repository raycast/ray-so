import { cn } from "@/utils/cn";

export function Kbd({ children, size = "small" }: { children: React.ReactNode; size?: "small" | "medium" }) {
  return (
    <kbd
      className={cn(
        `inline-flex items-center justify-center px-2 font-medium bg-gray-a4 tracking-[0.1px] font-sans w-auto text-gray-a10`,
        size === "small" && "h-[18px] px-1 text-[10px] rounded-[3px] min-w-[18px]",
        size === "medium" && "h-[28px] px-2 text-xs rounded-md min-w-[28px]"
      )}
    >
      {children}
    </kbd>
  );
}

export function Kbds({ children }: { children: React.ReactNode }) {
  return <div className="ml-auto inline-flex gap-1 pl-4">{children}</div>;
}

export function Shortcut({ children, keys }: { children: React.ReactNode; keys: string[] }) {
  return (
    <div className="flex justify-between items-center">
      <div className="text-gray-11 text-[13px]">{children}</div>
      <div className="flex items-end gap-1">
        {keys.map((key) => (
          <Kbd key={key} size="medium">
            {key}
          </Kbd>
        ))}
      </div>
    </div>
  );
}
