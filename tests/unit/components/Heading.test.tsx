import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from '@/components/Heading';

describe('Heading component', () => {
  it('renders an H1 element by default', () => {
    render(<Heading tag="H1" className="test-class" caption="Test Caption">Test Content</Heading>);
    const h1Element = screen.getByRole('heading', { level: 1 });
    expect(h1Element).toBeInTheDocument();
    expect(h1Element).toHaveClass('test-class');
    expect(h1Element).toHaveTextContent('Test Caption');
    expect(h1Element).toHaveTextContent('Test Content');
  });

  it('renders an H2 element with caption', () => {
    render(<Heading tag="H2" className="test-class" caption="Test Caption">Test Content</Heading>);
    const h2Element = screen.getByRole('heading', { level: 2 });
    expect(h2Element).toBeInTheDocument();
    expect(h2Element).toHaveClass('test-class');
    expect(h2Element).toHaveTextContent('Test Caption');
    expect(h2Element).toHaveTextContent('Test Content');
  });

  it('renders an H3 element without caption', () => {
    render(<Heading tag="H3" className="test-class">Test Content</Heading>);
    const h3Element = screen.getByRole('heading', { level: 3 });
    expect(h3Element).toBeInTheDocument();
    expect(h3Element).toHaveClass('test-class');
    expect(h3Element).toHaveTextContent('Test Content');
    expect(screen.queryByText('Test Caption', {})).not.toBeInTheDocument();
  });

  it('renders an H4 element without caption', () => {
    render(<Heading tag="H4" className="test-class">Test Content</Heading>);
    const h4Element = screen.getByRole('heading', { level: 4 });
    expect(h4Element).toBeInTheDocument();
    expect(h4Element).toHaveClass('test-class');
    expect(h4Element).toHaveTextContent('Test Content');
    expect(screen.queryByText('Test Caption', {})).not.toBeInTheDocument();
  });

  it('renders an H1 element by default if an invalid tag is provided', () => {
    render(<Heading tag="InvalidTag" className="test-class" caption="Test Caption">Test Content</Heading>);
    const h1Element = screen.getByRole('heading', { level: 1 });
    expect(h1Element).toBeInTheDocument();
    expect(h1Element).toHaveClass('test-class');
    expect(h1Element).toHaveTextContent('Test Caption');
    expect(h1Element).toHaveTextContent('Test Content');
  });
});
