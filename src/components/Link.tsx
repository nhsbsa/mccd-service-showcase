'use client';

import React from 'react';
import Mdlink from 'next/link';

type Props = {
    className?: string
    title?: string
    id?: string
    href: string
  // eslint-disable-next-line no-unused-vars
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void | null
    children: React.ReactNode
}

function Link({
  className = '', title = '', href = '', onClick, children, id = '',
}:Props) {
  const anchorLink = href.startsWith('#');
  const internal = /^\/(?!\/)/.test(href);
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
  };
  if (anchorLink) {
    return (<Mdlink id={id} onClick={(e) => handleClick(e)} target="_self" data-scroll scroll href={href} title={title} className={className || 'govuk-link'}>{children}</Mdlink>);
  } if (internal) {
    return (<Mdlink id={id} onClick={(e) => handleClick(e)} target="_self" href={href} title={title} className={className || 'govuk-link'}>{children}</Mdlink>);
  }
  return <Mdlink id={id} onClick={(e) => handleClick(e)} target="_blank" href={href} title={title} className={className || 'govuk-link'}>{children}</Mdlink>;
}

export default Link;
