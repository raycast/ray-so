type Tool = {
  id: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  icons: Icons;
  functionalities?: string[];
};

type Icons = {
  light?: string;
  dark?: string;
};

export type Extension = {
  title: string;
  name: string;
  id: string;
  icons: Icons;
  tools?: Tool[];
  author: {
    handle: string;
  };
};

type GetExtensionsProps = {
  extensionIds: string[];
};

const nativeExtensions = ["calendar", "web"];

export async function getExtensions({ extensionIds }: GetExtensionsProps): Promise<Extension[]> {
  const filteredExtensionIds = extensionIds.filter((id) => !nativeExtensions.includes(id));
  const results = await fetch(
    `https://www.raycast.com/frontend_api/extensions/search?q=&page=1&ids[]=${filteredExtensionIds.join("&ids[]=")}`,
  );
  const data = (await results.json()) as {
    data: Extension[];
  };
  console.log(data);

  const extensionResults = [
    ...data.data,
    ...nativeExtensions.map((extension) => ({
      id: extension,
      title: extension.charAt(0).toUpperCase() + extension.slice(1),
      name: extension,
      icons: {},
      author: { handle: "raycast" },
    })),
  ];

  return extensionResults;
}
