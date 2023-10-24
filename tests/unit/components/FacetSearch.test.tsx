import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import FacetSearch from '@/components/FacetSearch';
import { DataType } from '@/types';

const mockData = [
  {
    title: 'Document One',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sem integer vitae justo eget magna fermentum',
    url: 'https://docs.google.com/spreadsheets/d/1cbHCaJACe8ISXGjhBMXm2HMO61Tldm2N_PlvZVYj2B0/edit#gid=0',
    projectStage: 'Planning and Discovery',
    team: 'User Research (UR)',
    status: 'Completed',
    platform: 'Miro',
  },
  {
    title: 'Document Two',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat.',
    url: 'https://docs.google.com/spreadsheets/d/1cbHCaJACe8ISXGjhBMXm2HMO61Tldm2N_PlvZVYj2B0/edit#gid=0',
    projectStage: 'Development and Iteration',
    team: 'User Experience (UX)',
    status: 'Completed',
    platform: 'Miro',
  },
  {
    title: 'Document Three',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem donec massa sapien faucibus et molestie ac feugiat.',
    url: 'https://docs.google.com/spreadsheets/d/1cbHCaJACe8ISXGjhBMXm2HMO61Tldm2N_PlvZVYj2B0/edit#gid=0',
    projectStage: 'Review and Demo',
    team: 'All',
    status: 'In progress',
    platform: 'Google Sheets',
  },
  {
    title: 'Document Four',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat nibh sed pulvinar proin gravida.',
    url: 'https://docs.google.com/spreadsheets/d/1cbHCaJACe8ISXGjhBMXm2HMO61Tldm2N_PlvZVYj2B0/edit#gid=0',
    projectStage: 'Release and Deployment',
    team: 'Developers',
    status: 'Not started',
    platform: 'Trello',
  },
  {
    title: 'Document Five',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique.',
    url: 'https://docs.google.com/spreadsheets/d/1cbHCaJACe8ISXGjhBMXm2HMO61Tldm2N_PlvZVYj2B0/edit#gid=0',
    projectStage: 'Development and Iteration',
    team: 'Developers',
    status: 'In progress',
    platform: 'Trello',
  },
  {
    title: 'Document Six',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique.',
    url: 'https://docs.google.com/spreadsheets/d/1cbHCaJACe8ISXGjhBMXm2HMO61Tldm2N_PlvZVYj2B0/edit#gid=0',
    projectStage: 'Development and Iteration',
    team: 'Developers',
    status: 'In progress',
    platform: 'Trello',
  },
] as DataType;

describe('FacetSearch Component', () => {
  test('renders facet search with default values', () => {
    render(<FacetSearch data={mockData} facets={['ProjectStage', 'Team', 'Status', 'Platform']} searchType="documents" />);

    const facetSearchElement = screen.getByLabelText('search filters', { });
    expect(facetSearchElement).toBeInTheDocument();

    const facetSections = screen.getAllByTestId('facet-section', { });
    expect(facetSections.length).toBe(4);
  });

  test('applies and removes filters', async () => {
    render(<FacetSearch data={mockData} facets={['ProjectStage', 'Team', 'Status', 'Platform']} searchType="documents" />);
    // Apply a filter
    const filterCheckbox = screen.getByRole('checkbox', { name: 'Planning And Discovery' });
    // eslint-disable-next-line testing-library/no-wait-for-side-effects
    fireEvent.click(filterCheckbox);
    // Check if the filter is applied
    const filterButton = screen.getByRole('button', {
      name: 'Remove filter Planning And'
        + ' Discovery',
    });
    expect(filterButton).toBeInTheDocument();

    // Remove the filter
    fireEvent.click(filterButton);

    // Check if the filter is removed
    expect(filterButton).not.toBeInTheDocument();
  });

  test('displays search results based on filters', async () => {
    render(<FacetSearch data={mockData} facets={['ProjectStage', 'Team', 'Status', 'Platform']} searchType="documents" />);
    // Apply a filter
    const filterCheckbox = screen.getByRole('checkbox', { name: 'Planning And Discovery' });
    // eslint-disable-next-line testing-library/no-wait-for-side-effects
    fireEvent.click(filterCheckbox);
    // Check if the search results are displayed
    const searchResults = screen.getAllByRole('link', {});
    expect(searchResults.length).toBeGreaterThan(0);
  });

  test('displays no results message when no matching results', async () => {
    render(<FacetSearch data={mockData} facets={['ProjectStage', 'Team', 'Status', 'Platform']} searchType="documents" />);

    // Apply a filter that doesn't match any data
    const filterCheckbox1 = screen.getByRole('checkbox', { name: 'Planning And Discovery' });
    const filterCheckbox2 = screen.getByRole('checkbox', { name: 'All' });
    // eslint-disable-next-line testing-library/no-wait-for-side-effects
    fireEvent.click(filterCheckbox1);
    // eslint-disable-next-line testing-library/no-wait-for-side-effects
    fireEvent.click(filterCheckbox2);

    // Check if the no results message is displayed
    const noResultsMessage = screen.getByText('There are no matching results.', {});
    expect(noResultsMessage).toBeInTheDocument();
  });

  test('toggles facet sections', () => {
    render(<FacetSearch data={mockData} facets={['ProjectStage', 'Team', 'Status', 'Platform']} searchType="documents" />);

    // Toggle a facet section
    const toggleButton = screen.getByRole('button', { name: 'Team' });
    fireEvent.click(toggleButton);

    // Check if the facet section is expanded
    const expandedSection = screen.getByRole('button', { name: 'Team' });
    expect(expandedSection).toHaveAttribute('aria-expanded', 'true');
  });
});
