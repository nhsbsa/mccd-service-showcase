'use client';

import React, { createContext, useContext } from 'react';

const Widths = {
  '1/4': 'govuk-grid-column-one-quarter',
  '1/3': 'govuk-grid-column-one-third',
  '2/3': 'govuk-grid-column-two-thirds',
  '1/2': 'govuk-grid-column-one-half',
  '3/4': 'govuk-grid-column-three-quarters',
  full: 'govuk-grid-column-full',
};

type TGridColumn = {
  width: keyof typeof Widths
  className?: string
  children: React.ReactNode
}

const ParentContext = createContext<string | null>(null);

type TRow = {
  children?: React.ReactNode
}

export const GridRow = ({ children }:TRow) => (
  <ParentContext.Provider value="GridRow">
    <div data-testid="grid-row" className="govuk-grid-row">{children}</div>
  </ParentContext.Provider>
);

export const GridColumn = ({ width, className = '', children }: TGridColumn) => {
  const parentComponent = useContext(ParentContext);
  const column = (
    <div data-testid="grid-column" className={`${Widths[width] || 'govuk-grid-column-two-thirds'}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
  if (parentComponent !== 'GridRow') {
    return (
      <GridRow>{column}</GridRow>
    );
  }
  return column;
};
