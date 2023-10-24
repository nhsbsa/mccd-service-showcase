import React from 'react';

type Props = {
    label?: string
    styles?: string
    onClick: () => void;
}

function Button({ label, styles, onClick }: Props) {
  const buttonStyle = () => {
    switch (styles) {
      case 'start': return 'govuk-start-button';
      case 'secondary': return 'govuk-secondary-button';
      case 'warning': return 'govuk-warning-button';
      case 'inverse': return 'govuk-inverse-button';
      default: return 'govuk-default-button';
    }
  };
  return (<button className={buttonStyle()} type="button" onClick={onClick}>{label}</button>);
}

export default Button;
