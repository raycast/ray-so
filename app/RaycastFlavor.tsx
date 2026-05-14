"use client";

type Flavor =
  | "raycast"
  | "raycast-x"
  | "raycastinternal"
  | "raycastdebug"
  | "raycast-x-internal"
  | "raycast-x-development";

const FLAVOR_PORTS: Record<Flavor, number> = {
  "raycast-x-development": 7261,
  "raycast-x-internal": 7262,
  raycastdebug: 7263,
  raycastinternal: 7264,
  "raycast-x": 7265,
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

type WhoamiResponse = {
  error?: unknown;
  result?: {
    registered?: boolean;
  };
};

async function getWhoamiResponse(port: number): Promise<WhoamiResponse | undefined> {
  return new Promise((resolve) => {
    let socket: WebSocket | undefined;
    let resolved = false;

    function finish(response?: WhoamiResponse) {
      if (resolved) {
        return;
      }

      resolved = true;
      window.clearTimeout(timeout);
      socket?.close();
      resolve(response);
    }

    const timeout = window.setTimeout(() => finish(), 500);

    try {
      const currentSocket = new WebSocket(`ws://localhost:${port}`);
      socket = currentSocket;

      currentSocket.onopen = () => {
        currentSocket.send(JSON.stringify({ jsonrpc: "2.0", method: "whoami", id: "1" }));
      };

      currentSocket.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);
          console.log("[RaycastFlavor] whoami response", response);
          finish(response);
        } catch {
          console.log("[RaycastFlavor] invalid whoami response", event.data);
          finish({ result: { registered: true } });
        }
      };

      currentSocket.onerror = () => finish();
      currentSocket.onclose = () => finish();
    } catch {
      finish();
    }
  });
}

async function supportsWhoami(port: number): Promise<boolean> {
  const response = await getWhoamiResponse(port);
  return Boolean(response && !response.error);
}

async function isRaycastV2(port: number): Promise<boolean> {
  const response = await getWhoamiResponse(port);
  return response?.result?.registered === true;
}

let cachedFlavor: Flavor;
let cachedIsWindows: boolean | undefined;

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
  } else if (await isRaycastV2(FLAVOR_PORTS.raycast)) {
    cachedFlavor = "raycast-x";
  } else {
    cachedFlavor = "raycast";
  }

  return cachedFlavor;
}

export async function getIsWindows(): Promise<boolean> {
  if (cachedIsWindows !== undefined) {
    return cachedIsWindows;
  }

  const flavor = await getRaycastFlavor();

  if (flavor === "raycast-x" || flavor === "raycast-x-development" || flavor === "raycast-x-internal") {
    cachedIsWindows = true;
    return true;
  }

  // macOS and Windows versions share the 'raycast' flavor, so we check whoami support to determine if it's Windows
  // Windows supports whoami, macOS does not
  if (flavor === "raycast") {
    cachedIsWindows = await supportsWhoami(FLAVOR_PORTS.raycast);
    return cachedIsWindows;
  }

  cachedIsWindows = false;
  return false;
}
