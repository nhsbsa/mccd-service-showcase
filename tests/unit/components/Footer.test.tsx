import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer'; // Replace with the actual import path

describe('Footer Component', () => {
  const testData = [
    { content: 'Link 1', title: 'Title 1', link: '/link1' },
    { content: 'Link 2', title: 'Title 2', link: '/link2' },
  ];

  it('renders Footer component with provided data', () => {
    render(<Footer data={testData} />);

    testData.forEach((item) => {
      const link = screen.getByRole('link', { name: item.content });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', item.link);
    });
  });

  it('opens external links in a new tab', () => {
    render(<Footer data={testData} />);

    testData
      .filter((item) => /^http/.test(item.link))
      .forEach((item) => {
        const link = screen.getByRole('link', { name: item.content });
        expect(link).toHaveAttribute('target', '_blank');
      });
  });

  it('opens internal links in the same tab', () => {
    render(<Footer data={testData} />);

    testData
      .filter((item) => !/^http/.test(item.link))
      .forEach((item) => {
        const link = screen.getByRole('link', { name: item.content });
        expect(link).toHaveAttribute('target', '_self');
      });
  });
});
