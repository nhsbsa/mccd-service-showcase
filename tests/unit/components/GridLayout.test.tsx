import React from 'react';
import { render, screen } from '@testing-library/react';
import { GridColumn, GridRow } from '@/components/GridLayout';

describe('GridLayout', () => {
  it('GridColumn renders with default width if an invalid width is provided', () => {
    // @ts-ignore
    render(<GridColumn width="invalid-width" data-testid="grid-column">Content</GridColumn>);
    const gridColumn = screen.getByTestId('grid-column', {});

    expect(gridColumn).toHaveClass('govuk-grid-column-two-thirds');
  });

  it('GridColumn renders with the specified width class', () => {
    render(<GridColumn width="1/3" data-testid="grid-column">Content</GridColumn>);
    const gridColumn = screen.getByTestId('grid-column', {});

    expect(gridColumn).toHaveClass('govuk-grid-column-one-third');
  });

  it('GridColumn renders with additional custom class', () => {
    render(<GridColumn width="1/2" className="custom-class" data-testid="grid-column">Content</GridColumn>);
    const gridColumn = screen.getByTestId('grid-column', {});

    expect(gridColumn).toHaveClass('govuk-grid-column-one-half');
    expect(gridColumn).toHaveClass('custom-class');
  });

  it('GridColumn renders children', () => {
    render(<GridColumn width="full" data-testid="grid-column">Hello, World!</GridColumn>);
    const gridColumn = screen.getByTestId('grid-column', {});

    expect(gridColumn).toHaveTextContent('Hello, World!');
  });

  it('should wrap an orphaned GridColumn in a GridRow', () => {
    render(<GridColumn width="full" data-testid="grid-column">Hello, World!</GridColumn>);
    const gridRow = screen.getByTestId('grid-row');
    expect(gridRow).toBeInTheDocument();
  });

  it('GridRow renders children', () => {
    render(<GridRow>Hello, World!</GridRow>);
    const gridRow = screen.getByText('Hello, World!', {});

    expect(gridRow).toBeInTheDocument();
  });
});
