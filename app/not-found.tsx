import { Button } from "@/components/button";
import { RaycastLogoNegIcon } from "@raycast/icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <RaycastLogoNegIcon className="w-12 h-12 flicker" />
      <div className="flex flex-col gap-1 items-center">
        <h2 className="text-2xl font-medium">Not Found</h2>
        <p className="text-gray-10">Could not find requested resource</p>
      </div>
      <Button variant="secondary" asChild>
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
