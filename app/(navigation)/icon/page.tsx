import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Icon Maker",
};

export default function Page() {
  return (
    <div>
      <div className="h-[50px] absolute"></div>
      <div>icon maker</div>
    </div>
  );
}
