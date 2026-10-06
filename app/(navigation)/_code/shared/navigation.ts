const CODE_WORKSPACE_PATHS = ["/", "/videos"];

export function getCodeWorkspaceHref(href: string, pathname: string | null, hash: string) {
  const isWorkspaceSwitch =
    pathname !== null && CODE_WORKSPACE_PATHS.includes(pathname) && CODE_WORKSPACE_PATHS.includes(href);
  return isWorkspaceSwitch ? `${href}${hash}` : href;
}
