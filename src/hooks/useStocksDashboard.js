import { useState, useEffect, useCallback } from 'react';
import { StocksDashboardService } from '../services/StocksDashboard';

export function useStocksDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const abortController = new AbortController();
    
    setLoading(true);
    setError(null);

    try {
      const result = await StocksDashboardService.fetchStocks(abortController.signal);
      setData(result);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to fetch stocks data');
      }
    } finally {
      setLoading(false);
    }

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const cleanup = fetchData();
    return () => {
      cleanup.then(abort => abort?.());
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}
