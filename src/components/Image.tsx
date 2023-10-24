import React from 'react';
import NextImage from 'next/image';

interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean
}

const Image: React.FC<ImageProps> = ({
  src = '',
  alt = '',
  width = 1200,
  height = 800,
  priority = false,
}) => (
  <NextImage
    src={src}
    width={width}
    height={height}
    alt={alt}
    priority={priority}
  />
);

export default Image;
