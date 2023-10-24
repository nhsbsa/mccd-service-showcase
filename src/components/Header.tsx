import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import theme from '../../public/theme/theme.config';

type Props = {
    serviceName: string
    children?: React.ReactNode
}
function Header({ serviceName = '', children }:Props) {
  return (
    <header className="govuk-header " role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo app-header__logo">
          <Link href="/" className="govuk-header__link govuk-header__link--homepage">
            <span className="govuk-header__logotype">
              {theme.logo.src && <Image priority className="govuk-header__logotype" width={theme.logo.width} height={theme.logo.height} src={theme.logo.src} alt={theme.logo.alt} />}
              {!theme.logo.src && theme.name && <span style={{ padding: '20px 0px' }} className="govuk-header__logotype-text">{theme.name}</span>}
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
