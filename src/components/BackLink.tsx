'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

type TBackLink = {
  href?: string
  title?: string
}
function BackLink({ href = '', title = 'Back' }: TBackLink) {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (href) {
      return router.push(href);
    }
    return router.back();
  };
  const handleKeydown = (e: React.KeyboardEvent) => {
    if ('key' in e && e.key === 'Enter') {
      e.preventDefault();
      if (href) {
        router.push(href);
      } else {
        router.back();
      }
    }
  };
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  return <Link href="#" onKeyDown={(e) => handleKeydown(e)} onClick={(e) => handleClick(e)} className="govuk-back-link">{title}</Link>;
}

export default BackLink;
