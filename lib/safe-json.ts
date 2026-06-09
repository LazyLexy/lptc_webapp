export async function readJsonResponse<T extends Record<string, unknown>>(
  response: Response,
  fallback: T,
): Promise<T> {
  const text = await response.text();

  if (!text.trim()) {
    return fallback;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}
