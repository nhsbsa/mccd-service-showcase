import React from 'react';

interface Props {
  title: string
  className?: string
  children: React.ReactNode
}
function WarningCallout({ className, children, title }:Props) {
  return (
    <div className={className ? `nhsuk-warning-callout ${className}` : 'nhsuk-warning-callout'}>
      <h2 className="govuk-heading-m nhsuk-warning-callout__label">
        {title}
        <span className="govuk-visually-hidden">:</span>
      </h2>
      {children}
    </div>
  );
}

export default WarningCallout;
