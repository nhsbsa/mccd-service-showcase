import React from 'react';
import { render, screen } from '@testing-library/react';
import WarningCallout from '@/components/WarningCallout';

describe('WarningCallout Component', () => {
  test('renders with title and children', () => {
    const title = 'Test Title';
    const children = <p>Test Children</p>;

    render(<WarningCallout title={title}>{children}</WarningCallout>);

    const titleElement = screen.getByText(title);
    const childrenElement = screen.getByText('Test Children');

    expect(titleElement).toBeInTheDocument();
    expect(childrenElement).toBeInTheDocument();
  });

  test('renders visually hidden span for accessibility', () => {
    const title = 'Test Title';
    const children = <p>Test Children</p>;

    render(<WarningCallout title={title}>{children}</WarningCallout>);

    const visuallyHiddenSpan = screen.getByText(':');
    expect(visuallyHiddenSpan).toHaveClass('govuk-visually-hidden');
  });
});
