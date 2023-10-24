import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '@/components/Header';

describe('Header component', () => {
  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByRole('banner', {})).toBeInTheDocument();
  });

  it('renders logo correctly', () => {
    const theme = {
      name: 'Test Name',
      logo: {
        src: '/logo.png',
        alt: 'Logo Alt Text',
        width: 100,
        height: 50,
      },
    };

    render(<Header serviceName="Test Service" logo={theme.logo} name="Test Name" />);
    const expectedSrc = encodeURIComponent(theme.logo.src);
    const logoImage = screen.getByAltText('Logo Alt Text', {});
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src');
    expect(logoImage.getAttribute('src')).toContain(expectedSrc);
    expect(logoImage).toHaveAttribute('width', '100');
    expect(logoImage).toHaveAttribute('height', '50');
  });

  it('renders service name when provided', () => {
    render(<Header serviceName="Test Service" />);
    expect(screen.getByText('Test Service', {})).toBeInTheDocument();
  });

  it('does not render service name when not provided', () => {
    render(<Header />);
    expect(screen.queryByText('Test Service', {})).not.toBeInTheDocument();
  });

  it('handles children correctly', () => {
    render(<Header>Test Children</Header>);
    expect(screen.getByText('Test Children', {})).toBeInTheDocument();
  });

  it('navigates to home when logo is clicked', async () => {
    render(<Header />);
    const logoLink = screen.getByTestId('home-link', {});
    await userEvent.click(logoLink);
    expect(window.location.pathname).toBe('/');
  });
  it('displays the name when there is no logo src', async () => {
    render(<Header
      name="Site Name"
      serviceName="Your Service"
      logo={{
        src: null, width: 100, alt: 'Logo Alt', height: 50,
      }}
    />);
    expect(screen.getByText('Site Name', {})).toBeInTheDocument();
  });
});
