import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompts",
};

export default function Page() {
  return (
    <div>
      <div className="h-[50px] absolute"></div>
      <div>prompt explorer</div>
    </div>
  );
}
