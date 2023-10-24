import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '@/components/Image';

const testProps = {
  src: '/test-image.jpg',
  alt: 'Test Image',
  width: 1200,
  height: 800,
  priority: false,
};
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    priority = false, src, alt, width, height,
  }) => <img src={src} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} />,
  _reactdom: {
    preload: jest.fn(),
  },
}));
describe('Image component', () => {
  it('renders the NextImage component with correct props', () => {
    render(<Image {...testProps} />);
    const nextImage = screen.getByRole('img', {});
    expect(nextImage).toBeInTheDocument();
    expect(nextImage).toHaveAttribute('src');
    expect(nextImage.getAttribute('src')).toContain(testProps.src);
    expect(nextImage).toHaveAttribute('alt', 'Test Image');
    expect(nextImage).toHaveAttribute('width', '1200');
    expect(nextImage).toHaveAttribute('height', '800');
  });

  it('renders the NextImage component with default width and height if not provided', () => {
    render(<Image src="/test-image.jpg" alt="Test Image" />);
    const nextImage = screen.getByRole('img', {});
    expect(nextImage).toBeInTheDocument();
    expect(nextImage).toHaveAttribute('width', '1200');
    expect(nextImage).toHaveAttribute('height', '800');
  });

  it('renders the NextImage component with priority set to true', () => {
    render(<Image {...testProps} priority />);
    const nextImage = screen.getByRole('img', {});
    expect(nextImage).toBeInTheDocument();
    expect(nextImage).toHaveAttribute('loading', 'eager');
  });

  it('renders the NextImage component with priority set to false (default)', () => {
    render(<Image {...testProps} />);
    const nextImage = screen.getByRole('img', {});
    expect(nextImage).toBeInTheDocument();
    expect(nextImage).toHaveAttribute('loading', 'lazy');
  });
});
