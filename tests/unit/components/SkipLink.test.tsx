import React from 'react';
import { render, screen } from '@testing-library/react';
import SkipLink from '@/components/SkipLink';

describe('SkipLink component', () => {
  it('renders without crashing', () => {
    render(<SkipLink toId="main-content" />);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('renders with custom text when provided', () => {
    render(<SkipLink toId="main-content" text="Skip to content" />);
    expect(screen.getByText('Skip to content')).toBeInTheDocument();
  });

  it('sets the href attribute correctly', () => {
    render(<SkipLink toId="main-content" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<SkipLink toId="main-content" text="Skip to content" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
