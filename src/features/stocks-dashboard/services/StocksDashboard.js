const BASE_URL = '/src';

export const stocksDashboardService = {
  async fetchStocks(signal) {
    const response = await fetch(`${BASE_URL}/data.json`, { signal });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    return json.data;
  }
};
