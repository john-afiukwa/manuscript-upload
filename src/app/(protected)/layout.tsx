"use client";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import SideBar from "@src/app/components/SideBar";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { verifySession } from "@src/app/api/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import app from '@src/config/firebase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- HOC
function AuthHOC(Component: React.ComponentType<any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- HOC
  return function IsAuth(props: any) {
    const [authenticated, setAuthenticated] = useState(false);


    useEffect(() => {
      const validateAuth = async () => {
        const response = await verifySession();
        if (response.isAuth) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          return redirect("/auth/signin");
        }
      };

      validateAuth();
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string),
        isTokenAutoRefreshEnabled: true,
      });
    }, [authenticated]);


    if (!authenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()

  return <QueryClientProvider client={queryClient}>
    <div className="grid grid-rows-[4rem_1fr] md:grid-rows-none md:grid-cols md:grid-cols-[auto_1fr]">
      <section className="w-fit h-full">
        <SideBar />
      </section>
      <section className="w-full px-4 py-4 md:py-10">
        {children}
      </section>

    </div>
  </QueryClientProvider>;
}

export default AuthHOC(ProtectedLayout);