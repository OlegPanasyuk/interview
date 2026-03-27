import './App.css'
import { useStocksDashboard } from './hooks/useStocksDashboard'

function App() {
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
    <div className="App">
      <h1>Stocks Dashboard</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default App
