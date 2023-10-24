import React from 'react';
import { render, screen } from '@testing-library/react';
import InsetText from '@/components/InsetText';

describe('InsetText component', () => {
  it('renders children content', () => {
    const testText = 'This is some test content.';
    render(<InsetText>{testText}</InsetText>);

    const insetTextElement = screen.getByText(testText, {});

    expect(insetTextElement).toBeInTheDocument();
    expect(insetTextElement).toHaveClass('govuk-inset-text');
  });

  it('renders multiple children', () => {
    const child1 = 'Child 1';
    const child2 = 'Child 2';
    render(
      <InsetText>
        <div>{child1}</div>
        <span>{child2}</span>
      </InsetText>,
    );

    const child1Element = screen.getByText(child1, {});
    const child2Element = screen.getByText(child2, {});

    expect(child1Element).toBeInTheDocument();
    expect(child2Element).toBeInTheDocument();
  });

  it('applies the correct CSS class', () => {
    render(<InsetText>Test Content</InsetText>);

    const insetTextElement = screen.getByText('Test Content', {});

    expect(insetTextElement).toHaveClass('govuk-inset-text');
  });
});
