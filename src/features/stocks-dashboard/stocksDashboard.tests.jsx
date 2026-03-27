import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StocksDashboard from './stocksDashboard';
import { useStocksDashboard } from './hooks/useStocksDashboard';

jest.mock('./hooks/useStocksDashboard');

const mockData = [
  { row: 0, col: 0, value: 'Markets' },
  { row: 0, col: 1, value: 'Sell' },
  { row: 0, col: 2, value: 'Buy' },
  { row: 1, col: 0, value: 'FTSE 100' },
  { row: 1, col: 1, value: '7157.8' },
  { row: 1, col: 2, value: '7159.8' },
];

describe('StocksDashboard', () => {
  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state when loading is true', () => {
    useStocksDashboard.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: mockRefetch,
    });

    render(<StocksDashboard />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error state when error appears', () => {
    useStocksDashboard.mockReturnValue({
      data: null,
      loading: false,
      error: 'Failed to fetch stocks data',
      refetch: mockRefetch,
    });

    render(<StocksDashboard />);

    expect(screen.getByText('Error: Failed to fetch stocks data')).toBeInTheDocument();
  });

  it('should call refetch when retry button is clicked', async () => {
    // arrange
    useStocksDashboard.mockReturnValue({
      data: null,
      loading: false,
      error: 'Network error',
      refetch: mockRefetch,
    });

    // act
    render(<StocksDashboard />);


    await userEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('should render table with data when data is successfully received', () => {
    useStocksDashboard.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<StocksDashboard />);

    expect(screen.getByText('Stocks Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Markets')).toBeInTheDocument();
    expect(screen.getByText('Sell')).toBeInTheDocument();
    expect(screen.getByText('Buy')).toBeInTheDocument();
    expect(screen.getByText('FTSE 100')).toBeInTheDocument();
    expect(screen.getByText('7157.8')).toBeInTheDocument();
    expect(screen.getByText('7159.8')).toBeInTheDocument();
  });
});
