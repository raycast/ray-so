import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snippets",
};

export default function Page() {
  return <div className="text-green-600">snippet explorer</div>;
}
