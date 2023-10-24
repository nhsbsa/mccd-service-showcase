import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Pagination from '@/components/Pagination';
import { DataType } from '@/types';

const mockData = [
  { url: '/page1' },
  { url: '/page2' },
  { url: '/page3' },
  { url: '/page4' },
  { url: '/page5' },
] as DataType;

describe('Pagination Component', () => {
  it('renders without crashing', () => {
    render(<Pagination data={mockData} itemsPerPage={1} />);
  });

  it('renders the correct number of page links', () => {
    render(<Pagination data={mockData} itemsPerPage={1} />);
    const pageLinks = screen.getAllByRole('link', { name: /Page \d+/ });
    expect(pageLinks).toHaveLength(mockData.length);
  });

  it('highlights the current page', () => {
    render(<Pagination data={mockData} itemsPerPage={1} />);
    const currentPageLink = screen.getByRole('link', { name: /Page 1/, current: 'page' });
    expect(currentPageLink).toBeInTheDocument();
  });

  it('handles click on next button', async () => {
    render(<Pagination data={mockData} itemsPerPage={1} />);
    const nextButton = screen.getByRole('link', { name: /Next/ });
    fireEvent.click(nextButton);
    const nextPageLink = screen.getByLabelText('Page 2', { exact: true });
    expect(nextPageLink).toBeInTheDocument();
  });

  it('handles click on previous button', () => {
    render(<Pagination data={mockData} itemsPerPage={1} />);
    const nextButton = screen.getByRole('link', { name: /Next/ });
    const previousButton = screen.getByLabelText('Page 1', { exact: true });

    fireEvent.click(nextButton);
    fireEvent.click(previousButton);

    const firstPageLink = screen.getByRole('link', { name: /Page 1/, current: 'page' });
    expect(firstPageLink).toBeInTheDocument();
  });
});
