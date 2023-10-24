import React from 'react';

const Widths = {
  '1/4': 'govuk-grid-column-one-quarter',
  '1/3': 'govuk-grid-column-one-third',
  '2/3': 'govuk-grid-column-two-thirds',
  '1/2': 'govuk-grid-column-one-half',
  '3/4': 'govuk-grid-column-three-quarters',
  full: 'govuk-grid-column-full',
};

type Props = {
  width: keyof typeof Widths
  className?: string
  children: React.ReactNode
}

function GridColumn({ width, className = '', children }: Props) {
  return <div data-testid="grid-column" className={`${Widths[width] || 'govuk-grid-column-two-thirds'}${className ? ` ${className}` : ''}`}>{children}</div>;
}

export default GridColumn;
