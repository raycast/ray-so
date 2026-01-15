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

let cachedFlavor: Flavor;
let cachedIsXray: boolean | undefined;

export async function getRaycastFlavor(): Promise<Flavor> {
  if (cachedFlavor) {
    return cachedFlavor;
  }

  if (await isWebsocketOpen(FLAVOR_PORTS["raycast-x-development"])) {
    cachedFlavor = "raycast-x-development";
  } else if (await isWebsocketOpen(FLAVOR_PORTS["raycast-x-internal"])) {
    cachedFlavor = "raycast-x-internal";
  } else if (await isWebsocketOpen(FLAVOR_PORTS.raycastdebug)) {
    cachedFlavor = "raycastdebug";
  } else if (await isWebsocketOpen(FLAVOR_PORTS.raycastinternal)) {
    cachedFlavor = "raycastinternal";
  } else {
    cachedFlavor = "raycast";
  }

  return cachedFlavor;
}

export async function getIsXray(): Promise<boolean> {
  if (cachedIsXray !== undefined) {
    return cachedIsXray;
  }

  const flavor = await getRaycastFlavor();

  if (flavor === "raycast-x-development" || flavor === "raycast-x-internal") {
    cachedIsXray = true;
    return true;
  }

  // Classic and X-Ray share the 'raycast' flavor, so we check whoami support to determine if it's X-Ray
  // X-Ray supports whoami, Classic does not
  if (flavor === "raycast") {
    cachedIsXray = await supportsWhoami(FLAVOR_PORTS.raycast);
    return cachedIsXray;
  }

  cachedIsXray = false;
  return false;
}
