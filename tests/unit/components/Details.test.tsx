import React from 'react';
import { render, screen } from '@testing-library/react';
import Details from '@/components/Details';

describe('Details Component', () => {
  test('renders details with title and children', () => {
    render(
      <Details title="Test Title">
        <p>Test Content</p>
      </Details>,
    );

    const detailsElement = screen.getByTestId('details', {});
    const summaryElement = screen.getByTestId('summary', { });
    const contentElement = screen.getByText('Test Content', {});

    expect(detailsElement).toBeInTheDocument();
    expect(summaryElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });

  test('toggles details visibility when clicked', () => {
    render(
      <Details title="Test Title">
        <p>Test Content</p>
      </Details>,
    );

    const detailsElement = screen.getByTestId('details', {});
    const summaryElement = screen.getByTestId('summary', { });

    // Expect it to be closed by default
    expect(detailsElement).not.toHaveAttribute('open');

    summaryElement.click();

    expect(detailsElement).toHaveAttribute('open');

    summaryElement.click();

    expect(detailsElement).not.toHaveAttribute('open');
  });
});
