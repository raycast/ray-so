export function isValidLink(link: string) {
  try {
    const url = new URL(link);
    // quicklinks with dynamic arguments part of the hostname are not valid links
    return url.hostname.includes("{") ? false : true;
  } catch (error) {
    return false;
  }
}
