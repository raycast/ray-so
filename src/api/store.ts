// Basic icon type
type Icons = {
  light?: string;
  dark?: string;
};

// Tool type for extension features
type Tool = {
  id: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  icons: Icons;
  functionalities?: string[];
};

// Main extension type
export type Extension = {
  id: string;
  title: string;
  name: string;
  icons: Icons;
  tools?: Tool[];
};

type GetExtensionsProps = {
  extensionIds: string[];
};

const nativeExtensionsMap = {
  builtin_package_raycastFocus: {
    id: "builtin_package_raycastFocus",
    title: "Raycast Focus",
    name: "raycast-focus",
    icons: {
      dark: "/icons/focus.png",
    },
  },
  builtin_package_calendar: {
    id: "builtin_package_calendar",
    title: "Calendar",
    name: "calendar",
    icons: {
      dark: "/icons/calendar.svg",
    },
  },
  builtin_package_raycastNotes: {
    id: "builtin_package_raycastNotes",
    title: "Raycast Notes",
    name: "raycast-notes",
    icons: {
      dark: "/icons/notes.svg",
    },
  },
  builtin_package_chart: {
    id: "builtin_package_chart",
    title: "Chart",
    name: "chart",
    icons: {
      dark: "/icons/chart.svg",
    },
  },
  builtin_package_finder: {
    id: "builtin_package_finder",
    title: "Finder",
    name: "finder",
    icons: {
      dark: "/icons/finder.png",
    },
  },
  remote_package_web: {
    id: "remote_package_web",
    title: "Web",
    name: "web",
    icons: {
      dark: "/icons/web.svg",
    },
  },
  remote_package_dalle: {
    id: "remote_package_dalle",
    title: "DALL-E",
    name: "dalle",
    icons: {
      dark: "/icons/image.svg",
    },
  },
};

export async function getExtensions({ extensionIds }: GetExtensionsProps): Promise<Extension[]> {
  // Split extensions into store and native (builtin/remote) types
  const storeExtensions = extensionIds.filter((id) => !id.startsWith("builtin_") && !id.startsWith("remote_"));
  const nativeExtensions = extensionIds.filter((id) => id.startsWith("builtin_") || id.startsWith("remote_"));

  // Fetch store extensions
  const response = await fetch(
    `https://www.raycast.com/frontend_api/extensions/search?q=&page=1&per_page=200&ids[]=${storeExtensions.join("&ids[]=")}`,
  );
  const { data } = (await response.json()) as { data: Extension[] };

  // Create native extension objects
  const nativeExtensionObjects = nativeExtensions.map((id) => {
    const mappedExtension = nativeExtensionsMap[id as keyof typeof nativeExtensionsMap];
    if (mappedExtension) {
      return mappedExtension;
    }
    return {
      id,
      title: id.charAt(0).toUpperCase() + id.slice(1),
      name: id,
      icons: {},
    };
  });

  return [...data, ...nativeExtensionObjects];
}
