import React from 'react';

type Props = {
  children: React.ReactNode
}
function GridRow({ children }:Props) {
  return <div className="govuk-grid-row">{children}</div>;
}
export default GridRow;
