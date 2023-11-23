import React from 'react';
import userEvent from '@testing-library/user-event';
import {
  screen, render, fireEvent,
} from '@testing-library/react';
import SortableLists from '@/components/SortableLists';

const sampleData = [
  { title: 'Item 1', category: 'A', link: '/Link1' },
  { title: 'Item 2', category: 'B', link: '/Link2' },
  { title: 'Item 3', category: 'A', link: '/Link3' },
  { title: 'Item 4', category: 'B', link: '/Link4' },
];

const sampleSortBy = {
  category: ['B', 'A'],
};

describe('SortableLists component', () => {
  it('renders the component without props and without crashing', () => {
    const { container } = render(
      <SortableLists />,
    );
    expect(container).toBeInTheDocument();
  });

  it('renders "No data" message when no data is provided', () => {
    render(<SortableLists sortBy={sampleSortBy} data={[]} linkField="link" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('does not render "Sort by" label when no data is provided', () => {
    render(<SortableLists sortBy={sampleSortBy} data={[]} linkField="link" />);
    expect(screen.queryByLabelText('Sort by')).not.toBeInTheDocument();
  });

  it('renders grouped lists correctly', () => {
    render(<SortableLists sortBy={sampleSortBy} data={sampleData} linkField="link" />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('handles select change and regroups data', () => {
    render(<SortableLists sortBy={sampleSortBy} data={sampleData} linkField="link" />);
    const select = screen.getByLabelText('Sort by');
    fireEvent.change(select, { target: { value: 'category' } });
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('assigns correct links in makeLists', () => {
    render(<SortableLists sortBy={sampleSortBy} data={sampleData} linkField="link" />);

    sampleData.forEach(({ link, title }) => {
      const linkElement = screen.getByRole('link', { name: title });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link);
    });
  });

  it('handles select change and regroups data with correct links', async () => {
    render(<SortableLists sortBy={sampleSortBy} data={sampleData} linkField="link" />);
    const select = screen.getByLabelText('Sort by');
    await userEvent.selectOptions(select, 'category');

    sampleData.forEach(({ link, title }) => {
      const linkElement = screen.getByRole('link', { name: title });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link);
    });
  });

  // it('matches the snapshot', () => {
  //   const { asFragment } = render(
  //     <SortableLists sortBy={sampleSortBy} data={sampleData} />,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
