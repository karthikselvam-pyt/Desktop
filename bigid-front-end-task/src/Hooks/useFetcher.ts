import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";

interface UseFetchProps {
  url: string;
}

interface FetchResult<T> {
  data: T | null;
  error: string | null;
  revalidate: () => void;
  isLoading: boolean;
}

const useFetch = <T>({ url }: UseFetchProps): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedData = await axios.get<T>(url);
      setData(fetchedData.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    error,
    revalidate: fetch,
    isLoading,
  };
};

export default useFetch;
