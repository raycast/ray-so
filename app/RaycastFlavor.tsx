"use client";

type Flavor = "raycast" | "raycastinternal" | "raycastdebug";

const FLAVOR_PORTS: Record<Flavor, number> = {
  raycastdebug: 7263,
  raycastinternal: 7264,
  raycast: 7265,
};

async function isWebsocketOpen(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const socket = new WebSocket(`ws://localhost:${port}`);
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

  if (await isWebsocketOpen(FLAVOR_PORTS.raycastdebug)) {
    cachedFlavor = "raycastdebug";
  } else if (await isWebsocketOpen(FLAVOR_PORTS.raycastinternal)) {
    cachedFlavor = "raycastinternal";
  } else {
    cachedFlavor = "raycast";
  }

  return cachedFlavor;
}
