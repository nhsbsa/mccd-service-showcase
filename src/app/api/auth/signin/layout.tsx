import '../../../../styles/globals.scss';
import React from 'react';

export default async function SignInLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div id="sign-in-page">{children}</div>
  );
}
