"use client";

type Flavor = "raycast" | "raycastinternal" | "raycastdebug" | "raycast-x-internal" | "raycast-x-development";

const FLAVOR_PORTS: Record<Flavor, number> = {
  "raycast-x-development": 7261,
  "raycast-x-internal": 7262,
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

async function supportsWhoami(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const socket = new WebSocket(`ws://localhost:${port}`);

      socket.onopen = () => {
        socket.send(JSON.stringify({ method: "whoami", id: "1" }));
      };

      socket.onmessage = (event) => {
        const response = JSON.parse(event.data);
        resolve(!response.error);
        socket.close();
      };

      socket.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

let cachedFlavor: Flavor = "raycast";
let flavorChecked = false;
let cachedIsWindows: boolean | undefined;

export async function getRaycastFlavor(): Promise<Flavor> {
  console.log("[RaycastFlavor] getRaycastFlavor called, flavorChecked:", flavorChecked);
  if (flavorChecked) {
    return cachedFlavor;
  }

  flavorChecked = true;

  console.log("[RaycastFlavor] checking x-development port");
  if (await isWebsocketOpen(FLAVOR_PORTS["raycast-x-development"])) {
    cachedFlavor = "raycast-x-development";
  } else {
    console.log("[RaycastFlavor] checking x-internal port");
    if (await isWebsocketOpen(FLAVOR_PORTS["raycast-x-internal"])) {
      cachedFlavor = "raycast-x-internal";
    } else {
      console.log("[RaycastFlavor] checking debug port");
      if (await isWebsocketOpen(FLAVOR_PORTS.raycastdebug)) {
        cachedFlavor = "raycastdebug";
      } else {
        console.log("[RaycastFlavor] checking internal port");
        if (await isWebsocketOpen(FLAVOR_PORTS.raycastinternal)) {
          cachedFlavor = "raycastinternal";
        }
      }
    }
  }

  console.log("[RaycastFlavor] returning flavor:", cachedFlavor);
  return cachedFlavor;
}

export async function getIsWindows(): Promise<boolean> {
  console.log("[RaycastFlavor] getIsWindows called, cachedIsWindows:", cachedIsWindows);
  if (cachedIsWindows !== undefined) {
    return cachedIsWindows;
  }

  const flavor = await getRaycastFlavor();
  console.log("[RaycastFlavor] getIsWindows got flavor:", flavor);

  if (flavor === "raycast-x-development" || flavor === "raycast-x-internal") {
    cachedIsWindows = true;
    return true;
  }

  // macOS and Windows versions share the 'raycast' flavor, so we check whoami support to determine if it's Windows
  // Windows supports whoami, macOS does not
  if (flavor === "raycast") {
    console.log("[RaycastFlavor] checking whoami support");
    cachedIsWindows = await supportsWhoami(FLAVOR_PORTS.raycast);
    console.log("[RaycastFlavor] whoami result:", cachedIsWindows);
    return cachedIsWindows;
  }

  cachedIsWindows = false;
  return false;
}
