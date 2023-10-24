import '@/styles/globals.scss';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SkipLink from '@/components/SkipLink';
import Navigation from '@/components/Navigation';
import theme from '../../../public/theme/theme.config';

export default async function SlugLayout({ children }: {
    children: React.ReactNode[]
}) {
  return (
    <>
      <SkipLink text="Skip to main content" toId="mainContent" />
      <Header serviceName={theme.serviceName}>
        <Navigation serviceName={theme.serviceName} title="Services" navLinks={theme.headerMenus.standardMenu} />
      </Header>
      {children}
      <Footer data={theme.footerMenu} />
    </>
  );
}
