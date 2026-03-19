export function validateUrl(input: string): { valid: boolean; error?: string } {
  if (!input || input.trim().length === 0) {
    return { valid: false, error: "addlink.error_url_invalid" };
  }

  if (input.length < 5 || input.length > 2048) {
    return { valid: false, error: "addlink.error_url_invalid" };
  }

  try {
    const url = new URL(input);
    const allowedProtocols = ["http:", "https:"];
    if (!allowedProtocols.includes(url.protocol)) {
      return { valid: false, error: "addlink.error_url_invalid" };
    }
    return { valid: true };
  } catch {
    return { valid: false, error: "addlink.error_url_invalid" };
  }
}

export function isValidUrl(url: string): boolean {
  return validateUrl(url).valid;
}
