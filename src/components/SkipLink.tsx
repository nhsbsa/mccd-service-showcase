import React from 'react';
import Link from 'next/link';

type SkipProps = {
  toId: string
  text?: string
}
function SkipLink({ toId = '', text = 'Skip to main content' }:SkipProps) {
  return (<Link scroll href={`#${toId}`} className="govuk-skip-link">{text}</Link>);
}

export default SkipLink;
