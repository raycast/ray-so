import { CheckCircleIcon } from "@raycast/icons";

export function List() {
  return (
    <div className="py-1 px-2 text-[--text]">
      <div className="p-2 text-xs leading-none font-medium tracking-[0.1px] text-[--text-600]">List</div>
      <div className="flex items-center gap-3 h-[40px] px-2 rounded-lg bg-[--selection-100]">
        <div>
          <CheckCircleIcon className="w-5 h-5" />
        </div>
        <div className="text-sm leading-none">Primary Text</div>
        <div className="ml-auto flex gap-2 h-[22px] text-sm">
          <Tag color="var(--red)" bg="var(--red-100)">
            Red
          </Tag>
          <Tag color="var(--orange)" bg="var(--orange-100)">
            Orange
          </Tag>
          <Tag color="var(--blue)" bg="var(--blue-100)">
            Blue
          </Tag>
        </div>
      </div>

      <div className="flex items-center gap-3 h-[40px] px-2 rounded-lg">
        <div>
          <CheckCircleIcon className="w-5 h-5" />
        </div>
        <div className=" text-sm leading-none">Primary Text</div>
        <div className="ml-auto flex gap-2 h-[22px] text-sm">
          <Tag color="var(--green)" bg="var(--green-100)">
            Green
          </Tag>
          <Tag color="var(--yellow)" bg="var(--yellow-100)">
            Yellow
          </Tag>
          <Tag color="var(--purple)" bg="var(--purple-100)">
            Purple
          </Tag>
          <Tag color="var(--magenta)" bg="var(--magenta-100)">
            Magenta
          </Tag>
        </div>
      </div>
    </div>
  );
}

function Tag({ color, bg, children }: { color: string; bg: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-2 rounded-md text-[--color] bg-[--bg]"
      style={
        {
          "--color": color,
          "--bg": bg,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
