'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECATPCHA_V3_SITE_KEY as string}
      scriptProps={{ async: true, defer: true }}
      useRecaptchaNet
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
