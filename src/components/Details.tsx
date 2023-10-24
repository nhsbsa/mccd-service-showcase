import React from 'react';

interface DetailsProps {
  title: string
  children: React.ReactNode
}
function Details({ title, children }:DetailsProps) {
  return (
    <details className="govuk-details">
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">
          {title}
        </span>
      </summary>
      <div className="govuk-details__text">
        {children}
      </div>
    </details>
  );
}

export default Details;
