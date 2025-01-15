"use client";

import { ReactNode, useEffect } from "react";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import app from "@src/config/firebase";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (window) {
      console.log('window is defined');
    }
    console.log('window is not defined');
    if (process.env.NODE_ENV !== 'production') {
      Object.assign(window, {
        FIREBASE_APPCHECK_DEBUG_TOKEN:
          process.env.NEXT_PUBLIC_APP_CHECK_DEBUG_TOKEN,
      })
    }
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string),
      isTokenAutoRefreshEnabled: true,
    });
  }, []);
  return children;
}