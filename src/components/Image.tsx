import React from 'react';
import NextImage from 'next/image';

interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

const Image: React.FC<ImageProps> = ({
  src = '',
  alt = '',
  width = 1200,
  height = 800,
}) => (
  <NextImage
    src={src}
    width={width}
    height={height}
    alt={alt}
  />
);

export default Image;
