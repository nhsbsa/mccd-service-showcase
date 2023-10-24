import React from 'react';
import { render, screen } from '@testing-library/react';
import GridRow from '@/components/GridRow';

describe('GridRow', () => {
  it('renders children', () => {
    render(<GridRow>Hello, World!</GridRow>);
    const gridRow = screen.getByText('Hello, World!', {});

    expect(gridRow).toBeInTheDocument();
  });
});
