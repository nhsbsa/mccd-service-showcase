'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

type TBreadcrumb = {
  breadcrumbs?: string[]
  currentPage?: string
}
function Breadcrumbs({ breadcrumbs = [''], currentPage = '' }: TBreadcrumb) {
  const pathName = usePathname();
  return (
    <div style={{ marginTop: '1px' }} className="govuk-breadcrumbs" aria-label="Breadcrumb">
      <ol className="govuk-breadcrumbs__list">
        {breadcrumbs?.map((b, i) => {
          const comps = b.split(',');
          return (
            <li key={`breadcrumb_${i + 1}`} className="govuk-breadcrumbs__list-item">
              <a className="govuk-breadcrumbs__link" href={comps[1]}>{comps[0]}</a>
            </li>
          );
        })}
        <li className="govuk-breadcrumbs__list-item">
          <a className="govuk-breadcrumbs__link" href={pathName}>{currentPage === 'Index' ? 'Home' : currentPage}</a>
        </li>
      </ol>
    </div>
  );
}

export default Breadcrumbs;
