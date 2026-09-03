"use client";

type Flavor =
  | "raycast"
  | "raycastinternal"
  | "raycastdebug"
  | "raycast-x"
  | "raycast-x-internal"
  | "raycast-x-development";
type WebsocketFlavor = Exclude<Flavor, "raycast-x">;

const FLAVOR_PORTS: Record<WebsocketFlavor, number> = {
  "raycast-x-development": 7261,
  "raycast-x-internal": 7262,
  raycastdebug: 7263,
  raycastinternal: 7264,
  raycast: 7265,
};

// When classic Raycast already holds port 7265, production Raycast v2 falls back to 7266
const PRODUCTION_V2_FALLBACK_PORT = 7266;

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
      // Safety net for a non-Raycast process on the port that accepts
      // the connection but never replies;
      const timeout = setTimeout(() => {
        resolve(false);
        socket.close();
      }, 1500);

      socket.onopen = () => {
        socket.send(JSON.stringify({ method: "whoami", id: "1" }));
      };

      socket.onmessage = (event) => {
        clearTimeout(timeout);
        try {
          const response = JSON.parse(event.data);
          resolve(!response.error);
        } catch {
          resolve(false);
        }
        socket.close();
      };

      socket.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };
    } catch {
      resolve(false);
    }
  });
}

type Detection = { flavor: Flavor; isRaycastV2: boolean };

let cachedDetection: Detection | undefined;

// Production Raycast v2 registers 'raycast' on Windows and 'raycast-x' on macOS
function productionV2Flavor(): Flavor {
  const isWindowsPlatform = typeof navigator !== "undefined" && navigator.userAgent.includes("Windows");
  return isWindowsPlatform ? "raycast" : "raycast-x";
}

// Resolves true as soon as any probe succeeds, without waiting for the slower ones
async function anyResolvesTrue(probes: Promise<boolean>[]): Promise<boolean> {
  return new Promise((resolve) => {
    let pending = probes.length;
    probes.forEach((probe) =>
      probe.then((result) => {
        if (result) {
          resolve(true);
        } else if (--pending === 0) {
          resolve(false);
        }
      }),
    );
  });
}

async function detectRaycast(): Promise<Detection> {
  if (cachedDetection) {
    return cachedDetection;
  }

  // Start all probes upfront so detection takes as long as the slowest needed one, not the sum
  const xDevOpen = isWebsocketOpen(FLAVOR_PORTS["raycast-x-development"]);
  const xInternalOpen = isWebsocketOpen(FLAVOR_PORTS["raycast-x-internal"]);
  // Production v2 and classic macOS share port 7265: v2 answers whoami successfully,
  // classic rejects it with a method-not-found error. When classic holds 7265,
  // v2 sits on the fallback port, so race both.
  const productionV2Detected = anyResolvesTrue([
    supportsWhoami(FLAVOR_PORTS.raycast),
    supportsWhoami(PRODUCTION_V2_FALLBACK_PORT),
  ]);
  const classicDebugOpen = isWebsocketOpen(FLAVOR_PORTS.raycastdebug);
  const classicInternalOpen = isWebsocketOpen(FLAVOR_PORTS.raycastinternal);

  let detection: Detection;

  // Raycast v2 takes priority over classic when both are installed
  if (await xDevOpen) {
    detection = { flavor: "raycast-x-development", isRaycastV2: true };
  } else if (await xInternalOpen) {
    detection = { flavor: "raycast-x-internal", isRaycastV2: true };
  } else if (await productionV2Detected) {
    detection = { flavor: productionV2Flavor(), isRaycastV2: true };
  } else if (await classicDebugOpen) {
    detection = { flavor: "raycastdebug", isRaycastV2: false };
  } else if (await classicInternalOpen) {
    detection = { flavor: "raycastinternal", isRaycastV2: false };
  } else {
    detection = { flavor: "raycast", isRaycastV2: false };
  }

  cachedDetection = detection;
  return detection;
}

export async function getRaycastFlavor(): Promise<Flavor> {
  const { flavor } = await detectRaycast();
  return flavor;
}

export async function getIsRaycastV2(): Promise<boolean> {
  const { isRaycastV2 } = await detectRaycast();
  return isRaycastV2;
}
