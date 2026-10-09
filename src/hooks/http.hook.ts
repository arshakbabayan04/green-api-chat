import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async <T = unknown>(url: string, method = 'GET', body: string | null = null, headers: Record<string, string> = {'Content-Type': 'application/json'}): Promise<T> => {
    
    setLoading(true);

    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";

      setLoading(false);
      setError(message);
      throw e;
    }
    finally {
      setLoading(false);
    }
    
  }, [])

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
}