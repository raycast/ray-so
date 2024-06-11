import type { Metadata } from "next";
import { presets } from "./[slug]/page";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Presets",
};

export default function Page() {
  return (
    <div>
      <div className="h-[50px] absolute"></div>
      <ul className="flex gap-2">
        {presets.map((preset) => (
          <li key={preset}>
            <Link href={`presets/${preset}`} className="underline">
              {preset}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
