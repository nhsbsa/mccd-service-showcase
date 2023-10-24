import React from 'react';

type Props = {
  tag: string
  className?: string
  caption?: string
  children: React.ReactNode
}
const Heading = ({
  tag = 'H1', className = 'govuk-heading-xl', caption = '', children,
}:Props) => {
  const htmlTag = () => {
    const T = tag.toLowerCase().trim();
    switch (T) {
      case 'h1': return (
        <h1 className={className}>
          {caption && <span className="govuk-caption-xl">{caption}</span>}
          {children}
        </h1>
      );
      case 'h2': return (
        <h2 className={className}>
          {caption && <span className="govuk-caption-l">{caption}</span>}
          {children}
        </h2>
      );
      case 'h3': return (
        <h3 className={className}>
          {children}
        </h3>
      );
      case 'h4': return (
        <h4 className={className}>
          {children}
        </h4>
      );
      default: return (
        <h1 className={className}>
          {caption && <span className="govuk-caption-l">{caption}</span>}
          {children}
        </h1>
      );
    }
  };
  return htmlTag();
};

export default Heading;
