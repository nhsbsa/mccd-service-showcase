import React, { isValidElement } from 'react';

type Props = {
  children: React.ReactNode;
};

function LeadParagraph({ children }: Props) {
  let paras: boolean = false;
  const paragraphText = React.Children.toArray(children)
    .map((child, index) => {
      if (isValidElement(child) && typeof child.type === 'function' && 'name' in child.type && child.type.name === 'Paragraph') {
        paras = true;
        return <p key={`para-${index + 1}`} className="govuk-body-l">{child.props.children}</p>;
      }
      return child;
    });

  return paras ? <div>{paragraphText}</div> : <p className="govuk-body-l">{paragraphText}</p>;
}

export default LeadParagraph;
