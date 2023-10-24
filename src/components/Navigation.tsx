'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from './Link';

type Links = {
    title: string,
    link: string,
    content: string
}

type NavProps = {
    title: string
    serviceName: string
    navLinks: Links[]
}

export function NavigationItem({ title, link, content }: Links) {
  const pathName = usePathname();
  const isActive = pathName === `${link}/`;

  return (
    <li className={`govuk-header__navigation-item${isActive ? ' govuk-header__navigation-item--active' : ''}`}>
      <Link className="govuk-header__link" href={link} title={title}>
        {content}
      </Link>
    </li>
  );
}

function Navigation({ serviceName = '', title = 'Menu', navLinks = [] }: NavProps) {
  return (
    <nav aria-label="Menu" className={`govuk-header__navigation${!serviceName ? ' no-service-name' : null}`}>
      <button
        type="button"
        className="govuk-header__menu-button govuk-js-header-toggle"
        aria-controls="navigation"
        aria-label="Show or hide menu"
        hidden
      >
        {title}
      </button>

      <ul id="navigation" className="govuk-header__navigation-list">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {navLinks?.map((b, i) => (<NavigationItem key={`navitem-${i + 1}`} {...b} />))}
      </ul>
    </nav>
  );
}

export default Navigation;
