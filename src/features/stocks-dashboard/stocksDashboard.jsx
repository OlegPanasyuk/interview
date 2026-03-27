import React from 'react';
import Table from '../../components/Table';
import { useStocksDashboard } from './hooks/useStocksDashboard'

function StocksDashboard() {
    const { data, loading, error, refetch } = useStocksDashboard();

    if (loading) {
        return <div className="App">Loading...</div>;
    }

    if (error) {
        return (
        <div className="App">
            <p>Error: {error}</p>
            <button onClick={refetch}>Retry</button>
        </div>
        );
    }

  return (
    <div className='stocks-dashboard'>
      <h1>Stocks Dashboard</h1>
      <Table data={data} />
    </div>
  );
}

export default StocksDashboard;