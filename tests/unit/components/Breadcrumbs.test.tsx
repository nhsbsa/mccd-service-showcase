import { render, screen } from '@testing-library/react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Breadcrumbs Component', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/path-from-usePathname-mock');
  });

  test('renders Breadcrumbs with default values', () => {
    render(<Breadcrumbs />);
    const breadcrumbElement = screen.getByLabelText('Breadcrumb', { });
    expect(breadcrumbElement).toBeInTheDocument();
  });

  test('renders Breadcrumbs with custom breadcrumbs and current page', () => {
    render(<Breadcrumbs breadcrumbs={['First Page,/first', 'Second Page,/second']} currentPage="Third Page" />);

    expect(screen.getByText('First Page', { })).toBeInTheDocument();
    expect(screen.getByText('Second Page', { })).toBeInTheDocument();
    expect(screen.getByText('Third Page', { })).toBeInTheDocument();
  });

  test('renders Breadcrumbs with "Home" as current page when currentPage is "Index"', () => {
    render(<Breadcrumbs currentPage="Index" />);
    const homeLink = screen.getByText('Home', { });
    expect(homeLink).toBeInTheDocument();
  });

  test('renders Breadcrumbs with correct href for each breadcrumb link', () => {
    render(<Breadcrumbs breadcrumbs={['First Page,/first', 'Second Page,/second']} currentPage="Third Page" />);

    expect(screen.getByRole('link', { name: 'First Page' })).toHaveAttribute('href', '/first');
    expect(screen.getByRole('link', { name: 'Second Page' })).toHaveAttribute('href', '/second');
    expect(screen.getByRole('link', { name: 'Third Page' })).toHaveAttribute('href', '/path-from-usePathname-mock');
  });
});
