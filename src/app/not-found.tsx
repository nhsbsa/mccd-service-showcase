import Link from 'next/link';
import React from 'react';
import { GridRow, GridColumn } from '../components/GridLayout';
import { H1, Paragraph } from '../components/MdxComponents';
import BackLink from '../components/BackLink';
import SkipLink from '../components/SkipLink';
import Header from '../components/Header';
import Footer from '../components/Footer';
import theme from '../../public/theme/theme.config';

export default function NotFound() {
  return (
    <>
      <SkipLink text="Skip to main content" toId="mainContent" />
      <Header serviceName={theme.serviceName} name={theme.name} logo={theme.logo} />
      <div className="govuk-width-container">
        <main id="mainContent" className="govuk-main-wrapper">
          <GridRow>
            <GridColumn width="full">
              <BackLink />
              <H1>Page not found</H1>
              <Paragraph>If you typed the web address, check it is correct.</Paragraph>
              <Paragraph>
                If you pasted the web address, check you copied the entire address.
              </Paragraph>
              <Paragraph>
                If the web address is correct or you selected a link or button,
                <Link href="/">Return Home</Link>
              </Paragraph>
            </GridColumn>
          </GridRow>
        </main>
      </div>
      <Footer data={theme.footerMenu} />
    </>
  );
}
