import React from 'react';
import { render, screen } from '@testing-library/react';
import Summary, { SummaryEntry } from '@/components/Summary';
import { startCase } from 'lodash';

describe('Summary Component', () => {
  const testData = {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    email: 'john.doe@example.com',
  };

  it('renders without crashing', () => {
    // @ts-ignore
    render(<Summary data={testData} />);
    // Add additional assertions as needed
  });

  it('renders child components correctly', () => {
    render(<Summary data={testData} />);
    Object.entries(testData).forEach(([key, value]) => {
      const keyElement = screen.getByText(startCase(key));
      const valueElement = screen.getByText(value);
      expect(keyElement).toBeInTheDocument();
      expect(valueElement).toBeInTheDocument();
    });
  });

  it('renders children if no data is provided', () => {
    // @ts-ignore
    render(<Summary />);
    const childrenElement = screen.getByText('No data available');
    expect(childrenElement).toBeInTheDocument();
  });

  it('renders SummaryEntry with action correctly', () => {
    const entryWithAction = {
      name: 'Status',
      value: 'Active',
      data: {},
      action: {
        name: 'Edit',
        link: '/edit',
      },
    };

    render(<SummaryEntry {...entryWithAction} />);

    const keyElement = screen.getByText('Status');
    const valueElement = screen.getByText('Active');
    const actionElement = screen.getByText('Edit');

    expect(keyElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
    expect(actionElement).toBeInTheDocument();
  });

  it('handles null value correctly', () => {
    const entryWithNullValue = {
      name: 'Status',
      value: null,
      data: {},
    };

    render(<SummaryEntry {...entryWithNullValue} />);

    const keyElement = screen.getByText('Status');

    expect(keyElement).toBeInTheDocument();
    expect(screen.queryByText('null')).not.toBeInTheDocument();
  });

  it('handles onClick for action correctly', async () => {
    const entryWithAction = {
      name: 'Status',
      value: 'Active',
      data: {},
      action: {
        name: 'Edit',
        link: '/edit',
      },
    };

    render(
      // eslint-disable-next-line react/jsx-props-no-spreading
      <SummaryEntry {...entryWithAction} />,
    );

    const actionElement = screen.getByText('Edit');
    expect(actionElement).toHaveAttribute('href', '/edit');
  });
});
