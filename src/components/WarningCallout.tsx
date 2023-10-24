import React from 'react';

interface Props {
  title: string
  children: React.ReactNode
}
function WarningCallout({ children, title }:Props) {
  return (
    <div className="nhsuk-warning-callout">
      <h2 className="govuk-heading-m nhsuk-warning-callout__label">
        {title}
        <span className="govuk-visually-hidden">:</span>
      </h2>
      {children}
    </div>
  );
}

export default WarningCallout;
