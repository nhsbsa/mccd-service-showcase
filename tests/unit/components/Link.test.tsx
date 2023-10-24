import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Link from '@/components/Link';

describe('Link component', () => {
  it('renders an anchor link with the correct attributes for internal link', () => {
    const { href, children } = {
      href: '/internal-link',
      children: 'Internal Link',
    };

    render(<Link href={href}>{children}</Link>);

    const linkElement = screen.getByRole('link', {});

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/internal-link');
    expect(linkElement).toHaveClass('govuk-link');
    expect(linkElement).toHaveAttribute('target', '_self');
  });

  it('renders an anchor link with the correct attributes for anchor link', () => {
    const { href, children } = {
      href: '#anchor-link',
      children: 'Anchor Link',
    };

    render(<Link href={href}>{children}</Link>);

    const linkElement = screen.getByRole('link', {});

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '#anchor-link');
    expect(linkElement).toHaveClass('govuk-link');
    expect(linkElement).toHaveAttribute('target', '_self');
    expect(linkElement).toHaveAttribute('data-scroll', 'true');
  });

  it('renders an anchor link with the correct attributes for external link', () => {
    const { href, children } = {
      href: 'https://external-link.com',
      children: 'External Link',
    };

    render(<Link href={href}>{children}</Link>);

    const linkElement = screen.getByRole('link', {});

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://external-link.com');
    expect(linkElement).toHaveClass('govuk-link');
    expect(linkElement).toHaveAttribute('target', '_blank');
  });

  it('calls the provided onClick function when the link is clicked', () => {
    const onClickMock = jest.fn();
    const {
      children,
      href,
      onClick,
    } = {
      href: '/internal-link',
      children: 'Internal Link',
      onClick: onClickMock,
    };

    render(<Link href={href} onClick={onClick}>{children}</Link>);

    const linkElement = screen.getByRole('link', {});

    fireEvent.click(linkElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('renders with custom className when provided', () => {
    const {
      children,
      className,
      href,
    } = {
      href: '/internal-link',
      children: 'Internal Link',
      className: 'custom-class',
    };

    render(<Link className={className} href={href}>{children}</Link>);

    const linkElement = screen.getByRole('link', {});

    expect(linkElement).toHaveClass('custom-class');
  });
});
