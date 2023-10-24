import React from 'react';

type Props = {
  children: React.ReactNode
}
function InsetText({ children }: Props) {
  return (
    <div className="govuk-inset-text">
      {children}
    </div>
  );
}

export default InsetText;
