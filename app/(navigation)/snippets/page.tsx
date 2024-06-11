import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snippets",
};

export default function Page() {
  return (
    <div>
      <div className="h-[50px] absolute"></div>
      <div>snippet explorer</div>
    </div>
  );
}
