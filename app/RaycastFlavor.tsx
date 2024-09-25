"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/components/toast";

const flavors = ["raycast", "raycastinternal"];

export function RaycastFlavor() {
  const searchParams = useSearchParams();
  const flavor = searchParams.get("flavor");

  useEffect(() => {
    if (flavor) {
      if (flavors.includes(flavor)) {
        if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
          localStorage.setItem("flavor", flavor);
          toast.success(`Flavor set to "${flavor}"`);
        }
      } else {
        toast.error(`Invalid flavor "${flavor}"`);
      }
    }
  }, [flavor]);
  return null;
}

export function getRaycastFlavor() {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined" && localStorage.getItem("flavor")) {
    return localStorage.getItem("flavor");
  } else if (process.env.NODE_ENV === "development") {
    return flavors[1];
  } else {
    return flavors[0];
  }
}
