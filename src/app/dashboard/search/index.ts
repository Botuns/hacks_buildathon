export const fallbackImageUrl =
  "https://img.freepik.com/free-vector/search-concept-landing-page_23-2148211329.jpg";
export const validImageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "svg",
];
export const maxFileSize = 5 * 1024 * 1024;
export const whitelistedDomains = ["example.com", "trusteddomain.com"];

export function checkFileExtension(url: string): boolean {
  const extension = url.split(".").pop()?.toLowerCase();
  return extension ? validImageExtensions.includes(extension) : false;
}

export function isWhitelistedDomain(url: string): boolean {
  try {
    const domain = new URL(url).hostname;
    return whitelistedDomains.some((whitelisted) =>
      domain.endsWith(whitelisted)
    );
  } catch {
    return false;
  }
}
export async function isValidImageUrl(url: string): Promise<boolean> {
  if (!checkFileExtension(url) || !isWhitelistedDomain(url)) {
    return false;
  }

  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) return false;

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.startsWith("image/")) return false;

    const contentLength = response.headers.get("Content-Length");
    if (contentLength && parseInt(contentLength) > maxFileSize) return false;

    const buffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    const header = uint8Array.subarray(0, 4);
    const hex = Array.from(header, (byte) =>
      byte.toString(16).padStart(2, "0")
    ).join("");

    if (
      !["ffd8", "8950", "4749", "424d"].some((signature) =>
        hex.startsWith(signature)
      )
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
