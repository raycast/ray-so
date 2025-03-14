"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/components/toast";

type Flavor = "raycast" | "raycastinternal";

async function isRaycastInternalRunning(): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const socket = new WebSocket("ws://localhost:7264");
      socket.onopen = () => {
        socket.close();
        resolve(true);
      };
      socket.onerror = () => resolve(false);
      socket.onclose = () => resolve(false);
    } catch (error) {
      resolve(false);
    }
  });
}

let cachedFlavor: Flavor;

export async function getRaycastFlavor(): Promise<Flavor> {
  if (cachedFlavor) {
    return cachedFlavor;
  }

  const isInternal = await isRaycastInternalRunning();
  cachedFlavor = isInternal ? "raycastinternal" : "raycast";
  return cachedFlavor;
}
