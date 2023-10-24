import '@/styles/globals.scss';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SkipLink from '@/components/SkipLink';
import Navigation from '@/components/Navigation';
import { ITheme } from '@/types';
import { theme } from '../../../public/theme/theme.config';

export default async function SlugLayout({ children }: {
    children: React.ReactNode[]
}) {
  const {
    serviceName, headerMenu, footerMenu, logo, name,
  }: ITheme = theme;
  return (
    <>
      <SkipLink text="Skip to main content" toId="mainContent" />
      <Header serviceName={serviceName} logo={logo} name={name}>
        <Navigation serviceName={serviceName} title="Services" navLinks={headerMenu} />
      </Header>
      {children}
      <Footer data={footerMenu} />
    </>
  );
}
