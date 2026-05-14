"use client";

import React from "react";

export type RaycastImportVersion = "v1" | "v2";

type Flavor =
  | "raycast"
  | "raycastinternal"
  | "raycastdebug"
  | "raycast-x"
  | "raycast-x-internal"
  | "raycast-x-development";
type WebsocketFlavor = Exclude<Flavor, "raycast-x">;

const RAYCAST_IMPORT_VERSION_STORAGE_KEY = "raycastImportVersion";

const FLAVOR_PORTS: Record<WebsocketFlavor, number> = {
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

const cachedFlavor: Partial<Record<RaycastImportVersion, Flavor>> = {};
const cachedIsWindows: Partial<Record<RaycastImportVersion, boolean>> = {};

function normalizeRaycastImportVersion(version: string | null): RaycastImportVersion {
  return version === "v2" ? "v2" : "v1";
}

export function getRaycastImportVersion(): RaycastImportVersion {
  if (typeof window === "undefined") {
    return "v1";
  }

  try {
    return normalizeRaycastImportVersion(localStorage.getItem(RAYCAST_IMPORT_VERSION_STORAGE_KEY));
  } catch (error) {
    return "v1";
  }
}

export function setRaycastImportVersion(version: RaycastImportVersion) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(RAYCAST_IMPORT_VERSION_STORAGE_KEY, version);
  } catch (error) {
    console.log("Could not set Raycast import version in localStorage", error);
  }
}

export function useRaycastImportVersion() {
  const [version, setVersionState] = React.useState<RaycastImportVersion>("v1");

  React.useEffect(() => {
    setVersionState(getRaycastImportVersion());
  }, []);

  const updateVersion = React.useCallback((version: RaycastImportVersion) => {
    setRaycastImportVersion(version);
    setVersionState(version);
  }, []);

  return [version, updateVersion] as const;
}

export async function getRaycastFlavor(version = getRaycastImportVersion()): Promise<Flavor> {
  const cachedVersionFlavor = cachedFlavor[version];
  if (cachedVersionFlavor) {
    return cachedVersionFlavor;
  }

  if (version === "v2") {
    let flavor: Flavor;

    if (await isWebsocketOpen(FLAVOR_PORTS["raycast-x-development"])) {
      flavor = "raycast-x-development";
    } else if (await isWebsocketOpen(FLAVOR_PORTS["raycast-x-internal"])) {
      flavor = "raycast-x-internal";
    } else {
      flavor = "raycast-x";
    }

    cachedFlavor.v2 = flavor;
    return flavor;
  }

  let flavor: Flavor;

  if (await isWebsocketOpen(FLAVOR_PORTS.raycastdebug)) {
    flavor = "raycastdebug";
  } else if (await isWebsocketOpen(FLAVOR_PORTS.raycastinternal)) {
    flavor = "raycastinternal";
  } else {
    flavor = "raycast";
  }

  cachedFlavor.v1 = flavor;
  return flavor;
}

export async function getIsWindows(version = getRaycastImportVersion()): Promise<boolean> {
  const cachedVersionIsWindows = cachedIsWindows[version];
  if (cachedVersionIsWindows !== undefined) {
    return cachedVersionIsWindows;
  }

  const flavor = await getRaycastFlavor(version);

  if (flavor === "raycast-x" || flavor === "raycast-x-development" || flavor === "raycast-x-internal") {
    cachedIsWindows[version] = true;
    return true;
  }

  // macOS and Windows versions share the 'raycast' flavor, so we check whoami support to determine if it's Windows
  // Windows supports whoami, macOS does not
  if (flavor === "raycast") {
    const isWindows = await supportsWhoami(FLAVOR_PORTS.raycast);
    cachedIsWindows[version] = isWindows;
    return isWindows;
  }

  cachedIsWindows[version] = false;
  return false;
}
