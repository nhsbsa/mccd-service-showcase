import 'jest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button component', () => {
  let onClick;
  beforeEach(() => {
    onClick = jest.fn(); // Initialised before each test so not repeated in each test
  });
  test('renders correctly', () => {
    render(<Button onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('has default style class applied', () => {
    render(<Button styles="default" onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('govuk-default-button');
  });

  test('has start style class applied', () => {
    render(<Button styles="start" onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('govuk-start-button');
  });

  test('has secondary style class applied', () => {
    render(<Button styles="secondary" onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('govuk-secondary-button');
  });

  test('has warning style class applied', () => {
    render(<Button styles="warning" onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('govuk-warning-button');
  });

  test('has inverse style class applied', () => {
    render(<Button styles="inverse" onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('govuk-inverse-button');
  });

  test('invokes an onClick function', () => {
    render(<Button onClick={onClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test('has text content', () => {
    render(<Button onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('');
  });
});
