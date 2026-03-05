/**
 * Safely opens a URL in a new tab, blocking dangerous protocols
 * and preventing tab-napping via noopener/noreferrer.
 */
export function safeOpen(url: string): void {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  } catch {
    // invalid URL — silently ignore
  }
}
