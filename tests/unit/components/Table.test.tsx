import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table, { TableHeader, TableRow, TableCell } from '@/components/Table';

const testData = [
  {
    id: 1, name: 'John Doe', age: 30, link: '/john',
  },
  {
    id: 2, name: 'Jane Doe', age: 25, link: '/jane',
  },
];

describe('Table Component', () => {
  it('renders table with dynamic data', () => {
    render(
      <Table caption="Test Table Caption" data={testData} />,
    );
    expect(screen.getByText('Test Table Caption')).toBeInTheDocument();

    expect(screen.getByRole('columnheader', { name: 'Id' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Age' })).toBeInTheDocument();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('transforms name into a link', () => {
    const transformFunction = {
      link: (value, row) => (
        <a href={value}>{row.name}</a>
      ),
    };
    render(
      <Table caption="Test Table" data={testData} transform={transformFunction} />,
    );

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(testData.length);
  });

  it('transforms ID into a link and doesn\'t render Link as a columnheader', () => {
    const transformFunction = {
      id: (value, row) => (
        <a href={row.link}>{value}</a>
      ),
    };
    render(
      <Table caption="Test Table" data={testData} exclude="link" transform={transformFunction} />,
    );
    const linkHeader = screen.queryByRole('columnheader', { name: 'Link' });
    const linkedItem = screen.queryByRole('link', { name: '1' });
    const links = screen.getAllByRole('link');

    expect(linkHeader).not.toBeInTheDocument();
    expect(linkedItem).toBeInTheDocument();
    expect(links.length).toBe(testData.length);
  });

  it('renders table using children', () => {
    render(
      <Table caption="Table built 'longhand' using component parts">
        <TableHeader>
          <TableCell>Header 1</TableCell>
          <TableCell>Header 2</TableCell>
        </TableHeader>
        <TableRow>
          <TableCell>Body 1</TableCell>
          <TableCell>Body 2</TableCell>
        </TableRow>
      </Table>,
    );
    expect(screen.getByText('Table built \'longhand\' using component parts')).toBeInTheDocument();

    expect(screen.getByRole('columnheader', { name: 'Header 1' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Header 2' })).toBeInTheDocument();

    expect(screen.getByText('Body 1')).toBeInTheDocument();
    expect(screen.getByText('Body 2')).toBeInTheDocument();
  });
});
