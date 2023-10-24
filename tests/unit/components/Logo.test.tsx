import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '@/components/Logo';

describe('Logo component', () => {
  it('renders the logo with default props', () => {
    render(<Logo />);

    const logoElement = screen.getByTestId('logo-mark', {});
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('fill', 'currentColor');
  });

  it('renders the logo with underline', () => {
    render(<Logo hasUnderline />);

    const underlineElement = screen.getByTestId('logo-underline', {});
    expect(underlineElement).toBeInTheDocument();
  });

  it('applies custom class to the logo', () => {
    const customClass = 'custom-logo-class';
    render(<Logo className={customClass} />);

    const logoElement = screen.getByTestId('logo', {});
    expect(logoElement).toHaveClass(customClass);
  });
});
