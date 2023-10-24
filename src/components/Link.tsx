'use client';

import React from 'react';
import Mdlink from 'next/link';

type Props = {
    className?: string
    title?: string
    href: string
  // eslint-disable-next-line no-unused-vars
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void | null
    children: React.ReactNode
}

function Link({
  className = '', title = '', href = '', onClick, children,
}:Props) {
  const anchorLink = href.startsWith('#');
  const internal = /^\/(?!\/)/.test(href);
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
  };
  if (anchorLink) {
    return (<Mdlink onClick={(e) => handleClick(e)} target="_self" scroll href={href} title={title} className={className || 'govuk-link'}>{children}</Mdlink>);
  } if (internal) {
    return (<Mdlink onClick={(e) => handleClick(e)} target="_self" href={href} title={title} className={className || 'govuk-link'}>{children}</Mdlink>);
  }
  return <Mdlink onClick={(e) => handleClick(e)} target="_blank" href={href} title={title} className={className || 'govuk-link'}>{children}</Mdlink>;
}

export default Link;
