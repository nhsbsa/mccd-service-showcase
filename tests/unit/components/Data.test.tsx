import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReadData from '@/components/Data';
import { DataType } from '@/types';

const mockData = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
] as DataType;

const fetchDataMock = jest.fn();

(global.fetch as jest.Mock) = fetchDataMock;

fetchDataMock.mockResolvedValue({
  json: async () => ({
    mockData,
  }),
});

describe('ReadData Component', () => {
  afterEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test('renders children with data fetched from URL', async () => {
    const apiUrl = '/api/data/site-data';
    render(
      <ReadData apiEndpoint={apiUrl}>
        <div data-testid="child-component">Child Component</div>
      </ReadData>,
    );

    await screen.findByText('Child Component', { });
    expect(fetchDataMock).toHaveBeenCalledWith(apiUrl);
  });

  test('applies where and fields filters', async () => {
    const apiUrl = '/api/data/site-data';
    const whereFilter = 'name:Item 1';
    const fieldsFilter = 'id,name';
    render(
      <ReadData apiEndpoint={apiUrl} where={whereFilter} fields={fieldsFilter}>
        <div data-testid="child-component">Child Component</div>
      </ReadData>,
    );

    await screen.findByText('Child Component', { });
    expect(fetchDataMock).toHaveBeenCalledWith(apiUrl);
  });

  test('applies include object', async () => {
    const apiUrl = '/api/data/site-data';
    const includeObject = { category: 'Category A' };
    render(
      <ReadData apiEndpoint={apiUrl} include={includeObject}>
        <div data-testid="child-component">Child Component</div>
      </ReadData>,
    );

    await screen.findByText('Child Component', { });
    expect(fetchDataMock).toHaveBeenCalledWith(apiUrl);
  });

  test('renders error message when data fetching fails', async () => {
    fetchDataMock.mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(
      <ReadData apiEndpoint="/api/data/site-data">
        <div data-testid="child-component">Child Component</div>
      </ReadData>,
    );

    await screen.findByText('Error loading data.', { });
    expect(fetchDataMock).toHaveBeenCalledWith('/api/data/site-data');
  });
});
