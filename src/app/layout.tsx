import React from 'react';
import * as Fonts from '../../public/theme/font.config';
import '@/styles/globals.scss';

export default async function RootLayout({ children }: {
  children: React.ReactNode[]
}) {
  const fontVariables = Object.values(Fonts)
    .filter((obj) => Object.hasOwn(obj, 'variable'))
    .map((font) => font.variable)
    .join(' ');

  return (
    <html className="govuk-template" lang="en">
      <body className={`${fontVariables} govuk-template__body js-enabled`}>
        {children}
      </body>
    </html>
  );
}
