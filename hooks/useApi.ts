
import { useState, useEffect, useCallback } from 'react';

type Fetcher<T, P extends any[]> = (...args: P) => Promise<T>;

export function useApi<T, P extends any[]>(fetcher: Fetcher<T, P>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: P) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcher(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err as Error);
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [fetcher]
  );

  return { data, loading, error, execute };
}

export function useApiAuto<T, P extends any[]>(fetcher: Fetcher<T, P>, ...args: P) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
  
    const refetch = useCallback(() => {
        setLoading(true);
        setError(null);
        fetcher(...args)
          .then((result) => {
            setData(result);
          })
          .catch((err) => {
            setError(err as Error);
            setData(null);
          })
          .finally(() => {
            setLoading(false);
          });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetcher, ...args]);
  
    useEffect(() => {
      refetch();
    }, [refetch]);
  
    return { data, loading, error, refetch };
  }
