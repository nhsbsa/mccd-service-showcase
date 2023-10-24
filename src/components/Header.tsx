import React from 'react';
import Link from 'next/link';
import { ITheme } from '@/types';
import Image from 'next/image';

type Props = {
  name?: ITheme['name']
  logo?: ITheme['logo'];
  serviceName?: string
  children?: React.ReactNode
}
function Header({
  name = '',
  serviceName = '',
  children,
  logo = {
    src: null, width: 0, alt: '', height: 0,
  },
}:Props) {
  return (
    <header className="govuk-header " role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo app-header__logo">
          <Link data-testid="home-link" href="/" className="govuk-header__link govuk-header__link--homepage">
            <span className="govuk-header__logotype">
              {logo.src && <Image className="govuk-header__logotype" width={logo.width} height={logo.height} src={logo.src} alt={logo.alt} />}
              {!logo.src && name && <span style={{ padding: '20px 0px' }} className="govuk-header__logotype-text">{name}</span>}
            </span>
          </Link>
        </div>
        <div className="govuk-header__content">
          {serviceName && (
          <div className="govuk-header__service-name">
            {serviceName}
          </div>
          )}
          {children}
        </div>
      </div>
    </header>
  );
}

export default Header;
