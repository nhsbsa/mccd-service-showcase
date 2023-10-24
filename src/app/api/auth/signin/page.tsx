import React, { Suspense } from 'react';
import SigninForm from '@/components/SigninForm';

function SignInPage() {
  return (
    <Suspense fallback={<p className="govuk-body-s">Loading...</p>}>
      <SigninForm />
    </Suspense>
  );
}
export default SignInPage;
