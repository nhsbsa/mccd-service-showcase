import React from 'react';
import { render, screen } from '@testing-library/react';
import Navigation from '@/components/Navigation';

const mockNavLinks = [
  { title: 'Link 1', link: '/link1', content: 'Link 1 Content' },
  { title: 'Link 2', link: '/link2', content: 'Link 2 Content' },
];
const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  },
}));
describe('Navigation component', () => {
  it('renders navigation with default props', () => {
    render(<Navigation />);

    const navigationElement = screen.getByLabelText('Menu', {});
    expect(navigationElement).toBeInTheDocument();
    expect(navigationElement).toHaveClass('govuk-header__navigation');
    expect(navigationElement).toHaveClass('no-service-name');
  });

  it('renders navigation with service name', () => {
    const serviceName = 'MyService';
    render(<Navigation serviceName={serviceName} />);

    const navigationElement = screen.getByLabelText('Menu', {});

    expect(navigationElement).toHaveClass('govuk-header__navigation');
    expect(navigationElement).not.toHaveClass('no-service-name');
  });

  it('renders navigation with custom title', () => {
    const customTitle = 'Custom Menu Title';
    render(<Navigation title={customTitle} />);

    const menuButton = screen.getByText(customTitle, {});
    expect(menuButton).toBeInTheDocument();
  });

  it('renders navigation with navigation items', () => {
    render(<Navigation navLinks={mockNavLinks} />);
    const navItem1 = screen.getByText('Link 1 Content', {});
    const navItem2 = screen.getByText('Link 2 Content', {});

    expect(navItem1).toBeInTheDocument();
    expect(navItem2).toBeInTheDocument();
  });

  it('activates the correct navigation item based on pathname', () => {
    mockUsePathname.mockImplementation(() => '/link1/');

    render(<Navigation navLinks={mockNavLinks} />);

    // Validate that the correct navigation item is active
    const activeNavItem = screen.getByTestId('link-1-content', { });
    const nonActiveNavItem = screen.getByTestId('link-2-content', { });
    expect(activeNavItem).toHaveClass('govuk-header__navigation-item--active');
    expect(nonActiveNavItem).not.toHaveClass('govuk-header__navigation-item--active');
  });
});
